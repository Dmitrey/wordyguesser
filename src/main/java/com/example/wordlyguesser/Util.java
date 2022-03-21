package com.example.wordlyguesser;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class Util {

    private String[] dictionary;

    @PostConstruct
    public void loadDictionary() {
        String file = "src/main/resources/words.txt";
        try {
            String content = new String(Files.readAllBytes(Paths.get(file)));
            dictionary = content.split("\n");
            if (dictionary.length == 0){
                throw new RuntimeException("DICTIONARY IS EMPTY");
            }
        } catch (IOException | RuntimeException e) {
            e.printStackTrace();
        }
    }

    //маску писать через точки: apple - a..l.
    public List<String> find(String mask, String contains, String noContain) throws IOException {
        if (dictionary == null) {
            loadDictionary();
        }
        String m = "^" + mask;
        return Arrays.stream(dictionary)
                .map(String::toLowerCase)
                .filter(s -> s.matches(m) && eachContains(contains, s) && containsNo(noContain, s))
                .collect(Collectors.toList());
    }

    private boolean eachContains(String letters, String s) {
        if (letters.equals(""))
            return true;
        for (String letter : letters.split("")) {
            if (!s.contains(letter))
                return false;
        }
        return true;
    }

    private boolean containsNo(String letters, String s) {
        if (letters.equals(""))
            return true;
        for (String letter : letters.split("")) {
            if (s.contains(letter))
                return false;
        }
        return true;
    }
}