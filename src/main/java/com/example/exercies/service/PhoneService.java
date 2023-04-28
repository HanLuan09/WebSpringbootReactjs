package com.example.exercies.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.exercies.model.*;
import com.example.exercies.repository.PhoneRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Service
public class PhoneService {
	@Autowired
	private PhoneRepository repos;
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Phone> getPhone(){
		return repos.findAll();
	}
	
	public Optional<Phone> getOnePhone(int id) {
		return repos.findById(id);
	}
	
	public List<Phone> getPhoneSearch(String search) {
		TypedQuery<Phone> query = entityManager.createQuery("SELECT c FROM Phone c WHERE c.name LIKE :keyword OR c.brand LIKE :keyword", Phone.class);
		query.setParameter("keyword", "%" + search + "%");
		return query.getResultList();
	}
	
	public void updatePhone(Phone car) {
		repos.save(car);
	}
	
	public void deletePhone(int id) {
		repos.deleteById(id);
	}
	
	public boolean isNameExist(String name, int id) {
        return repos.existsByNameAndIdNot(name, id);
    }
}
