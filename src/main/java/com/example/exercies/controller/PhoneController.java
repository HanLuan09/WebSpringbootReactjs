package com.example.exercies.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exercies.exception.ResourceNotFoundException;
import com.example.exercies.model.*;
import com.example.exercies.service.PhoneService;

@CrossOrigin
@RestController
@RequestMapping("/phone")
public class PhoneController {
	@Autowired
	private PhoneService service;
	
	@GetMapping
	public List<Phone> getPhones(){
		List<Phone> list = service.getPhone();
		return list;
	}
	@GetMapping("{id}")
	public Phone getOnePhone(@PathVariable int id) {
		Phone car = service.getOnePhone(id).
				orElseThrow(() -> new ResourceNotFoundException("không tồn tại id :" + id));
		return car;
	}
	@GetMapping("/search/{search}")
	public List<Phone> getPhoneSearch (@PathVariable String search) {
		return service.getPhoneSearch(search);
	}
	@PostMapping()
	public void post(@RequestBody Phone phone) {
		if (service.isNameExist(phone.getName(), phone.getId())) {
            throw new ResourceNotFoundException("tên đã tồn tại trong csdl");
        }
		service.updatePhone(phone);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Phone> put(@RequestBody Phone phone, @PathVariable int id) {
		Phone carNew = service.getOnePhone(id).
				orElseThrow(() -> new ResourceNotFoundException("không tồn tại id :" + id));
		if (service.isNameExist(phone.getName(), id)) {
            throw new ResourceNotFoundException("tên đã tồn tại trong csdl");
        }
		carNew.setName(phone.getName());
		carNew.setBrand(phone.getBrand());
		carNew.setDate(phone.getDate());
		carNew.setSold(phone.isSold());
		
		service.updatePhone(carNew);
		return ResponseEntity.ok(carNew);
	}
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable int id) {
	    service.deletePhone(id);
	    return new ResponseEntity<>(HttpStatus.NO_CONTENT);// 204 
	}
}

