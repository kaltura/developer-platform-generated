# Bulk Upload

<style>
.k-xe {
    color: blue;
}
.k-xev  {
    color: gray;
}
.k-xa {
    color: red;
}
.k-xav {
    color: gray;
}
.k-i {
    padding: 8px;
}
.k-et {
    color: #0606ee;
    font-size: larger;
    font-weight: bold;
}
table td,
table th {
  padding: 2px;
  border: 1px solid #ccc;
}
.k-ee {
  font-size: 12px;
}
</style>



<span class="undefined">http://www.kaltura.com/api_v3/index.php/service/schema/action/serve/type/bulkUploadXml.bulkUploadXML/name/bulkUploadXml.bulkUploadXML.xsd</span>













```xml
<xs:schema version="1.0">
  <xs:complexType name="T_mrss">
    <xs:sequence>
      <xs:element maxOccurs="1" minOccurs="0" name="ks" type="xs:string"></xs:element>
      <xs:element maxOccurs="unbounded" minOccurs="1" ref="channel"></xs:element>
      <xs:element maxOccurs="unbounded" minOccurs="0" ref="mrss-extension"></xs:element>
    </xs:sequence>
    <xs:attribute name="version" type="xs:decimal" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_channel">
    <xs:sequence>
      <xs:element maxOccurs="unbounded" minOccurs="1" ref="item"></xs:element>
      <xs:element maxOccurs="unbounded" minOccurs="0" ref="channel-extension"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_item">
    <xs:sequence>
      <xs:element maxOccurs="1" minOccurs="0" name="action">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="add"></xs:enumeration>
            <xs:enumeration value="update"></xs:enumeration>
            <xs:enumeration value="delete"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:choice maxOccurs="2" minOccurs="1">
        <xs:choice maxOccurs="1" minOccurs="1">
          <xs:sequence>
            <xs:element maxOccurs="1" minOccurs="1" name="type" type="KalturaEntryType"></xs:element>
            <xs:element maxOccurs="1" minOccurs="0" name="licenseType" type="KalturaLicenseType"></xs:element>
          </xs:sequence>
          <xs:element maxOccurs="1" minOccurs="1" name="entryId">
            <xs:simpleType>
              <xs:restriction base="xs:string">
                <xs:maxLength value="20"></xs:maxLength>
              </xs:restriction>
            </xs:simpleType>
          </xs:element>
        </xs:choice>
        <xs:element maxOccurs="1" minOccurs="1" name="referenceId">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:maxLength value="2000"></xs:maxLength>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
        <xs:element maxOccurs="1" minOccurs="0" name="parentReferenceId">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:maxLength value="100"></xs:maxLength>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
      </xs:choice>
      <xs:element maxOccurs="1" minOccurs="0" name="userId">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="100"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element maxOccurs="1" minOccurs="0" name="name">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="256"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element maxOccurs="1" minOccurs="0" name="description" type="xs:string"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" name="keepManualThumbnails" type="xs:boolean"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" ref="tags"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" ref="categories"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" name="partnerData">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="4000"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element maxOccurs="1" minOccurs="0" name="partnerSortData" type="xs:int"></xs:element>
      <xs:choice maxOccurs="1" minOccurs="0">
        <xs:element maxOccurs="1" minOccurs="1" name="accessControlId" type="xs:int"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" name="accessControl">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:maxLength value="120"></xs:maxLength>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
      </xs:choice>
      <xs:choice maxOccurs="1" minOccurs="0">
        <xs:element maxOccurs="1" minOccurs="1" name="conversionProfileId" type="xs:int"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" name="conversionProfile">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:maxLength value="120"></xs:maxLength>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
      </xs:choice>
      <xs:element maxOccurs="1" minOccurs="0" name="startDate" type="xs:dateTime"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" name="endDate" type="xs:dateTime"></xs:element>
      <xs:choice maxOccurs="1" minOccurs="0">
        <xs:element maxOccurs="1" minOccurs="1" name="templateEntryId">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:maxLength value="20"></xs:maxLength>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
        <xs:element maxOccurs="1" minOccurs="1" name="templateEntry">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:maxLength value="2000"></xs:maxLength>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
      </xs:choice>
      <xs:choice maxOccurs="1" minOccurs="0">
        <xs:element maxOccurs="1" minOccurs="1" ref="media"></xs:element>
      </xs:choice>
      <xs:element maxOccurs="1" minOccurs="0" name="msDuration" type="xs:int"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" ref="contentAssets"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" ref="thumbnails"></xs:element>
      <xs:element maxOccurs="unbounded" minOccurs="0" ref="item-extension"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_media">
    <xs:sequence>
      <xs:element maxOccurs="1" minOccurs="1" name="mediaType" type="KalturaMediaType"></xs:element>
      <xs:element maxOccurs="unbounded" minOccurs="0" ref="media-extension"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_serverFileContentResource">
    <xs:choice maxOccurs="1" minOccurs="0">
      <xs:element maxOccurs="1" minOccurs="1" name="fileSize" type="xs:int"></xs:element>
      <xs:element maxOccurs="1" minOccurs="1" name="fileChecksum">
        <xs:complexType>
          <xs:simpleContent>
            <xs:extension base="xs:string">
              <xs:attribute default="md5" name="type" use="optional">
                <xs:simpleType>
                  <xs:restriction base="xs:string">
                    <xs:enumeration value="md5"></xs:enumeration>
                    <xs:enumeration value="sha1"></xs:enumeration>
                  </xs:restriction>
                </xs:simpleType>
              </xs:attribute>
            </xs:extension>
          </xs:simpleContent>
        </xs:complexType>
      </xs:element>
    </xs:choice>
    <xs:attribute name="filePath" type="xs:string" use="required"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_urlContentResource">
    <xs:attribute ref="url" use="required"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_sshUrlContentResource">
    <xs:sequence>
      <xs:element maxOccurs="1" minOccurs="1" name="privateKey" type="xs:string"></xs:element>
      <xs:element maxOccurs="1" minOccurs="1" name="publicKey" type="xs:string"></xs:element>
    </xs:sequence>
    <xs:attribute ref="url" use="required"></xs:attribute>
    <xs:attribute name="keyPassphrase" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_remoteStorageContentResource">
    <xs:choice maxOccurs="1" minOccurs="1">
      <xs:element maxOccurs="1" minOccurs="1" name="storageProfileId" type="xs:int"></xs:element>
      <xs:element maxOccurs="1" minOccurs="1" name="storageProfile">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="120"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
    </xs:choice>
    <xs:attribute name="url" type="xs:string" use="required"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_remoteStorageContentResources">
    <xs:sequence>
      <xs:element maxOccurs="unbounded" minOccurs="1" ref="remoteStorageContentResource"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_entryContentResource">
    <xs:choice maxOccurs="1" minOccurs="0">
      <xs:element maxOccurs="1" minOccurs="1" name="flavorParamsId" type="xs:int"></xs:element>
      <xs:element maxOccurs="1" minOccurs="1" name="flavorParams">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="120"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
    </xs:choice>
    <xs:attribute name="entryId" type="xs:string" use="required"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_assetContentResource">
    <xs:attribute name="assetId" type="xs:string" use="required"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_assetInfo">
    <xs:attribute name="language" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="label" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_stream">
    <xs:attribute name="type" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="trackIndex" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="language" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="channelIndex" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="label" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="channelLayout" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_streams">
    <xs:sequence>
      <xs:element maxOccurs="unbounded" minOccurs="1" ref="stream"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_content">
    <xs:sequence>
      <xs:element maxOccurs="1" minOccurs="0" ref="tags"></xs:element>
      <xs:choice maxOccurs="1" minOccurs="1">
        <xs:element maxOccurs="1" minOccurs="1" ref="serverFileContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="urlContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="sshUrlContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="remoteStorageContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="remoteStorageContentResources"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="entryContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="assetContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="contentResource-extension"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="assetInfo"></xs:element>
      </xs:choice>
      <xs:element maxOccurs="unbounded" minOccurs="0" ref="content-extension"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" ref="streams"></xs:element>
    </xs:sequence>
    <xs:attribute name="flavorParamsId" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="flavorParams" use="optional">
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:maxLength value="120"></xs:maxLength>
        </xs:restriction>
      </xs:simpleType>
    </xs:attribute>
    <xs:attribute name="assetId" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_contentAssets">
    <xs:sequence>
      <xs:element maxOccurs="1" minOccurs="0" name="action">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="update"></xs:enumeration>
            <xs:enumeration value="replace"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element maxOccurs="unbounded" minOccurs="0" ref="content"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_thumbnail">
    <xs:sequence>
      <xs:element maxOccurs="1" minOccurs="0" ref="tags"></xs:element>
      <xs:choice maxOccurs="1" minOccurs="1">
        <xs:element maxOccurs="1" minOccurs="1" ref="serverFileContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="urlContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="sshUrlContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="remoteStorageContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="remoteStorageContentResources"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="entryContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="assetContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="1" ref="contentResource-extension"></xs:element>
      </xs:choice>
      <xs:element maxOccurs="unbounded" minOccurs="0" ref="thumbnail-extension"></xs:element>
    </xs:sequence>
    <xs:attribute name="assetId" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute default="false" name="isDefault" type="xs:boolean" use="optional"></xs:attribute>
    <xs:attribute name="thumbParamsId" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="thumbParams" use="optional">
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:maxLength value="120"></xs:maxLength>
        </xs:restriction>
      </xs:simpleType>
    </xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_thumbnails">
    <xs:sequence>
      <xs:element maxOccurs="1" minOccurs="0" name="action">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="update"></xs:enumeration>
            <xs:enumeration value="replace"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element maxOccurs="unbounded" minOccurs="0" ref="thumbnail"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:simpleType name="T_url">
    <xs:restriction base="xs:string">
      <xs:pattern value="(([hH][tT][tT][pP][sS]?)|(([fF][tT][pP])|([sS][fF][tT][pP])|([sS][cC][pP])))://?(([ 0-9a-zA-Z_!~*
					&apos;
				().
					&amp;
				=+$%-\[\]]+)?(:[0-9a-zA-Z_!~*
					&apos;
				().
					&amp;
				=+$%-\[\]]+@)?)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*
					&apos;
				()-]+\.)*)(:[0-9]{1,4})?((/?)|(/[ 0-9a-zA-Z_!~*
					&apos;
				().;?:@
					&amp;
				=+$,%#-\[\]]+)+)"></xs:pattern>
    </xs:restriction>
  </xs:simpleType>
  <xs:complexType name="T_tags">
    <xs:sequence>
      <xs:element maxOccurs="unbounded" minOccurs="0" name="tag" type="xs:string"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_categories">
    <xs:sequence>
      <xs:element maxOccurs="32" minOccurs="0" name="category" type="xs:string"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_pluginReplacementOptions">
    <xs:sequence></xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_pluginReplacementOptionsItem" abstract="true">
    <xs:sequence></xs:sequence>
  </xs:complexType>
  <xs:element name="mrss" type="T_mrss"></xs:element>
  <xs:element name="channel" type="T_channel"></xs:element>
  <xs:element name="item" type="T_item"></xs:element>
  <xs:element name="media" type="T_media"></xs:element>
  <xs:element name="contentAssets" type="T_contentAssets"></xs:element>
  <xs:element name="assetInfo" type="T_assetInfo"></xs:element>
  <xs:element name="content" type="T_content"></xs:element>
  <xs:element name="streams" type="T_streams"></xs:element>
  <xs:element name="stream" type="T_stream"></xs:element>
  <xs:element name="thumbnails" type="T_thumbnails"></xs:element>
  <xs:element name="thumbnail" type="T_thumbnail"></xs:element>
  <xs:attribute name="url" type="T_url"></xs:attribute>
  <xs:element name="contentResource-extension"></xs:element>
  <xs:element name="serverFileContentResource" type="T_serverFileContentResource"></xs:element>
  <xs:element name="urlContentResource" type="T_urlContentResource"></xs:element>
  <xs:element name="sshUrlContentResource" type="T_sshUrlContentResource"></xs:element>
  <xs:element name="remoteStorageContentResource" type="T_remoteStorageContentResource"></xs:element>
  <xs:element name="remoteStorageContentResources" type="T_remoteStorageContentResources"></xs:element>
  <xs:element name="entryContentResource" type="T_entryContentResource"></xs:element>
  <xs:element name="assetContentResource" type="T_assetContentResource"></xs:element>
  <xs:element name="tags" type="T_tags"></xs:element>
  <xs:element name="categories" type="T_categories"></xs:element>
  <xs:element name="mrss-extension"></xs:element>
  <xs:element name="channel-extension"></xs:element>
  <xs:element name="item-extension"></xs:element>
  <xs:element name="media-extension"></xs:element>
  <xs:element name="mix-extension"></xs:element>
  <xs:element name="playlist-extension"></xs:element>
  <xs:element name="data-extension"></xs:element>
  <xs:element name="liveStream-extension"></xs:element>
  <xs:element name="document-extension"></xs:element>
  <xs:element name="content-extension"></xs:element>
  <xs:element name="thumbnail-extension"></xs:element>
  <xs:complexType name="T_scene_adCuePointBulkUploadXml">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="sceneEndTime" minOccurs="0" maxOccurs="1" type="xs:time"></xs:element>
          <xs:element name="sceneTitle" minOccurs="0" maxOccurs="1">
            <xs:simpleType>
              <xs:restriction base="xs:string">
                <xs:maxLength value="250"></xs:maxLength>
              </xs:restriction>
            </xs:simpleType>
          </xs:element>
          <xs:element name="sourceUrl" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="adType" minOccurs="1" maxOccurs="1" type="KalturaAdType"></xs:element>
          <xs:element name="protocolType" minOccurs="1" maxOccurs="1" type="KalturaAdProtocolType"></xs:element>
          <xs:element ref="scene-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="scene-ad-cue-point" type="T_scene_adCuePointBulkUploadXml" substitutionGroup="scene"></xs:element>
  <xs:complexType name="T_scene_annotationBulkUploadXml">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="sceneEndTime" minOccurs="1" maxOccurs="1" type="xs:time"></xs:element>
          <xs:element name="sceneText" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
          <xs:choice minOccurs="0" maxOccurs="1">
            <xs:element name="parent" minOccurs="1" maxOccurs="1">
              <xs:simpleType>
                <xs:restriction base="xs:string">
                  <xs:maxLength value="120"></xs:maxLength>
                </xs:restriction>
              </xs:simpleType>
            </xs:element>
            <xs:element name="parentId" minOccurs="1" maxOccurs="1">
              <xs:simpleType>
                <xs:restriction base="xs:string">
                  <xs:maxLength value="250"></xs:maxLength>
                </xs:restriction>
              </xs:simpleType>
            </xs:element>
          </xs:choice>
          <xs:element ref="scene-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="scene-annotation" type="T_scene_annotationBulkUploadXml" substitutionGroup="scene"></xs:element>
  <xs:complexType name="T_attachments">
    <xs:sequence>
      <xs:element name="action" minOccurs="0" maxOccurs="1">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="update"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element ref="attachment" maxOccurs="unbounded" minOccurs="0"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_attachment">
    <xs:sequence>
      <xs:element name="tags" minOccurs="0" maxOccurs="1" type="T_tags"></xs:element>
      <xs:choice minOccurs="1" maxOccurs="1">
        <xs:element ref="serverFileContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="urlContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="remoteStorageContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="remoteStorageContentResources" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="entryContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="assetContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="contentResource-extension" minOccurs="1" maxOccurs="1"></xs:element>
      </xs:choice>
      <xs:element name="filename" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="title" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="description" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element ref="attachment-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="attachmentAssetId" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="format" type="KalturaAttachmentType" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:element name="attachment-extension"></xs:element>
  <xs:element name="attachments" type="T_attachments" substitutionGroup="item-extension"></xs:element>
  <xs:element name="attachment" type="T_attachment" substitutionGroup="item-extension"></xs:element>
  <xs:complexType name="T_subTitles">
    <xs:sequence>
      <xs:element name="action" minOccurs="0" maxOccurs="1">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="update"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element ref="subTitle" maxOccurs="unbounded" minOccurs="0"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_subTitle">
    <xs:sequence>
      <xs:element name="tags" minOccurs="1" maxOccurs="1" type="T_tags"></xs:element>
      <xs:choice minOccurs="1" maxOccurs="1">
        <xs:element ref="serverFileContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="urlContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="remoteStorageContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="remoteStorageContentResources" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="entryContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="assetContentResource" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="contentResource-extension" minOccurs="1" maxOccurs="1"></xs:element>
      </xs:choice>
      <xs:element ref="subtitle-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="label" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="captionParamsId" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="captionParams" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="captionAssetId" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="isDefault" type="xs:boolean" use="optional"></xs:attribute>
    <xs:attribute name="format" type="KalturaCaptionType" use="optional"></xs:attribute>
    <xs:attribute name="lang" type="KalturaLanguage" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:element name="subtitle-extension"></xs:element>
  <xs:element name="subTitles" type="T_subTitles" substitutionGroup="item-extension"></xs:element>
  <xs:element name="subTitle" type="T_subTitle"></xs:element>
  <xs:complexType name="T_scene_codeCuePointBulkUploadXml">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="sceneEndTime" minOccurs="0" maxOccurs="1" type="xs:time"></xs:element>
          <xs:element name="code" minOccurs="0" maxOccurs="1">
            <xs:simpleType>
              <xs:restriction base="xs:string">
                <xs:maxLength value="250"></xs:maxLength>
              </xs:restriction>
            </xs:simpleType>
          </xs:element>
          <xs:element name="description" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element ref="scene-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="scene-code-cue-point" type="T_scene_codeCuePointBulkUploadXml" substitutionGroup="scene"></xs:element>
  <xs:complexType name="T_scene_thumbCuePoint">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="title" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="description" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="subType" minOccurs="0" maxOccurs="1" type="KalturaThumbCuePointSubType"></xs:element>
          <xs:element maxOccurs="1" minOccurs="0" ref="slide"></xs:element>
          <xs:element ref="scene-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:complexType name="T_slide">
    <xs:sequence>
      <xs:choice maxOccurs="1" minOccurs="0">
        <xs:element maxOccurs="1" minOccurs="0" ref="urlContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="0" ref="remoteStorageContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="0" ref="remoteStorageContentResources"></xs:element>
        <xs:element maxOccurs="1" minOccurs="0" ref="assetContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="0" ref="entryContentResource"></xs:element>
        <xs:element maxOccurs="1" minOccurs="0" ref="contentResource-extension"></xs:element>
      </xs:choice>
    </xs:sequence>
    <xs:attribute name="timedThumbAssetId" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:element name="scene-thumb-cue-point" type="T_scene_thumbCuePoint" substitutionGroup="scene"></xs:element>
  <xs:element name="slide" type="T_slide"></xs:element>
  <xs:complexType name="T_distribution">
    <xs:sequence>
      <xs:choice minOccurs="1" maxOccurs="1">
        <xs:element name="distributionProvider" minOccurs="1" maxOccurs="1" type="KalturaDistributionProviderType"></xs:element>
        <xs:element name="distributionProfileId" minOccurs="1" maxOccurs="1" type="xs:int"></xs:element>
        <xs:element name="distributionProfile" minOccurs="1" maxOccurs="1">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:maxLength value="120"></xs:maxLength>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
      </xs:choice>
      <xs:element name="sunrise" minOccurs="0" maxOccurs="1" type="xs:dateTime"></xs:element>
      <xs:element name="sunset" minOccurs="0" maxOccurs="1" type="xs:dateTime"></xs:element>
      <xs:element name="flavorAssetIds" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="thumbAssetIds" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element ref="distribution-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="entryDistributionId" use="optional" type="xs:int"></xs:attribute>
    <xs:attribute name="submitWhenReady" use="optional" type="xs:boolean" default="false"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_distributions">
    <xs:sequence>
      <xs:element ref="distribution" maxOccurs="unbounded" minOccurs="0"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:element name="distributions" type="T_distributions" substitutionGroup="item-extension"></xs:element>
  <xs:element name="distribution" type="T_distribution"></xs:element>
  <xs:element name="distribution-extension"></xs:element>
  <xs:complexType name="T_scenes">
    <xs:sequence>
      <xs:element name="action" minOccurs="0" maxOccurs="1">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="update"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element ref="scene" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_scene" abstract="true">
    <xs:sequence>
      <xs:element name="sceneStartTime" minOccurs="1" maxOccurs="1" type="xs:time"></xs:element>
      <xs:element ref="tags" minOccurs="0" maxOccurs="1"></xs:element>
    </xs:sequence>
    <xs:attribute name="sceneId" use="optional">
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:maxLength value="250"></xs:maxLength>
        </xs:restriction>
      </xs:simpleType>
    </xs:attribute>
    <xs:attribute name="systemName" use="optional">
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:maxLength value="120"></xs:maxLength>
        </xs:restriction>
      </xs:simpleType>
    </xs:attribute>
  </xs:complexType>
  <xs:element name="scenes" type="T_scenes" substitutionGroup="item-extension"></xs:element>
  <xs:element name="scene" type="T_scene"></xs:element>
  <xs:element name="scene-extension"></xs:element>
  <xs:element name="scene-customData" type="T_customData" substitutionGroup="scene-extension"></xs:element>
  <xs:complexType name="T_customData">
    <xs:sequence>
      <xs:element name="action" minOccurs="0" maxOccurs="1">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="transformXslt"></xs:enumeration>
            <xs:enumeration value="replace"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element name="xslt" minOccurs="0" maxOccurs="1"></xs:element>
      <xs:element ref="xmlData" maxOccurs="1" minOccurs="0"></xs:element>
    </xs:sequence>
    <xs:attribute name="metadataId" use="optional" type="xs:int"></xs:attribute>
    <xs:attribute name="metadataProfile" use="optional">
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:maxLength value="120"></xs:maxLength>
        </xs:restriction>
      </xs:simpleType>
    </xs:attribute>
    <xs:attribute name="metadataProfileId" use="optional" type="xs:int"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_xmlData">
    <xs:sequence>
      <xs:any namespace="##local" processContents="skip" minOccurs="1" maxOccurs="1"></xs:any>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_customDataItems">
    <xs:sequence>
      <xs:element name="action" minOccurs="0" maxOccurs="1">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="update"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element ref="customData" maxOccurs="unbounded" minOccurs="0"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:element name="customDataItems" type="T_customDataItems" substitutionGroup="item-extension"></xs:element>
  <xs:element name="customData" type="T_customData"></xs:element>
  <xs:element name="xmlData" type="T_xmlData"></xs:element>
  <xs:complexType name="T_metadataReplacementOptionsItem">
    <xs:complexContent>
      <xs:extension base="T_pluginReplacementOptionsItem">
        <xs:sequence>
          <xs:element name="shouldCopyMetadata" minOccurs="0" maxOccurs="1">
            <xs:simpleType>
              <xs:restriction base="xs:string">
                <xs:enumeration value="true"></xs:enumeration>
                <xs:enumeration value="false"></xs:enumeration>
              </xs:restriction>
            </xs:simpleType>
          </xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:complexType name="T_metadataReplacementOptions">
    <xs:complexContent>
      <xs:extension base="T_pluginReplacementOptions">
        <xs:sequence>
          <xs:element name="metadataReplacementOptionsItem" type="T_metadataReplacementOptionsItem" minOccurs="0" maxOccurs="1"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="pluginReplacementOptions" type="T_metadataReplacementOptions" substitutionGroup="item-extension"></xs:element>
  <xs:complexType name="T_widevineAssets">
    <xs:sequence>
      <xs:element name="action" minOccurs="0" maxOccurs="1">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="update"></xs:enumeration>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element ref="widevineAsset" maxOccurs="unbounded" minOccurs="0"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_widevineAsset">
    <xs:sequence>
      <xs:element name="widevineAssetId" minOccurs="1" maxOccurs="1" type="xs:long"></xs:element>
      <xs:element name="flavorParamsId" minOccurs="1" maxOccurs="1" type="xs:long"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" name="widevineDistributionStartDate" type="xs:dateTime"></xs:element>
      <xs:element maxOccurs="1" minOccurs="0" name="widevineDistributionEndDate" type="xs:dateTime"></xs:element>
    </xs:sequence>
    <xs:attribute name="flavorAssetId" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:element name="widevineAsset-extension"></xs:element>
  <xs:element name="widevineAssets" type="T_widevineAssets" substitutionGroup="item-extension"></xs:element>
  <xs:element name="widevineAsset" type="T_widevineAsset" substitutionGroup="item-extension"></xs:element>
  <xs:simpleType name="KalturaEntryType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="-1"></xs:enumeration>
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="5"></xs:enumeration>
      <xs:enumeration value="6"></xs:enumeration>
      <xs:enumeration value="7"></xs:enumeration>
      <xs:enumeration value="8"></xs:enumeration>
      <xs:enumeration value="10"></xs:enumeration>
      <xs:enumeration value="externalMedia.externalMedia"></xs:enumeration>
      <xs:enumeration value="conference.CONFERENCE_ENTRY_SERVER"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaDynamicEnum">
    <xs:restriction base="xs:string"></xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaLicenseType">
    <xs:restriction base="xs:int">
      <xs:enumeration value="-1"></xs:enumeration>
      <xs:enumeration value="0"></xs:enumeration>
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
      <xs:enumeration value="4"></xs:enumeration>
      <xs:enumeration value="5"></xs:enumeration>
      <xs:enumeration value="6"></xs:enumeration>
      <xs:enumeration value="7"></xs:enumeration>
      <xs:enumeration value="8"></xs:enumeration>
      <xs:enumeration value="9"></xs:enumeration>
      <xs:enumeration value="10"></xs:enumeration>
      <xs:enumeration value="11"></xs:enumeration>
      <xs:enumeration value="12"></xs:enumeration>
      <xs:enumeration value="13"></xs:enumeration>
      <xs:enumeration value="14"></xs:enumeration>
      <xs:enumeration value="15"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaMediaType">
    <xs:restriction base="xs:int">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="5"></xs:enumeration>
      <xs:enumeration value="201"></xs:enumeration>
      <xs:enumeration value="202"></xs:enumeration>
      <xs:enumeration value="203"></xs:enumeration>
      <xs:enumeration value="204"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaAdType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaAdProtocolType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="0"></xs:enumeration>
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaAttachmentType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
      <xs:enumeration value="4"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaCaptionType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
      <xs:enumeration value="4"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaLanguage">
    <xs:restriction base="xs:string">
      <xs:enumeration value="Abkhazian"></xs:enumeration>
      <xs:enumeration value="Afar"></xs:enumeration>
      <xs:enumeration value="Afrikaans"></xs:enumeration>
      <xs:enumeration value="Albanian"></xs:enumeration>
      <xs:enumeration value="Amharic"></xs:enumeration>
      <xs:enumeration value="Arabic"></xs:enumeration>
      <xs:enumeration value="Armenian"></xs:enumeration>
      <xs:enumeration value="Assamese"></xs:enumeration>
      <xs:enumeration value="Aymara"></xs:enumeration>
      <xs:enumeration value="Azerbaijani"></xs:enumeration>
      <xs:enumeration value="Bashkir"></xs:enumeration>
      <xs:enumeration value="Basque"></xs:enumeration>
      <xs:enumeration value="Bengali (Bangla)"></xs:enumeration>
      <xs:enumeration value="Bhutani"></xs:enumeration>
      <xs:enumeration value="Bihari"></xs:enumeration>
      <xs:enumeration value="Bislama"></xs:enumeration>
      <xs:enumeration value="Breton"></xs:enumeration>
      <xs:enumeration value="Bulgarian"></xs:enumeration>
      <xs:enumeration value="Burmese"></xs:enumeration>
      <xs:enumeration value="Byelorussian (Belarusian)"></xs:enumeration>
      <xs:enumeration value="Cambodian"></xs:enumeration>
      <xs:enumeration value="Catalan"></xs:enumeration>
      <xs:enumeration value="Chinese"></xs:enumeration>
      <xs:enumeration value="Corsican"></xs:enumeration>
      <xs:enumeration value="Croatian"></xs:enumeration>
      <xs:enumeration value="Czech"></xs:enumeration>
      <xs:enumeration value="Danish"></xs:enumeration>
      <xs:enumeration value="Dutch"></xs:enumeration>
      <xs:enumeration value="English"></xs:enumeration>
      <xs:enumeration value="English (British)"></xs:enumeration>
      <xs:enumeration value="English (American)"></xs:enumeration>
      <xs:enumeration value="Esperanto"></xs:enumeration>
      <xs:enumeration value="Estonian"></xs:enumeration>
      <xs:enumeration value="Faeroese"></xs:enumeration>
      <xs:enumeration value="Farsi"></xs:enumeration>
      <xs:enumeration value="Fiji"></xs:enumeration>
      <xs:enumeration value="Finnish"></xs:enumeration>
      <xs:enumeration value="French"></xs:enumeration>
      <xs:enumeration value="Frisian"></xs:enumeration>
      <xs:enumeration value="Galician"></xs:enumeration>
      <xs:enumeration value="Gaelic (Scottish)"></xs:enumeration>
      <xs:enumeration value="Gaelic (Manx)"></xs:enumeration>
      <xs:enumeration value="Georgian"></xs:enumeration>
      <xs:enumeration value="German"></xs:enumeration>
      <xs:enumeration value="Greek"></xs:enumeration>
      <xs:enumeration value="Greenlandic"></xs:enumeration>
      <xs:enumeration value="Guarani"></xs:enumeration>
      <xs:enumeration value="Gujarati"></xs:enumeration>
      <xs:enumeration value="Hausa"></xs:enumeration>
      <xs:enumeration value="Hebrew"></xs:enumeration>
      <xs:enumeration value="Hebrew"></xs:enumeration>
      <xs:enumeration value="Hindi"></xs:enumeration>
      <xs:enumeration value="Hungarian"></xs:enumeration>
      <xs:enumeration value="Icelandic"></xs:enumeration>
      <xs:enumeration value="Indonesian"></xs:enumeration>
      <xs:enumeration value="Indonesian"></xs:enumeration>
      <xs:enumeration value="Interlingua"></xs:enumeration>
      <xs:enumeration value="Interlingue"></xs:enumeration>
      <xs:enumeration value="Inuktitut"></xs:enumeration>
      <xs:enumeration value="Inupiak"></xs:enumeration>
      <xs:enumeration value="Irish"></xs:enumeration>
      <xs:enumeration value="Italian"></xs:enumeration>
      <xs:enumeration value="Japanese"></xs:enumeration>
      <xs:enumeration value="Javanese"></xs:enumeration>
      <xs:enumeration value="Kannada"></xs:enumeration>
      <xs:enumeration value="Kashmiri"></xs:enumeration>
      <xs:enumeration value="Kazakh"></xs:enumeration>
      <xs:enumeration value="Kinyarwanda (Ruanda)"></xs:enumeration>
      <xs:enumeration value="Kirghiz"></xs:enumeration>
      <xs:enumeration value="Kirundi (Rundi)"></xs:enumeration>
      <xs:enumeration value="Korean"></xs:enumeration>
      <xs:enumeration value="Kurdish"></xs:enumeration>
      <xs:enumeration value="Laothian"></xs:enumeration>
      <xs:enumeration value="Latin"></xs:enumeration>
      <xs:enumeration value="Latvian (Lettish)"></xs:enumeration>
      <xs:enumeration value="Limburgish ( Limburger)"></xs:enumeration>
      <xs:enumeration value="Lingala"></xs:enumeration>
      <xs:enumeration value="Lithuanian"></xs:enumeration>
      <xs:enumeration value="Macedonian"></xs:enumeration>
      <xs:enumeration value="Malagasy"></xs:enumeration>
      <xs:enumeration value="Malay"></xs:enumeration>
      <xs:enumeration value="Malayalam"></xs:enumeration>
      <xs:enumeration value="Maltese"></xs:enumeration>
      <xs:enumeration value="Maori"></xs:enumeration>
      <xs:enumeration value="Marathi"></xs:enumeration>
      <xs:enumeration value="Moldavian"></xs:enumeration>
      <xs:enumeration value="Mongolian"></xs:enumeration>
      <xs:enumeration value="Nauru"></xs:enumeration>
      <xs:enumeration value="Nepali"></xs:enumeration>
      <xs:enumeration value="Norwegian"></xs:enumeration>
      <xs:enumeration value="Occitan"></xs:enumeration>
      <xs:enumeration value="Oriya"></xs:enumeration>
      <xs:enumeration value="Oromo (Afan, Galla)"></xs:enumeration>
      <xs:enumeration value="Pashto (Pushto)"></xs:enumeration>
      <xs:enumeration value="Polish"></xs:enumeration>
      <xs:enumeration value="Portuguese"></xs:enumeration>
      <xs:enumeration value="Punjabi"></xs:enumeration>
      <xs:enumeration value="Quechua"></xs:enumeration>
      <xs:enumeration value="Rhaeto-Romance"></xs:enumeration>
      <xs:enumeration value="Romanian"></xs:enumeration>
      <xs:enumeration value="Russian"></xs:enumeration>
      <xs:enumeration value="Samoan"></xs:enumeration>
      <xs:enumeration value="Sangro"></xs:enumeration>
      <xs:enumeration value="Sanskrit"></xs:enumeration>
      <xs:enumeration value="Serbian"></xs:enumeration>
      <xs:enumeration value="Serbo-Croatian"></xs:enumeration>
      <xs:enumeration value="Sesotho"></xs:enumeration>
      <xs:enumeration value="Setswana"></xs:enumeration>
      <xs:enumeration value="Shona"></xs:enumeration>
      <xs:enumeration value="Sindhi"></xs:enumeration>
      <xs:enumeration value="Sinhalese"></xs:enumeration>
      <xs:enumeration value="Siswati"></xs:enumeration>
      <xs:enumeration value="Slovak"></xs:enumeration>
      <xs:enumeration value="Slovenian"></xs:enumeration>
      <xs:enumeration value="Somali"></xs:enumeration>
      <xs:enumeration value="Spanish"></xs:enumeration>
      <xs:enumeration value="Sundanese"></xs:enumeration>
      <xs:enumeration value="Swahili (Kiswahili)"></xs:enumeration>
      <xs:enumeration value="Swedish"></xs:enumeration>
      <xs:enumeration value="Tagalog"></xs:enumeration>
      <xs:enumeration value="Tajik"></xs:enumeration>
      <xs:enumeration value="Tamil"></xs:enumeration>
      <xs:enumeration value="Tatar"></xs:enumeration>
      <xs:enumeration value="Telugu"></xs:enumeration>
      <xs:enumeration value="Thai"></xs:enumeration>
      <xs:enumeration value="Tibetan"></xs:enumeration>
      <xs:enumeration value="Tigrinya"></xs:enumeration>
      <xs:enumeration value="Tonga"></xs:enumeration>
      <xs:enumeration value="Tsonga"></xs:enumeration>
      <xs:enumeration value="Turkish"></xs:enumeration>
      <xs:enumeration value="Turkmen"></xs:enumeration>
      <xs:enumeration value="Twi"></xs:enumeration>
      <xs:enumeration value="Uighur"></xs:enumeration>
      <xs:enumeration value="Ukrainian"></xs:enumeration>
      <xs:enumeration value="Urdu"></xs:enumeration>
      <xs:enumeration value="Uzbek"></xs:enumeration>
      <xs:enumeration value="Vietnamese"></xs:enumeration>
      <xs:enumeration value="Volapuk"></xs:enumeration>
      <xs:enumeration value="Welsh"></xs:enumeration>
      <xs:enumeration value="Wolof"></xs:enumeration>
      <xs:enumeration value="Xhosa"></xs:enumeration>
      <xs:enumeration value="Yiddish"></xs:enumeration>
      <xs:enumeration value="Yiddish"></xs:enumeration>
      <xs:enumeration value="Yoruba"></xs:enumeration>
      <xs:enumeration value="Zulu"></xs:enumeration>
      <xs:enumeration value="Multilingual"></xs:enumeration>
      <xs:enumeration value="Afade"></xs:enumeration>
      <xs:enumeration value="Abnaki Western"></xs:enumeration>
      <xs:enumeration value="Abaza"></xs:enumeration>
      <xs:enumeration value="Abure"></xs:enumeration>
      <xs:enumeration value="Achinese"></xs:enumeration>
      <xs:enumeration value="Saint Lucian Creole French"></xs:enumeration>
      <xs:enumeration value="Achang"></xs:enumeration>
      <xs:enumeration value="Achterhooks"></xs:enumeration>
      <xs:enumeration value="Achumawi"></xs:enumeration>
      <xs:enumeration value="Adioukrou"></xs:enumeration>
      <xs:enumeration value="Adynyamathanha"></xs:enumeration>
      <xs:enumeration value="Adyghe; Adygei"></xs:enumeration>
      <xs:enumeration value="Aghem"></xs:enumeration>
      <xs:enumeration value="Aguaruna"></xs:enumeration>
      <xs:enumeration value="Aguacateco"></xs:enumeration>
      <xs:enumeration value="Aghul"></xs:enumeration>
      <xs:enumeration value="Assyrian Neo-Aramaic"></xs:enumeration>
      <xs:enumeration value="Ainu (Japan)"></xs:enumeration>
      <xs:enumeration value="Akkadian"></xs:enumeration>
      <xs:enumeration value="Aklanon"></xs:enumeration>
      <xs:enumeration value="Akum"></xs:enumeration>
      <xs:enumeration value="Alabama"></xs:enumeration>
      <xs:enumeration value="Qawasqar"></xs:enumeration>
      <xs:enumeration value="Aleut"></xs:enumeration>
      <xs:enumeration value="Albanian (Gheg)"></xs:enumeration>
      <xs:enumeration value="Algonquin"></xs:enumeration>
      <xs:enumeration value="Albanian (Tosk)"></xs:enumeration>
      <xs:enumeration value="Altai (Southern)"></xs:enumeration>
      <xs:enumeration value="Yanesha"></xs:enumeration>
      <xs:enumeration value="Western Neo-Aramaic"></xs:enumeration>
      <xs:enumeration value="Old English"></xs:enumeration>
      <xs:enumeration value="Apache (Jicarilla)"></xs:enumeration>
      <xs:enumeration value="Apache (Western)"></xs:enumeration>
      <xs:enumeration value="Arabic (standard)"></xs:enumeration>
      <xs:enumeration value="Aramaic"></xs:enumeration>
      <xs:enumeration value="Arikara"></xs:enumeration>
      <xs:enumeration value="Araucanian"></xs:enumeration>
      <xs:enumeration value="Arapaho"></xs:enumeration>
      <xs:enumeration value="Assiniboine"></xs:enumeration>
      <xs:enumeration value="Asturian"></xs:enumeration>
      <xs:enumeration value="Atikamekw"></xs:enumeration>
      <xs:enumeration value="Waorani"></xs:enumeration>
      <xs:enumeration value="Kotava"></xs:enumeration>
      <xs:enumeration value="Awadhi"></xs:enumeration>
      <xs:enumeration value="Arabic Tunisian Spoken"></xs:enumeration>
      <xs:enumeration value="Baluchi"></xs:enumeration>
      <xs:enumeration value="Balinese"></xs:enumeration>
      <xs:enumeration value="Bavarian"></xs:enumeration>
      <xs:enumeration value="Basa (Cameroon)"></xs:enumeration>
      <xs:enumeration value="Balochi Southern"></xs:enumeration>
      <xs:enumeration value="Babine"></xs:enumeration>
      <xs:enumeration value="Bai"></xs:enumeration>
      <xs:enumeration value="Beaver"></xs:enumeration>
      <xs:enumeration value="Beja"></xs:enumeration>
      <xs:enumeration value="Bemba (Zambia)"></xs:enumeration>
      <xs:enumeration value="Betawi"></xs:enumeration>
      <xs:enumeration value="Badaga"></xs:enumeration>
      <xs:enumeration value="Balti"></xs:enumeration>
      <xs:enumeration value="Bhili"></xs:enumeration>
      <xs:enumeration value="Bhojpuri"></xs:enumeration>
      <xs:enumeration value="Bikol"></xs:enumeration>
      <xs:enumeration value="Bini"></xs:enumeration>
      <xs:enumeration value="Bishnupriya Manipuri"></xs:enumeration>
      <xs:enumeration value="Buriat"></xs:enumeration>
      <xs:enumeration value="Buginese"></xs:enumeration>
      <xs:enumeration value="Chor"></xs:enumeration>
      <xs:enumeration value="Caddo"></xs:enumeration>
      <xs:enumeration value="Carrier Southern"></xs:enumeration>
      <xs:enumeration value="Cayuga"></xs:enumeration>
      <xs:enumeration value="Min Dong Chinese"></xs:enumeration>
      <xs:enumeration value="Cebuano"></xs:enumeration>
      <xs:enumeration value="Catawba"></xs:enumeration>
      <xs:enumeration value="Chagatai"></xs:enumeration>
      <xs:enumeration value="Mari (Russia)"></xs:enumeration>
      <xs:enumeration value="Chinook jargon"></xs:enumeration>
      <xs:enumeration value="Choctaw"></xs:enumeration>
      <xs:enumeration value="Chipewyan"></xs:enumeration>
      <xs:enumeration value="Cherokee"></xs:enumeration>
      <xs:enumeration value="Cheyenne"></xs:enumeration>
      <xs:enumeration value="Chickasaw"></xs:enumeration>
      <xs:enumeration value="Cimbrian"></xs:enumeration>
      <xs:enumeration value="Chippewa"></xs:enumeration>
      <xs:enumeration value="Shor"></xs:enumeration>
      <xs:enumeration value="Jinyu Chinese"></xs:enumeration>
      <xs:enumeration value="Chukot"></xs:enumeration>
      <xs:enumeration value="Chilcotin"></xs:enumeration>
      <xs:enumeration value="Chaldean Neo-Aramaic"></xs:enumeration>
      <xs:enumeration value="Clallam Klallam"></xs:enumeration>
      <xs:enumeration value="Mandarin Chinese"></xs:enumeration>
      <xs:enumeration value="Cocopa"></xs:enumeration>
      <xs:enumeration value="Cochimi"></xs:enumeration>
      <xs:enumeration value="Comanche"></xs:enumeration>
      <xs:enumeration value="Comox"></xs:enumeration>
      <xs:enumeration value="Coptic"></xs:enumeration>
      <xs:enumeration value="Crimean Tatar"></xs:enumeration>
      <xs:enumeration value="Carrier"></xs:enumeration>
      <xs:enumeration value="Kashubian"></xs:enumeration>
      <xs:enumeration value="Cupeo"></xs:enumeration>
      <xs:enumeration value="Huizhou Chinese"></xs:enumeration>
      <xs:enumeration value="Dakota"></xs:enumeration>
      <xs:enumeration value="Dargwa"></xs:enumeration>
      <xs:enumeration value="Tsez"></xs:enumeration>
      <xs:enumeration value="Delaware"></xs:enumeration>
      <xs:enumeration value="Dogrib"></xs:enumeration>
      <xs:enumeration value="Dehu"></xs:enumeration>
      <xs:enumeration value="Kumiai"></xs:enumeration>
      <xs:enumeration value="Dinka"></xs:enumeration>
      <xs:enumeration value="Zarma"></xs:enumeration>
      <xs:enumeration value="Dolgan"></xs:enumeration>
      <xs:enumeration value="Dungan"></xs:enumeration>
      <xs:enumeration value="Dong"></xs:enumeration>
      <xs:enumeration value="Dogri (generic)"></xs:enumeration>
      <xs:enumeration value="Sorbian Lower"></xs:enumeration>
      <xs:enumeration value="Duala"></xs:enumeration>
      <xs:enumeration value="Dyula"></xs:enumeration>
      <xs:enumeration value="E"></xs:enumeration>
      <xs:enumeration value="Emilian"></xs:enumeration>
      <xs:enumeration value="English Middle (1100-1500)"></xs:enumeration>
      <xs:enumeration value="Even"></xs:enumeration>
      <xs:enumeration value="Evenki"></xs:enumeration>
      <xs:enumeration value="Fang (Equatorial Guinea)"></xs:enumeration>
      <xs:enumeration value="Fala"></xs:enumeration>
      <xs:enumeration value="Filipino"></xs:enumeration>
      <xs:enumeration value="Finnish (Tornedalen)"></xs:enumeration>
      <xs:enumeration value="Fon"></xs:enumeration>
      <xs:enumeration value="Frankish"></xs:enumeration>
      <xs:enumeration value="Franco-Prove"></xs:enumeration>
      <xs:enumeration value="Frisian Northern"></xs:enumeration>
      <xs:enumeration value="Pulaar"></xs:enumeration>
      <xs:enumeration value="Friulian"></xs:enumeration>
      <xs:enumeration value="Fur"></xs:enumeration>
      <xs:enumeration value="Ga"></xs:enumeration>
      <xs:enumeration value="Gagauz"></xs:enumeration>
      <xs:enumeration value="Gan"></xs:enumeration>
      <xs:enumeration value="Dari Zoroastrian"></xs:enumeration>
      <xs:enumeration value="Laal"></xs:enumeration>
      <xs:enumeration value="German Hutterite"></xs:enumeration>
      <xs:enumeration value="Geez"></xs:enumeration>
      <xs:enumeration value="Gilbertese"></xs:enumeration>
      <xs:enumeration value="Gitxsan"></xs:enumeration>
      <xs:enumeration value="Nanai"></xs:enumeration>
      <xs:enumeration value="Konkani Goan"></xs:enumeration>
      <xs:enumeration value="Greek Ancient (to 1453)"></xs:enumeration>
      <xs:enumeration value="Swiss German Alemannic Alsatian"></xs:enumeration>
      <xs:enumeration value="Gwichin"></xs:enumeration>
      <xs:enumeration value="Han"></xs:enumeration>
      <xs:enumeration value="Haida"></xs:enumeration>
      <xs:enumeration value="Haisla"></xs:enumeration>
      <xs:enumeration value="Hawaiian"></xs:enumeration>
      <xs:enumeration value="Heiltsuk"></xs:enumeration>
      <xs:enumeration value="Hidatsa"></xs:enumeration>
      <xs:enumeration value="Hiligaynon"></xs:enumeration>
      <xs:enumeration value="Hmong"></xs:enumeration>
      <xs:enumeration value="Hani"></xs:enumeration>
      <xs:enumeration value="Hopi"></xs:enumeration>
      <xs:enumeration value="Sorbian Upper"></xs:enumeration>
      <xs:enumeration value="Halkomelem"></xs:enumeration>
      <xs:enumeration value="Iloko"></xs:enumeration>
      <xs:enumeration value="Ingush"></xs:enumeration>
      <xs:enumeration value="Itelmen"></xs:enumeration>
      <xs:enumeration value="Ingrian"></xs:enumeration>
      <xs:enumeration value="Lojban"></xs:enumeration>
      <xs:enumeration value="Judeo-Crimean Tatar"></xs:enumeration>
      <xs:enumeration value="Judeo-Georgian"></xs:enumeration>
      <xs:enumeration value="Jutish"></xs:enumeration>
      <xs:enumeration value="Karakalpak"></xs:enumeration>
      <xs:enumeration value="Kabyle"></xs:enumeration>
      <xs:enumeration value="Jju"></xs:enumeration>
      <xs:enumeration value="Bezhta"></xs:enumeration>
      <xs:enumeration value="Kawi"></xs:enumeration>
      <xs:enumeration value="Kabardian"></xs:enumeration>
      <xs:enumeration value="Khanty"></xs:enumeration>
      <xs:enumeration value="Karaim"></xs:enumeration>
      <xs:enumeration value="Kabuverdianu"></xs:enumeration>
      <xs:enumeration value="Kodava"></xs:enumeration>
      <xs:enumeration value="Kachchi"></xs:enumeration>
      <xs:enumeration value="Khasi"></xs:enumeration>
      <xs:enumeration value="Kickapoo"></xs:enumeration>
      <xs:enumeration value="Karagas"></xs:enumeration>
      <xs:enumeration value="Kiowa"></xs:enumeration>
      <xs:enumeration value="Khakas"></xs:enumeration>
      <xs:enumeration value="Kaikavian literary language (Kajkavian)"></xs:enumeration>
      <xs:enumeration value="Kaska"></xs:enumeration>
      <xs:enumeration value="Khalaj Turkic"></xs:enumeration>
      <xs:enumeration value="Konkani (specific)"></xs:enumeration>
      <xs:enumeration value="Komi-Permyak"></xs:enumeration>
      <xs:enumeration value="Konkani (generic)"></xs:enumeration>
      <xs:enumeration value="Kosraean"></xs:enumeration>
      <xs:enumeration value="Kpelle"></xs:enumeration>
      <xs:enumeration value="Ikposo"></xs:enumeration>
      <xs:enumeration value="Koryak"></xs:enumeration>
      <xs:enumeration value="Karachay-Balkar"></xs:enumeration>
      <xs:enumeration value="Karelian"></xs:enumeration>
      <xs:enumeration value="Colognian"></xs:enumeration>
      <xs:enumeration value="Kansa"></xs:enumeration>
      <xs:enumeration value="Kumyk"></xs:enumeration>
      <xs:enumeration value="Kutenai"></xs:enumeration>
      <xs:enumeration value="Kwakiutl"></xs:enumeration>
      <xs:enumeration value="Khmer Northern"></xs:enumeration>
      <xs:enumeration value="Ladino"></xs:enumeration>
      <xs:enumeration value="Lahnda"></xs:enumeration>
      <xs:enumeration value="Lak"></xs:enumeration>
      <xs:enumeration value="Lezghian"></xs:enumeration>
      <xs:enumeration value="Lahu"></xs:enumeration>
      <xs:enumeration value="Limbu"></xs:enumeration>
      <xs:enumeration value="Ligurian"></xs:enumeration>
      <xs:enumeration value="Lillooet"></xs:enumeration>
      <xs:enumeration value="Laki"></xs:enumeration>
      <xs:enumeration value="Lakota"></xs:enumeration>
      <xs:enumeration value="Ladin"></xs:enumeration>
      <xs:enumeration value="Lombard"></xs:enumeration>
      <xs:enumeration value="Loma (Liberia)"></xs:enumeration>
      <xs:enumeration value="Lozi"></xs:enumeration>
      <xs:enumeration value="Luba-Lulua"></xs:enumeration>
      <xs:enumeration value="Ludian"></xs:enumeration>
      <xs:enumeration value="Lunda"></xs:enumeration>
      <xs:enumeration value="Luo (Kenya and Tanzania)"></xs:enumeration>
      <xs:enumeration value="Lucumi"></xs:enumeration>
      <xs:enumeration value="Lushootseed"></xs:enumeration>
      <xs:enumeration value="Laz"></xs:enumeration>
      <xs:enumeration value="Madurese"></xs:enumeration>
      <xs:enumeration value="Magahi"></xs:enumeration>
      <xs:enumeration value="Maithili"></xs:enumeration>
      <xs:enumeration value="Masai"></xs:enumeration>
      <xs:enumeration value="Moksha"></xs:enumeration>
      <xs:enumeration value="Mende (Sierra Leone)"></xs:enumeration>
      <xs:enumeration value="Menominee"></xs:enumeration>
      <xs:enumeration value="Morisyen"></xs:enumeration>
      <xs:enumeration value="Mayo"></xs:enumeration>
      <xs:enumeration value="Mandan"></xs:enumeration>
      <xs:enumeration value="Micmac"></xs:enumeration>
      <xs:enumeration value="Mandaic"></xs:enumeration>
      <xs:enumeration value="Minangkabau"></xs:enumeration>
      <xs:enumeration value="Manchu"></xs:enumeration>
      <xs:enumeration value="Meitei"></xs:enumeration>
      <xs:enumeration value="Min Bei Chinese"></xs:enumeration>
      <xs:enumeration value="Mansi"></xs:enumeration>
      <xs:enumeration value="Mon"></xs:enumeration>
      <xs:enumeration value="Mohawk"></xs:enumeration>
      <xs:enumeration value="Mossi"></xs:enumeration>
      <xs:enumeration value="Maranao"></xs:enumeration>
      <xs:enumeration value="Muong"></xs:enumeration>
      <xs:enumeration value="Creek"></xs:enumeration>
      <xs:enumeration value="Mirandese"></xs:enumeration>
      <xs:enumeration value="Marwari"></xs:enumeration>
      <xs:enumeration value="Mozarabic"></xs:enumeration>
      <xs:enumeration value="Pirah"></xs:enumeration>
      <xs:enumeration value="Erzya"></xs:enumeration>
      <xs:enumeration value="Tumzabt"></xs:enumeration>
      <xs:enumeration value="Neapolitan"></xs:enumeration>
      <xs:enumeration value="Nama (Namibia)"></xs:enumeration>
      <xs:enumeration value="Nisgaa"></xs:enumeration>
      <xs:enumeration value="Low German Low Saxon"></xs:enumeration>
      <xs:enumeration value="Newari Nepal Bhasa"></xs:enumeration>
      <xs:enumeration value="Nganasan"></xs:enumeration>
      <xs:enumeration value="Niuean"></xs:enumeration>
      <xs:enumeration value="Gilyak Nivkh"></xs:enumeration>
      <xs:enumeration value="Thai (Northern)"></xs:enumeration>
      <xs:enumeration value="Nogai"></xs:enumeration>
      <xs:enumeration value="Norse Old"></xs:enumeration>
      <xs:enumeration value="Novial"></xs:enumeration>
      <xs:enumeration value="Naskapi"></xs:enumeration>
      <xs:enumeration value="Northern Sotho Pedi Sepedi"></xs:enumeration>
      <xs:enumeration value="Nyamwezi"></xs:enumeration>
      <xs:enumeration value="Nyoro"></xs:enumeration>
      <xs:enumeration value="Nyungah"></xs:enumeration>
      <xs:enumeration value="Ojibwa Northwestern"></xs:enumeration>
      <xs:enumeration value="Ojibwa Central"></xs:enumeration>
      <xs:enumeration value="Ojibwa Eastern"></xs:enumeration>
      <xs:enumeration value="Ojibwa Severn"></xs:enumeration>
      <xs:enumeration value="Ojibwa Western"></xs:enumeration>
      <xs:enumeration value="Oneida"></xs:enumeration>
      <xs:enumeration value="Onondaga"></xs:enumeration>
      <xs:enumeration value="Tohono Oodham"></xs:enumeration>
      <xs:enumeration value="Turkish Ottoman"></xs:enumeration>
      <xs:enumeration value="Ottawa"></xs:enumeration>
      <xs:enumeration value="Pangasinan"></xs:enumeration>
      <xs:enumeration value="Pampanga"></xs:enumeration>
      <xs:enumeration value="Papiamento"></xs:enumeration>
      <xs:enumeration value="Palauan"></xs:enumeration>
      <xs:enumeration value="Picard"></xs:enumeration>
      <xs:enumeration value="German Pennsylvania"></xs:enumeration>
      <xs:enumeration value="Plautdietsch"></xs:enumeration>
      <xs:enumeration value="Western Farsi"></xs:enumeration>
      <xs:enumeration value="Pfaelzisch"></xs:enumeration>
      <xs:enumeration value="Pitcairn-Norfolk"></xs:enumeration>
      <xs:enumeration value="Piedmontese"></xs:enumeration>
      <xs:enumeration value="Pontic"></xs:enumeration>
      <xs:enumeration value="Potawatomi"></xs:enumeration>
      <xs:enumeration value="Paipai"></xs:enumeration>
      <xs:enumeration value="Malecite-Passamaquoddy"></xs:enumeration>
      <xs:enumeration value="Dari (Persian)"></xs:enumeration>
      <xs:enumeration value="Prussian"></xs:enumeration>
      <xs:enumeration value="Persian"></xs:enumeration>
      <xs:enumeration value="Persian (Dari)"></xs:enumeration>
      <xs:enumeration value="Reserved for local use."></xs:enumeration>
      <xs:enumeration value="Quich Central"></xs:enumeration>
      <xs:enumeration value="Qashqai"></xs:enumeration>
      <xs:enumeration value="Rapanui"></xs:enumeration>
      <xs:enumeration value="Rarotongan"></xs:enumeration>
      <xs:enumeration value="Runion Creole French"></xs:enumeration>
      <xs:enumeration value="Romagnol"></xs:enumeration>
      <xs:enumeration value="Angloromani"></xs:enumeration>
      <xs:enumeration value="Romani Kalo Finnish"></xs:enumeration>
      <xs:enumeration value="Romani Sinte"></xs:enumeration>
      <xs:enumeration value="Romany"></xs:enumeration>
      <xs:enumeration value="Rusyn"></xs:enumeration>
      <xs:enumeration value="Romanian Istro"></xs:enumeration>
      <xs:enumeration value="Aromanian"></xs:enumeration>
      <xs:enumeration value="Romanian Megleno"></xs:enumeration>
      <xs:enumeration value="Okinawan Central"></xs:enumeration>
      <xs:enumeration value="Sakha"></xs:enumeration>
      <xs:enumeration value="Aramaic Samaritan"></xs:enumeration>
      <xs:enumeration value="Santali"></xs:enumeration>
      <xs:enumeration value="Sicilian"></xs:enumeration>
      <xs:enumeration value="Scots"></xs:enumeration>
      <xs:enumeration value="Slavey North"></xs:enumeration>
      <xs:enumeration value="Sardinian Sassarese"></xs:enumeration>
      <xs:enumeration value="Sechelt"></xs:enumeration>
      <xs:enumeration value="Seneca"></xs:enumeration>
      <xs:enumeration value="Seri"></xs:enumeration>
      <xs:enumeration value="Sekani"></xs:enumeration>
      <xs:enumeration value="Selkup"></xs:enumeration>
      <xs:enumeration value="Shoshoni"></xs:enumeration>
      <xs:enumeration value="Tachelhit"></xs:enumeration>
      <xs:enumeration value="Shuswap"></xs:enumeration>
      <xs:enumeration value="Tachawit"></xs:enumeration>
      <xs:enumeration value="Sidamo"></xs:enumeration>
      <xs:enumeration value="Sami Kildin"></xs:enumeration>
      <xs:enumeration value="Shawnee"></xs:enumeration>
      <xs:enumeration value="Salar"></xs:enumeration>
      <xs:enumeration value="Southern Sami"></xs:enumeration>
      <xs:enumeration value="Lule Sami"></xs:enumeration>
      <xs:enumeration value="Inari Sami"></xs:enumeration>
      <xs:enumeration value="Skolt Sami"></xs:enumeration>
      <xs:enumeration value="Soninke"></xs:enumeration>
      <xs:enumeration value="Saramaccan"></xs:enumeration>
      <xs:enumeration value="Sranan"></xs:enumeration>
      <xs:enumeration value="Stoney"></xs:enumeration>
      <xs:enumeration value="Saterland Frisian"></xs:enumeration>
      <xs:enumeration value="Salish Straits"></xs:enumeration>
      <xs:enumeration value="Sumerian"></xs:enumeration>
      <xs:enumeration value="Svan"></xs:enumeration>
      <xs:enumeration value="Comorian"></xs:enumeration>
      <xs:enumeration value="Swabian"></xs:enumeration>
      <xs:enumeration value="Swedish Sign Language"></xs:enumeration>
      <xs:enumeration value="Saxon Upper"></xs:enumeration>
      <xs:enumeration value="Syriac"></xs:enumeration>
      <xs:enumeration value="Silesian"></xs:enumeration>
      <xs:enumeration value="Tabassaran"></xs:enumeration>
      <xs:enumeration value="Tamasheq"></xs:enumeration>
      <xs:enumeration value="Tarahumara Central"></xs:enumeration>
      <xs:enumeration value="Tagbanwa"></xs:enumeration>
      <xs:enumeration value="Toda"></xs:enumeration>
      <xs:enumeration value="Tulu"></xs:enumeration>
      <xs:enumeration value="Tai Na"></xs:enumeration>
      <xs:enumeration value="Tetum"></xs:enumeration>
      <xs:enumeration value="Tagish"></xs:enumeration>
      <xs:enumeration value="Thompson"></xs:enumeration>
      <xs:enumeration value="Tahltan"></xs:enumeration>
      <xs:enumeration value="Tigre"></xs:enumeration>
      <xs:enumeration value="Klingon tlhIngan-Hol"></xs:enumeration>
      <xs:enumeration value="Tlingit"></xs:enumeration>
      <xs:enumeration value="Talysh"></xs:enumeration>
      <xs:enumeration value="Tonga (Nyasa)"></xs:enumeration>
      <xs:enumeration value="Tok Pisin"></xs:enumeration>
      <xs:enumeration value="Tupinamb"></xs:enumeration>
      <xs:enumeration value="Seediq"></xs:enumeration>
      <xs:enumeration value="Tsimshian"></xs:enumeration>
      <xs:enumeration value="Tamajaq Tawallammat"></xs:enumeration>
      <xs:enumeration value="Thai Northeastern"></xs:enumeration>
      <xs:enumeration value="Tat Muslim"></xs:enumeration>
      <xs:enumeration value="Tumbuka"></xs:enumeration>
      <xs:enumeration value="Tuscarora"></xs:enumeration>
      <xs:enumeration value="Turkana"></xs:enumeration>
      <xs:enumeration value="Tuvalu"></xs:enumeration>
      <xs:enumeration value="Tuvinian"></xs:enumeration>
      <xs:enumeration value="Tamazight Central Atlas"></xs:enumeration>
      <xs:enumeration value="Ubykh"></xs:enumeration>
      <xs:enumeration value="Udi"></xs:enumeration>
      <xs:enumeration value="Udmurt"></xs:enumeration>
      <xs:enumeration value="Urum"></xs:enumeration>
      <xs:enumeration value="Venetian"></xs:enumeration>
      <xs:enumeration value="Veps"></xs:enumeration>
      <xs:enumeration value="Voro"></xs:enumeration>
      <xs:enumeration value="Votic"></xs:enumeration>
      <xs:enumeration value="Vro"></xs:enumeration>
      <xs:enumeration value="Waray (Philippines)"></xs:enumeration>
      <xs:enumeration value="Wiyot"></xs:enumeration>
      <xs:enumeration value="Wu Chinese"></xs:enumeration>
      <xs:enumeration value="Wymysorys"></xs:enumeration>
      <xs:enumeration value="Kalmyk Oirat"></xs:enumeration>
      <xs:enumeration value="Mingrelian"></xs:enumeration>
      <xs:enumeration value="Slavey South"></xs:enumeration>
      <xs:enumeration value="Sudovian"></xs:enumeration>
      <xs:enumeration value="Zapotec Isthmus"></xs:enumeration>
      <xs:enumeration value="Cantonese"></xs:enumeration>
      <xs:enumeration value="Hokkien"></xs:enumeration>
      <xs:enumeration value="Teo Chew"></xs:enumeration>
      <xs:enumeration value="Hainanese"></xs:enumeration>
      <xs:enumeration value="Hakka"></xs:enumeration>
      <xs:enumeration value="Undefined"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaThumbCuePointSubType">
    <xs:restriction base="xs:int">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaDistributionProviderType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="attUverseDistribution.ATT_UVERSE"></xs:enumeration>
      <xs:enumeration value="avnDistribution.AVN"></xs:enumeration>
      <xs:enumeration value="comcastMrssDistribution.COMCAST_MRSS"></xs:enumeration>
      <xs:enumeration value="crossKalturaDistribution.CROSS_KALTURA"></xs:enumeration>
      <xs:enumeration value="dailymotionDistribution.DAILYMOTION"></xs:enumeration>
      <xs:enumeration value="doubleClickDistribution.DOUBLECLICK"></xs:enumeration>
      <xs:enumeration value="freewheelDistribution.FREEWHEEL"></xs:enumeration>
      <xs:enumeration value="freewheelGenericDistribution.FREEWHEEL_GENERIC"></xs:enumeration>
      <xs:enumeration value="ftpDistribution.FTP"></xs:enumeration>
      <xs:enumeration value="ftpDistribution.FTP_SCHEDULED"></xs:enumeration>
      <xs:enumeration value="huluDistribution.HULU"></xs:enumeration>
      <xs:enumeration value="ideticDistribution.IDETIC"></xs:enumeration>
      <xs:enumeration value="metroPcsDistribution.METRO_PCS"></xs:enumeration>
      <xs:enumeration value="msnDistribution.MSN"></xs:enumeration>
      <xs:enumeration value="ndnDistribution.NDN"></xs:enumeration>
      <xs:enumeration value="podcastDistribution.PODCAST"></xs:enumeration>
      <xs:enumeration value="quickPlayDistribution.QUICKPLAY"></xs:enumeration>
      <xs:enumeration value="synacorHboDistribution.SYNACOR_HBO"></xs:enumeration>
      <xs:enumeration value="tvComDistribution.TVCOM"></xs:enumeration>
      <xs:enumeration value="timeWarnerDistribution.TIME_WARNER"></xs:enumeration>
      <xs:enumeration value="uverseClickToOrderDistribution.UVERSE_CLICK_TO_ORDER"></xs:enumeration>
      <xs:enumeration value="uverseDistribution.UVERSE"></xs:enumeration>
      <xs:enumeration value="verizonVcastDistribution.VERIZON_VCAST"></xs:enumeration>
      <xs:enumeration value="yahooDistribution.YAHOO"></xs:enumeration>
      <xs:enumeration value="youTubeDistribution.YOUTUBE"></xs:enumeration>
      <xs:enumeration value="youtubeApiDistribution.YOUTUBE_API"></xs:enumeration>
      <xs:enumeration value="tvinciDistribution.TVINCI"></xs:enumeration>
      <xs:enumeration value="unicornDistribution.UNICORN"></xs:enumeration>
      <xs:enumeration value="facebookDistribution.FACEBOOK"></xs:enumeration>
      <xs:enumeration value="pushToNewsDistribution.PUSH_TO_NEWS"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
</xs:schema>
```

