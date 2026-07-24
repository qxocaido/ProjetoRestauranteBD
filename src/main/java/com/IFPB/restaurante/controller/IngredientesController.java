package com.IFPB.restaurante.controller;

import com.IFPB.restaurante.business.IngredientesService;
import com.IFPB.restaurante.infrastructure.entitys.Ingredientes;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Transactional
@RestController
@RequestMapping("/ingredientes")
@RequiredArgsConstructor
public class IngredientesController {
    private final IngredientesService ingredientesService;

    @PostMapping
    public ResponseEntity<Void> salvarIngrediente(@RequestBody Ingredientes ingredientes){
        ingredientesService.salvarIngrediente(ingredientes);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Ingredientes> buscarIngredientePorNome(@RequestParam String nome){
        return ResponseEntity.ok(ingredientesService.buscarIngredientePorNome(nome));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Ingredientes>> listarIngredientes(){

        return ResponseEntity.ok(
                ingredientesService.listarIngredientes()
        );

    }

    @DeleteMapping
    public ResponseEntity<Void> deletarIngredientePorNome(@RequestParam String nome){
        ingredientesService.deletarIngredientePorNome(nome);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> atualizarIngredientePorNome(@RequestParam String nome, @RequestBody Ingredientes ingredientes){

        ingredientesService.atualizarIngredientePorNome(nome, ingredientes);
        return ResponseEntity.ok().build();
    }

}
