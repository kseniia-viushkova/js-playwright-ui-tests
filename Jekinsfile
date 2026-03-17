pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-jammy'
            reuseNode true
        }
    }

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

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test --reporter=line,junit,html'
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
        failure {
            echo 'Tests failed. Check the report above.'
        }
    }
}