--------





<span class="k-et">mrss element</span>





<span class="element-description">A wrapper element that holds the XML structure</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr>
<td>version</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					The XSD version to be used
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>decimal</td>
<td></td>
</tr></tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">ks</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">KS of the user ingesting the content</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>channel</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A single entry wrapper element</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<mrss version="1.0">
  <channel>
    <item>...</item>
    <item>...</item>
    <item>...</item>
  </channel>
</mrss>
```

--------





<span class="k-et">channel element</span>





<span class="element-description">A wrapper element that holds multiple item elements</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr class="">
<td class="first" colspan="2"><span>item</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">holding entry element</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<mrss version="1.0">
  <channel>
    <item>...</item>
    <item>...</item>
    <item>...</item>
  </channel>
</mrss>
```

--------





<span class="k-et">item element</span>





<span class="element-description">A single entry wrapper element</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply from the item element:<br>
						Add - Add a new entry<br>
						Update - Update an existing entry<br>
						Delete - Delete an existing entry
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
			Acceptable values:
			<ul>
<li>add</li>
<li>update</li>
<li>delete</li>
</ul>
</td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>Yes</td>
<td>2</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice-head choice choice-start">
<td class="first">Choice</td>
<td rowspan="1">Option 1</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">type</td>
<td rowspan="2">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
									The type of the new entry.<br>
									Only the MEDIA_CLIP (= 1) type is supported for XML ingestion.<br> 
									This option is used only when applying an &#x201C;Add&#x201D; Action.
								</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaEntryType">KalturaEntryType</a></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first">licenseType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
									The license type of the new entry.<br>
									This option is used only when applying an &#x201C;Add&#x201D; Action.
								</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaLicenseType">KalturaLicenseType</a></td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first">entryId</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
								The identifier of the entry that an update/delete action applies to.<br>
								This option is used only when applying an &#x201C;Update&#x201D; or a &#x201C;Delete&#x201D; Action.
							</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 20 characters<br>
