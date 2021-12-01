export const samlMetadataSP = `<?xml version="1.0"?>
<md:EntityDescriptor entityID="urn:amazon:cognito:sp:eu-west-2_swavRQzxU" xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata">
    <md:SPSSODescriptor AuthnRequestsSigned="false" WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <md:KeyDescriptor use="signing">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:X509Data>
                    <ds:X509Certificate>MIICvTCCAaWgAwIBAgIJAMlsvnrrv4uPMA0GCSqGSIb3DQEBCwUAMB4xHDAaBgNVBAMME2V1LXdlc3QtMl9zd2F2UlF6eFUwHhcNMjExMDI1MjIyODMzWhcNMzExMDI2MjIyODMzWjAeMRwwGgYDVQQDDBNldS13ZXN0LTJfc3dhdlJRenhVMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAncbF5zIKaz89ZVyh1zSb5LjqLjnc0F3xCmnki2C7oacaxVSHMMKL+Hq9HttgHn3zFDcIDKe6jor/qpTlAC8IG20pbi4CIOFx0cByavTARZnwPrPeUpijk4ZUwcpqwHnGN9RYMsY39jXd8SPpR1WAAHV74BI48wo9W+vp4eveSKizFDGxxalLgAcvTkg+fFr8mYHITqM3wWWO/xrQLbNgICgCrYYlwM0HoMZrZBts8AZm3PU5ONqPDzcN9hQWMt3TFcN4nZ+SlF1pyvvbbjTjXe7+dk4Ml0VdIV7Nm114meeDNa8WniZ2YLuMW4ss9WHnwZjqg5G0UbpWhsIwPwtbbQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBTlrVnQuswWpUE+XVwxVYAidd1nGEZxnGOfQfgLhsTny0cAdHn/DLBo3vP7W3apxL4LeKvB6ijaZ7OqZqsIe/zCwtv9wS4f4DA0dhsBF/Y9ZqzAQOYbCpF41KqCuMXiH1iku0ESMhWRQzMVTVhJNJlYBIkc45zMDeC4GD7OUmceEiIwEB6fbQUMR0QjWXXll8YN4KlyXeO4YZ88mpeSHVCorTkq+EGG5Q7yL/gujzM620iEdG068vLabrMQNUS9rBwnK9A8UJxaQhs3u2Ci0fWTKCptN8igIfFMym7yRZQaXNYoAV+uYWltohF07EmcqyNDSTRQnBdQosMgt0NhsKu</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </md:KeyDescriptor>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:persistent</md:NameIDFormat>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat>
        <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://warwickaiv2.auth.eu-west-2.amazoncognito.com/saml2/logout"/>
        <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://warwickaiv2.auth.eu-west-2.amazoncognito.com/saml2/idpresponse" index="1"/>
    </md:SPSSODescriptor>
    <md:Organization>
        <md:OrganizationName xml:lang="en-US">Warwick AI</md:OrganizationName>
        <md:OrganizationDisplayName xml:lang="en-US">Warwick AI</md:OrganizationDisplayName>
        <md:OrganizationURL xml:lang="en-US">warwick.ai</md:OrganizationURL>
    </md:Organization>
    <md:ContactPerson contactType="technical">
        <md:GivenName>Joe Hewett</md:GivenName>
        <md:EmailAddress>hello@warwick.ai</md:EmailAddress>
    </md:ContactPerson>
        <md:ContactPerson contactType="support">
        <md:GivenName>Joe Hewett</md:GivenName>
        <md:EmailAddress>hello@warwick.ai</md:EmailAddress>
    </md:ContactPerson>
</md:EntityDescriptor>`;

