package nlu.project.backend.controller;

import nlu.project.backend.business.SampleBusiness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo")
public class SampleController {

    @Autowired
    private SampleBusiness sampleBusiness;

    @GetMapping("/exception")
    public void getException() {
        sampleBusiness.getException();
    }

    @GetMapping("/save-entity")
    public String saveEntity() {
        sampleBusiness.saveEntityDemo();
        return "saved";
    }

    @GetMapping("/auth/test")
    public String testInterceptor() {
        return "failure!";
    }
}
