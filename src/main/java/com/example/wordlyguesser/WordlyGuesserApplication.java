package com.example.wordlyguesser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@SpringBootApplication
public class WordlyGuesserApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(WordlyGuesserApplication.class, args);
    }

}
