package com.iplauction.jcrud.model;

public class FieldingStats {
    private Integer catches;
    private Integer stumpings;
    private Integer runOuts;
    private Double fieldingPoints;


    public Integer getCatches() {
        return catches;
    }

    public void setCatches(Integer catches) {
        this.catches = catches;
    }

    public Integer getStumpings() {
        return stumpings;
    }

    public void setStumpings(Integer stumpings) {
        this.stumpings = stumpings;
    }

    public Integer getRunOuts() {
        return runOuts;
    }

    public void setRunOuts(Integer runOuts) {
        this.runOuts = runOuts;
    }

    public Double getFieldingPoints() {
        return fieldingPoints;
    }

    public void setFieldingPoints(Double fieldingPoints) {
        this.fieldingPoints = fieldingPoints;
    }
}