</td>
</tr>
<tr class="choice">
<td class="first">referenceId</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Partner external identifier of the entry</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 2000 characters<br>
</td>
</tr>
<tr class="choice choice-end">
<td class="first">parentReferenceId</td>
<td rowspan="1">Option 3</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Partner external identifier of the parent entry&apos;s reference id&apos;</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 100 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The user identifier of the content creator/owner</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 100 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">name</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The title of the entry</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 256 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">description</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Text that describes the entry</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">keepManualThumbnails</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">flag to keep original thumbnails</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>boolean</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Tags associated with the entry</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>categories</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The categories assigned to the entry</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">partnerData</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Publisher-specific information related to the entry.<br>
						Usually used for implementing an account-specific integration.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 4000 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">partnerSortData</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Partner-specific order used to enable custom ordering and filtering.<br>
						Usually used to implement an account-specific integration.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">accessControlId</td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The access control profile identifier of the entry. If not specified, the account&apos;s default access control profile is used.</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first">accessControl</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The access control profile system name of the entry. If not specified, the account&apos;s default access control profile is used. You can use the Kaltura API to set a specific access control system name.</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">conversionProfileId</td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							The transcoding profile identifier of the entry.<br>
							If the transcoding profile is not specified, the transcoding profile set to the bulk upload API action is used.<br>
							If the bulk upload API action&apos;s transcoding profile is not specified or is set to (-1), the account&apos;s default transcoding profile is used. 
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first">conversionProfile</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							The transcoding profile system name of the entry.<br>
							If the transcoding profile is not specified, the transcoding profile set to the bulk upload API action is used.<br>
							If the bulk upload API action&apos;s transcoding profile is not specified or is set to (-1), the account&apos;s default transcoding profile is used.<br>
							You can use the Kaltura API to set a specific transcoding profile system name.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">startDate</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The scheduled start date for the entry.<br>
						When the start date is not defined, the entry is available for publishing upon creation.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">endDate</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The scheduled end date for the entry.<br>
						When the end date is not defined, the entry is available for publishing with no end time restriction.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">templateEntryId</td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Template entry reference ID.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 20 characters<br>
