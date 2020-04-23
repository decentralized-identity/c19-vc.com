
import bindingModels from './bindingModels'

const formDataToBindingModel = (addToWalletType, formData) => {
  let bindingModel = bindingModels[addToWalletType];
  switch (addToWalletType) {

    case 'ImmunoglobulinDetectionTestCard': {
      bindingModel = {
        ...bindingModel,
        issuer: {
          ...bindingModel.issuer,
          id: formData.issuer
        },
        credentialSubject: {
          ...bindingModel.credentialSubject,
          id: formData.credentialSubjectId
        }
      }
      break;
    }
    default:
      throw new Error('Unknown addToWalletType type.')
  }
  return bindingModel;
}

export const getVpForAddToWalletType = async (addToWalletType, formData) => {
  console.log(JSON.stringify(formData, null, 2))
  let endpoint = 'https://vc.transmute.world/v0.1.0/issue/credentials'
  const bindingModel = formDataToBindingModel(addToWalletType, formData)

    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        credential: bindingModel, options: {
          proofPurpose: 'assertionMethod',
          issuer: bindingModel.issuer,
          verificationMethod: formData.verificationMethod
        }
      })
    });
    let vc = await response.json();
    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "type": "VerifiablePresentation",
      "verifiableCredential": [vc]
    }
  
}