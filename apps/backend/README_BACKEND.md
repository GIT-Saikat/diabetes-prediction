Windows PowerShell setup and run (from `apps/backend`):

1. Create and activate a venv:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

3. Run the script:

```powershell
python diabetes_predicttion.py
```

Notes:

- The script now skips XGBoost if it's not installed; to include it, install `xgboost`.
- The CSV file `diabetes_cleaned_dropped_zeros.csv` must be present in this folder.
- The trained AdaBoost model will be saved to `models/diabetes_prediction_adaboost.sav`.




Summary

Best Accuracy: Random Forest — 0.772152 (77.22%).
Best Precision: Random Forest — 0.714286 (71.43%).
Best Recall (sensitivity): Decision Tree — 0.666667 (66.67%).
Best F1-Score (balance of precision+recall): Decision Tree — 0.654545 (65.45%).
Interpretation / trade-offs

Random Forest gives the highest overall accuracy and precision and is generally more robust (less overfitting) than a single Decision Tree. It's a good default if you want reliable, stable predictions and fewer false positives.
Decision Tree achieved the highest recall and the best F1 here, so it finds the largest fraction of actual positives (diabetics). If your priority is to minimize false negatives (i.e., catch as many diabetic cases as possible), Decision Tree may be preferable — but beware it can be less stable and more prone to overfitting.
XGBoost in this run performed worse than the top two models on these metrics (accuracy ~70.89%) — probably needs hyperparameter tuning to show its strengths.
Recommendation

If catching diabetic cases (high recall) is most important → prefer Decision Tree (or tune a classifier specifically for recall).
If you want a balanced, robust model for deployment (better generalization and higher precision/accuracy) → prefer Random Forest and then tune it.
