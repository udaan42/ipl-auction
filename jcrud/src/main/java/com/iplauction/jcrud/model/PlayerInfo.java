package com.iplauction.jcrud.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import org.springframework.data.annotation.Id;

import java.util.Date;

@DynamoDBTable(tableName = "player_info")
public class PlayerInfo {
    private String playerId;
    private String playerName;
    private String playerRole;
    private String playerRace;
    private String teamName;
    private Long basePrice;
    private Long soldPrice;
    private String statType;
    private Integer matchesPlayed;
    private Integer battingInningsPlayed;
    private Integer notOutCount;
    private Integer runsScored;
    private Integer highestScore;
    private Double average;
    private Integer ballsFaced;
    private Double battingStrikeRate;
    private Integer noOfHundreds;
    private Integer noOfFifties;
    private Integer noOfFours;
    private Integer noOfSixes;
    private Integer noOfCatches;
    private Integer noOfStumpings;
    private Integer bowlingInningsPlayed;
    private Integer ballsBowled;
    private Integer runsConceded;
    private Integer noOfWickets;
    private String bestBowlingFigures;
    private Double bowlingAverage;
    private Double bowlingEconomy;
    private String bowlingStrikeRate;
    private Integer noOfFourWickets;
    private Integer noOfFiveWickets;
    private Date createdDateTime;
    private Date lastModifiedDateTime;



    @Id
    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    @DynamoDBAttribute
    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    @DynamoDBAttribute
    public String getPlayerRole() {
        return playerRole;
    }

    public void setPlayerRole(String playerRole) {
        this.playerRole = playerRole;
    }



