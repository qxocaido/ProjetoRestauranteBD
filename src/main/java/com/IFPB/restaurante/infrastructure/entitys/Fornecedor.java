package com.IFPB.restaurante.infrastructure.entitys;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "fornecedor")
@Entity

public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "telefone")
    private Integer telefone;

    @Column (name = "cnpj", unique = true)
    private Integer cnpj;

}