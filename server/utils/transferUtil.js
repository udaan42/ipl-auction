import _ from 'lodash';

const getPurseBalance = (squad) => {
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

export const processTransfers = (transfers, league, players) => {
    
    if(transfers && league){
        

        let users = league.leagueUsers;

        let temp = transfers.sort((a, b) => {
            return b.transferOutAmount - a.transferOutAmount;
        });
        let priorityMap = new Map();
        let userMap = new Map();
        let output = [];

        temp.map((item)=>{
            item.transferIn = item.transferInList[0];
        })

        users.map((item) => {
            userMap.set(item.userId, item.playersSquad);
        })

        for(let i=0; i<temp.length; i++){
            let item = temp[i]
            if(priorityMap.has(item.transferInList[0].playerId)){
                let val = [...priorityMap.get(item.transferInList[0].playerId), i];
                priorityMap.set(item.transferInList[0].playerId, val)
                
            }else{
                priorityMap.set(temp[i].transferInList[0].playerId, [i])
            }
        }

        for(let i=0; i<temp.length; i++){
                if(priorityMap.has(temp[i].transferIn.playerId)){
                    let array = priorityMap.get(temp[i].transferIn.playerId);
                    if(array.length > 1){

                        let flag = true;
                        array.map((item)=>{
                            if(i != item){

                                if(temp[i].bidAmount < temp[item].bidAmount){
                                    flag = false;
                                }
                                if(temp[i].bidAmount == temp[item].bidAmount && temp[i].userId != temp[item].userId){
                                    if(temp[i].timeSubmitted > temp[item].timeSubmitted){
                                        flag = false;
                                    }    
                                }

                            }
                        })

                        if(flag){

                            let squad = userMap.get(temp[i].userId)
                            let updatedSquad = squad.filter((item)=> item.playerId != temp[i].transferOutPlayerId);
                            let balance = getPurseBalance(updatedSquad);
                            if( temp[i].bidAmount < balance){
                                let newSquad = [...updatedSquad, {
                                    playerId: temp[i].transferIn.playerId,
                                    soldPrice: temp[i].bidAmount
                                }]
                                output.push(temp[i]);
                                userMap.set(temp[i].userId, newSquad);
                                priorityMap.delete(temp[i].transferIn.playerId)
                            }
                        }

                    }else{
                        let squad = userMap.get(temp[i].userId)
                        let updatedSquad = squad.filter((item)=> item.playerId != temp[i].transferOutPlayerId);
                        let balance = getPurseBalance(updatedSquad);
                        if( temp[i].bidAmount < balance){
                            let newSquad = [...updatedSquad, {
                                playerId: temp[i].transferIn.playerId,
                                soldPrice: temp[i].bidAmount
                            }]
                            output.push(temp[i]);
                            userMap.set(temp[i].userId, newSquad);
                            priorityMap.delete(temp[i].transferIn.playerId)
                        }
                    }
                }else{
                    // console.log(temp[i].transferIn.playerId);
                }
            
        }

        
        for (let value of priorityMap.values()) {
            let remArray = [];
            value.map((item)=> {
                remArray.push(temp[item]);
                remArray.sort((a, b) => {
                    return b.bidAmount - a.bidAmount;
                })
            })

            remArray.map((transfer)=>{
                if(priorityMap.has(transfer.transferIn.playerId)){
                    let squad = userMap.get(transfer.userId)
                    let updatedSquad = squad.filter((item)=> item.playerId != transfer.transferOutPlayerId);
                    let balance = getPurseBalance(updatedSquad);
                    if( transfer.bidAmount < balance){
                        let newSquad = [...updatedSquad, {
                            playerId: transfer.transferIn.playerId,
                            soldPrice: transfer.bidAmount
                        }]
                        output.push(transfer);
                        userMap.set(transfer.userId, newSquad);
                        priorityMap.delete(transfer.transferIn.playerId)
                    }
                } 
            })
        }
        
        output.map((transfer)=> {
            let currentUser = _.find(users, ["userId", transfer.userId]);
            if(currentUser){

                let currentUserSquad = currentUser.playersSquad;
                _.remove(currentUserSquad, ['playerId', transfer.transferOutPlayerId]);
                let player = _.find(players, ['playerId' ,transfer.transferIn.playerId]);
                player.soldPrice = transfer.bidAmount;
                currentUserSquad.push(player);
                currentUser.playersSquad = currentUserSquad;

                _.remove(users,["userId",transfer.userId]);
                
                users.push(currentUser);
                transfer.transferIn = player;
            }
            
        })

        let updatedLeague = league;
        updatedLeague.leagueUsers = users;
        
        return updatedLeague

    }
    
    return null;
}