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
            name: 'helm', 
            image: 'alpine/helm:3.2.4',
            ttyEnabled: true,
            command: 'cat'
        )
    ],
    volumes: [
        hostPathVolume(
            hostPath: '/var/run/docker.sock',
            mountPath: '/var/run/docker.sock'
        ),
        hostPathVolume(
            hostPath: '/data/db',
            mountPath: '/data/db'
        )
    ]
) {
    node('jenkins-slave') {
        def commitId
        stage ('Checkout') {
            checkout scm
            commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
            echo("commitId text:")
            echo("${commitId}")
        }
        def repository
        def projectId = 'audit-tool-285315'

        // stage ('Build') {
        //     container ('docker') {
        //         repository = "us.gcr.io/${projectId}/report"
        //         def dockerImage = docker.build("${projectId}/report:${commitId}", "./services/reports")

        //         docker.withRegistry('https://us.gcr.io', "gcr:${projectId}") {
        //             dockerImage.push()
        //         }
        //     }
        // }

        // stage ('Deploy') {
        //     container ('helm') {
        //         sh "helm upgrade -n default --install  reports-release infra/k8s/charts/reports --wait --set image.tag=${commitId}"
        //     }
        // }

    }
}