</td>
</tr>
<tr class="choice choice-end">
<td class="first">templateEntry</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Template entry reference ID.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 2000 characters<br>
</td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start choice-end">
<td class="first"><span>media</span></td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies media-related information, such as media type
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">msDuration</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The duration in miliseconds
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>contentAssets</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Specifies media/flavor asset information, such as location of media files to upload, type of ingestion, and related transcoding flavor settings
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>thumbnails</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Specifies thumbnail-related information, such as location of media files and related thumbnail flavor settings
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td colspan="2" class="first extensions-title">Extensions:</td>
<td colspan="5" class="last extensions-title"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>attachments</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All attachments elements</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>attachment</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Attachment asset element</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>subTitles</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All subTitles elements</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>distributions</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All custom metadata elemets</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>scenes</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue points wrapper element</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>customDataItems</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All custom metadata elemets</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>pluginReplacementOptions</span></td>
<td></td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>widevineAssets</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All widevine elements</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>widevineAsset</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Widevine asset element</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example 1: Adding a new media entry: Adding source media file and a default thumbnail



```xml
<item>
  <action>add</action>
  <type>1</type>
  <licenseType>-1</licenseType>
  <userId>myUserId</userId>
  <name>my entry name</name>
  <description>my entry free text description</description>
  <tags>
    <tag>tag1</tag>
    <tag>tag2</tag>
  </tags>
  <categories>
    <category>examples
					&gt;
				example1</category>
    <category>examples
					&gt;
				example2</category>
  </categories>
  <conversionProfile>MY_TRANSCODING_PROFILE_SYSTEM_NAME</conversionProfile>
  <startDate>2011-05-05T00:00:00</startDate>
  <endDate>2011-05-19T00:00:00</endDate>
  <media>
    <mediaType>1</mediaType>
  </media>
  <contentAssets>...</contentAssets>
  <thumbnails>...</thumbnails>
</item>
```

