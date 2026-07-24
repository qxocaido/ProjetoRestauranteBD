package com.IFPB.restaurante.controller;

import com.IFPB.restaurante.business.FornecedorService;
import com.IFPB.restaurante.infrastructure.entitys.Fornecedor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedor")
@RequiredArgsConstructor
public class FornecedorController {

    private final FornecedorService fornecedorService;

    @PostMapping
    public ResponseEntity<Void> salvarFornecedor(@RequestBody Fornecedor fornecedor){
        fornecedorService.salvarFornecedor(fornecedor);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // GET /fornecedor -> Retorna a LISTA de fornecedores
    @GetMapping
    public ResponseEntity<List<Fornecedor>> listarFornecedores(){
        return ResponseEntity.ok(fornecedorService.listarFornecedores());
    }

    // GET /fornecedor/cnpj/12345678 -> Busca fornecedor ESPECÍFICO
    @GetMapping("/cnpj/{cnpj}")
    public ResponseEntity<Fornecedor> buscarUsuarioPorCnpj(@PathVariable Integer cnpj){
        return ResponseEntity.ok(fornecedorService.buscarFornecedorPorCnpj(cnpj));
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarFornecedorPorCnpj(@RequestParam Integer cnpj){
        fornecedorService.deletarFornecedorPorCnpj(cnpj);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<Void> atualizarFornecedorPorCnpj(@RequestParam Integer cnpj, @RequestBody Fornecedor fornecedor){
        fornecedorService.atualizarFornecedorPorCnpj(cnpj, fornecedor);
        return ResponseEntity.ok().build();
    }
}