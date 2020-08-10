podTemplate(label: 'jenkins-slave', containers: [ 
    containerTemplate(
      name: 'docker', 
      image: 'docker', 
      command: 'cat', 
      ttyEnabled: true
    ),
    containerTemplate(
      name: 'helm', 
      image: 'alpine/helm:2.14.0', 
      ttyEnabled: true, 
      command: 'cat'
    )],
    volumes: [
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
        hostPathVolume(mountPath: '/usr/local/bin/helm', hostPath: '/usr/local/bin/helm')
    ]
  ) {
    node('jenkins-slave') {
        stage('Get latest version of code') {
          checkout scm
        }
        stage('Check running containers') {
            container('docker') {  
                sh 'hostname'
                sh 'hostname -i' 
                sh 'docker ps'
                sh 'ls'
            }
            container('helm') { 
                sh 'helm init --client-only --skip-refresh'
                sh 'helm repo update'
            }
        } 
    }
}