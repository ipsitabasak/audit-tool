podTemplate(
    label: 'audit-jenkins', 
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
    node('audit-jenkins') {
        stage ('Checkout') {
            checkout scm
        }
        def projectId = 'audit-tool-285315'
    
        stage ('Build') {
            container ('docker') {
                docker.withRegistry('https://gcr.io', "gcr:${projectId}") {
                    def dockerImage = docker.build("${projectId}/audittoolassignmentgit", ".")
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