##### XML Example 2: Adding a new media entry: Adding multiple previously transcoded files as flavors and multiple thumbnails



```xml
<item>
  <action>add</action>
  <type>1</type>
  <licenseType>-1</licenseType>
  <userId>myUserId</userId>
  <name>my entry name</name>
  <description>my entry free text description</description>
  <tags>
    <tag>tag1</tag>
    <tag>tag2</tag>
  </tags>
  <categories>
    <category>examples
					&gt;
				example1</category>
    <category>examples
					&gt;
				example2</category>
  </categories>
  <conversionProfile>MY_TRANSCODING_PROFILE_SYSTEM_NAME</conversionProfile>
  <startDate>2011-05-05T00:00:00</startDate>
  <endDate>2011-05-19T00:00:00</endDate>
  <media>
    <mediaType>1</mediaType>
  </media>
  <contentAssets>
    <content flavorParamsId="0">...</content>
    <content flavorParamsId="1">...</content>
    <content flavorParamsId="2">...</content>
  </contentAssets>
  <thumbnails>
    <thumbnail isDefault="true">...</thumbnail>
    <thumbnail>...</thumbnail>
    <thumbnail>...</thumbnail>
  </thumbnails>
</item>
```

##### XML Example 3: Updating an existing media entry: Updating both metadata and media



