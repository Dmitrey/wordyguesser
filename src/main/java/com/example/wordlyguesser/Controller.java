package com.example.wordlyguesser;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
public class Controller {

    private final Util util;

    public Controller(Util util) {
        this.util = util;
    }

    @PostMapping("/find")
    public List<String> find(@RequestBody(required = true) Dto dto) {
        try {
            return util.find(dto.getMask(), dto.getCon(), dto.getNocon());
        }catch (IOException e){
            System.err.println("ошибочка...");
            e.printStackTrace();
            throw new RuntimeException();
        }
    }

    @GetMapping("/bam")
    public void test(){
        System.out.println("BAM!");
    }

}
