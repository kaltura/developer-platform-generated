# Syndication Feed

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



<span class="undefined">http://www.kaltura.com/api_v3/index.php/service/schema/action/serve/type/syndication/name/syndication.xsd</span>













```xml
<xs:schema version="2.0">
  <xs:complexType name="T_rss">
    <xs:sequence>
      <xs:element ref="channel" maxOccurs="unbounded" minOccurs="1"></xs:element>
      <xs:element ref="rss-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="version" type="xs:decimal"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_channel">
    <xs:sequence>
      <xs:element name="title" maxOccurs="1" minOccurs="0" type="xs:string"></xs:element>
      <xs:element name="link" maxOccurs="1" minOccurs="0" type="xs:string"></xs:element>
      <xs:element name="description" maxOccurs="1" minOccurs="0" type="xs:string"></xs:element>
      <xs:element ref="items" maxOccurs="1" minOccurs="1"></xs:element>
      <xs:element ref="channel-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_items">
    <xs:sequence>
      <xs:element ref="item" maxOccurs="unbounded" minOccurs="1"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_item">
    <xs:sequence>
      <xs:element name="entryId" minOccurs="1" maxOccurs="1" nillable="false">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="20"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element name="referenceID" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="createdAt" minOccurs="1" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="updatedAt" minOccurs="1" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="title" minOccurs="1" maxOccurs="1">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="60"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element name="link" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="type" minOccurs="1" maxOccurs="1" type="KalturaEntryType"></xs:element>
      <xs:element name="licenseType" minOccurs="0" maxOccurs="1" type="KalturaLicenseType"></xs:element>
      <xs:element name="userId" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="name" minOccurs="0" maxOccurs="1">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="60"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element name="status" minOccurs="1" maxOccurs="1" type="KalturaEntryStatus"></xs:element>
      <xs:element name="description" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="thumbnailUrl" minOccurs="0" maxOccurs="1">
        <xs:complexType>
          <xs:attribute name="url" type="xs:string"></xs:attribute>
        </xs:complexType>
      </xs:element>
      <xs:element ref="tags" minOccurs="0" maxOccurs="1"></xs:element>
      <xs:element ref="category" minOccurs="0" maxOccurs="unbounded"></xs:element>
      <xs:element name="partnerData" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="partnerSortData" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="accessControlId" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="conversionProfileId" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="startDate" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="endDate" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:choice minOccurs="0" maxOccurs="1">
        <xs:element ref="media" minOccurs="1" maxOccurs="1"></xs:element>
      </xs:choice>
      <xs:choice minOccurs="0" maxOccurs="unbounded">
        <xs:element ref="content" minOccurs="1" maxOccurs="1"></xs:element>
        <xs:element ref="thumbnail" minOccurs="1" maxOccurs="1"></xs:element>
      </xs:choice>
      <xs:element ref="item-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
      <xs:element ref="player" minOccurs="0" maxOccurs="1"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_media">
    <xs:sequence>
      <xs:element name="mediaType" minOccurs="1" maxOccurs="1" type="KalturaMediaType"></xs:element>
      <xs:element name="duration" minOccurs="1" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="flavorParamsIds" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="plays" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="views" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element ref="media-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_content">
    <xs:sequence>
      <xs:element ref="tags" minOccurs="0" maxOccurs="1"></xs:element>
      <xs:element ref="content-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="url" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="flavorAssetId" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="containerFormat" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="format" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="extension" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="createdAt" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="isSource" type="xs:boolean" use="required"></xs:attribute>
    <xs:attribute name="height" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="width" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="fileSize" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="videoBitrate" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="videoCodec" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="audioBitrate" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="audioCodec" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="frameRate" type="xs:float" use="optional"></xs:attribute>
    <xs:attribute name="flavorParamsId" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="flavorParamsName" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="assetId" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_thumbnail">
    <xs:sequence>
      <xs:element ref="tags" minOccurs="0" maxOccurs="1"></xs:element>
      <xs:element ref="thumbnail-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="url" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="thumbAssetId" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="format" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="extension" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="isDefault" type="xs:boolean" use="required"></xs:attribute>
    <xs:attribute name="height" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="width" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="fileSize" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="createdAt" type="xs:string" use="required"></xs:attribute>
    <xs:attribute name="thumbParamsId" type="xs:int" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_player">
    <xs:sequence>
      <xs:element ref="player-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="url" type="xs:string" use="required"></xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_tags">
    <xs:sequence>
      <xs:element name="tag" type="xs:string" minOccurs="1" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_category">
    <xs:simpleContent>
      <xs:extension base="xs:string">
        <xs:attribute name="name" use="required" type="xs:string"></xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>
  <xs:element name="rss" type="T_rss"></xs:element>
  <xs:element name="channel" type="T_channel"></xs:element>
  <xs:element name="items" type="T_items"></xs:element>
  <xs:element name="item" type="T_item"></xs:element>
  <xs:element name="media" type="T_media"></xs:element>
  <xs:element name="content" type="T_content"></xs:element>
  <xs:element name="thumbnail" type="T_thumbnail"></xs:element>
  <xs:element name="player" type="T_player"></xs:element>
  <xs:element name="tags" type="T_tags"></xs:element>
  <xs:element name="category" type="T_category"></xs:element>
  <xs:element name="rss-extension"></xs:element>
  <xs:element name="channel-extension"></xs:element>
  <xs:element name="item-extension"></xs:element>
  <xs:element name="media-extension"></xs:element>
  <xs:element name="mix-extension"></xs:element>
  <xs:element name="playlist-extension"></xs:element>
  <xs:element name="data-extension"></xs:element>
  <xs:element name="liveStream-extension"></xs:element>
  <xs:element name="content-extension"></xs:element>
  <xs:element name="thumbnail-extension"></xs:element>
  <xs:element name="player-extension"></xs:element>
  <xs:complexType name="T_customData">
    <xs:sequence>
      <xs:any namespace="##local" processContents="skip" minOccurs="1" maxOccurs="1"></xs:any>
    </xs:sequence>
    <xs:attribute name="metadataId" use="required" type="xs:int"></xs:attribute>
    <xs:attribute name="metadataVersion" use="required" type="xs:int"></xs:attribute>
    <xs:attribute name="metadataProfile" use="optional" type="xs:string"></xs:attribute>
    <xs:attribute name="metadataProfileId" use="required" type="xs:int"></xs:attribute>
    <xs:attribute name="metadataProfileName" use="optional" type="xs:string"></xs:attribute>
    <xs:attribute name="metadataProfileVersion" use="required" type="xs:int"></xs:attribute>
  </xs:complexType>
  <xs:element name="customData" type="T_customData" substitutionGroup="item-extension"></xs:element>
  <xs:complexType name="T_scene_adCuePoint">
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
  <xs:element name="scene-ad-cue-point" type="T_scene_adCuePoint" substitutionGroup="scene"></xs:element>
  <xs:complexType name="T_scene_annotation">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="sceneEndTime" minOccurs="1" maxOccurs="1" type="xs:time"></xs:element>
          <xs:element name="sceneText" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="parent" minOccurs="0" maxOccurs="1">
            <xs:simpleType>
              <xs:restriction base="xs:string">
                <xs:maxLength value="120"></xs:maxLength>
              </xs:restriction>
            </xs:simpleType>
          </xs:element>
          <xs:element name="parentId" minOccurs="0" maxOccurs="1">
            <xs:simpleType>
              <xs:restriction base="xs:string">
                <xs:maxLength value="250"></xs:maxLength>
              </xs:restriction>
            </xs:simpleType>
          </xs:element>
          <xs:element ref="scene-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="scene-annotation" type="T_scene_annotation" substitutionGroup="scene"></xs:element>
  <xs:complexType name="T_attachment">
    <xs:sequence>
      <xs:element name="tags" minOccurs="1" maxOccurs="1" type="T_tags"></xs:element>
      <xs:element name="filename" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="title" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="description" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element ref="attachment-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="attachmentAssetId" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="format" type="KalturaAttachmentType" use="optional"></xs:attribute>
    <xs:attribute name="url" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:element name="attachment-extension"></xs:element>
  <xs:element name="attachment" type="T_attachment" substitutionGroup="item-extension"></xs:element>
  <xs:complexType name="T_subTitle">
    <xs:sequence>
      <xs:element name="tags" minOccurs="1" maxOccurs="1" type="T_tags"></xs:element>
      <xs:element ref="subtitle-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="captionParamsId" type="xs:int" use="optional"></xs:attribute>
    <xs:attribute name="captionParams" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="captionAssetId" type="xs:string" use="optional"></xs:attribute>
    <xs:attribute name="isDefault" type="xs:boolean" use="optional"></xs:attribute>
    <xs:attribute name="format" type="KalturaCaptionType" use="optional"></xs:attribute>
    <xs:attribute name="lang" type="KalturaLanguage" use="optional"></xs:attribute>
    <xs:attribute name="href" type="xs:string" use="optional"></xs:attribute>
  </xs:complexType>
  <xs:element name="subtitle-extension"></xs:element>
  <xs:element name="subTitle" type="T_subTitle" substitutionGroup="item-extension"></xs:element>
  <xs:complexType name="T_scene_codeCuePoint">
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
  <xs:element name="scene-code-cue-point" type="T_scene_codeCuePoint" substitutionGroup="scene"></xs:element>
  <xs:complexType name="T_scene_thumbCuePoint">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="title" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="description" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="subType" minOccurs="0" maxOccurs="1" type="KalturaThumbCuePointSubType"></xs:element>
          <xs:element ref="scene-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="scene-thumb-cue-point" type="T_scene_thumbCuePoint" substitutionGroup="scene"></xs:element>
  <xs:complexType name="T_distribution">
    <xs:sequence>
      <xs:element name="remoteId" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="sunrise" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="sunset" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="flavorAssetIds" minOccurs="0" maxOccurs="1">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="flavorAssetId" minOccurs="0" maxOccurs="unbounded" type="xs:string"></xs:element>
          </xs:sequence>
        </xs:complexType>
      </xs:element>
      <xs:element name="thumbAssetIds" minOccurs="0" maxOccurs="1">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="thumbAssetId" minOccurs="0" maxOccurs="unbounded" type="xs:string"></xs:element>
          </xs:sequence>
        </xs:complexType>
      </xs:element>
      <xs:element name="assetIds" minOccurs="0" maxOccurs="1">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="assetId" minOccurs="0" maxOccurs="unbounded" type="xs:string"></xs:element>
          </xs:sequence>
        </xs:complexType>
      </xs:element>
      <xs:element name="errorDescription" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element name="createdAt" minOccurs="1" maxOccurs="1" type="xs:dateTime"></xs:element>
      <xs:element name="updatedAt" minOccurs="1" maxOccurs="1" type="xs:dateTime"></xs:element>
      <xs:element name="submittedAt" minOccurs="0" maxOccurs="1" type="xs:dateTime"></xs:element>
      <xs:element name="lastReport" minOccurs="0" maxOccurs="1" type="xs:dateTime"></xs:element>
      <xs:element name="dirtyStatus" minOccurs="0" maxOccurs="1" type="KalturaEntryDistributionFlag"></xs:element>
      <xs:element name="status" minOccurs="1" maxOccurs="1" type="KalturaEntryDistributionStatus"></xs:element>
      <xs:element name="sunStatus" minOccurs="1" maxOccurs="1" type="KalturaEntryDistributionSunStatus"></xs:element>
      <xs:element name="plays" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="views" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="errorNumber" minOccurs="0" maxOccurs="1" type="xs:int"></xs:element>
      <xs:element name="errorType" minOccurs="0" maxOccurs="1" type="KalturaBatchJobErrorTypes"></xs:element>
      <xs:element ref="distribution-extension" minOccurs="0" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
    <xs:attribute name="entryDistributionId" use="required" type="xs:int"></xs:attribute>
    <xs:attribute name="provider" use="optional" type="xs:string"></xs:attribute>
    <xs:attribute name="distributionProviderId" use="optional" type="xs:int"></xs:attribute>
    <xs:attribute name="feedId" use="optional" type="xs:string"></xs:attribute>
    <xs:attribute name="distributionProfileId" use="required" type="xs:int"></xs:attribute>
    <xs:attribute name="distributionProfile" use="optional" type="xs:string"></xs:attribute>
    <xs:attribute name="distributionProfileName" use="optional" type="xs:string"></xs:attribute>
  </xs:complexType>
  <xs:element name="distribution" type="T_distribution" substitutionGroup="item-extension"></xs:element>
  <xs:element name="distribution-extension"></xs:element>
  <xs:complexType name="T_scenes">
    <xs:sequence>
      <xs:element ref="scene" minOccurs="1" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_scene" abstract="true">
    <xs:sequence>
      <xs:element name="sceneStartTime" minOccurs="1" maxOccurs="1" type="xs:time"></xs:element>
      <xs:element name="createdAt" minOccurs="1" maxOccurs="1" type="xs:dateTime"></xs:element>
      <xs:element name="updatedAt" minOccurs="1" maxOccurs="1" type="xs:dateTime"></xs:element>
      <xs:element name="userId" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
      <xs:element ref="tags" minOccurs="0" maxOccurs="1"></xs:element>
    </xs:sequence>
    <xs:attribute name="sceneId" use="required">
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
  <xs:complexType name="T_scene_questionCuePoint">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="question" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="hint" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="explanation" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="optionalAnswers" minOccurs="0" maxOccurs="1" type="KalturaOptionalAnswersArray"></xs:element>
          <xs:element name="correctAnswerKeys" minOccurs="0" maxOccurs="1" type="KalturaStringArray"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="scene-question-cue-point" type="T_scene_questionCuePoint" substitutionGroup="scene"></xs:element>
  <xs:complexType name="T_scene_answerCuePoint">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="answerKey" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="quizUserEntryId" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="parentId" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="scene-answer-cue-point" type="T_scene_answerCuePoint" substitutionGroup="scene"></xs:element>
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
  <xs:simpleType name="KalturaEntryStatus">
    <xs:restriction base="xs:string">
      <xs:enumeration value="-2"></xs:enumeration>
      <xs:enumeration value="-1"></xs:enumeration>
      <xs:enumeration value="0"></xs:enumeration>
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
      <xs:enumeration value="4"></xs:enumeration>
      <xs:enumeration value="5"></xs:enumeration>
      <xs:enumeration value="6"></xs:enumeration>
      <xs:enumeration value="7"></xs:enumeration>
      <xs:enumeration value="virusScan.Infected"></xs:enumeration>
      <xs:enumeration value="virusScan.ScanFailure"></xs:enumeration>
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
  <xs:simpleType name="KalturaEntryDistributionFlag">
    <xs:restriction base="xs:int">
      <xs:enumeration value="0"></xs:enumeration>
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
      <xs:enumeration value="4"></xs:enumeration>
      <xs:enumeration value="5"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaEntryDistributionStatus">
    <xs:restriction base="xs:int">
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
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaEntryDistributionSunStatus">
    <xs:restriction base="xs:int">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaBatchJobErrorTypes">
    <xs:restriction base="xs:int">
      <xs:enumeration value="0"></xs:enumeration>
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
      <xs:enumeration value="4"></xs:enumeration>
      <xs:enumeration value="5"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
</xs:schema>
```

