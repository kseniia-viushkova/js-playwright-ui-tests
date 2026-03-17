pipeline {
    agent any

    environment {
        CI = 'true'
        PLAYWRIGHT_JUNIT_OUTPUT_FILE = 'test-results/results.xml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run Playwright In Docker') {
            steps {
                bat '''
                docker run --rm ^
                  --ipc=host ^
                  -e CI=true ^
                  -e PLAYWRIGHT_JUNIT_OUTPUT_FILE=/work/test-results/results.xml ^
                  -v "%WORKSPACE%:/work" ^
                  -w /work ^
                  mcr.microsoft.com/playwright:v1.58.2-jammy ^
                  /bin/bash -lc "npm ci && npx playwright test --reporter=line,junit,html"
                '''
            }
        }
    }

    post {
        always {
            junit testResults: 'test-results/**/*.xml', allowEmptyResults: true
            publishHTML target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ]
            archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true
        }
    }
}