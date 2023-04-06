// eslint-disable-next-line
// @ts-nocheck
import { apiCore } from "@/lib/api";
import { Card, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import classNames from "classnames";
import style from '@/sass/styles/printInspection.module.scss'



const SquareCheck = ({ type = "success", checked = false }) => (
  <div className={classNames(style["square-check"],style[`bg-${type}`])}>
    <div className={checked ? style.checked : ''}></div>
  </div>
);

const TripleSquareCheck = ({
  first = { checked: false },
  second = { checked: false },
  third = { checked: false },
}) => (
  <div className={style["tripe-square-check"]}>
    <SquareCheck checked={first.checked} />
    <SquareCheck type="warning" checked={second.checked} />
    <SquareCheck type="danger" checked={third.checked} />
  </div>
);


export function PrintInspection(props: { company?: any, id: number, type: string, checklistId: number }) {
// export function PrintInspection(props) {

    // const history = useNavigate();
    /*const { id, type, checklistId } = useParams();*/
    const [data, setData] = useState(null);
    const [vehicleService, setVehicleService] = useState(null);
    const [stages, setStages] = useState([]);
    const [evidences, setEvidences] = useState([]);
    const [checklistData, setChecklistData] = useState({});

    const api = new apiCore()
    const steps = {
        '1': 'Frente',
        '2': 'Lateral esquerda',
        '3': 'Lateral direita',
        '4': 'Traseira',
        '5': 'Teto',
    };
  
const getData = () => {
        console.log('/vehicle-service/' + props?.checklistId)
        if (props?.id) {
            let ajaxCall;

            switch (props?.type) {
                case 'service-schedules':
                    ajaxCall = api.get('/vehicle-service/' + props?.checklistId);
                    break;
            }
            ajaxCall.then(
                (response) => {
                    console.log(response);
                    switch (props?.type) {
                        case 'service-schedules':
                            let data;
                            const checklistData = {};
                            const {
                                brand,
                                client,
                                vehicle,
                                technical_consultant: technicalConsultant,
                                checklist_version: checklistVersion,
                                service_schedule: { client_vehicle: clientVehicle, ...serviceSchedule },
                                ...vehicleService
                            } = response.data.data;
                            data = {
                                brand,
                                client,
                                technicalConsultant,
                                vehicle,
                                serviceSchedule,
                                checklistVersion,
                                clientVehicle,
                            };

                            vehicleService.items.forEach((checklistItem) => {
                                if(checklistItem.code !== null){
                                    checklistData[checklistItem.code] = {
                                        id: checklistItem.id,
                                        value: checklistItem.pivot.value,
                                        evidence: checklistItem.pivot.evidence,
                                        observations: checklistItem.pivot.observations,
                                        type: checklistItem.validation.type,
                                    };
                                }
                            });

                            const stages = vehicleService.stages.filter((stage) => stage.pivot.processed);
                            stages.forEach((stage, index) => {
                                stages[index].evidences = [].concat(
                                    ...stage.items.map((checklistItem) =>
                                        (checklistData[checklistItem.code]?.evidence || []).map((evidence) => {
                                            return {
                                                evidence,
                                                name: checklistItem.name,
                                                observations: checklistData[checklistItem.code].observations,
                                            };
                                        })
                                    )
                                );
                            });

                            setVehicleService(vehicleService);
                            setStages(stages);
                            setChecklistData(checklistData);
                            setData(data);
                            break;
                        default:
                            setData(response.data.data);
                            break;
                    }
                },
                (error) => {
                    setData(null);
                }
            );
        } else {
            setData(null);
        }
    };
 
    useEffect(() => {
        if(props?.checklistId){
            getData();
        }
    }, [props?.checklistId]);
  
  
 return (
     <div className={classNames(style.page)} >
      <header>
             <div className={style.row}>
                 <div className={classNames(style["col-40"], style["d-flex"], style["align-items-center"])}>
            <img src="/images/toyota.png" alt="Toyota Logotype" />
          </div>
          <div>
            <h3>
              FOLHA DE INSPEÇÃO - CONDIÇÕES DE ENTRADA E SAÍDA DO VEÍCULO -
              SEDAN
            </h3>
          </div>
        </div>
            <div className={classNames(style.row, style["red-tag"]) }>
                <div className={classNames(style.col, style["text-white"])}>
            <b>Sorocaba</b> • Av. Dom Aguirre, 2001 • Sta. Rosalia • CEP:
            18090-002 • (15) 3224-5444 <br />
            <b>Itapetininga</b> • Rod. Raposo Tavares, Km 164.100 • Vila Nova
            Itapetininga • CEP: 18203-340 • (15) 3472-1130
            <br />
            <b>Tatui</b> • Rua XI deAgosto,2621 • Jardim Lucila • CEP:18277-000
            • (15)3451-1777 <br />
            <b>Itapeva</b> • Av. Paulina de Morais, 777 • Central Park • CEP:
            18407-110 • (15) 3524-4848
        </div>
            <div className={style["col-35"]}>Toyota Ramires</div>
        </div>
      </header >
      <div className={style["container-fluid"]}>
             <div className={classNames(style.row,style["my-2"],style["text-center"],style["fw-500"])}>
          <div className={style.col}>
           <div className={classNames(style["bg-success"],style["p-2"], style["round-2"])}>OK/SUBSTITUÍDO</div>
          </div>
          <div className={classNames(style.col, style["px-2"])}>
            <div className={classNames(style["bg-warning"],  style["p-2"], style["round-2"])}>
              REQUER TROCA/REPARO FUTURO{" "}
            </div>
          </div>
          <div className={style.col}>
            <div className={classNames(style["bg-danger"],  style["p-2"], style["round-2"])}>
              REQUER TROCA/REPARO IMEDIATO
            </div>
          </div>
        </div>

        <div className={classNames(style.row, style["mb-1"])}>
         <div className={classNames(style['col-5'])} style={{ alignSelf: 'start'}}>
            <div className={classNames(style["form-slot"], style["me-2"])}>
              <label>Cliente:</label>
            </div>
            <div className={classNames(style.row, style["mt-1"] ,style["les-tres"])}>
              <div className={style.col}>
                <div className={classNames(style["form-slot"], style.placa)}>
                  <label>Placa:</label>
                </div>
                <div className={style["blue-slots"]}>
                  <div>Cliente acompanha inspeção?</div>
                  <div>Fixação tapete genuíno</div>
                  <div>Macaco</div>
                  <div>Triângulo</div>
                  <div>Chave de roda</div>
                  <div>Estepe</div>
                  <div>
                    Documento e<br />
                    Livrete de garantia
                  </div>
                  <div>Combustível</div>
                  <div>Quilometragem</div>
                  <div className={classNames(style["bg-secondary"], style["text-black"], style["text-center"], style["fw-700"], style["py-1"])}>
                    Condição
                    <br />
                    de limpeza
                  </div>
                  <div className={classNames(style["bg-secondary"], style["text-black"], style["text-center"],style["fw-700"], style["py-1"])}>
                    Assinatura
                    <br />
                    Consultor
                  </div>
                </div>
              </div>
             <div className={classNames(style.col, style["px-2"])}>
                <div>
                 <div className={style["icon-header"]}>
                   <span className={style["text-center"]}>Recepção</span>
                    <div className={style.icon}>icon</div>
                  </div>
                  <div className={classNames(style["row"], style["text-center"], style["pt-1"], style["fw-700"], style.small)}>
                   <div className={classNames(style["col"], style["round-2"], style["b-1"], style["mx-5"])}>Sim</div>
                    <div className={classNames(style["col"], style["round-2"], style["b-1"], style["mx-5"])}>Não</div>
                  </div>
                </div>
               <div className={classNames(style["row"], style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
               <div className={classNames(style["row"], style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={classNames(style["row"], style["two-checkboxes"])}>
                  <div className={style.checked}></div>
                  <div></div>
                </div>
                <div className={classNames(style["row"], style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={classNames(style["row"], style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={classNames(style["row"], style["two-checkboxes"])}>
                  <div></div>
                  <div className={style.checked}></div>
                </div>
                <div className={classNames(style["row"], style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={style["blue-slots"]}>
                  <div></div>
                  <div>
                   <div className={style["form-slot"]}></div>
                  </div>
                </div>

               <div className={classNames(style["row"], style["three-checkboxes"])}>
                  <div></div> Boa
                  <div></div> Regular
                  <div></div> Ruim
                </div>
                <div className={style["form-slot"]}></div>
              </div>
              <div className={classNames(style.col, style["px-2"])}>
                <div>
                  <div className={style["icon-header"]}>
                   <span className={style["text-center"]}>Entrega</span>
                   <div className={style["icon"]}>icon</div>
                  </div>
                  <div className={classNames(style.row, style["text-center"],style["pt-1"],style["fw-700"], style.small)}>
                  <div className={classNames(style.col, style["round-2"], style["round-2"], style["b-1"], style["mx-5"])}
                    >Sim</div>
                    <div className={classNames(style.col, style["round-2"], style["round-2"], style["b-1"], style["mx-5"])}>Não</div>
                  </div>
                </div>
               <div className={classNames(style.row, style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={classNames(style.row, style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={classNames(style.row, style["two-checkboxes"])}>
                  <div className={style.checked}></div>
                  <div></div>
                </div>
                <div className={classNames(style.row, style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={classNames(style.row, style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={classNames(style.row, style["two-checkboxes"])}>
                  <div></div>
                  <div className={style.checked}></div>
                </div>
                <div className={classNames(style.row, style["two-checkboxes"])}>
                  <div></div>
                  <div></div>
                </div>
                <div className={style["blue-slots"]}>
                  <div></div>
                  <div>
                   <div className={style["form-slot"]}></div>
                  </div>
                </div>

               <div className={classNames(style.row, style["three-checkboxes"])}>
                  <div></div> Boa
                  <div></div> Regular
                  <div></div> Ruim
                </div>
                <div className={style["form-slot"]}></div>
              </div>
            </div>
          </div>
          <div className={style["col-7"]}>
           <div className={classNames(style["border-wrapper"], style["p-1"])}>
              <div className={style.row}>
                <div className={classNames(style["col-7"], style["pe-1"])}>
                  <figure className={classNames(style.figure,style["mb-10"])}>
                    <img src="/images/carrinho.jpg" alt="" />
                  </figure>
                 <table className={classNames(style["table-head"], style["border-1"],style["my-2"],style["cell-h-sm"])}>
                    <thead>
                      <tr >
                        <th>A=Amassado</th>
                        <th>R=Riscado</th>
                        <th>X=Quebrado</th>
                        <th>F=Faltante</th>
                      </tr>
                    </thead>
                  </table>
                 <table className={classNames(style["bordered"], style["table-head"],style["cell-h-sm"])}>
                    <thead>
                      <tr className={style.tr}>
                        <th>Pneu</th>
                        <th width="30%">Marca</th>
                        <th>Sulco encontrado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dianteiro Esquerdo</td>
                        <td></td>
                        <td className={style["text-end"]}>
                          ______(mm) <TripleSquareCheck />
                        </td>
                      </tr>
                      <tr>
                        <td>Traseiro Esquerdo</td>
                        <td></td>
                        <td className={style["text-end"]}>
                          ______(mm) <TripleSquareCheck />
                        </td>
                      </tr>
                      <tr>
                        <td>Dianteiro Direito</td>
                        <td></td>
                        <td className={style["text-end"]}>
                          ______(mm) <TripleSquareCheck />
                        </td>
                      </tr>
                      <tr>
                        <td>Dianteiro Direito</td>
                        <td></td>
                        <td className={style["text-end"]}>
                          ______(mm) <TripleSquareCheck />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={style["col-5"]}>
                 <table className={classNames(style["bordered"], style["table-head"],style["cell-h-sm"])}>
                    <thead>
                      <tr>
                        <th>ltens Adicionais</th>
                        <th>Sim</th>
                        <th>Não</th>
                        <th>Avaria</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr >
                        <td>Tapete genuíno Toyota</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Kit Multimídia / Sistema de áudio</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Far6is de Neblina</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Friso Lateral</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Bandeja de porta-malas</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Sensor de estacionamento</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Macaneta cromada</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Soleira</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Aplique cromado</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Calha de chuva</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>{`Roda 16"`}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Alto-falante dianteiro</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Porca antifurto da roda</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Radio 2 DIN com Bluetooh</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      {/* <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={style.row}>
               <div className={classNames(style.col,style["p-1"], style["lh-150"])}>
                  <div>
                    Pintura/Carroçaria: <hr className={style["bottom-line"]} />
                  </div>
                  <div>
                    Para-brisa: <hr className={style["bottom-line"]} />
                  </div>
                  <div>
                    Assinatura Estofamento: <hr className={style["bottom-line"]} />
                  </div>
                  <div style={{marginBottom: "-8px"}}>
                    Cliente deseja trocar o veículo?
                   <hr className={style["bottom-line"]} style={{paddingBottom: "-10px"}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* seção */}
       <div className={classNames(style["row"], style["equal-form-slots"],style["h-12mm"])}>
          <div className={style["col-6"]}>
           <div className={classNames(style["form-slot"], style["me-1"])}>
              <p className={style["mb-1"]}>
                Veículo oriundo de guincho/plataforma: ( &nbsp; ) Sim &nbsp; (
                &nbsp; ) Nao
              </p>
              Pertences pessoais:
              <br /> ( &nbsp; ) Cliente retira &nbsp; ( &nbsp; ) Recolher e
              guardar &nbsp; ( &nbsp; ) No veículo
            </div>
          </div>
          <div className={style["col-6"]} >
            <div className={style["form-slot"]} style={{maxHeight:'100%', paddingBottom: '14px'}}>
             <label>Observações:</label>
             <br />
             <br />
             <br />
            </div>
          </div>
        </div>
       <div className={classNames(style.row, style["smallest-gutters"])}>
         <div className={classNames(style["col-6"], style["text-center"])}>
           <div className={classNames(style["form-slot"], style["p-2"], style["me-1"])}>
             <div className={classNames(style["text-justify"], style["ls-05"])}>
                Declaro ter deixado o veículo nas condições informadas nesta
                folha de inspeção.
              </div>
              <p className={style["my-5"]}>
                Data: ____ / ____ /________ &nbsp; Hora: ____ : ____
              </p>
             <span className={classNames(style.signature, style["px-4"], style.small)}>
                <div>
                  <hr />
                </div>
                Assinatura do Cliente ou por ele autorizada
              </span>
            </div>
          </div>
         <div className={classNames(style["col-6"], style["text-center"])}>
           <div className={classNames(style["form-slot"], style["p-2"])} style={{ height: "100%" }}>
              <div className={classNames(style["text-justify"], style["ls-05"])}>
                Declaro ter retirado o veículo nas condições informadas nesta
                folha de inspeção.
              </div>
              <p className={style["my-5"]}>
                Data: ____ / ____ /________ &nbsp; Hora: ____ : ____
              </p>
              <span className={classNames(style.signature, style["px-4"], style.small)}>
                <div>
                  <hr />
                </div>
                Assinatura do Cliente ou por ele autorizada
              </span>
            </div>
          </div>
        </div>

        {/* seção */}
       <div className={classNames(style["icon-header"], style["p-1"],style["text-white"],style["mt-1"])}>
          <div className={style.row}>
            <div className={style["col-auto"]}>TIPO DE SERVIÇO</div>
            <div className={style["col-auto"]}>Revisão</div>
          </div>
        </div>
       <div className={classNames(style.row, style["align-items-start"],style["ls-05"])}>
         <div className={classNames(style["col-4"], style["pe-1"])}>
           <div className={classNames(style["icon-header"], style["my-1"])}>
              <span>PARTE INTERNA</span>
              <div className={style.icon}>icon</div>
            </div>
           <table className={classNames(style.table, style.checks)}>
              <tbody>
                <tr>
                  <td width={5}>
                    <TripleSquareCheck />
                  </td>
                  <td>Relogio e computador de bordo</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck third={{ checked: true }} />
                  </td>
                  <td>Luzes do painel e de cortesia •</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Lavadores e limpadores</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck second={{ checked: true }} />
                  </td>
                  <td>Ventilador / Desembacadores</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Retrovisor e para-sois</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Buzina</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck third={{ checked: true }} />
                  </td>
                  <td>Volante e coluna de direção</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Ar-condicionado •</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Radio / Multimidia •</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Bancos e cintos de seguranca</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Vidros e trava eletrica</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck second={{ checked: true }} />
                  </td>
                  <td>Freios de estacionamento</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Pedal de freio</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Filtro de ar-condicionado</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck third={{ checked: true }} />
                  </td>
                  <td>Alavanca de mudanca de marcha</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>
                    Medidor de combustivel - substituicao a cada 72 meses (motor
                    flex)
                  </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>
                    Filtro de succao da bomba de combustivel -limpeza a cada 36
                    meses (Corolla)
                  </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>
                    Filtro de succao da bomba de combustivel - substituicao a
                    cada 60.000 km ou 72 meses (Etios)
                  </td>
                </tr>
              </tbody>
            </table>
           <div 
             className={classNames(style["icon-header"], style["my-2"])}>
              <span>PARTE EXTERNA</span>
              <div className={style["icon"]}>icon</div>
            </div>
            <table className="table checks">
              <tbody>
                <tr>
                  <td width={5}>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Iluminação dianteira e traseira •</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck second={{ checked: true }} />
                  </td>
                  <td>Tampa do tanque de combustível</td>
                </tr>
              </tbody>
            </table>
          </div>
         <div className={classNames(style["col-4"], style["px-2"])}>
           
           <div className={classNames(style["icon-header"], style["mb-1"],  style["mt-1"])}>
              <span>COM O CAPÔ ABERTO</span>
              <div className={style.icon}>icon</div>
            </div>
            <table className={classNames(style.table, style.checks)}>
              <tbody>
                <tr>
                  <td width={5}>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>
                    Vazamentos de óleo, água, combustível
                    <br />
                    e/ou outros fluídos
                  </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck second={{ checked: true }} />
                  </td>
                  <td>Correias de acionamento</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck second={{ checked: true }} />
                  </td>
                  <td>
                    Velas de ignição (veículos flex - a cada 1 O revisões)
                  </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck second={{ checked: true }} />
                  </td>
                  <td>Condicões da bateria</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>
                    Tensão da bateria. Encontrado:{" "}
                   <span className={classNames(style["mx-10"], style["px-5"])}></span>V •
                  </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Filtro de ar</td>
                </tr>
              </tbody>
            </table>
           <div
             className={classNames(style["icon-header"], style["my-1"])}>
              <span>FLUÍDOS</span>
              <div className={style.icon}>icon</div>
            </div>
            <table className={classNames(style.table, style.checks)}>
              <tbody>
                <tr>
                  <td width={5}>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Óleo do motor • </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck second={{ checked: true }} />
                  </td>
                  <td>Fluído do lavador de para-brisa • </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Fluído do sistema de arrefecimento do motor </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Fluído de freio e embreagem</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>
                    Fluído de transmissão automática
                    <br />
                    <span className={style.smallest}>
                      (se equipado com vareta de inspeção)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Óleo da transmissão manual</td>
                </tr>
              </tbody>
            </table>
           <div className={classNames(style["icon-header"], style["my-1"])}>
              <span>EMBAIXO DO VEÍCULO</span>
              <div className={style.icon}>icon</div>
            </div>
           <table className={classNames(style.table, style.checks)}>
              <tbody>
                <tr>
                  <td width={5}>
                    <TripleSquareCheck first={{ checked: true }} />
                  </td>
                  <td>Caixa de direção e barra de direção</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck second={{ checked: true }} />
                  </td>
                  <td>Cânister de carvão ativado (se aplicavel)</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td className={style.smallest}>
                    Vazamentos de óleo, água, combustivel e/ou outros fluidos
                  </td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Escapamento</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Coifas das semi-árvores</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Filtro de óleo</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Filtro de combustivel</td>
                </tr>
                <tr>
                  <td>
                    <TripleSquareCheck />
                  </td>
                  <td>Juntas esféricas da suspensão e guarda-pó</td>
                </tr>
              </tbody>
            </table>
          </div>
         <div className={classNames(style["col-4"], style["ps-1"])}>
           <div className={classNames(style["icon-header"], style["my-1"])}>
              <span>CALIBRAGEM DOS PNEUS •</span>
              <div className={style.icon}>icon</div>
            </div>

           <table className={classNames(style["table"], style["checks"])}>
              <thead>
                <tr>
                  <th></th>
                  <th className={style["text-center"]}>CALIBRADO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width={105}>DIANTEIRO ESQUERDO:</td>
                  <td className={classNames(style["text-end"], style["py-2"])}>psi</td>
                </tr>
                <tr>
                  <td width={105}>DIANTEIRO DIREITO:</td>
                 <td className={classNames(style["text-end"], style["py-2"])}>psi</td>
                </tr>
                <tr>
                  <td width={105}>TRASEIRO ESQUERDO:</td>
                  <td className={classNames(style["text-end"], style["py-2"])}>psi</td>
                </tr>
                <tr>
                  <td width={105}>TRASEIRO DIREITO:</td>
                  <td className={classNames(style["text-end"], style["py-2"])}>psi</td>
                </tr>
              </tbody>
            </table>
           <div className={classNames(style["icon-header"], style["mb-1"])}>
              <span>FREIOS •</span>
              <div className={style.icon}>icon</div>
            </div>
           <table className={classNames(style.table, style.checks, style["last-checks"])}>
              <thead>
                <tr>
                  <th></th>
                  <th className={style["text-end"]}>ENCONTRADO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style["text-center"]} width={40} rowSpan={5}>
                    icon
                    <br />
                    PASTILHAS
                  </td>
                </tr>
                <tr>
                  <td>DIANT. ESQUERDA:</td>
                  <td width={5}>mm</td>
                  <td width={5}>
                    <TripleSquareCheck />
                  </td>
                </tr>
                <tr>
                  <td>DIANT. DIREITA:</td>
                  <td>mm</td>
                  <td>
                    <TripleSquareCheck />
                  </td>
                </tr>
                <tr>
                  <td>
                    TRAS. ESQUERDA:
                    <br />
                    <span className={style.smallest}>(se aplicável)</span>
                  </td>
                  <td>mm</td>
                  <td>
                    <TripleSquareCheck />
                  </td>
                </tr>
                <tr>
                  <td>
                    TRAS. DIREITA:
                    <br />
                    <span className={style.smallest}>(se aplicável)</span>
                  </td>
                  <td>mm</td>
                  <td>
                    <TripleSquareCheck />
                  </td>
                </tr>
              </tbody>
            </table>
           <table className={classNames(style.table,style.checks, style["last-checks"])}>
              <thead>
                <tr>
                  <th></th>
                  <th className={style["text-end"]}>ENCONTRADO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style["text-center"]} width={40} rowSpan={5}>
                    icon
                    <br />
                    DISCOS
                  </td>
                </tr>
                <tr>
                  <td>DIANT. ESQUERDO:</td>
                  <td width={5}>mm</td>
                  <td width={5}>
                    <TripleSquareCheck />
                  </td>
                </tr>
                <tr>
                  <td>DIANT. DIREITO:</td>
                  <td>mm</td>
                  <td>
                    <TripleSquareCheck />
                  </td>
                </tr>
                <tr>
                  <td>
                    TRAS. ESQUERDO:
                    <br />
                    <span className={style.smallest}>(se aplicável)</span>
                  </td>
                  <td>mm</td>
                  <td>
                    <TripleSquareCheck />
                  </td>
                </tr>
                <tr>
                  <td>
                    TRAS. DIREITO:
                    <br />
                    <span className={style.smallest}>(se aplicável)</span>
                  </td>
                  <td>mm</td>
                  <td>
                    <TripleSquareCheck />
                  </td>
                </tr>
              </tbody>
            </table>
           <table className={classNames(style.table, style.checks, style["last-checks"])}>
              <thead>
                <tr>
                  <th></th>
                  <th className={style["text-end"]}>ENCONTRADO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style["text-center"]} width={40} rowSpan={3}>
                    icon
                    <br />
                    LONAS
                  </td>
                </tr>
                <tr>
                  <td>
                    TRAS. ESQUERDO:
                    <br />
                    <span className={style.smallest}>(se aplicável)</span>
                  </td>
                  <td width={5}>mm</td>
                  <td width={5}>
                    <TripleSquareCheck />
                  </td>
                </tr>
                <tr>
                  <td>
                    TRAS. DIREITO:
                    <br />
                    <span className={style.smallest}>(se aplicável)</span>
                  </td>
                  <td>mm</td>
                  <td>
                    <TripleSquareCheck />
                  </td>
                </tr>
              </tbody>
            </table>
           <table className={classNames(style.table, style.checks, style["last-checks"])}>
              <tbody>
                <tr>
                  <td className={style["text-center"]} width={40} rowSpan={3}>
                    icon
                    <br />
                    TAMBORES
                  </td>
                </tr>
                <tr>
                  <td>
                    TRAS. ESQUERDO:
                    <br />
                    <span className={style.smallest}>(se aplicável)</span>
                  </td>
                  <td width={5}>mm</td>
                  <td width={5}>
                    <TripleSquareCheck />
                  </td>
                </tr>
                <tr>
                  <td>
                    TRAS. DIREITO:
                    <br />
                    <span className={style.smallest}>(se aplicável)</span>
                  </td>
                  <td>mm</td>
                  <td>
                    <TripleSquareCheck />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}