```xml
<item>
  <action>update</action>
  <entryId>{entry id}</entryId>
  <userId>UpdatedUserId</userId>
  <name>updated entry name</name>
  <description>updated entry description</description>
  <tags>
    <tag>tag3</tag>
    <tag>tag4</tag>
  </tags>
  <categories>
    <category>examples
					&gt;
				example3</category>
    <category>examples
					&gt;
				example4</category>
  </categories>
  <startDate>2011-05-05T00:00:00</startDate>
  <endDate>2011-05-19T00:00:00</endDate>
  <contentAssets>...</contentAssets>
  <thumbnails>...</thumbnails>
</item>
```

##### XML Example 4: Deleting an existing entry



```xml
<item>
  <action>delete</action>
  <entryId>{entry id}</entryId>
</item>
```

--------





<span class="k-et">media element</span>





<span class="element-description">Media related information</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr class="">
<td class="first" colspan="2">mediaType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Specifies the entry media type.<br>
						Only VIDEO (=1), AUDIO (=5) and IMAGE (=2) are currently supported for XML-based ingestion.
					</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaMediaType">KalturaMediaType</a></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>
    <mediaType>1</mediaType>
  </media>
</item>
```

--------





<span class="k-et">contentAssets element</span>





<span class="element-description">All content assets</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply from the item element:<br>
						Update - Update existing assets for entry<br>
						replace - replace an existing assets for entry
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
			Acceptable values:
			<ul>
<li>update</li>
<li>replace</li>
</ul>
</td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>content</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All Content Assets</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>...</content>
    <content>...</content>
    <content>...</content>
  </contentAssets>
</item>
```

--------





<span class="k-et">assetInfo element</span>





<span class="element-description">Specifies updating or adding info to asset</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>language</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">specifying the language of the asset.</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>label</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">UI label specifications marking the language (will affect how the language is displayed on the multi audio selector on the player)
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <assetInfo language="eng" label="English"></assetInfo>
    </content>
  </contentAssets>
</item>
```

--------





<span class="k-et">content element</span>





<span class="element-description">Specifies media/flavor asset information, such as location of media files to upload, type of ingestion, and related transcoding flavor settings</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>flavorParamsId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					The identifier of the flavor params to be associated with the media/flavor asset. This is the flavor params identifier across partner entries. The identifier can be used to filter content.
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>flavorParams</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					The system name of the flavor params to be associated with the media/flavor asset.<br>
					This is the flavor params identifier across partner entries. The identifier can be used to filter content.
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td>
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr>
<td>assetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					The identifier of the asset to be updated with the media/flavor asset.<br>
					Used only for updating an existing media/flavor asset.
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Specifies specific tags for the ingested flavor asset.<br> 
						Tags are used mostly to set the flavor as suitable for a specific delivery option or device. For example: web, mobile, html5,  iphone, ipad, mbr (mbr is used for setting the flavor to an adaptive bit-rate delivery)<br>
						When the tags element is not set, the tags assigned to the transcoding flavor are used. In any case, tags from this element will be appended to the flavor params tags already set in the system.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first"><span>serverFileContentResource</span></td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the content location is on a Kaltura-hosted server.<br>
							By default, this option is not available to Kaltura partners.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>urlContentResource</span></td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the content location is a URL (http/ftp)
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>sshUrlContentResource</span></td>
<td rowspan="1">Option 3</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the content location is a URL (scp/sftp)
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResource</span></td>
<td rowspan="1">Option 4</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the content location is a path within a remote storage defined in Kaltura.<br> 
							Using this option, only a link to the content location is set from the entry, without actually uploading content to Kaltura.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResources</span></td>
<td rowspan="1">Option 5</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that content is located within several remote storages defined in Kaltura.<br> 
							Using this option, only links to the content locations are set from the entry, without actually uploading content to Kaltura.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>entryContentResource</span></td>
<td rowspan="1">Option 6</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the source of content ingestion is the content of an existing Kaltura entry
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>assetContentResource</span></td>
<td rowspan="1">Option 7</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the source of content ingestion is a specific asset of an existing Kaltura entry
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first"><span>assetInfo</span></td>
<td rowspan="1">Option 9</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Holds assetInfo elements
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>streams</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Holds stream elements that specifies instructions to the transcoding process
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <tags>
        <tag>web</tag>
        <tag>mbr</tag>
      </tags>
      <urlContentResource>...</urlContentResource>
    </content>
  </contentAssets>
</item>
```

--------





<span class="k-et">streams element</span>





<span class="element-description">Holds stream elements that specifies instructions to the transcoding process</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr class="">
<td class="first" colspan="2"><span>stream</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">streams composed of 1..n stream elements</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <streams>...</streams>
    </content>
  </contentAssets>
</item>
```

--------





<span class="k-et">stream element</span>





<span class="element-description">Specifies instructions to the transcoding process on how to handle the multiple audio tracks</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>type</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">stream type</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>trackIndex</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">int specifying the stream location(s) in video file</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>language</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">specifying the language of the audio stream. If not present - mp4 tagging will be assumed</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>channelIndex</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">the stream channel to select the audio from</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>label</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">UI label specifications marking the language (will affect how the language is displayed on the multi audio selector on the player)</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>channelLayout</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">specifying the role of the specific channel</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <streams>
        <stream type="audio" trackIndex="1" language="eng" label="something"></stream>
      </streams>
    </content>
  </contentAssets>
</item>
```

--------





<span class="k-et">thumbnails element</span>





<span class="element-description">All thumbnail assets</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply from the item element:<br>
						Update - Update existing thumbnails<br>
						Replace - Replace all thumbnails
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
			Acceptable values:
			<ul>
<li>update</li>
<li>replace</li>
</ul>
</td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>thumbnail</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All Thumbnails Assets</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>...</contentAssets>
  <thumbnails>
    <thumbnail>...</thumbnail>
  </thumbnails>
</item>
```

--------





<span class="k-et">thumbnail element</span>





<span class="element-description">Specifies thumbnail asset information, such as location of image files to upload, type of ingestion, and related thumbnail flavor settings</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>assetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					The identifier of the asset to be updated with the resource. Used only for updating an existing thumbnail.
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>isDefault</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					Specifies whether this thumbnail is set as the default thumbnail of the entry.
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>boolean</td>
<td></td>
</tr>
<tr>
<td>thumbParamsId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					The identifier of the thumb params to be associated with this thumbnail asset.  This is the thumbnail params identifier across partner entries. The identifier can be used to filter content.
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>thumbParams</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					The thumb params system name to be associated with this thumbnail asset. This is the thumbnail params identifier across partner entries. The identifier can be used to filter content.
				</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td>
					 Maximum length: 120 characters<br>
</td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Specifies specific user tags to set for the thumbnail asset
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first"><span>serverFileContentResource</span></td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the thumbnail location is on a Kaltura-hosted server.<br>
							By default, this option is not available to Kaltura partners.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>urlContentResource</span></td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the thumbnail location is a URL (http/ftp)
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>sshUrlContentResource</span></td>
<td rowspan="1">Option 3</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the content location is a URL (scp/sftp)
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResource</span></td>
<td rowspan="1">Option 4</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the thumbnail location is a path within a remote storage defined in Kaltura.<br>
							Using this option, only a link to the thumbnail location is set from the entry, without actually uploading thumbnails to Kaltura.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResources</span></td>
<td rowspan="1">Option 5</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the thumbnail is located within several remote storages defined in Kaltura.<br> 
							Using this option, only links to the thumbnail locations are set from the entry, without actually uploading thumbnails to Kaltura.
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>entryContentResource</span></td>
<td rowspan="1">Option 6</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the source of thumbnail ingestion is an existing Kaltura entry
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>assetContentResource</span></td>
<td rowspan="1">Option 7</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
							Specifies that the source of thumbnail ingestion is a specific asset of an existing Kaltura entry
						</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>...</contentAssets>
  <thumbnails>
    <thumbnail isDefault="true">
      <urlContentResource>...</urlContentResource>
    </thumbnail>
  </thumbnails>
</item>
```

--------





<span class="k-et">serverFileContentResource element</span>





<span class="element-description">Specifies that the location of content ingestion is on a Kaltura-hosted server. By default, this option is not available to Kaltura partners.</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr>
<td>filePath</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The full path of the file on the Kaltura-hosted server</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr></tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">fileSize</td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The expected size of the file.<br>
						Used for validation.
					</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first">fileChecksum</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The expected checksum of the file.<br>
						Used for validation.
					</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example 1: Adding content from a Kaltura server: Using file size validation



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <serverFileContentResource filePath="/server/external/disc/path/video.mp4">
        <fileSize>453453344</fileSize>
      </serverFileContentResource>
    </content>
  </contentAssets>
  <thumbnails>...</thumbnails>
</item>
```

##### XML Example 2: Adding content from a Kaltura server: Using checksum validation



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <serverFileContentResource filePath="/server/external/disc/path/file.jpg">
        <fileChecksum type="md5">sdfsjodf90sfsdfzfasdfwrg34</fileChecksum>
      </serverFileContentResource>
    </content>
  </contentAssets>
  <thumbnails>...</thumbnails>
</item>
```

