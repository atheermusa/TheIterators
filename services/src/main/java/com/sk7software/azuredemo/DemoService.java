package com.sk7software.azuredemo;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoService {
    @GetMapping("/demo")
    public String getDemo() {
        return "Hello World";
    }

    @GetMapping("/name/{name}")
    public String getName(@PathVariable String name) {
        return "Hello " + name;
    }
}
