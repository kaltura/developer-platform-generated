# Cue Point Ingest

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



<span class="undefined">http://www.kaltura.com/api_v3/index.php/service/schema/action/serve/type/cuePoint.ingestAPI/name/cuePoint.ingestAPI.xsd</span>













```xml
<xs:schema version="1.0">
  <xs:complexType name="T_scenes">
    <xs:sequence>
      <xs:element ref="scene" minOccurs="1" maxOccurs="unbounded"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_scene" abstract="true">
    <xs:sequence>
      <xs:element name="sceneStartTime" minOccurs="1" maxOccurs="1" type="xs:time"></xs:element>
      <xs:element name="tags" minOccurs="0" maxOccurs="1" type="T_tags"></xs:element>
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
    <xs:attribute name="entryId" use="required">
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:maxLength value="20"></xs:maxLength>
        </xs:restriction>
      </xs:simpleType>
    </xs:attribute>
  </xs:complexType>
  <xs:complexType name="T_tags">
    <xs:sequence>
      <xs:element name="tag" minOccurs="1" maxOccurs="unbounded">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:maxLength value="30"></xs:maxLength>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:element name="scenes" type="T_scenes"></xs:element>
  <xs:element name="scene" type="T_scene"></xs:element>
  <xs:element name="scene-extension"></xs:element>
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
  <xs:element name="scene-annotation" type="T_scene_annotation" substitutionGroup="scene"></xs:element>
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
  <xs:complexType name="T_customData">
    <xs:sequence>
      <xs:any namespace="##local" processContents="skip" minOccurs="1" maxOccurs="1"></xs:any>
    </xs:sequence>
    <xs:attribute name="metadataId" use="optional" type="xs:int"></xs:attribute>
    <xs:attribute name="metadataProfile" use="optional" type="xs:string"></xs:attribute>
    <xs:attribute name="metadataProfileId" use="optional" type="xs:int"></xs:attribute>
  </xs:complexType>
  <xs:element name="scene-customData" type="T_customData" substitutionGroup="scene-extension"></xs:element>
  <xs:complexType name="T_scene_questionCuePoint">
    <xs:complexContent>
      <xs:extension base="T_scene">
        <xs:sequence>
          <xs:element name="question" minOccurs="1" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="hint" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="explanation" minOccurs="0" maxOccurs="1" type="xs:string"></xs:element>
          <xs:element name="optionalAnswers" minOccurs="0" maxOccurs="unbounded" type="T_optionalAnswers"></xs:element>
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:complexType name="T_optionalAnswers">
    <xs:sequence>
      <xs:element ref="optionalAnswer" maxOccurs="unbounded" minOccurs="0"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:complexType name="T_optionalAnswer">
    <xs:sequence>
      <xs:element name="key" maxOccurs="1" minOccurs="0" type="xs:string"></xs:element>
      <xs:element name="text" maxOccurs="1" minOccurs="0" type="xs:string"></xs:element>
      <xs:element name="weight" maxOccurs="1" minOccurs="0" type="xs:float"></xs:element>
      <xs:element name="isCorrect" maxOccurs="1" minOccurs="0" type="xs:int"></xs:element>
    </xs:sequence>
  </xs:complexType>
  <xs:element name="optionalAnswers" type="T_optionalAnswers"></xs:element>
  <xs:element name="optionalAnswer" type="T_optionalAnswer"></xs:element>
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
  <xs:simpleType name="KalturaAdType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaDynamicEnum">
    <xs:restriction base="xs:string"></xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaAdProtocolType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="0"></xs:enumeration>
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
      <xs:enumeration value="3"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:simpleType name="KalturaThumbCuePointSubType">
    <xs:restriction base="xs:int">
      <xs:enumeration value="1"></xs:enumeration>
      <xs:enumeration value="2"></xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
</xs:schema>
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
<tbody><tr class>
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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of cue point to which actions (update/delete) can be applied</xs:documentation></span><br>
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
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">System name of cue point to which actions (update/delete) can be applied</xs:documentation></span><br>
</td>
<td>No</td>
<td>string</td>
<td>
					 Maximum length: 120 characters<br>
</td>
</tr>
<tr>
<td>entryId</td>
<td>
<span class="child-attribute-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of entry to associate the cue point with</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>string</td>
<td>
					 Maximum length: 20 characters<br>
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
<tr class>
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">tags</td>
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
<tr class>
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class>
<td class="first" colspan="2">sceneEndTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point end time</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
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
<tr class>
<td class="first" colspan="2">sourceUrl</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">The URL of the ad XML</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">adType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates the ad type</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaAdType">KalturaAdType</a></td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">protocolType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates the ad protocol type</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaAdProtocolType">KalturaAdProtocolType</a></td>
<td class="last"></td>
</tr>
<tr class>
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
<tr class>
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class>
<td class="first" colspan="2">sceneEndTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point end time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">sceneText</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Free text description</xs:documentation></span><br>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">System name of the parent annotation</xs:documentation></span><br>
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
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">ID of the parent annotation</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last">
					 Maximum length: 250 characters<br>
</td>
</tr>
<tr class>
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



##### Single annotation example



```xml
<scene-annotation entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>sample</tag>
    <tag>my_tag</tag>
  </tags>
  <sceneEndTime>00:00:10</sceneEndTime>
  <sceneText>my annotation</sceneText>
