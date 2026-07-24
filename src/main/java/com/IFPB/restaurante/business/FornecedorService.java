package com.IFPB.restaurante.business;

import com.IFPB.restaurante.infrastructure.entitys.Fornecedor;
import com.IFPB.restaurante.infrastructure.repository.FornecedorRepository;
import org.springframework.stereotype.Service;

import java.lang.classfile.attribute.RuntimeInvisibleAnnotationsAttribute;
import java.util.List;

@Service
public class FornecedorService {
    private final FornecedorRepository repository;

    public FornecedorService(FornecedorRepository repository) {
        this.repository = repository;
    }

    public void salvarFornecedor(Fornecedor fornecedor){
        repository.saveAndFlush(fornecedor);
    }

    public Fornecedor buscarFornecedorPorCnpj(Integer cnpj){
        return repository.findByCnpj(cnpj).orElseThrow(
                () -> new RuntimeException("CNPJ não encontrado!")
        );
    }

    public void deletarFornecedorPorCnpj(Integer cnpj){
        repository.deleteByCnpj(cnpj);
    }

    public void atualizarFornecedorPorCnpj(Integer cnpj, Fornecedor fornecedor){
        Fornecedor fornecedorEntity = buscarFornecedorPorCnpj(cnpj);
        Fornecedor fornecedorAtualizado = Fornecedor.builder()
                .id(fornecedorEntity.getId())
                .cnpj(cnpj)
                .nome(fornecedor.getNome() != null ?
                        fornecedor.getNome() : fornecedorEntity.getNome())
                .telefone(fornecedor.getTelefone() != null ?
                        fornecedor.getTelefone() : fornecedorEntity.getTelefone())
                .build();
        repository.saveAndFlush(fornecedorAtualizado);
    }

    public List<Fornecedor> listarFornecedores(){
        return repository.findAll();
    }
}
