podTemplate(label: 'jenkins-slave', serviceAccount: 'jenkins-ci', containers: [ 
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
    )
  ]) {
    node('jenkins-slave') {
        stage('Get latest version of code') {
          checkout scm
        }   
    }
}