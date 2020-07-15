function merchantListItem(merchant, linkPrefix) {
  let name = merchant.attributes.name
  let href = linkPrefix + merchant.id
  let merchant_element = `
    <li><a href='${href}'>${name}</a></li>
  `
  return merchant_element
}

function merchantCard(merchant) {
  let name = merchant.attributes.name
  let card = `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Merchant: <a href='/merchants/${merchant.id}'>${name}</a></h4>
      </div>
    </div>
  `
  return card
}

function merchantHeader(merchant) {
  let name = merchant.attributes.name
  let merchant_element = `
    <h1><a href='/merchants/${merchant.id}'>${name}</a></h1>
  `
  return merchant_element
}

function loadItemMerchant(item_id, merchantContainer) {
  let uri = `/api/v1/items/${item_id}/merchant`
  loadResource(uri, function(merchant){
    card = merchantCard(merchant)
    merchantContainer.append(card)
  })
}

function merchantAdminHeader(merchant) {
  let name = merchant.attributes.name
  let merchant_element = `
    <h1>
      <a href='/admin/merchants/${merchant.id}'>${name}</a>

    </h1>
    <a href='/admin/merchants/${merchant.id}/edit'>edit</a>
    <a href='#' id='delete'>delete</a>
  `
  return merchant_element
}

function loadAllMerchants(container) {
  let uri = "/api/v1/merchants"
  loadMultipleResources(uri, function(merchant){
    merchant_element = merchantListItem(merchant, '/merchants/')
    container.append(merchant_element)
  })
}

function loadMerchant(merchant_id, container) {
  let uri = `/api/v1/merchants/${merchant_id}`
  loadResource(uri, function(merchant){
    merchant_element = merchantHeader(merchant, '/merchants/')
    container.append(merchant_element)
  })
}
function loadMerchantWithEdit(merchant_id, container) {
  let uri = `/api/v1/merchants/${merchant_id}`
  loadResource(uri, function(merchant){
    merchant_element = merchantAdminHeader(merchant, '/merchants/')
    container.append(merchant_element)
    $('#delete').click(function(event){
      event.preventDefault()
      deleteMerchant(merchant.id)
    })
  })
}

function deleteMerchant(merchant_id) {
  let uri = `/api/v1/merchants/${merchant_id}`
  destroyResource(uri, function(merchant){
    window.location = '/admin'
  })
}

function addMerchantCreateHandler(button, input) {
  button.click(function(event){
    event.preventDefault()
    name = input[0].value
    data = {
      name: name
    }
    uri = '/api/v1/merchants'
    createResource(uri, data, function(merchant){
      window.location = `/merchants/${merchant.id}`
    })
  })
}
