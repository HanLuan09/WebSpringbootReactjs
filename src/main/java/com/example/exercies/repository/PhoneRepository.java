package com.example.exercies.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.exercies.model.*;

@Repository
public interface PhoneRepository extends JpaRepository<Phone, Integer> {
	boolean existsByNameAndIdNot(String name, int id);
}