--------





<span class="k-et">rss element</span>





<span class="element-description">Wrapper element holding XML structure
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
<td>version</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					Indicates the XSD version to be used
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
<tbody><tr class="">
<td class="first" colspan="2"><span>channel</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">holding item elements</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<rss version="2.0">
  <channel>
    <title>My Feed Title</title>
    <link></link>
    <description>my feed description</description>
    <items>
      <item>...</item>
      <item>...</item>
      <item>...</item>
    </items>
  </channel>
</rss>
```

--------





<span class="k-et">channel element</span>





<span class="element-description">Wrapper element holding multiple item elements</span>





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
<td class="first" colspan="2">title</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Title of the feed</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">link</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Feed link URL</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">description</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Feed description</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>items</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Wrapper element holding multiple item elements</xs:documentation></span><br>
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
<channel>
  <title>My Feed Title</title>
  <link></link>
  <description>my feed description</description>
  <items>
    <item>...</item>
    <item>...</item>
    <item>...</item>
  </items>
</channel>
```

--------





<span class="k-et">items element</span>





<span class="element-description">Wrapper element holding multiple item elements</span>





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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Single entry element</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<items>
  <item>...</item>
  <item>...</item>
  <item>...</item>
</items>
```

--------





<span class="k-et">item element</span>





<span class="element-description">Single entry wrapper element</span>





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
<td class="first" colspan="2">entryId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Auto generated 10 characters alphanumeric string</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 20 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">referenceID</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Partner external reference string</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry creation date as Unix timestamp (In seconds)</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry last update date as Unix timestamp (In seconds)</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">title</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry name</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 60 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">link</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry link URL</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">type</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry type</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaEntryType">KalturaEntryType</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">licenseType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry license type</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaLicenseType">KalturaLicenseType</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The ID of the user who is the owner of this entry</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">name</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry name</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 60 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">status</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry status</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaEntryStatus">KalturaEntryStatus</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">description</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry free text description</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">thumbnailUrl</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry thumbnail URL</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>category</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry assigned categories</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">partnerData</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Used to store various partner related data as a string</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">partnerSortData</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Used to store various partner related data as a numeric value</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">accessControlId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The id of the access control profile that assigned to this entry</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">conversionProfileId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The ingestion profile that used to ingest this entry</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">startDate</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry scheduling start date</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">endDate</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry scheduling end date.<br>If not specified the entry will be available forever</xs:documentation></span><br>
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
<tr class="choice choice-start choice-end">
<td class="first"><span>media</span></td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Media related information, such as media type</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice-head ">
<td class="first" colspan="2">Choice</td>
<td></td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last">
						One of the following choices
					</td>
</tr>
<tr class="choice choice-start">
<td class="first"><span>content</span></td>
<td rowspan="1">Option 1</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor asset information</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="choice choice-end">
<td class="first"><span>thumbnail</span></td>
<td rowspan="1">Option 2</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Thumbnail asset information</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td colspan="2" class="first extensions-title">Extensions:</td>
<td colspan="5" class="last extensions-title"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>customData</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata XML</xs:documentation></span><br>
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
<td class="first" colspan="2"><span>subTitle</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Caption asset element</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>distribution</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution element</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extension ">
<td class="first" colspan="2"><span>scenes</span></td>
<td>
<span class="child-extension-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue points wrapper</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>player</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Embeded player</xs:documentation></span><br>
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
  <entryId>{entry id}</entryId>
  <createdAt>1311878948</createdAt>
  <updatedAt>1311879522</updatedAt>
  <title>my entry name</title>
  <link>http://my.feed.url?entry_id={entry id}</link>
  <type>1</type>
  <licenseType>-1</licenseType>
  <userId>my.example.user</userId>
  <name>my entry name</name>
  <status>2</status>
  <description>my entry free text description</description>
  <thumbnailUrl url="http://kaltura.domain/thumbnail/path/to/file.jpg"></thumbnailUrl>
  <tags>
    <tag>example</tag>
    <tag>my_tag</tag>
  </tags>
  <category name="example1">examples
					&gt;
				example1</category>
  <category name="example2">examples
					&gt;
				example2</category>
  <partnerData>my advanced data</partnerData>
  <accessControlId>{access control id}</accessControlId>
  <conversionProfileId>{conversion profile id}</conversionProfileId>
  <media>
    <mediaType>1</mediaType>
    <duration>34951</duration>
    <flavorParamsIds>0,3</flavorParamsIds>
  </media>
  <thumbnail url="http://kaltura.domain/thumbnail/path/to/thumbnail1.jpg">...</thumbnail>
  <thumbnail url="http://kaltura.domain/thumbnail/path/to/thumbnail2.jpg">...</thumbnail>
  <content url="http://kaltura.domain/flavor/path/to/flavor1.flv">...</content>
  <content url="http://kaltura.domain/flavor/path/to/flavor2.flv">...</content>
</item>
```

