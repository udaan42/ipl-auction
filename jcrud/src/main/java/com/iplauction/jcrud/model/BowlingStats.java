package com.iplauction.jcrud.model;

public class BowlingStats {

    private Integer noOfWickets;
    private Integer ballsBowled;
    private Integer dots;
    private Integer runsConceded;
    private Integer maidens;
    private Double bowlingPoints;

    public Integer getNoOfWickets() {
        return noOfWickets;
    }

    public void setNoOfWickets(Integer noOfWickets) {
        this.noOfWickets = noOfWickets;
    }

    public Integer getBallsBowled() {
        return ballsBowled;
    }

    public void setBallsBowled(Integer ballsBowled) {
        this.ballsBowled = ballsBowled;
    }

    public Integer getDots() {
        return dots;
    }

    public void setDots(Integer dots) {
        this.dots = dots;
    }

    public Integer getRunsConceded() {
        return runsConceded;
    }

    public void setRunsConceded(Integer runsConceded) {
        this.runsConceded = runsConceded;
    }

    public Integer getMaidens() {
        return maidens;
    }

    public void setMaidens(Integer maidens) {
        this.maidens = maidens;
    }

    public Double getBowlingPoints() {
        return bowlingPoints;
    }

    public void setBowlingPoints(Double bowlingPoints) {
        this.bowlingPoints = bowlingPoints;
    }
}
