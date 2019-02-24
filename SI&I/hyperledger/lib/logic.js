/**
 * Update requestor status of the contract function.
 * @param {org.hyperledger_composer.scms.UpdateReqContract} updateReqContract
 * @transaction
 */
async function updateReqContract(updateReqContract) {  
  //Update the value in the contract
  let contract = updateReqContract.contract;
  contract.requestorStatus = updateReqContract.newStatus;
  // Get the asset registry that stores the assets. Note that
  // getAssetRegistry() returns a promise, so we have to await for it.
  let assetRegistry = await getAssetRegistry('org.hyperledger_composer.scms.Contract');
  
  await assetRegistry.update(contract);
}

/**
 * Update respondor status of the contract function.
 * @param {org.hyperledger_composer.scms.UpdateRespContract} updateRespContract
 * @transaction
 */
async function updateRespContract(updateRespContract) {  
  //Update the value in the contract
  let contract = updateRespContract.contract;
  contract.respondorStatus = updateRespContract.newStatus;
  // Get the asset registry that stores the assets. Note that
  // getAssetRegistry() returns a promise, so we have to await for it.
  let assetRegistry = await getAssetRegistry('org.hyperledger_composer.scms.Contract');
  
  await assetRegistry.update(contract);
}

/**
 * Update respondor status of the contract function.
 * @param {org.hyperledger_composer.scms.terminatedContract} terminatedContract
 * @transaction
 */
async function terminatedContract(terminatedContract) {  
  //Update the value in the contract
  let contract = terminatedContract.contract;
  contract.isTerminated = 'Y';
  // Get the asset registry that stores the assets. Note that
  // getAssetRegistry() returns a promise, so we have to await for it.
  let assetRegistry = await getAssetRegistry('org.hyperledger_composer.scms.Contract');
  
  await assetRegistry.update(contract);
}

/**
 * Update available number of spare part to project site function.
 * @param {org.hyperledger_composer.scms.UpdateAvailNoOfSparePartToProjSite} updateAvailNoOfSparePartToProjSite
 * @transaction
 */
async function updateAvailNoOfSparePartToProjSite(updateAvailNoOfSparePartToProjSite) {  
  //Update the available number of spare part
  var serializer = getSerializer();
  //get sparePartToProjectSite by project site id and spare part id
  let results = await query('getSparePartToProjSiteByProjSiteAndSpartPart', {sparePartId: updateAvailNoOfSparePartToProjSite.sparePartId,                                                               ownerProjectSite:'resource:org.hyperledger_composer.scms.ProjectSite#'+updateAvailNoOfSparePartToProjSite.projectSite.id});

  var sparePartToProjectSite = serializer.fromJSON(results[0].$original);
  sparePartToProjectSite.noOfAvailable = sparePartToProjectSite.noOfAvailable + updateAvailNoOfSparePartToProjSite.noOfAvailable;
  // Get the asset registry that stores the assets. Note that
  // getAssetRegistry() returns a promise, so we have to await for it.
  let sparePartToProjectSiteAssetRegistry = await getAssetRegistry('org.hyperledger_composer.scms.SparePartToProjectSite');
  
  await sparePartToProjectSiteAssetRegistry.update(sparePartToProjectSite);
}
