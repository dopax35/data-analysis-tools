# Contributing to dopa-X Platform & Algorithm Repository

Welcome to the **dopa-X** neurodegenerative digital biomarker community! We are an open-access research initiative developing automated digital biomarker algorithms for Parkinson's disease and movement disorders.

## Data Governance & Legal Compliance Policy

To comply with human subjects research data governance, patient privacy regulations, and original repository license terms:
- **Raw Clinical Datasets**: Never upload raw dataset files (`.edf`, `.mat`, `.csv` raw signals, patient clinical records) to this GitHub repository.
- **Downloading Data**: Researchers download raw clinical datasets directly from official open-access providers ([PhysioNet](https://physionet.org), [PPMI](https://www.ppmi-info.org), Synapse, etc.).
- **GitHub Repository Role**: This GitHub repository (`dopax35/data-analysis-tools`) is exclusively dedicated to sharing **algorithm source code**, feature extraction pipelines, data cleaning utilities, and UI visualizer components.

## How to Develop & Submit Algorithms

1. **Find a Task**: Check open tasks on the [dopa-X Projects Board](https://dopa-x.vercel.app/projects) or Monday.com Workspace.
2. **Download Raw Data**: Follow the provided link to download raw clinical signals from the official provider (PhysioNet, PPMI, etc.).
3. **Develop Algorithms Locally**: Write feature extraction or signal processing scripts in Python, MATLAB, or C++.
4. **Submit Pull Request**: Fork this repository, commit your algorithm source code, and submit a PR referencing your Monday task ID (e.g., `#task-101`).

## Code Guidelines

- Add docstrings explaining mathematical / signal processing formulas used.
- Include unit tests in `tests/` verifying signal transformation correctness.
- Do not include raw patient data files in your commits.
