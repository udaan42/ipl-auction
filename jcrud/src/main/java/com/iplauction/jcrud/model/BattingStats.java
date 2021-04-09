package com.iplauction.jcrud.model;

public class BattingStats {

    private Integer runs;
    private Integer ballsFaced;
    private Integer noOfFours;
    private Integer noOfSixes;
    private Double battingPoints;

    public Integer getRuns() {
        return runs;
    }

    public void setRuns(Integer runs) {
        this.runs = runs;
    }

    public Integer getBallsFaced() {
        return ballsFaced;
    }

    public void setBallsFaced(Integer ballsFaced) {
        this.ballsFaced = ballsFaced;
    }

    public Integer getNoOfFours() {
        return noOfFours;
    }

    public void setNoOfFours(Integer noOfFours) {
        this.noOfFours = noOfFours;
    }

    public Integer getNoOfSixes() {
        return noOfSixes;
    }

    public void setNoOfSixes(Integer noOfSixes) {
        this.noOfSixes = noOfSixes;
    }

    public Double getBattingPoints() {
        return battingPoints;
    }

    public void setBattingPoints(Double battingPoints) {
        this.battingPoints = battingPoints;
    }
}
