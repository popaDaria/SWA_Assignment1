export default (init_model, view) => {
    let model = init_model
  
    const onAction = async ({type, ...params}) =>  {
      switch(type) {
        case 'hire':
          break;
      }
    }
  
    return { onAction }
  }
  