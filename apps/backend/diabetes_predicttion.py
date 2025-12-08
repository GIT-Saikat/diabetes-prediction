
import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

# Try to import XGBoost; if unavailable, continue without it
try:
    from xgboost import XGBClassifier
    _XGBOOST_AVAILABLE = True
except Exception:
    XGBClassifier = None
    _XGBOOST_AVAILABLE = False


DATA_CSV = 'diabetes_cleaned_dropped_zeros.csv'

# Load dataset (assumes running from `apps/backend` directory)
if not os.path.exists(DATA_CSV):
    raise FileNotFoundError(f"Data file not found: {DATA_CSV}. Make sure it's in the same folder as this script.")

df = pd.read_csv(DATA_CSV)



df.head()

df.describe()
print(df['Outcome'].value_counts())

df.isna().sum()

df.corr()

corr_matrix=df.corr()
fig,ax=plt.subplots(figsize=(15,10))
ax=sns.heatmap(corr_matrix,
               annot=True,
               linewidths=0.5,
               fmt=".2f"
              )

# Split into features and target variable
X = df.drop('Outcome', axis=1)
y = df['Outcome']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)

models = [
    ('Logistic Regression', LogisticRegression(C=1, penalty='l2', solver='liblinear', max_iter=200)),
    ('Random Forest', RandomForestClassifier(n_estimators=10, max_depth=10, min_samples_split=2, min_samples_leaf=1, random_state=42)),
    ('Decision Tree', DecisionTreeClassifier(max_depth=10, min_samples_split=5, min_samples_leaf=1, criterion='gini', random_state=42)),
    ('K-Nearest Neighbors', KNeighborsClassifier(n_neighbors=5)),
    ('Support Vector Machine', SVC(kernel='linear')),
    ('AdaBoost', AdaBoostClassifier(n_estimators=50, random_state=42)),
    ('Gradient Boosting', GradientBoostingClassifier(n_estimators=100, max_depth=3, random_state=42)),
]

# Only add XGBoost if it's available in the current environment
if _XGBOOST_AVAILABLE:
    models.append(('XGBoost', XGBClassifier(n_estimators=100, max_depth=3, random_state=42)))
else:
    print("Warning: `xgboost` is not installed. The XGBoost model will be skipped.")

# Train and evaluate each model

# Initialize a list to store model performance metrics including accuracy
model_metrics = []

for name, model in models:
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='binary')
    recall = recall_score(y_test, y_pred, average='binary')
    f1 = f1_score(y_test, y_pred, average='binary')

    model_metrics.append({
        'Model': name,
        'Accuracy': accuracy,
        'Precision': precision,
        'Recall': recall,
        'F1-Score': f1
    })

# Create a DataFrame for all metrics
metrics_df = pd.DataFrame(model_metrics)

# Display the metrics DataFrame
print("Model Performance Metrics:")
print(metrics_df)

plt.figure(figsize=(12, 8))
sns.barplot(x='Model', y='value', hue='variable',
            data=pd.melt(metrics_df, id_vars='Model', value_vars=['Accuracy', 'Precision', 'Recall', 'F1-Score']))
plt.xticks(rotation=45)
plt.title('Model Performance Metrics')
plt.xlabel('Model')
plt.ylabel('Score')
plt.show()

# Create the 'models' directory if it doesn't exist
MODELS_DIR = 'models'
if not os.path.exists(MODELS_DIR):
    os.makedirs(MODELS_DIR)

# Find the trained AdaBoost model from the list of models (objects are trained in place)
adaboost_model = None
for name, model_obj in models:
    if name == 'AdaBoost':
        adaboost_model = model_obj
        break

if adaboost_model is not None:
    filename = os.path.join(MODELS_DIR, 'diabetes_prediction_adaboost.sav')
    joblib.dump(adaboost_model, filename)
    print(f"AdaBoost model successfully saved to {filename}")
else:
    print("AdaBoost model not found in the trained models list. Ensure the training loop ran correctly.")

print("Script finished. If you want the XGBoost model, install it with `pip install xgboost` and re-run.")