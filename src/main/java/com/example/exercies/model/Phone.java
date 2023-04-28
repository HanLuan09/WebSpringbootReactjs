package com.example.exercies.model;

import jakarta.persistence.*;
import java.sql.*;

@Entity
@Table(name = "Phone")
public class Phone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "date")
	private Date date;
	
	@Column(name = "brand")
	private String brand;
	
	@Column(name = "sold")
	private boolean sold;
	
	public Phone() {
		
	}

	public Phone(int id, String name, Date date, String brand, boolean sold) {
		super();
		this.id = id;
		this.name = name;
		this.date = date;
		this.brand = brand;
		this.sold = sold;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public boolean isSold() {
		return sold;
	}

	public void setSold(boolean sold) {
		this.sold = sold;
	}
	
}