    @DynamoDBAttribute
    public Long getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Long basePrice) {
        this.basePrice = basePrice;
    }

    @DynamoDBAttribute
    public String getStatType() {
        return statType;
    }

    public void setStatType(String statType) {
        this.statType = statType;
    }

    @DynamoDBAttribute
    public Integer getMatchesPlayed() {
        return matchesPlayed;
    }

    public void setMatchesPlayed(Integer matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    @DynamoDBAttribute
    public Integer getBattingInningsPlayed() {
        return battingInningsPlayed;
    }

    public void setBattingInningsPlayed(Integer battingInningsPlayed) {
        this.battingInningsPlayed = battingInningsPlayed;
    }

    @DynamoDBAttribute
    public Integer getNotOutCount() {
        return notOutCount;
    }

    public void setNotOutCount(Integer notOutCount) {
        this.notOutCount = notOutCount;
    }

    @DynamoDBAttribute
    public Integer getRunsScored() {
        return runsScored;
    }

    public void setRunsScored(Integer runsScored) {
        this.runsScored = runsScored;
    }

    @DynamoDBAttribute
    public Integer getHighestScore() {
        return highestScore;
    }

    public void setHighestScore(Integer highestScore) {
        this.highestScore = highestScore;
    }

    @DynamoDBAttribute
    public Double getAverage() {
        return average;
    }

    public void setAverage(Double average) {
        this.average = average;
    }

    @DynamoDBAttribute
    public Integer getBallsFaced() {
        return ballsFaced;
    }

    public void setBallsFaced(Integer ballsFaced) {
        this.ballsFaced = ballsFaced;
    }

    @DynamoDBAttribute
    public Double getBattingStrikeRate() {
        return battingStrikeRate;
    }

    public void setBattingStrikeRate(Double battingStrikeRate) {
        this.battingStrikeRate = battingStrikeRate;
    }

    @DynamoDBAttribute
    public Integer getNoOfHundreds() {
        return noOfHundreds;
    }

    public void setNoOfHundreds(Integer noOfHundreds) {
        this.noOfHundreds = noOfHundreds;
    }

    @DynamoDBAttribute
    public Integer getNoOfFifties() {
        return noOfFifties;
    }

    public void setNoOfFifties(Integer noOfFifties) {
        this.noOfFifties = noOfFifties;
    }

    @DynamoDBAttribute
    public Integer getNoOfFours() {
        return noOfFours;
    }

    public void setNoOfFours(Integer noOfFours) {
        this.noOfFours = noOfFours;
    }

    @DynamoDBAttribute
    public Integer getNoOfSixes() {
        return noOfSixes;
    }

    public void setNoOfSixes(Integer noOfSixes) {
        this.noOfSixes = noOfSixes;
    }

    @DynamoDBAttribute
    public Integer getNoOfCatches() {
        return noOfCatches;
    }

    public void setNoOfCatches(Integer noOfCatches) {
        this.noOfCatches = noOfCatches;
    }

    @DynamoDBAttribute
    public Integer getNoOfStumpings() {
        return noOfStumpings;
    }

    public void setNoOfStumpings(Integer noOfStumpings) {
        this.noOfStumpings = noOfStumpings;
    }

    @DynamoDBAttribute
    public Integer getBowlingInningsPlayed() {
        return bowlingInningsPlayed;
    }

    public void setBowlingInningsPlayed(Integer bowlingInningsPlayed) {
        this.bowlingInningsPlayed = bowlingInningsPlayed;
    }

    @DynamoDBAttribute
    public Integer getBallsBowled() {
        return ballsBowled;
    }

    public void setBallsBowled(Integer ballsBowled) {
        this.ballsBowled = ballsBowled;
    }

    @DynamoDBAttribute
    public Integer getRunsConceded() {
        return runsConceded;
    }

    public void setRunsConceded(Integer runsConceded) {
        this.runsConceded = runsConceded;
    }

    @DynamoDBAttribute
    public Integer getNoOfWickets() {
        return noOfWickets;
    }

    public void setNoOfWickets(Integer noOfWickets) {
        this.noOfWickets = noOfWickets;
    }

    @DynamoDBAttribute
    public String getBestBowlingFigures() {
        return bestBowlingFigures;
    }

    public void setBestBowlingFigures(String bestBowlingFigures) {
        this.bestBowlingFigures = bestBowlingFigures;
    }

    @DynamoDBAttribute
    public Double getBowlingEconomy() {
        return bowlingEconomy;
    }

    public void setBowlingEconomy(Double bowlingEconomy) {
        this.bowlingEconomy = bowlingEconomy;
    }

    @DynamoDBAttribute
    public String getBowlingStrikeRate() {
        return bowlingStrikeRate;
    }

    public void setBowlingStrikeRate(String bowlingStrikeRate) {
        this.bowlingStrikeRate = bowlingStrikeRate;
    }

    @DynamoDBAttribute
    public Integer getNoOfFourWickets() {
        return noOfFourWickets;
    }

    public void setNoOfFourWickets(Integer noOfFourWickets) {
        this.noOfFourWickets = noOfFourWickets;
    }

    @DynamoDBAttribute
    public Integer getNoOfFiveWickets() {
        return noOfFiveWickets;
    }

    public void setNoOfFiveWickets(Integer noOfFiveWickets) {
        this.noOfFiveWickets = noOfFiveWickets;
    }

    @DynamoDBAutoGeneratedTimestamp(strategy = DynamoDBAutoGenerateStrategy.CREATE)
    public Date getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Date createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    @DynamoDBAutoGeneratedTimestamp(strategy = DynamoDBAutoGenerateStrategy.ALWAYS)
    public Date getLastModifiedDateTime() {
        return lastModifiedDateTime;
    }

    public void setLastModifiedDateTime(Date lastModifiedDateTime) {
        this.lastModifiedDateTime = lastModifiedDateTime;
    }


    @DynamoDBAttribute
    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    @DynamoDBAttribute
    public Double getBowlingAverage() {
        return bowlingAverage;
    }

    public void setBowlingAverage(Double bowlingAverage) {
        this.bowlingAverage = bowlingAverage;
    }

    @DynamoDBAttribute
    public String getPlayerRace() {
        return playerRace;
    }

    public void setPlayerRace(String playerRace) {
        this.playerRace = playerRace;
    }

    @DynamoDBAttribute
    public Long getSoldPrice() {
        return soldPrice;
    }

    public void setSoldPrice(Long soldPrice) {
        this.soldPrice = soldPrice;
    }
}
