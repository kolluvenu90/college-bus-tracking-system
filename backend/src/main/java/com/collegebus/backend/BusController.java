package com.collegebus.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176"
})
public class BusController {

    @GetMapping("/BUS101")
    public String getBus() {
        return "{\"busNumber\":\"BUS101\","
                + "\"route\":\"College to City\","
                + "\"status\":\"Ready for tracking\","
                + "\"latitude\":17.3850,"
                + "\"longitude\":78.4867}";
    }
}
