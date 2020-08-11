podTemplate(
    label: 'jenkins-slave', 
    containers: [ 
        containerTemplate(
            name: 'docker', 
            image: 'docker:18.02',
            ttyEnabled: true,
            command: 'cat'
        ),
        containerTemplate(
            name: 'kubectl', 
            image: 'gcr.io/cloud-builders/kubectl',
            ttyEnabled: true,
            command: 'cat'
        ),
    ],
    volumes: [
        hostPathVolume(
            hostPath: '/var/run/docker.sock',
            mountPath: '/var/run/docker.sock'
        )
    ]
) {
    node('jenkins-slave') {
        def commitId
        stage ('Checkout') {
            checkout scm
            commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        }
        def projectId = 'audit-tool-285315'
    
        stage ('Build') {
            container ('docker') {
                def dockerImage = docker.build("${projectId}/audittoolassignmentgit", ".")
                
                docker.withRegistry('https://gcr.io', "gcr:${projectId}") {
                    
                    dockerImage.push('latest')
                }
            }
        }
        stage ('Deployment') {
            container ('kubectl') {
                 sh("kubectl apply -f ./audit.yaml")
            }
        }
    }
}