--------





<span class="k-et">media element</span>





<span class="element-description">Media related information, such as media type</span>





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
<td class="first" colspan="2">mediaType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry media type</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaMediaType">KalturaMediaType</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">duration</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry media (video/audio) duration</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">flavorParamsIds</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Comma seperated ids of flavor params that have ready flavor asset assign to the entry</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">plays</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry plays count in the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">views</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry views count in the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<item>
  <type>1</type>
  <media>
    <mediaType>1</mediaType>
  </media>
  <content flavorParamsId="0">...</content>
</item>
```

--------





<span class="k-et">content element</span>





<span class="element-description">Flavor asset element</span>





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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Download URL</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>flavorAssetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of the flavor asset</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>containerFormat</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Format of the asset file</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>format</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Configured format of the flavor</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>extension</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor asset file extension</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>createdAt</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>isSource</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Is the source flavor asset</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>boolean</td>
<td></td>
</tr>
<tr>
<td>height</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor height</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>width</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor width</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>fileSize</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor file size</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>videoBitrate</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor asset video bitrate</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>videoCodec</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor asset video codec</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>audioBitrate</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor asset audio bitrate</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>audioCodec</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor asset audio codec</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>frameRate</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Flavor asset frame rate</xs:documentation></span><br>
</td>
<td>No</td>
<td>float</td>
<td></td>
</tr>
<tr>
<td>flavorParamsId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of accosiated flavor params</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>flavorParamsName</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">System name of accosiated flavor params</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>assetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">
					The asset id to be updated with this resource
					userd only for update
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
<tbody><tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies specific tags you want to set for the flavor asset</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<item>
  <type>1</type>
  <media>
    <mediaType>1</mediaType>
  </media>
  <content url="http://kaltura.domain/path/my_flavor_asset.flv" isSource="true" containerFormat="flash video" extension="flv" assetId="{flavor asset id}" flavorParamsId="0" flavorParamsName="Source" format="" videoBitrate="0" videoCodec="" audioBitrate="0" audioCodec="" frameRate="0" height="0" width="0">
    <tags>
      <tag>example</tag>
      <tag>my_tag</tag>
    </tags>
  </content>
</item>
```