--------





<span class="k-et">urlContentResource element</span>





<span class="element-description">Specifies that the location of content ingestion is a URL (http/ftp)</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr>
<td>url</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The URL location of the file</xs:documentation></span><br>
</td>
<td>Yes</td>
<td></td>
<td></td>
</tr></tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <urlContentResource url="http://my.domain/path/video.mp4"></urlContentResource>
    </content>
  </contentAssets>
  <thumbnails>
    <thumbnail>
      <urlContentResource url="http://my.domain/path/thumb.jpg"></urlContentResource>
    </thumbnail>
  </thumbnails>
</item>
```

--------





<span class="k-et">sshUrlContentResource element</span>





<span class="element-description">Specifies that the location of content ingestion is a URL (scp/sftp)</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>url</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The URL location of the file</xs:documentation></span><br>
</td>
<td>Yes</td>
<td></td>
<td></td>
</tr>
<tr>
<td>keyPassphrase</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The SSH key pass phrase</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">privateKey</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The SSH private key string</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">publicKey</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The SSH public key string</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <sshUrlContentResource url="sftp://user@my.domain/path/video.mp4">
        <privateKey>-----BEGIN RSA PRIVATE KEY-----
MIIEoQIBAAKCAQEAxVOIocT3q+aQKUvs53LOnxokoJUtZXKHL+LArNl4a3dhZ8wY
ZPGwodSydB/jo4aHKZztA0YCPd3LOnxoko3LOnxokoJUtCM/DdVGQfb/0+PpWzPe
KIGdzIl3LOoJUtfOAMS6nC3LOnxJUt33LOnxnxokoJUtXN1ej06CYPR5ZfwKFFIO
tK1yWx3LOnxokoJUtNRSdEi</privateKey>
        <publicKey>ssh-rsa AAAAB3NzaC1yc2l4a3dhZ8wYEAAxVOIocT3q+aQKUvs5omvVdPl4a3dhZ8wY+LArTNl4a3dhZ8wl4a3dhZ8wY/jo4aHKZztA0YCPd3LOnxokoJUtACM/Dm0wq67dVGQfb/0+PpWzPeCKIGdEEPAzIlfOAMS6nC3Hy3ydBFbi5IJtbGmXN1ej06CYPR5ZfwKAD8FFIOa7dMYtK1yWxNRSdEih00Z8vEiiAkoEHDatRMKVbluqdPVTleQzgqnYL/45l4a3dhZ8wYnbItnQYQgyxGbYgmMMVGGZsZnpRhRtvhAUOsQoixRC14sKHsl4a3dhZ8wY/l4a3dhZ8wY+qbHEaDdl4a3dhZ8wY/QWnhlhKQwIzXl4a3dhZ8wY== user@my.domain</publicKey>
      </sshUrlContentResource>
    </content>
  </contentAssets>
  <thumbnails>
    <thumbnail>
      <sshUrlContentResource url="scp://user@my.domain/path/thumb.jpg">
        <privateKey>-----BEGIN RSA PRIVATE KEY-----
MIIEoQIBAAKCAQEAxVOIocT3q+aQKUvs53LOnxokoJUtZXKHL+LArNl4a3dhZ8wY
ZPGwodSydB/jo4aHKZztA0YCPd3LOnxoko3LOnxokoJUtCM/DdVGQfb/0+PpWzPe
KIGdzIl3LOoJUtfOAMS6nC3LOnxJUt33LOnxnxokoJUtXN1ej06CYPR5ZfwKFFIO
tK1yWx3LOnxokoJUtNRSdEi</privateKey>
        <publicKey>ssh-rsa AAAAB3NzaC1yc2l4a3dhZ8wYEAAxVOIocT3q+aQKUvs5omvVdPl4a3dhZ8wY+LArTNl4a3dhZ8wl4a3dhZ8wY/jo4aHKZztA0YCPd3LOnxokoJUtACM/Dm0wq67dVGQfb/0+PpWzPeCKIGdEEPAzIlfOAMS6nC3Hy3ydBFbi5IJtbGmXN1ej06CYPR5ZfwKAD8FFIOa7dMYtK1yWxNRSdEih00Z8vEiiAkoEHDatRMKVbluqdPVTleQzgqnYL/45l4a3dhZ8wYnbItnQYQgyxGbYgmMMVGGZsZnpRhRtvhAUOsQoixRC14sKHsl4a3dhZ8wY/l4a3dhZ8wY+qbHEaDdl4a3dhZ8wY/QWnhlhKQwIzXl4a3dhZ8wY== user@my.domain</publicKey>
      </sshUrlContentResource>
    </thumbnail>
  </thumbnails>
</item>
```

--------





<span class="k-et">remoteStorageContentResource element</span>





<span class="element-description">Specifies that the location of content ingestion is a path within a remote storage defined in Kaltura. Using this option, only a link to the content location is set from the entry, without actually uploading content to Kaltura.</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr>
<td>url</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The relative path of the file from the remote storage base directory</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr></tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">storageProfileId</td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The identifier of the remote storage profile used as the source of content ingestion. Only links to the files on this remote storage are set from the entry, without actually uploading content to Kaltura. (The remote storage must be defined in Kaltura.)
					</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first">storageProfile</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The system name of the remote storage profile used as the source of content ingestion. Only links to the files on this remote storage are set from the entry, without actually uploading content to Kaltura. (The remote storage must be defined in Kaltura.)
					</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 120 characters<br>
</td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <remoteStorageContentResource url="path_from_base_dir/video.mp4">
        <storageProfile>MY_STORAGE_PROFILE_SYSTEM_NAME</storageProfile>
      </remoteStorageContentResource>
    </content>
  </contentAssets>
  <thumbnails>
    <thumbnail>
      <remoteStorageContentResource url="path_from_base_dir/thumb.jpg">
        <storageProfile>MY_STORAGE_PROFILE_SYSTEM_NAME</storageProfile>
      </remoteStorageContentResource>
    </thumbnail>
  </thumbnails>
</item>
```

--------





<span class="k-et">remoteStorageContentResources element</span>





<span class="element-description">Sets the location of content ingestion within several remote storages defined in Kaltura. Using this option, only links to the content location are set from the entry, without actually uploading content to Kaltura.</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr class="">
<td class="first" colspan="2"><span>remoteStorageContentResource</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Specifies that the content location is a path within a single remote storage defined in Kaltura.<br> 
						Using this option, only a link to the content location is set from the entry, without actually uploading content to Kaltura.
					</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <remoteStorageContentResources>
        <remoteStorageContentResource url="path_from_base_dir/video.mp4">
          <storageProfile>MY_STORAGE_PROFILE_SYSTEM_NAME_1</storageProfile>
        </remoteStorageContentResource>
        <remoteStorageContentResource url="path_from_base_dir/video.mp4">
          <storageProfile>MY_STORAGE_PROFILE_SYSTEM_NAME_2</storageProfile>
        </remoteStorageContentResource>
      </remoteStorageContentResources>
    </content>
  </contentAssets>
</item>
```

--------





<span class="k-et">entryContentResource element</span>





<span class="element-description">Specifies that the source of content ingestion is the content of an existing Kaltura entry</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr>
<td>entryId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The identifier of the entry that is the origin of the content</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr></tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">flavorParamsId</td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The flavor params identifier of the content origin entry</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first">flavorParams</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The flavor params system name of the content origin entry</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 120 characters<br>
</td>
</tr>
</tbody>
</table>



##### XML Example: Adding flavor asset from an existing entry and associating it with a specific flavor params in a target entry



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <entryContentResource entryId="{origin entry id}">
        <flavorParams>BASIC_SMALL</flavorParams>
      </entryContentResource>
    </content>
  </contentAssets>
</item>
```

--------





<span class="k-et">assetContentResource element</span>





<span class="element-description">Specifies that the source of content ingestion is a specific asset of an existing Kaltura entry</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr>
<td>assetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The identifier of  the asset that is the origin of the content</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr></tbody>
</table>



##### XML Example



```xml
<item>
  <action>add</action>
  <type>1</type>
  <media>...</media>
  <contentAssets>
    <content>
      <assetContentResource assetId="{existing asset id}"></assetContentResource>
    </content>
  </contentAssets>
</item>
```

--------





<span class="k-et">tags element</span>





<span class="element-description">Free text tags</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr class="">
<td class="first" colspan="2">tag</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies a single tag to set for a related object</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td>string</td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example: Entry tags



```xml
<item>
  <action>add</action>
  <tags>
    <tag>tag1</tag>
    <tag>tag2</tag>
  </tags>
  <media>...</media>
  <contentAssets>...</contentAssets>
</item>
```

--------





<span class="k-et">categories element</span>





<span class="element-description">Entry`s category assignment.</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr class="">
<td class="first" colspan="2">category</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies a single category assigned to an entry. Use the &gt; character (`&amp;gt;`) to indicate the position of the category in the category tree hierarchy</xs:documentation></span><br>
</td>
<td>No</td>
<td>32</td>
<td>string</td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example: Entry categories



```xml
<item>
  <action>add</action>
  <categories>
    <category>examples
					&gt;
				example1</category>
    <category>examples
					&gt;
				example2</category>
  </categories>
  <media>...</media>
  <contentAssets>...</contentAssets>
</item>
```

--------





<span class="k-et">scene-ad-cue-point element</span>





<span class="element-description">A single advertisement cue point element</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="extends-title"><td colspan="7">Extended from <span>T_scene</span>
</td></tr>
<tr class="">
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point that marks the start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Searchable keywords associated with a cue point</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class="">
<td class="first" colspan="2">sceneEndTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point that marks the end time</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">sceneTitle</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Text that defines the title</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 250 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">sourceUrl</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The URL of the ad XML</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">adType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates the ad type</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaAdType">KalturaAdType</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">protocolType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates the ad protocol type</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaAdProtocolType">KalturaAdProtocolType</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td colspan="2" class="first extensions-title">Extensions:</td>
<td colspan="5" class="last extensions-title"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>scene-customData</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">XML for custom metadata</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<scene-ad-cue-point systemName="MY_AD_CUE_POINT_SYSTEM_NAME">
  <sceneStartTime>00:00:05</sceneStartTime>
  <tags>
    <tag>tag1</tag>
    <tag>tag2</tag>
  </tags>
  <sceneTitle>my ad title</sceneTitle>
  <sourceUrl>http://source.to.my/ad.xml</sourceUrl>
  <adType>1</adType>
  <protocolType>1</protocolType>
</scene-ad-cue-point>
```

--------





<span class="k-et">scene-annotation element</span>





<span class="element-description">A single annotation cue point element</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="extends-title"><td colspan="7">Extended from <span>T_scene</span>
</td></tr>
<tr class="">
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point that marks the start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Searchable keywords associated with a cue point</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class="">
<td class="first" colspan="2">sceneEndTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point that marks the end time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">sceneText</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A free text description</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">parent</td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The system name of a parent annotation</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr class="choice choice-end">
<td class="first">parentId</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The identifier of a parent annotation</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 250 characters<br>
</td>
</tr>
<tr class="">
<td colspan="2" class="first extensions-title">Extensions:</td>
<td colspan="5" class="last extensions-title"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>scene-customData</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">XML for custom metadata</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example 1: Single annotation



```xml
<scene-annotation entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>tag1</tag>
    <tag>tag2</tag>
  </tags>
  <sceneEndTime>00:00:10</sceneEndTime>
  <sceneText>my annotation</sceneText>
</scene-annotation>
```

##### Example 2: Multiple related annotations



```xml
<scene-annotation entryId="{entry id}" systemName="MY_ANNOTATION_PARENT_SYSTEM_NAME">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>tag1</tag>
    <tag>tag2</tag>
  </tags>
  <sceneEndTime>00:00:10</sceneEndTime>
  <sceneText>my annotation parent</sceneText>
</scene-annotation>
<scene-annotation entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>tag3</tag>
    <tag>tag4</tag>
  </tags>
  <sceneEndTime>00:00:10</sceneEndTime>
  <sceneText>my annotation child</sceneText>
  <parent>MY_ANNOTATION_PARENT_SYSTEM_NAME</parent>
</scene-annotation>
```

--------





<span class="k-et">attachments element</span>





<span class="element-description">All attachments elements</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply:<br>
						Update - Update existing attachment<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>attachment</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All attachment elements</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<attachments>
  <action>update</action>
  <attachment>...</attachment>
  <attachment>...</attachment>
  <attachment>...</attachment>
</attachments>
```

--------





<span class="k-et">attachment element</span>





<span class="element-description">Attachment asset element</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>attachmentAssetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The asset id to be updated with this resource used only for update</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>format</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Attachment asset file format</xs:documentation></span><br>
</td>
<td>No</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaAttachmentType">KalturaAttachmentType</a></td>
<td></td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies specific tags you want to set for the flavor asset</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first"><span>serverFileContentResource</span></td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content ingestion location is on a Kaltura hosted server</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>urlContentResource</span></td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content file location is a URL (http,ftp)</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResource</span></td>
<td rowspan="1">Option 3</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content file location is a path within a Kaltura defined remote storage</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResources</span></td>
<td rowspan="1">Option 4</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Set of content files within several Kaltura defined remote storages</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>entryContentResource</span></td>
<td rowspan="1">Option 5</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content is a Kaltura entry</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>assetContentResource</span></td>
<td rowspan="1">Option 6</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content is a Kaltura asset</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">filename</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Attachment asset file name</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">title</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Attachment asset title</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">description</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Attachment asset free text description</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<attachment format="1" attachmentAssetId="{asset id}">
  <tags>
    <tag>example</tag>
    <tag>my_tag</tag>
  </tags>
  <urlContentResource url="http://my.domain/path/file.txt"></urlContentResource>
  <filename>my_file_name.txt</filename>
  <title>my attachment asset title</title>
  <description>my attachment asset free text description</description>
