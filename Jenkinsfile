podTemplate(label: 'mypod', serviceAccount: 'jenkins-ci', containers: [ 
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
    node('mypod') {
        stage('Get latest version of code') {
          checkout scm
        }   
    }
}