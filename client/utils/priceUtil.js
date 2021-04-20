export const getPrice = (value) => {
        
    if(value){
        if(value < 100){
            return `${value} lakhs`
        }else if(value >= 100){
    
           let currency = value / 100;
           if(currency == 1){
               return `1 crore`
           }else{
               return `${currency} crores`
           }
        }
    }
    
}

export const getPurseBalance = (squad) => {
    let purseRemain = 10000;
    let purseSpent = 0;
    if(squad){
        squad.forEach(element => {
            purseSpent = purseSpent + element.soldPrice;
        });
        purseRemain = 10000 - purseSpent;
    }
    
    return purseRemain;
}