package com.IFPB.restaurante.infrastructure.repository;

import com.IFPB.restaurante.infrastructure.entitys.Ingredientes;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface IngredientesRepository extends JpaRepository<Ingredientes, Integer> {

    Optional<Ingredientes> findByNome(String nome);

    @Transactional
    @Modifying
    void deleteByNome(String nome);
}

