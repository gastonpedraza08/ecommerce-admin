const objToExport = {
  caracteristias_generales: {
    name: 'Características generales',
    list: {
      marca: {
      	name: 'Marca'
      },
      línea: {
      	name: 'Línea'
      },
      modelo: {
      	name: 'Modelo'
      },
      color: {
      	name: 'Color'
      },
      origen: {
        origen: 'Origen'
      },
      versión: {
        name: 'Versión'
      },
      modelo_detallado: {
        name: 'Modelo Detallado'
      },
    }
  },
  especificaciones: {
    name: 'Especificaciones',
    list: {
      mes_de_lanzamiento: {
      	name: 'Mes de lanzamiento'
      },
      año_de_lanzamiento: {
      	name: 'Año de lanzamiento'
      },
    }
  },
  sistema_operativo: {
    name: 'Sistema operativo',
    list: {
      nombre_del_sistema_operativo: {
      	name: 'Nombre del sistema operativo'
      },
      versión_original_del_sistema_operativo: {
      	name: 'Versión original del sistema operativo'
      },
      capa_original_de_personalización_del_sistema_operativo: {
      	name: 'Capa original de personalización del sistema operativo'
      },
      última_versión_compatible_del_sistema_operativo: {
        name: 'últila versión compatible del sistema operativo'
      },
      edición_del_sistema_operativo: {
        name: 'edición del sistema operativo'
      },
      última_capa_compatible_de_personalización_del_sistema_operativo: {
        name: 'última capa compatible de personalización del sistema operativo'
      },
    }
  },
  camara: {
    name: 'Cámara',
    list: {
      resolución_de_la_cámara_trasera_principal: {
      	name: 'Resolución de la cámara trasera principal'
      },
      resolución_de_video_de_la_cámara_trasera: {
      	name: 'Resolución de video de la cámara trasera'
      },
      resolución_de_la_cámara_frontal_principal: {
      	name: 'Resolución de la cámara frontal principal'
      },
      con_cámara: {
      	name: 'Con cámara'
      },
      características_principales_de_las_cámaras: {
      	name: 'Características principales de las cámaras'
      },
      cantidad_de_cámaras_traseras: {
      	name: 'Cantidad de cámaras traseras'
      },
      resolución_de_las_cámaras_traseras: {
      	name: 'Resolución de las cámaras traseras'
      },
      apertura_del_diafragma_de_la_cámara_trasera: {
      	name: 'Apertura del diafragma de la cámara trasera'
      },
      cantidad_de_cámaras_frontales: {
      	name: 'Cantidad de cámaras frontales'
      },
      resolución_de_video_de_la_cámara_frontal: {
      	name: 'Resolución de video de la cámara frontal'
      },
      apertura_del_diafragma_de_la_cámara_frontal: {
      	name: 'Apertura del diafragma de la cámara frontal'
      },
      con_flash_en_la_cámara_frontal: {
      	name: 'Con flash en la cámara frontal'
      },
      zoom_digital: {
      	name: 'Zoom digital'
      },
      zoom_óptico: {
        name: 'Zoom óptico'
      },
      zoom_híbrido: {
        name: 'Zoom híbrido'
      },
      resolución_de_las_cámaras_frontales: {
        name: 'Resolución de las cámaras frontales'
      },
      tipos_de_cámaras_traseras: {
        name: 'Tipos de cámaras traseras'
      },
      tipos_de_cámaras_frontales: {
        name: 'Tipos de cámaras frontales'
      },
    }
  },
  seguridad: {
    name: 'Seguridad',
    list: {
      con_lector_de_huella_digital: {
      	name: 'Con lector de huella digital'
      },
      con_reconocimiento_facial: {
      	name: 'Con reconocimiento facial'
      },
      con_reconocimiento_de_iris: {
        name: 'Con reconocimiento de iris'
      },
      con_reconocimiento_de_mano: {
        name: 'Con reconocimiento de mano'
      },
    }
  },
  peso_y_dimensiones: {
    name: 'Peso y dimensiones',
    list: {
      peso: {
      	name: 'Peso'
      },
      altura_x_ancho_x_profundidad: {
      	name: 'Altura x Ancho x Profundidad'
      },
      altura_cerrado: {
        name: 'Altura cerrado'
      },
      ancho_cerrado: {
        name: 'Ancho cerrado'
      },
      profundidad_cerrado: {
        name: 'Profundidad cerrado'
      },
      altura_x_ancho: {
        name: 'Altura x Ancho'
      }, 
      profundidad: {
        name: 'Profundidad'
      },
      ancho: {
        name: 'Ancho'
      },
      altura: {
        name: 'Altura'
      },
    }
  },
  conectividad: {
    name: 'Conectividad',
    list: {
      red: {
      	name: 'Red'
      },
      tipo_de_conector_de_carga: {
      	name: 'Tipo de conector de carga'
      },
      con_conector_usb: {
      	name: 'Con conector USB'
      },
      con_jack_3_punto_5: {
      	name: 'Con jack 3.5'
      },
      con_wi_fi: {
      	name: 'Con Wi-Fi'
      },
      con_gps: {
      	name: 'Con GPS'
      },
      con_bluetooth: {
      	name: 'Con Bluetooth'
      },
      con_nfc: {
      	name: 'Con NFC'
      },
      con_radio: {
      	name: 'Con radio'
      },
      con_sintonizador_de_tv: {
      	name: 'Con sintonizador de TV'
      },
      con_mini_hdmi: {
        name: 'Con mini HDMI'
      },
    }
  },
  tarjeta_sim: {
    name: 'Tarjeta SIM',
    list: {
      es_dual_sim: {
      	name: 'Es Dual SIM'
      },
      cantidad_de_ranuras_para_tarjeta_sim: {
      	name: 'Cantidad de ranuras para tarjeta SIM'
      },
      tamaños_de_tarjeta_sim_compatibles: {
      	name: 'Tamaños de tarjeta SIM compatibles'
      },
      con_esim: {
        name: 'Con eSIM'
      },
      cantidad_de_esims: {
        name: 'Cantidad de eSIMs'
      }, 
    }
  },
  memoria: {
    name: 'Memoria',
    list: {
      memoria_interna: {
      	name: 'Memoria interna'
      },
      memoria_ram: {
      	name: 'Memoria RAM'
      },
      con_ranura_para_tarjeta_de_memoria: {
      	name: 'Con ranura para tarjeta de memoria'
      },
      tipos_de_tarjeta_de_memoria: {
      	name: 'Tipos de tarjeta de memoria'
      },
      capacidad_máxima_de_la_tarjeta_de_memoria: {
      	name: 'Capacidad máxima de la tarjeta de memoria'
      },
    }
  },
  pantalla: {
    name: 'Pantalla',
    list: {
      tamaño_de_la_pantalla: {
      	name: 'Tamaño de la pantalla'
      },
      tipo_de_resolución_de_la_pantalla_: {
      	name: 'Tipo de resolución de la pantalla '
      },
      resolución_de_la_pantalla: {
      	name: 'Resolución de la pantalla'
      },
      tecnología_de_la_pantalla: {
      	name: 'Tecnología de la pantalla'
      },
      tipo_de_pantalla: {
      	name: 'Tipo de pantalla'
      },
      relación_de_aspecto_de_la_pantalla: {
      	name: 'Relación de aspecto de la pantalla'
      },
      píxeles_por_pulgada_de_la_pantalla: {
      	name: 'Píxeles por pulgada de la pantalla'
      },
      frecuencia_de_actualización_de_la_pantalla: {
      	name: 'Frecuencia de actualización de la pantalla'
      },
      brillo_máximo_de_la_pantalla: {
      	name: 'Brillo máximo de la pantalla'
      },
      con_pantalla_táctil: {
      	name: 'Con pantalla táctil'
      },
      tamaño_de_la_pantalla_plegada: {
        name: 'Tamaño de la pantalla plegada'
      },
      resolución_de_la_pantalla_plegada: {
        name: 'Resolución de la pantalla plegada'
      },
      píxeles_por_pulgada_de_la_pantalla_plegada: {
        name: 'Píxeles por pulgada de la pantalla plegada'
      },
      brillo_máximo_de_la_pantalla_secundaria: {
        name: 'Brillo máximo de la pantalla secundaria'
      },
      relación_de_aspecto_de_la_pantalla_secundaria: {
        name: 'Relación de aspecto de la pantalla secundaria'
      },
      con_pantalla_plegable: {
        name: 'Con pantalla plegable'
      },
      tecnología_de_la_pantalla_secundaria: {
        name: 'Tecnología de la pantalla secundaria'
      },
      tamaño_de_la_pantalla_secundaria: {
        name: 'Tamaño de la pantalla secundaria'
      },
      resolución_de_la_pantalla_secundaria: {
        name: 'Resolución de la pantalla secundaria'
      },
      píxeles_por_pulgada_de_la_pantalla_secundaria: {
        name: 'Píxeles por pulgada de la pantalla secundaria'
      },
      con_pantalla_secundaria_táctil: {
        name: 'Con pantalla secundaria táctil'
      },
      frecuencia_de_actualización_de_la_pantalla_secundaria: {
        name: 'Frecuencia de actualización de la pantalla secundaria'
      },
    }
  },
  bateria: {
    name: 'Batería',
    list: {
      capacidad_de_la_batería: {
      	name: 'Capacidad de la batería'
      },
      tipo_de_batería: {
      	name: 'Tipo de batería'
      },
      con_carga_rápida: {
      	name: 'Con carga rápida'
      },
      con_carga_inalámbrica: {
      	name: 'Con carga inalámbrica'
      },
      con_batería_removible: {
      	name: 'Con batería removible'
      },
      tiempo_de_conversación: {
      	name: 'Tiempo de conversación'
      },
      duración_de_la_batería_en_espera: {
        name: 'Duración de la batería en espera'
      },
    }
  },
  diseno_y_resistencia: {
    name: 'Diseño y resistencia',
    list: {
      con_teclado_qwerty_físico: {
      	name: 'Con teclado QWERTY físico'
      },
      es_a_prueba_de_agua: {
      	name: 'Es a prueba de agua'
      },
      es_resistente_al_agua: {
        name: 'Es resistente al agua'
      },
      es_resistente_al_polvo: {
        name: 'Es resistente al polvo'
      },
      clasificación_ip: {
        name: 'Clasificación IP'
      },
      es_resistente_a_caídas: {
        name: 'Es resistente a caídas'
      },
      es_resistente_a_salpicaduras: {
        name: 'Es resistente a salpicaduras'
      },
    }
  },
  procesador: {
    name: 'Procesador',
    list: {
      modelo_del_procesador: {
      	name: 'Modelo del procesador'
      },
      modelos_de_cpu: {
      	name: 'Modelos de CPU'
      },
      cantidad_de_núcleos_del_procesador: {
      	name: 'Cantidad de núcleos del procesador'
      },
      velocidad_del_procesador: {
      	name: 'Velocidad del procesador'
      },
      modelo_de_gpu: {
      	name: 'Modelo de GPU'
      },
      velocidad_del_gpu: {
        name: 'Velocidad del GPU'
      },
    }
  },
  sensores: {
    name: 'Sensores',
    list: {
      con_acelerómetro: {
      	name: 'Con acelerómetro'
      },
      con_sensor_de_proximidad: {
      	name: 'Con sensor de proximidad'
      },
      con_giroscopio: {
      	name: 'Con giroscopio'
      },
      con_brújula: {
      	name: 'Con brújula'
      },
      con_barómetro: {
        name: 'Con barómetro'
      }, 
      con_sensor_de_ritmo_cardíaco: {
        name: 'Con sensor de ritmo cardíaco'
      },
    }
  },
  otros: {
    name: 'Otros',
    list: {
      con_imei: {
      	name: 'Con IMEI'
      },
      compañía_telefónica: {
      	name: 'Compañía telefónica'
      },
      incluye_lápiz: {
      	name: 'Incluye lápiz'
      },   
      con_botón_sos: {
      	name: 'Con botón SOS'
      },
      es_kit: {
      	name: 'Es KIT'
      },
    }       
  },
}

export default objToExport;