--------





<span class="k-et">thumbnail element</span>





<span class="element-description">Thumbnail asset element</span>





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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Download URL</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>thumbAssetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Thumbnail asset id</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>format</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Format of the thumbnail asset file</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>extension</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Extension of the thumbnail asset file</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>isDefault</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Is the entry default thumbnail</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>boolean</td>
<td></td>
</tr>
<tr>
<td>height</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Thumbnail height</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>width</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Thumbnail width</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>fileSize</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Thumbnail file size</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>createdAt</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>thumbParamsId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of thumbnail params that associated with the thumbnail</xs:documentation></span><br>
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
<tbody><tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<item>
  <type>1</type>
  <media>
    <mediaType>1</mediaType>
  </media>
  <thumbnail url="http://kaltura.domain/path/my_thumbnail_asset.flv" thumbAssetId="{thumb asset id}" isDefault="false" format="" height="120" width="120">
    <tags>
      <tag>example</tag>
      <tag>my_tag</tag>
    </tags>
  </thumbnail>
</item>
```

--------





<span class="k-et">player element</span>





<span class="element-description">Entry player element</span>





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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">URL of the player</xs:documentation></span><br>
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
<tbody></tbody>
</table>



##### XML Example



```xml
<item>
  <type>1</type>
  <media>
    <mediaType>1</mediaType>
  </media>
  <player url="http://kaltura.domain/path/my_player_widget.swf"></player>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Free text keyword</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>Unbounded</td>
