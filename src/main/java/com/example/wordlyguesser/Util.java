package com.example.wordlyguesser;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class Util {

    //маску писать через точки: apple - a..l.
    public List<String> find(String mask, String contains, String noContain) throws IOException {
        String m = "^" + mask;
        String file = "src/main/resources/words.txt";
        String content = new String(Files.readAllBytes(Paths.get(file)));
        return Arrays.stream(content.split("\n"))
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