</scene-annotation>
```

##### Multiple related annotations example



```xml
<scene-annotation entryId="{entry id}" systemName="MY_ANNOTATION_PARENT_SYSTEM_NAME">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>sample</tag>
    <tag>my_tag</tag>
  </tags>
  <sceneEndTime>00:00:10</sceneEndTime>
  <sceneText>my annotation parent</sceneText>
</scene-annotation>
<scene-annotation entryId="{entry id}">
  <sceneStartTime>00:00:05.3</sceneStartTime>
  <tags>
    <tag>sample</tag>
    <tag>my_tag</tag>
  </tags>
  <sceneEndTime>00:00:10</sceneEndTime>
  <sceneText>my annotation child</sceneText>
  <parent>MY_ANNOTATION_PARENT_SYSTEM_NAME</parent>
</scene-annotation>
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
<tr class>
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class>
<td class="first" colspan="2">sceneEndTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point end time</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
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
<tr class>
<td class="first" colspan="2">description</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Free text description</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
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
<tr class>
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class>
<td class="first" colspan="2">title</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">description</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">subType</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Indicates the thumb cue point sub type 1 = Slide 2 = Chapter</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td><a href="/api-docs/General_Objects/Enums/KalturaThumbCuePointSubType">KalturaThumbCuePointSubType</a></td>
<td class="last"></td>
</tr>
<tr class>
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
<td>No</td>
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
<tbody><tr class>
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





<span class="k-et">optionalAnswers element</span>





<span class="element-description">Wrapper element holding multiple answer elements</span>





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
<tbody><tr class>
<td class="first" colspan="2"><span>optionalAnswer</span></td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Single optional answer element</xs:documentation></span><br>
</td>
<td>No</td>
<td>Unbounded</td>
<td></td>
<td class="last"></td>
</tr></tbody>
</table>



##### XML Example



```xml
<optionalAnswers>
  <optionalAnswer>...</optionalAnswer>
  <optionalAnswer>...</optionalAnswer>
  <optionalAnswer>...</optionalAnswer>
</optionalAnswers>
```

--------





<span class="k-et">optionalAnswer element</span>





<span class="element-description">Single wrapper element for optional answer</span>





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
<tr class>
<td class="first" colspan="2">key</td>
<td></td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">text</td>
<td></td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">weight</td>
<td></td>
<td>No</td>
<td>1</td>
<td>float</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">isCorrect</td>
<td></td>
<td>No</td>
<td>1</td>
<td>int</td>
<td class="last"></td>
</tr>
</tbody>
</table>



##### XML Example



```xml
<optionalAnswer>
  <text>tesAnswer1</text>
  <weight>1</weight>
  <isCorrect>1</isCorrect>
</optionalAnswer>
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
<tr class>
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class>
<td class="first" colspan="2">question</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">hint</td>
<td></td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">explanation</td>
<td></td>
<td>No</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">optionalAnswers</td>
<td></td>
<td>No</td>
<td>Unbounded</td>
<td></td>
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
<tr class>
<td class="first" colspan="2">sceneStartTime</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point start time</xs:documentation></span><br>
</td>
<td>Yes</td>
<td>1</td>
<td>time</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">tags</td>
<td>
<span class="child-element-description"><xs:documentation xmlns:xs="http://www.w3.org/2001/XMLSchema">Cue point searchable keywords</xs:documentation></span><br>
</td>
<td>No</td>
<td>1</td>
<td></td>
<td class="last"></td>
</tr>
<tr class="extends-title"><td colspan="7"></td></tr>
<tr class>
<td class="first" colspan="2">answerKey</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
<td class="first" colspan="2">quizUserEntryId</td>
<td></td>
<td>Yes</td>
<td>1</td>
<td>string</td>
<td class="last"></td>
</tr>
<tr class>
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



