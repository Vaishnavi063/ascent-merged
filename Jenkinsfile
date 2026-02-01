pipeline {
    agent any

    environment {
        // defined as environment variables for easier use in sh commands
        IMAGE_NAME = "vaishnav06/taskify-app" 
        IMAGE_TAG = "3.0.0"
        DOCKER_CRED_ID = "dockerhub-creds" // Your credential ID from Jenkins
    }

    stages {
        stage('Try') {
            steps {
                echo "Pipeline started..."
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Vaishnavi063/Ascent-.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    // using 'sh' instead of 'docker.build'
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Pushing Docker image..."
                    // Securely inject credentials without exposing them in logs
                    withCredentials([usernamePassword(credentialsId: DOCKER_CRED_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        
                        // Login to DockerHub
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                        
                        // Push the image
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                        
                        // Optional: Logout for security
                        sh "docker logout"
                    }
                }
            }
        }
    }

    post {
        success { echo "Docker image successfully built and pushed 🚀" }
        failure { echo "Pipeline failed ❌" }
    }
}
