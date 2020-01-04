function component() {
    const element = document.createElement('root');
    element.innerHTML='Hello World!';
  
    return element;
  }
  
  document.body.appendChild(component());