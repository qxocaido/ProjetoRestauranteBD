package com.IFPB.restaurante.business;

import com.IFPB.restaurante.infrastructure.entitys.Fornecedor;
import com.IFPB.restaurante.infrastructure.entitys.Ingredientes;
import com.IFPB.restaurante.infrastructure.repository.FornecedorRepository;
import com.IFPB.restaurante.infrastructure.repository.IngredientesRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.lang.classfile.attribute.RuntimeInvisibleAnnotationsAttribute;
import java.util.List;
@Transactional

@Service
public class IngredientesService {
    private final IngredientesRepository repository;

    public IngredientesService(IngredientesRepository repository) {
        this.repository = repository;
    }

    public void salvarIngrediente(Ingredientes ingredientes){
        repository.saveAndFlush(ingredientes);
    }

    public Ingredientes buscarIngredientePorNome(String nome){
        return repository.findByNome(nome).orElseThrow(
                () -> new RuntimeException("Ingrediente não encontrado!")
        );
    }

    public void deletarIngredientePorNome(String nome){
        repository.deleteByNome(nome);
    }

    public void atualizarIngredientePorNome(String nome, Ingredientes ingredientes){
        Ingredientes ingredientesEntity = buscarIngredientePorNome(nome);
        Ingredientes ingredienteAtualizado = Ingredientes.builder()
                .id(ingredientesEntity.getId())
                .nome(ingredientes.getNome() != null ?
                        ingredientes.getNome() : ingredientesEntity.getNome())
                .fornecedor(ingredientes.getFornecedor() != null ?
                        ingredientes.getFornecedor() : ingredientesEntity.getFornecedor())
                .disponibilidade(ingredientes.getDisponibilidade() != null ?
                        ingredientes.getDisponibilidade() : ingredientesEntity.getDisponibilidade())
                .valor(ingredientes.getValor() != null ?
                        ingredientes.getValor() : ingredientesEntity.getValor())
                .build();
        repository.saveAndFlush(ingredienteAtualizado);
    }

    public List<Ingredientes> listarIngredientes(){
        return repository.findAll();
    }
}


