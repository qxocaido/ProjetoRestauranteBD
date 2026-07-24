package com.IFPB.restaurante.infrastructure.repository;

import com.IFPB.restaurante.infrastructure.entitys.Fornecedor;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Integer> {

   Optional<Fornecedor> findByCnpj(Integer cnpj);

   @Transactional
    void deleteByCnpj(Integer cnpj);
}
