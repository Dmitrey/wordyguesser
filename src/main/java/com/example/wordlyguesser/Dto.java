package com.example.wordlyguesser;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Dto {
    @JsonProperty("mask")
    private String mask;
    @JsonProperty("con")
    private String con;
    @JsonProperty("nocon")
    private String nocon;

    public String getMask() {
        return mask;
    }

    public void setMask(String mask) {
        this.mask = mask;
    }

    public String getCon() {
        return con;
    }

    public void setCon(String con) {
        this.con = con;
    }

    public String getNocon() {
        return nocon;
    }

    public void setNocon(String nocon) {
        this.nocon = nocon;
    }
}