<td>string</td>
<td class="last"></td>
</tr></tbody>
</table>



--------





<span class="k-et">category element</span>





<span class="element-description">Category assignments for entries</span>





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
<td>name</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Category name</xs:documentation></span><br>
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
<tr class="extends-title"><td colspan="7">Extended from <span>xs:string</span>
</td></tr>
<tr class="extends-title"><td colspan="7"></td></tr>
</tbody>
</table>



--------





<span class="k-et">customData element</span>





<span class="element-description">Custom metadata XML</span>





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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Id of the custom metadata object</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>metadataVersion</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Version of the custom metadata object</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>metadataProfile</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata schema profile system name</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>metadataProfileId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata schema profile id</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>metadataProfileName</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata schema profile name</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>metadataProfileVersion</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata schema profile version</xs:documentation></span><br>
</td>
<td>Yes</td>
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
<tbody><tr class="">
<td class="first" colspan="2">[Any element]</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata XML according to schema profile</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>any type</td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<customData metadataId="{metadata id}" metadataVersion="1" metadataProfile="MY_METADATA_PROFILE_SYSTEM_NAME}" metadataProfileId="{metadata profile id}" metadataProfileName="my metadata profile" metadataProfileVersion="1">
  <metadata>
    <Text1>text test</Text1>
    <TextMulti>test one</TextMulti>
    <TextMulti>test two</TextMulti>
    <List1>bbb</List1>
    <Entry>0_5b3t2c8z</Entry>
  </metadata>