</attachment>
```

--------





<span class="k-et">subTitles element</span>





<span class="element-description">All subTitles elements</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply:<br>
						Update - Update existing subtitles<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>subTitle</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All subTitles elements</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<subTitles>
  <action>update</action>
  <subTitle>...</subTitle>
  <subTitle>...</subTitle>
  <subTitle>...</subTitle>
</subTitles>
```

--------





<span class="k-et">subTitle element</span>





<span class="element-description">A single caption asset element</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>label</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specify label you want to set for the caption asset</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>captionParamsId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The asset id to be updated with this resource used only for update</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>captionParams</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">System name of caption params to be associated with the caption asset</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>captionAssetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of caption params to be associated with the caption asset</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>isDefault</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies if this asset is the default caption asset</xs:documentation></span><br>
</td>
<td>No</td>
<td>boolean</td>
<td></td>
</tr>
<tr>
<td>format</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Caption asset file format</xs:documentation></span><br>
</td>
<td>No</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaCaptionType">KalturaCaptionType</a></td>
<td></td>
</tr>
<tr>
<td>lang</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Caption asset file language</xs:documentation></span><br>
</td>
<td>No</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaLanguage">KalturaLanguage</a></td>
<td></td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies specific tags you want to set for the flavor asset</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first"><span>serverFileContentResource</span></td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content ingestion location is on a Kaltura hosted server</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>urlContentResource</span></td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content file location is a URL (http,ftp)</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResource</span></td>
<td rowspan="1">Option 3</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content file location is a path within a Kaltura defined remote storage</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResources</span></td>
<td rowspan="1">Option 4</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Set of content files within several Kaltura defined remote storages</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>entryContentResource</span></td>
<td rowspan="1">Option 5</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content is a Kaltura entry</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>assetContentResource</span></td>
<td rowspan="1">Option 6</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies that content is a Kaltura asset</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<subTitle isDefault="true" format="2" lang="Hebrew">
  <tags>
    <tag>tag1</tag>
    <tag>tag2</tag>
  </tags>
  <urlContentResource url="http://my.domain/path/caption.srt"></urlContentResource>
</subTitle>
```

--------





<span class="k-et">scene-code-cue-point element</span>





<span class="element-description">A single code cue point element</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="extends-title"><td colspan="7">Extended from <span>T_scene</span>
</td></tr>
<tr class="">
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point that marks the start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Searchable keywords associated with a cue point</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class="">
<td class="first" colspan="2">sceneEndTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point that marks the end time</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">code</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Textual code</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 250 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">description</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A free text description</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td colspan="2" class="first extensions-title">Extensions:</td>
<td colspan="5" class="last extensions-title"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>scene-customData</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">XML for custom metadata</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<scene-code-cue-point entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>tag1</tag>
    <tag>tag2</tag>
  </tags>
  <code>MY_CODE</code>
  <description>my code cue point description</description>
</scene-code-cue-point>
```

--------





<span class="k-et">scene-thumb-cue-point element</span>





<span class="element-description">Single thumb cue point element</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="extends-title"><td colspan="7">Extended from <span>T_scene</span>
</td></tr>
<tr class="">
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point that marks the start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Searchable keywords associated with a cue point</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class="">
<td class="first" colspan="2">title</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">description</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">subType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates the thumb cue point sub type 1 = Slide 2 = Chapter, defaults to Slide</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaThumbCuePointSubType">KalturaThumbCuePointSubType</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>slide</span></td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td colspan="2" class="first extensions-title">Extensions:</td>
<td colspan="5" class="last extensions-title"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>scene-customData</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">XML for custom metadata</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<scene-thumb-cue-point sceneId="{scene id}" entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>my_tag</tag>
  </tags>
  <slide>
    <urlContentResource url="URL_TO_FILE"></urlContentResource>
  </slide>
</scene-thumb-cue-point>
```

--------





<span class="k-et">slide element</span>





<span class="element-description">
				The slide image to attahce to tht thumb cue point ellement
			</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr>
<td>timedThumbAssetId</td>
<td></td>
<td>No</td>
<td>string</td>
<td></td>
</tr></tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first"><span>urlContentResource</span></td>
<td rowspan="1">Option 1</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResource</span></td>
<td rowspan="1">Option 2</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>remoteStorageContentResources</span></td>
<td rowspan="1">Option 3</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>assetContentResource</span></td>
<td rowspan="1">Option 4</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first"><span>entryContentResource</span></td>
<td rowspan="1">Option 5</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



--------





<span class="k-et">distributions element</span>





<span class="element-description">All custom metadata elemets</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr class="">
<td class="first" colspan="2"><span>distribution</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All distributions</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<distributions>
  <distribution>
    <distributionProfile>MY_DISTRIBUTION_PROFILE</distributionProfile>
    <sunrise>2011-10-26T21:32:52</sunrise>
    <sunset>2011-12-26T21:32:52</sunset>
  </distribution>
</distributions>
```

--------





<span class="k-et">distribution element</span>





<span class="element-description">Details related to a content distribution submission</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>entryDistributionId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The identifier of an entry distribution object that an update/delete action applies to</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>submitWhenReady</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates that the entry should be submitted when it is possible</xs:documentation></span><br>
</td>
<td>No</td>
<td>boolean</td>
<td></td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first">distributionProvider</td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The provider (Distribution Partner) that the entry is distributed to</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaDistributionProviderType">KalturaDistributionProviderType</a></td>
<td class="last"></td>
</tr>
<tr class="choice">
<td class="first">distributionProfileId</td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The identifier of the distribution profile to use for entry distribution</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first">distributionProfile</td>
<td rowspan="1">Option 3</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The system name of the distribution profile to use for entry distribution</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">sunrise</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The date and time that the entry becomes available on the remote site.<br>
						If not specified, the entry scheduling date and time are used.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">sunset</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The date and time that the entry becomes unavailable on the remote site.<br>
						If not specified, the entry scheduling date and time are used.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">flavorAssetIds</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Comma-separated list of existing flavor asset IDs for the distribution destination.<br>
						Used only for an existing entry.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">thumbAssetIds</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						Comma-separated list of existing thumbnail asset IDs for the distribution destination.<br>
						Used only for an existing entry.
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<distribution>
  <distributionProfile>MY_DISTRIBUTION_PROFILE</distributionProfile>
  <sunrise>2011-10-26T21:32:52</sunrise>
  <sunset>2011-12-26T21:32:52</sunset>
</distribution>
```

--------





<span class="k-et">scenes element</span>





<span class="element-description">A cue points wrapper element</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply from the item element:<br>
						Update - Update an existing entry<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>scene</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point element</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<scenes>
  <action>update</action>
  <scene-ad-cue-point entryId="{entry id}" systemName="MY_AD_CUE_POINT_SYSTEM_NAME">...</scene-ad-cue-point>
  <scene-annotation entryId="{entry id}" systemName="MY_ANNOTATION_PARENT_SYSTEM_NAME">...</scene-annotation>
  <scene-annotation entryId="{entry id}">...</scene-annotation>
  <scene-code-cue-point entryId="{entry id}">...</scene-code-cue-point>
</scenes>
```

--------





<span class="k-et">scene element</span>





<span class="element-description">
				A base cue point element. This is an abstract element and cannot be used. Use only extended elements.
			</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>sceneId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The identifier of the cue point that an update/delete action applies to</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td>
					 Maximum length: 250 characters<br>
</td>
</tr>
<tr>
<td>systemName</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The system name of the cue point that an update/delete action applies to</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td>
					 Maximum length: 120 characters<br>
</td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">A cue point that marks the start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Searchable keywords associated with a cue point</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



<span class="element-extended-title">Extended elements</span>



<ol>
<li><span>scene-ad-cue-point</span></li>
<li><span>scene-annotation</span></li>
<li><span>scene-code-cue-point</span></li>
<li><span>scene-thumb-cue-point</span></li>
</ol>

--------





<span class="k-et">scene-customData element</span>





<span class="element-description">XML for custom metadata</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>metadataId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The identifier of the custom metadata object that an update/delete action applies to</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>metadataProfile</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The schema profile system name of the custom metadata</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td>
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr>
<td>metadataProfileId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The schema profile identifier of the custom metadata</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply:<br>
						transformXslt - transform metadata object using Xslt<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
			Acceptable values:
			<ul>
<li>transformXslt</li>
<li>replace</li>
</ul>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">xslt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The xslt to transform on the current metadata object
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>xmlData</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">metadata xml Data</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<scene-ad-cue-point entryId="{entry id}">
  <sceneStartTime>00:00:05</sceneStartTime>
  <sceneTitle>my ad title</sceneTitle>
  <sourceUrl>http://source.to.my/ad.xml</sourceUrl>
  <adType>1</adType>
  <protocolType>1</protocolType>
  <scene-customData metadataProfile="MY_AD_METADATA_PROFILE_SYSTEM_NAME">
    <metadata>
      <adData>my ad custom data</adData>
    </metadata>
  </scene-customData>
</scene-ad-cue-point>
```

--------





<span class="k-et">customDataItems element</span>





<span class="element-description">All custom metadata elemets</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply:<br>
						Update - Update metadata for existing entry<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>customData</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All custom data elemets</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<customDataItems>
  <action>update</action>
  <customData>...</customData>
  <customData>...</customData>
  <customData>...</customData>
</customDataItems>
```

--------





<span class="k-et">customData element</span>





<span class="element-description">XML for custom metadata</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr>
<td>metadataId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The identifier of the custom metadata object that an update/delete action applies to</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>metadataProfile</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The schema profile system name of the custom metadata</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td>
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr>
<td>metadataProfileId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The schema profile identifier of the custom metadata</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
</tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply:<br>
						transformXslt - transform metadata object using Xslt<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
			Acceptable values:
			<ul>
<li>transformXslt</li>
<li>replace</li>
</ul>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">xslt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The xslt to transform on the current metadata object
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>xmlData</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">metadata xml Data</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<customData metadataId="{metadata id}" metadataProfile="MY_METADATA_PROFILE_SYSTEM_NAME}" metadataProfileId="{metadata profile id}">
  <action>transformXslt</action>
  <xslt></xslt>
  <xmlData>
    <metadata>
      <TextFieldName>entry field value</TextFieldName>
      <MultipleTextFieldName>entry multiple text field value1</MultipleTextFieldName>
      <MultipleTextFieldName>entry multiple text field value2</MultipleTextFieldName>
      <TextSelectionListFieldName>entry selected text value</TextSelectionListFieldName>
      <DateFieldName>21741540</DateFieldName>
      <EntryIDFieldName>0_5b3t2c8z</EntryIDFieldName>
    </metadata>
  </xmlData>
</customData>
```

--------





<span class="k-et">xmlData element</span>





<span class="element-description">XML data for custom metadata</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr class="">
<td class="first" colspan="2">[Any element]</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The XML for custom metadata according to a schema profile</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>any type</td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<xmlData>
  <metadata>
    <TextFieldName>entry field value</TextFieldName>
    <MultipleTextFieldName>entry multiple text field value1</MultipleTextFieldName>
    <MultipleTextFieldName>entry multiple text field value2</MultipleTextFieldName>
    <TextSelectionListFieldName>entry selected text value</TextSelectionListFieldName>
    <DateFieldName>21741540</DateFieldName>
    <EntryIDFieldName>0_5b3t2c8z</EntryIDFieldName>
  </metadata>
</xmlData>
```

--------





<span class="k-et">pluginReplacementOptions element</span>







##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="extends-title"><td colspan="7">Extended from <span>T_pluginReplacementOptions</span>
</td></tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class="">
<td class="first" colspan="2">metadataReplacementOptionsItem</td>
<td></td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<pluginReplacementOptions>
  <pluginReplacementOptionsItem>
						...
						</pluginReplacementOptionsItem>
  <pluginReplacementOptionsItem>
						...
						</pluginReplacementOptionsItem>
						...
						...
					
</pluginReplacementOptions>
```

--------





<span class="k-et">widevineAssets element</span>





<span class="element-description">All widevine elements</span>





##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">action</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The action to apply:<br>
						Update - Update existing asset<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>widevineAsset</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">All widevine elements</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<widevineAssets>
  <action>update</action>
  <widevineAsset>...</widevineAsset>
  <widevineAsset>...</widevineAsset>
  <widevineAsset>...</widevineAsset>
</widevineAssets>
```

--------





<span class="k-et">widevineAsset element</span>





<span class="element-description">Widevine asset element</span>





##### Attributes



<table>
<thead><tr>
<th>Attribute Name</th>
<th>Description</th>
<th>Required</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody><tr>
<td>flavorAssetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The asset id to be updated with this resource used only for update</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr></tbody>
</table>



##### Sub-Elements



<table>
<thead><tr>
<th colspan="2">Element Name</th>
<th>Description</th>
<th>Required</th>
<th>Maximum Appearances</th>
<th>Type</th>
<th>Restrictions</th>
</tr></thead>
<tbody>
<tr class="">
<td class="first" colspan="2">widevineAssetId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">widevine asset id</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>long</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">flavorParamsId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">widevine asset flavor params Id</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>long</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">widevineDistributionStartDate</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The license distribution window start date.<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">widevineDistributionEndDate</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
						The license distribution window end date.<br>
					</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<widevineAsset flavorAssetId="{asset id}">
  <widevineAssetId>123456</widevineAssetId>
  <flavorParamsId>61</flavorParamsId>
  <widevineDistributionStartDate>2011-05-05T00:00:00</widevineDistributionStartDate>
  <widevineDistributionEndDate>2014-05-19T00:00:00</widevineDistributionEndDate>
</widevineAsset>
```



