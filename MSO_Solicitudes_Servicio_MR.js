/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 *
 *
 *Autor: Miguel Rodriguez
 *Prueba Técnica NetSuite - SuiteScript: "Music Store Online"
 *Date: 15/01/2025
 */

define(['N/search', 'N/record'], function(search, record) {

  const _Principiante = 1
  const _Intermedio   = 2
  const _Avanzado     = 3
  const _Profesional  = 4

    function getInputData() {
        return search.create({
          type: search.Type.CUSTOMER,
          filters:
            [],
          columns:
            []
          })
    }

    function map(context) {
      try {
        var newCustomerType = _Principiante

        const data = getData(context.key)

        if(data.professionalItem && data.total > 5000)
          newCustomerType = _Profesional
        else if(data.item && (data.total >= 1000 && data.total <= 5000))
          newCustomerType = _Avanzado
        else if(data.item && data.total < 1000)
          newCustomerType = _Intermedio
        else
          newCustomerType = _Principiante

        record.submitFields({
            type: record.Type.CUSTOMER,
            id: context.key,
            values: {
              custentity_tipo_cliente: newCustomerType
              },
            options: {
              enableSourcing: false,
              ignoreMandatoryFields : true
              }
            })
      } catch (error) {
        log.error('MAP Error', error)
      }
    }

    function getData(customerId) {
      var data = {total: 0, professionalItem: false, item: false}
      try {
        search.create({
          type: 'transaction',
          settings:[{'name':'consolidationtype', 'value':'ACCTTYPE'}, {'name':'includeperiodendtransactions', 'value':'F'}],
          filters:
            [
              ['type', 'anyof', 'CuTrSale104'],
              'AND',
              ['name', 'anyof', customerId],
              'AND',
              ['mainline', 'is', 'F'],
              'AND',
              ['fxamount', 'greaterthan', '0.00']
              ],
          columns:
            [
              search.createColumn({name: 'fxamount', label: 'Amount (Foreign Currency)'}),
              search.createColumn({name: 'custitem_es_instrumento', join: 'item'})
              ]
        }).run().each(function(result){
          const total = Number(result.getValue({name: 'fxamount'}))
          const instrumento = result.getValue({name: 'custitem_es_instrumento', join: 'item'})

          data.total += total
          switch(instrumento) {
            case '1': //Instrumento
              data.item = true
              break
            case '2': //Profesional
              data.professionalItem = true
              break
          }
          return true
        })
      } catch (error) {
        log.error('getData Error', error)
      }
      return data
    }

    return {
        getInputData: getInputData,
        map: map
    };
}); 

            