</customData>
```

--------





<span class="k-et">scene-ad-cue-point element</span>





<span class="element-description">Single ad cue point element</span>





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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point last update date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point owner user id</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point end time</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">sceneTitle</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Textual title</xs:documentation></span><br>
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
<scene-ad-cue-point sceneId="{scene id}" entryId="{entry id}" systemName="MY_AD_CUE_POINT_SYSTEM_NAME">
  <sceneStartTime>00:00:05</sceneStartTime>
  <tags>
    <tag>sample</tag>
    <tag>my_tag</tag>
  </tags>
  <sceneTitle>my ad title</sceneTitle>
  <sourceUrl>http://source.to.my/ad.xml</sourceUrl>
  <adType>1</adType>
  <protocolType>1</protocolType>
</scene-ad-cue-point>
```

--------





<span class="k-et">scene-annotation element</span>





<span class="element-description">Single annotation element</span>





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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point last update date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point owner user id</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point end time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">sceneText</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Free text description</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">parent</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">System name of the parent annotation</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr class="">
<td class="first" colspan="2">parentId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of the parent annotation</xs:documentation></span><br>
</td>
<td>No</td>
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



##### XML Example



```xml
<scene-annotation sceneId="{scene id}" entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>sample</tag>
    <tag>my_tag</tag>
  </tags>
  <sceneEndTime>00:00:10</sceneEndTime>
  <sceneText>my annotation</sceneText>
</scene-annotation>
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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The asset unique id</xs:documentation></span><br>
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
<tr>
<td>url</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Attachment asset file download URL</xs:documentation></span><br>
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
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies specific tags you want to set for the flavor asset</xs:documentation></span><br>
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
<attachment url="http://kaltura.domain/path/to/attachment/asset/file.txt" attachmentAssetId="{attachment asset id}" format="1">
  <tags>
    <tag>example</tag>
    <tag>my_tag</tag>
  </tags>
  <filename>my_file_name.txt</filename>
  <title>my attachment asset title</title>
  <description>my attachment asset free text description</description>
</attachment>
```

