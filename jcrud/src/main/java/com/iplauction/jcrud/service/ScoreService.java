package com.iplauction.jcrud.service;

import com.iplauction.jcrud.model.BattingStats;
import com.iplauction.jcrud.model.BowlingStats;
import com.iplauction.jcrud.model.FieldingStats;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {


    public double calculateBattingPoints(BattingStats battingStats, String playerRole) {

        double finalPoints = 0;

        //Runs Scored
        if (battingStats.getRuns() != null) {
            finalPoints = finalPoints + battingStats.getRuns();
        }

        //Fours
        if (battingStats.getNoOfFours() != null) {
            finalPoints = finalPoints + battingStats.getNoOfFours();
        }

        //Sixes
        if (battingStats.getNoOfSixes() != null) {
            finalPoints = finalPoints + (battingStats.getNoOfSixes() * 2);
        }

        if (battingStats.getRuns() != null) {
            if (battingStats.getRuns() == 0) {
                if (battingStats.getBallsFaced() != null) {
                    //Duck-Out
                    if (battingStats.getBallsFaced() > 0) {
                        if (!playerRole.equalsIgnoreCase("Bowler")) {
                            finalPoints = finalPoints - 5;
                        }
                    }
                }
            }

            //Milestone
            if (battingStats.getRuns() / 25 > 0) {
                finalPoints = finalPoints + (battingStats.getRuns() / 25) * 5;
            }

            //Strike-Rate
            if (battingStats.getBallsFaced() != null) {
                finalPoints = finalPoints + (battingStats.getRuns() - battingStats.getBallsFaced());
            }
        }
        return finalPoints;
    }

    public double calculateBowlingPoints(BowlingStats bowlingStats, String playerRole) {

        double finalPoints = 0;

        if (bowlingStats.getNoOfWickets() != null) {
            finalPoints = finalPoints + (bowlingStats.getNoOfWickets() * 20);
            if (bowlingStats.getNoOfWickets() > 1) {
                finalPoints = finalPoints + ((bowlingStats.getNoOfWickets() - 1) * 10);
            }
        }

        if (bowlingStats.getMaidens() != null) {
            finalPoints = finalPoints + (bowlingStats.getMaidens() * 20);
        }

        if (bowlingStats.getDots() != null) {
            finalPoints = finalPoints + bowlingStats.getDots();
        }

        if (bowlingStats.getBallsBowled() != null) {
            if(bowlingStats.getRunsConceded() != null) {
                double economy = (bowlingStats.getBallsBowled() * 1.5) - bowlingStats.getRunsConceded();
                if(economy > 0){
                    finalPoints = finalPoints + (economy * 2);
                }else{
                    finalPoints = finalPoints + economy;
                }
            }
        }

        return finalPoints;
    }

    public double calculateFieldingPoints(FieldingStats fieldingStats, String playerRole){

        double finalPoints = 0;

        if(fieldingStats.getCatches() != null){
            finalPoints = finalPoints + (fieldingStats.getCatches()*10);
        }
        if(fieldingStats.getRunOuts() != null){
            finalPoints = finalPoints + (fieldingStats.getRunOuts()*10);
        }

        return finalPoints;
    }

    public double calculateStumpingPoints(FieldingStats fieldingStats, String playerRole){

        double finalPoints = 0;

        if(fieldingStats.getStumpings() != null){
            finalPoints = finalPoints + (fieldingStats.getStumpings()*15);
        }
        return finalPoints;
    }

}
