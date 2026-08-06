# Contributing to dopa-X Platform & Algorithm Repository

Welcome to the **dopa-X** neurodegenerative digital biomarker community! We are an open-access research initiative developing automated digital biomarker algorithms for Parkinson's disease and movement disorders.

## Data Governance, Patient Privacy & Legal Compliance Policy

To comply with human subjects research data governance, HIPAA/GDPR patient privacy regulations, and open-source licensing:
- **Apache License 2.0**: All code, algorithms, pipelines, and data assets in this repository are distributed under the **Apache License, Version 2.0**. By contributing to this repository, you agree that your contributions will be licensed under the Apache 2.0 License.
- **Mandatory Patient Anonymization**: All clinical data, signal timeseries, sample files, and algorithm benchmark outputs MUST be fully anonymized in compliance with HIPAA Safe Harbor standards (45 CFR § 164.514(b)) and GDPR Recital 26. All 18 HIPAA direct and indirect identifiers (names, dates, MRNs, IP addresses, biometric identifiers) must be permanently stripped.
- **No Un-Redacted PHI / PII**: Never upload un-redacted Protected Health Information (PHI) or Personally Identifiable Information (PII) in code, commit logs, PRs, or discussion posts.
- **Raw Clinical Datasets**: Researchers download raw clinical datasets directly from official open-access providers ([PhysioNet](https://physionet.org), [PPMI](https://www.ppmi-info.org), OpenNeuro, Zenodo).
- **GitHub Repository Role**: This GitHub repository (`dopax35/data-analysis-tools`) is exclusively dedicated to sharing **open-source algorithm code**, feature extraction pipelines, data cleaning utilities, and UI visualizer components.

## How to Develop & Submit Algorithms

1. **Find a Task**: Check open tasks on the [dopa-X Projects Board](https://www.dopa-x.org/portal/projects) or Monday.com Workspace.
2. **Download Raw Data**: Follow the provided link to download raw clinical signals from the official provider (PhysioNet, PPMI, etc.).
3. **Develop Algorithms Locally**: Write feature extraction or signal processing scripts in Python, MATLAB, or C++.
4. **Submit Pull Request**: Fork this repository, commit your algorithm source code, and submit a PR referencing your task ID (e.g., `#task-101`).

## Code & License Guidelines

- All contributions are governed by the [Apache License 2.0](LICENSE).
- Add docstrings explaining mathematical / signal processing formulas used.
- Include unit tests verifying signal transformation correctness.
- Perform pre-commit checks to ensure no raw patient data or identifying metadata is included in your commits.