--------





<span class="k-et">subTitle element</span>





<span class="element-description">Caption asset element</span>





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
<td>captionParamsId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of caption params that associated with the caption asset</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>captionParams</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">System name of caption params that associated with the caption asset</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>captionAssetId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Caption asset unique id</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>isDefault</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates if the caption asset is the entry default caption asset</xs:documentation></span><br>
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
<tr>
<td>href</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Caption asset file download URL</xs:documentation></span><br>
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
<tbody><tr class="">
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Specifies specific tags you want to set for the flavor asset</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<subTitle href="http://kaltura.domain/path/caption_file.srt" captionAssetId="{caption_asset_id}" isDefault="true" format="2" lang="Hebrew">
  <tags>
    <tag>example</tag>
    <tag>my_tag</tag>
  </tags>
</subTitle>
```

--------





<span class="k-et">scene-code-cue-point element</span>





<span class="element-description">Single code cue point element</span>





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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point last update date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point owner user id</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point end time</xs:documentation></span><br>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Free text description</xs:documentation></span><br>
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
<scene-code-cue-point sceneId="{scene id}" entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>sample</tag>
    <tag>my_tag</tag>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point last update date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point owner user id</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates the thumb cue point sub type 1 = Slide 2 = Chapter</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaThumbCuePointSubType">KalturaThumbCuePointSubType</a></td>
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
</scene-thumb-cue-point>
```

--------





<span class="k-et">distribution element</span>





<span class="element-description">Entry distribution element</span>





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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution unique id</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>provider</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution provider</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>distributionProviderId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution provider id<br>relevant to generic providers</xs:documentation></span><br>
</td>
<td>No</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>feedId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution feed id<br>relevant to syndicated providers</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>distributionProfileId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution profile id</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>distributionProfile</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution profile system name</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>distributionProfileName</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution profile name</xs:documentation></span><br>
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
<td class="first" colspan="2">remoteId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Unique id in the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">sunrise</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Time that the entry will become available in the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">sunset</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Time that the entry will become unavailable in the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">flavorAssetIds</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Ids of flavor assets to be submitted to the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">thumbAssetIds</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Ids of thumbnail assets to be submitted to the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">assetIds</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Ids of assets to be submitted to the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">errorDescription</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Submission error description</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution last update date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">submittedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution submission date</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">lastReport</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution last report date</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">dirtyStatus</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates that there are future action to be submitted</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaEntryDistributionFlag">KalturaEntryDistributionFlag</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">status</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution status</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaEntryDistributionStatus">KalturaEntryDistributionStatus</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">sunStatus</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry distribution availability status</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaEntryDistributionSunStatus">KalturaEntryDistributionSunStatus</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">plays</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry plays count in the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">views</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Entry views count in the remote site</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">errorNumber</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Submission error number</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">errorType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Submission error type</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaBatchJobErrorTypes">KalturaBatchJobErrorTypes</a></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<distribution entryDistributionId="{entry distribution id}" distributionProfileId="{distribution profile id}" distributionProfileName="My Profile">
  <remoteId>{remote site id}</remoteId>
  <sunrise>1305636600</sunrise>
  <sunset>1305640200</sunset>
  <flavorAssetIds>
    <flavorAssetId>0_bp1qzu1d</flavorAssetId>
    <flavorAssetId>0_bp1qzfsd</flavorAssetId>
  </flavorAssetIds>
  <thumbAssetIds>
    <thumbAssetId>0_di94zu1d</thumbAssetId>
    <thumbAssetId>0_di940sde</thumbAssetId>
  </thumbAssetIds>
  <errorDescription>Error: No metadata objects found</errorDescription>
  <createdAt>2011-05-17T07:46:20</createdAt>
  <updatedAt>2011-06-09T09:23:46</updatedAt>
  <submittedAt>2011-05-17T08:03:00</submittedAt>
  <dirtyStatus>3</dirtyStatus>
  <status>8</status>
  <sunStatus>3</sunStatus>
  <errorType>1</errorType>