export const samlMetadataIDP = `<EntityDescriptor entityID="https://idp.warwick.ac.uk/idp/shibboleth"
xmlns="urn:oasis:names:tc:SAML:2.0:metadata"
xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
xmlns:shibmd="urn:mace:shibboleth:metadata:1.0"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

<IDPSSODescriptor protocolSupportEnumeration="urn:mace:shibboleth:1.0 urn:oasis:names:tc:SAML:1.1:protocol urn:oasis:names:tc:SAML:2.0:protocol">

<Extensions>
<shibmd:Scope regexp="false">warwick.ac.uk</shibmd:Scope>
<mdattr:EntityAttributes xmlns:mdattr="urn:oasis:names:tc:SAML:metadata:attribute">
<saml:Attribute xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
  NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"
  Name="urn:oasis:names:tc:SAML:attribute:assurance-certification">
<saml:AttributeValue>https://refeds.org/sirtfi</saml:AttributeValue>
</saml:Attribute>
</mdattr:EntityAttributes>
</Extensions>

<!-- New 20 year one -->
<KeyDescriptor>
<ds:KeyInfo>
<ds:X509Data>
  <ds:X509Certificate>
      MIIDMDCCAhigAwIBAgIVAMUgGil9ReUGOng/Gws9DutReU1TMA0GCSqGSIb3DQEB
      BQUAMBwxGjAYBgNVBAMTEWlkcC53YXJ3aWNrLmFjLnVrMB4XDTE0MDcwOTE0MDk0
      OFoXDTM0MDcwOTE0MDk0OFowHDEaMBgGA1UEAxMRaWRwLndhcndpY2suYWMudWsw
      ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCebNiWX5f4B7Xgg1ukG04P
      GvuNRynjJnrGzFqrqpOhFSvljVhU8QBkkVj6+QNh4llB3wSSlNTBiPze9zd45/1l
      rcPwzXQ5GsB2a//2Z8pS7B5s1qJKZH/zjLp+UIKCqXGjftYHHwPstAO8pMMSuk4M
      ERYCWLKt892PmrgjOnvXS0VWY9ltqAvAAl/d9Mae0UXkIYKk3VJNfClAk8U3zOej
      Ni25fAyEYwaGEfGcbBUHbxvMJlI1WaneOaoAPk20IjqrOfhK5OH9lRbR7vxR2/w5
      gya37LLhDRqADpp/dc8Qa35AzlOmgvzE3teQFwnpSHKL1BRIAotp4KTbu8xLDJEN
      AgMBAAGjaTBnMEYGA1UdEQQ/MD2CEWlkcC53YXJ3aWNrLmFjLnVrhihodHRwczov
      L2lkcC53YXJ3aWNrLmFjLnVrL2lkcC9zaGliYm9sZXRoMB0GA1UdDgQWBBQ8q27h
      eoQoKE9yxN7Jt/YS7RIYOjANBgkqhkiG9w0BAQUFAAOCAQEAUCzlCcG5TVL1P+IR
      523VOgKUq8YRzwCqERqXNRD4x0WQy8EYCYCKbYWhl5FrJNpG992nlRS2fXfGe0el
      td7Npy8vfBaroIgrOclREjYO+YBRC72ubIZKWGcU+Nq9C+RJZ2QjK+yMb76C1yUc
      TQEfw/lF/hSUofqgUSRketoCj80AOGrrG0wGV7oWuqW2MnvTIxnlosclSJgIpxW/
      RWShrJhBzCBHU5Nbz7+JEhFX3mSuBUMtSV1qsZbtwtdHVm977pOYrm5Nd35KBKNf
      +YK5ljnepO58isd09Xn1XGEqM7kySM4H55OhvBKzeIMSaKmNFJY3e8CJJmMl9u+j
      vOGPdg==
  </ds:X509Certificate>
</ds:X509Data>
</ds:KeyInfo>
</KeyDescriptor>

<ContactPerson xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
contactType="other"
remd:contactType="http://refeds.org/metadata/contactType/security"
xmlns:remd="http://refeds.org/metadata">
<md:GivenName>WAR-CSIIRT</md:GivenName>
<md:EmailAddress>mailto:csiirt@warwick.ac.uk</md:EmailAddress>
</ContactPerson>

<ArtifactResolutionService Binding="urn:oasis:names:tc:SAML:1.0:bindings:SOAP-binding"
                 Location="https://idp.warwick.ac.uk:8443/idp/profile/SAML1/SOAP/ArtifactResolution"
                 index="1"/>

<ArtifactResolutionService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"
                 Location="https://idp.warwick.ac.uk:8443/idp/profile/SAML2/SOAP/ArtifactResolution"
                 index="2"/>

<NameIDFormat>urn:mace:shibboleth:1.0:nameIdentifier</NameIDFormat>
<NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>

<SingleSignOnService Binding="urn:mace:shibboleth:1.0:profiles:AuthnRequest"
           Location="https://idp.warwick.ac.uk/idp/profile/Shibboleth/SSO" />


<SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
           Location="https://idp.warwick.ac.uk/idp/profile/SAML2/POST/SSO" />

<SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign"
           Location="https://idp.warwick.ac.uk/idp/profile/SAML2/POST-SimpleSign/SSO" />

<SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
           Location="https://idp.warwick.ac.uk/idp/profile/SAML2/Redirect/SSO" />
</IDPSSODescriptor>

<AttributeAuthorityDescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:1.1:protocol urn:oasis:names:tc:SAML:2.0:protocol">

<Extensions>
<shibmd:Scope regexp="false">warwick.ac.uk</shibmd:Scope>
</Extensions>

<!-- New 20 year one -->
<KeyDescriptor>
<ds:KeyInfo>
<ds:X509Data>
  <ds:X509Certificate>
      MIIDMDCCAhigAwIBAgIVAMUgGil9ReUGOng/Gws9DutReU1TMA0GCSqGSIb3DQEB
      BQUAMBwxGjAYBgNVBAMTEWlkcC53YXJ3aWNrLmFjLnVrMB4XDTE0MDcwOTE0MDk0
      OFoXDTM0MDcwOTE0MDk0OFowHDEaMBgGA1UEAxMRaWRwLndhcndpY2suYWMudWsw
      ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCebNiWX5f4B7Xgg1ukG04P
      GvuNRynjJnrGzFqrqpOhFSvljVhU8QBkkVj6+QNh4llB3wSSlNTBiPze9zd45/1l
      rcPwzXQ5GsB2a//2Z8pS7B5s1qJKZH/zjLp+UIKCqXGjftYHHwPstAO8pMMSuk4M
      ERYCWLKt892PmrgjOnvXS0VWY9ltqAvAAl/d9Mae0UXkIYKk3VJNfClAk8U3zOej
      Ni25fAyEYwaGEfGcbBUHbxvMJlI1WaneOaoAPk20IjqrOfhK5OH9lRbR7vxR2/w5
      gya37LLhDRqADpp/dc8Qa35AzlOmgvzE3teQFwnpSHKL1BRIAotp4KTbu8xLDJEN
      AgMBAAGjaTBnMEYGA1UdEQQ/MD2CEWlkcC53YXJ3aWNrLmFjLnVrhihodHRwczov
      L2lkcC53YXJ3aWNrLmFjLnVrL2lkcC9zaGliYm9sZXRoMB0GA1UdDgQWBBQ8q27h
      eoQoKE9yxN7Jt/YS7RIYOjANBgkqhkiG9w0BAQUFAAOCAQEAUCzlCcG5TVL1P+IR
      523VOgKUq8YRzwCqERqXNRD4x0WQy8EYCYCKbYWhl5FrJNpG992nlRS2fXfGe0el
      td7Npy8vfBaroIgrOclREjYO+YBRC72ubIZKWGcU+Nq9C+RJZ2QjK+yMb76C1yUc
      TQEfw/lF/hSUofqgUSRketoCj80AOGrrG0wGV7oWuqW2MnvTIxnlosclSJgIpxW/
      RWShrJhBzCBHU5Nbz7+JEhFX3mSuBUMtSV1qsZbtwtdHVm977pOYrm5Nd35KBKNf
      +YK5ljnepO58isd09Xn1XGEqM7kySM4H55OhvBKzeIMSaKmNFJY3e8CJJmMl9u+j
      vOGPdg==
  </ds:X509Certificate>
</ds:X509Data>
</ds:KeyInfo>
</KeyDescriptor>

<AttributeService Binding="urn:oasis:names:tc:SAML:1.0:bindings:SOAP-binding"
        Location="https://idp.warwick.ac.uk:8443/idp/profile/SAML1/SOAP/AttributeQuery" />

<AttributeService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"
        Location="https://idp.warwick.ac.uk:8443/idp/profile/SAML2/SOAP/AttributeQuery" />

<NameIDFormat>urn:mace:shibboleth:1.0:nameIdentifier</NameIDFormat>
<NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>
</AttributeAuthorityDescriptor>

</EntityDescriptor>`;