</distribution>
```

--------





<span class="k-et">scenes element</span>





<span class="element-description">Cue points wrapper</span>





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
<td class="first" colspan="2"><span>scene</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point element</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<scenes>
  <scene-ad-cue-point entryId="{entry id}" systemName="MY_AD_CUE_POINT_SYSTEM_NAME">...</scene-ad-cue-point>
  <scene-annotation entryId="{entry id}" systemName="MY_ANNOTATION_PARENT_SYSTEM_NAME">...</scene-annotation>
  <scene-annotation entryId="{entry id}">...</scene-annotation>
  <scene-code-cue-point entryId="{entry id}">...</scene-code-cue-point>
  <scene-thumb-cue-point entryId="{entry id}">...</scene-thumb-cue-point>
</scenes>
```

--------





<span class="k-et">scene element</span>





<span class="element-description">
				Base cue point element
				Is abstract and cannot be used
				Use the extended elements only
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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of cue point to apply update/delete action on</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td>
					 Maximum length: 250 characters<br>
</td>
</tr>
<tr>
<td>systemName</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">System name of cue point to apply update/delete action on</xs:documentation></span><br>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point last update date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point owner user id</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
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
<li><span>scene-question-cue-point</span></li>
<li><span>scene-answer-cue-point</span></li>
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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Id of the custom metadata object</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>metadataVersion</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Version of the custom metadata object</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>metadataProfile</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata schema profile system name</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>metadataProfileId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata schema profile id</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>int</td>
<td></td>
</tr>
<tr>
<td>metadataProfileName</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata schema profile name</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td></td>
</tr>
<tr>
<td>metadataProfileVersion</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata schema profile version</xs:documentation></span><br>
</td>
<td>Yes</td>
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
<tbody><tr class="">
<td class="first" colspan="2">[Any element]</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Custom metadata XML according to schema profile</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>any type</td>
<td class="last"></td>
</tr></tbody>
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





<span class="k-et">scene-question-cue-point element</span>





<span class="element-description">Single question cue point element</span>





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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point last update date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point owner user id</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class="">
<td class="first" colspan="2">question</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">hint</td>
<td></td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">explanation</td>
<td></td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">optionalAnswers</td>
<td></td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaOptionalAnswersArray">KalturaOptionalAnswersArray</a></td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">correctAnswerKeys</td>
<td></td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaStringArray">KalturaStringArray</a></td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<scene-question-cue-point sceneId="{scene id}" entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>my_tag</tag>
  </tags>
</scene-question-cue-point>
```

--------





<span class="k-et">scene-answer-cue-point element</span>





<span class="element-description">Single answer cue point element</span>





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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">createdAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point creation date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">updatedAt</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point last update date</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>dateTime</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">userId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point owner user id</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2"><span>tags</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class="">
<td class="first" colspan="2">answerKey</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">quizUserEntryId</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class="">
<td class="first" colspan="2">parentId</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of the parent questionCuePoint</xs:documentation></span><br>
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
<scene-answer-cue-point sceneId="{scene id}" entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>my_tag</tag>
  </tags>
</scene-answer-cue-point>
```



