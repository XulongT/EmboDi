// src/shared/language/intent-patterns.json
var intent_patterns_default = {
  "authoring.hideReply": {
    source: "^(?:\u6536\u8D77|\u9690\u85CF|\u5173\u95ED)(?:\u5BF9\u8BDD|\u56DE\u590D|\u5BF9\u8BDD\u7A97\u53E3|\u5BF9\u8BDD\u6846)[\u3002\uFF01! ]*$",
    flags: ""
  },
  "authoring.confirmChanges": {
    source: "^(\u4FDD\u5B58|\u786E\u8BA4|\u5E94\u7528)[\u3002\uFF01! ]*$",
    flags: ""
  },
  "authoring.cancelChanges": {
    source: "^(\u53D6\u6D88|\u653E\u5F03)[\u3002\uFF01! ]*$",
    flags: ""
  },
  "authoring.applyPreview": {
    source: "^(\u786E\u8BA4|\u5E94\u7528|\u5E94\u7528\u4FEE\u6539|\u786E\u8BA4\u4FEE\u6539|\u6CA1\u9519|yes|apply)$",
    flags: "i"
  },
  "authoring.discardPreview": {
    source: "^(\u653E\u5F03|\u53D6\u6D88|\u53D6\u6D88\u9884\u89C8|discard|cancel)$",
    flags: "i"
  },
  "authoring.stopOperation": {
    source: "^(\u505C\u6B62|\u505C\u4E0B|\u6682\u505C|stop|cancel)$",
    flags: "i"
  },
  "authoring.rehearseEffect": {
    source: "^(?:\u91CD\u65B0|\u5F00\u59CB|\u518D)?(?:\u9884\u6F14|\u6D4B\u8BD5)(?:\u4E00\u4E0B)?(?:\u4EA4\u4E92|\u6D2A\u6C34|\u8840\u6C34)$",
    flags: "i"
  },
  "authoring.clearRegions": {
    source: "^(\u6E05\u7A7A|\u91CD\u753B)(\u8349\u56FE|\u533A\u57DF|\u6240\u6709\u533A\u57DF)$",
    flags: ""
  },
  "authoring.undoRegion": {
    source: "^(\u64A4\u56DE|\u64A4\u9500)(\u4E0A\u4E00\u5708|\u4E0A\u4E00\u5757\u533A\u57DF)$",
    flags: ""
  },
  "authoring.cancelSketch": {
    source: "^\u53D6\u6D88(\u7ED8\u5236|\u8349\u56FE)$",
    flags: ""
  },
  "authoring.saveSketch": {
    source: "^(\u5B8C\u6210|\u4FDD\u5B58)(\u8349\u56FE|\u533A\u57DF)$",
    flags: ""
  },
  "door.openSuffix": {
    source: "^(?:\u8BF7|\u5E2E\u6211)?(?:\u628A)?(?:\u8FD9\u6247|\u8FD9\u4E2A|\u9009\u4E2D\u7684)?\u95E8(?:\u6253\u5F00|\u5F00\u542F)$",
    flags: ""
  },
  "door.openPrefix": {
    source: "^(?:\u8BF7|\u5E2E\u6211)?(?:\u6253\u5F00|\u5F00\u542F)(?:\u8FD9\u6247|\u8FD9\u4E2A|\u9009\u4E2D\u7684)?\u95E8$",
    flags: ""
  },
  "door.closeSuffix": {
    source: "^(?:\u8BF7|\u5E2E\u6211)?(?:\u628A)?(?:\u8FD9\u6247|\u8FD9\u4E2A|\u9009\u4E2D\u7684)?\u95E8(?:\u5173\u95ED|\u5173\u4E0A)$",
    flags: ""
  },
  "door.closePrefix": {
    source: "^(?:\u8BF7|\u5E2E\u6211)?(?:\u5173\u95ED|\u5173\u4E0A)(?:\u8FD9\u6247|\u8FD9\u4E2A|\u9009\u4E2D\u7684)?\u95E8$",
    flags: ""
  },
  "authoring.motionRequest": {
    source: "(\u52A8\u4F5C|\u59FF\u6001|\u624B\u81C2|\u80F3\u818A|\u66F2\u7EBF|motion|pose)",
    flags: "i"
  },
  "legacy.prepareDoorCast": {
    source: "^(?:\u914D\u7F6E|\u51C6\u5907)(?:\u4E94|5)\u4EBA\u5F00\u95E8\u6F14\u51FA$",
    flags: ""
  },
  "legacy.resetDoorPerformance": {
    source: "^(\u5173\u95E8\u590D\u4F4D|\u91CD\u7F6E\u5F00\u95E8\u6F14\u51FA|\u6F14\u51FA\u590D\u4F4D)$",
    flags: ""
  },
  "legacy.openDoor": {
    source: "^(\u5F00\u95E8|open the door)$",
    flags: "i"
  },
  "legacy.stopPerformance": {
    source: "^(stop|\u6682\u505C|\u505C\u4E0B|\u505C\u6B62)$",
    flags: "i"
  },
  "legacy.resumePerformance": {
    source: "^(\u7EE7\u7EED|\u7EE7\u7EED\u64AD\u653E|resume)$",
    flags: "i"
  },
  "legacy.confirmPreview": {
    source: "^(\u6CA1\u9519|\u786E\u8BA4|\u5E94\u7528\u4FEE\u6539|\u786E\u8BA4\u4FEE\u6539|yes)[\u3002\uFF01!\\s]*$",
    flags: "i"
  },
  "legacy.discardPreview": {
    source: "^(\u653E\u5F03|\u53D6\u6D88\u9884\u89C8)[\u3002\uFF01!\\s]*$",
    flags: ""
  },
  "legacy.actorRequest": {
    source: "(\u6F14\u5458|\u8FD9\u4E2A\u4EBA|\u4ED6|\u89D2\u8272|\u50F5\u5C38|\u4E27\u5C38|\u52A8\u4F5C)",
    flags: ""
  },
  "punctuation.app.1": {
    source: "[\u3002\uFF01!\\s]+$",
    flags: "g"
  },
  "punctuation.app.2": {
    source: "[\u3002\uFF01!]",
    flags: "g"
  },
  "transform.faster": {
    source: "\u52A0\u5FEB|\u592A\u6162|\u5FEB\u4E00\u70B9|faster",
    flags: "i"
  },
  "transform.slower": {
    source: "\u51CF\u6162|\u592A\u5FEB|\u6162\u4E00\u70B9|slower",
    flags: "i"
  },
  "transform.verticalRequest": {
    source: "\u62AC\u9AD8|\u5347\u9AD8|\u964D\u4F4E|\u5F80\u4E0A|\u5F80\u4E0B|\\braise\\b|\\blower\\b|\\bmove (?:up|down)\\b",
    flags: "i"
  },
  "transform.meters": {
    source: "\u7C73|\\bmet(?:er|re)s?\\b|\\bm\\b",
    flags: "i"
  },
  "transform.centimeters": {
    source: "\u5398\u7C73|centimet(?:er|re)|\\bcm\\b",
    flags: "i"
  },
  "transform.lower": {
    source: "\u964D\u4F4E|\u5F80\u4E0B|\\blower\\b|\\bmove down\\b",
    flags: "i"
  },
  "preview.stop": {
    source: "^(?:\u6682\u505C|\u505C\u6B62|\u505C\u4E0B)(?:\u9884\u6F14|\u9884\u89C8|\u64AD\u653E)?$|^(?:pause|stop)$",
    flags: "i"
  },
  "preview.play": {
    source: "^(?:\u5F00\u59CB|\u5F00\u542F|\u7EE7\u7EED|\u91CD\u64AD|\u91CD\u65B0|\u91CD\u65B0\u64AD\u653E|\u64AD\u653E)?(?:\u9884\u6F14|\u9884\u89C8|\u64AD\u653E|\u52A8\u4F5C)(?:\u5F53\u524D\u5BF9\u8C61|\u8FD9\u4E2A\u5BF9\u8C61|\u4EA4\u4E92|\u6D2A\u6C34|\u8840\u6C34)?$|^(?:play|resume|replay)$",
    flags: "i"
  },
  "preview.restart": {
    source: "\u91CD\u64AD|\u91CD\u65B0|replay",
    flags: "i"
  },
  "punctuation.production-studio.1": {
    source: "[\u3002\uFF01!\\s]+$",
    flags: "g"
  },
  "camera.selfieDevice": {
    source: "avatar|selfie|\u865A\u62DF\u5F62\u8C61",
    flags: "i"
  },
  "camera.environmentDevice": {
    source: "passthrough|environment|rear|back|left|right|\u5934\u663E|\u540E\u7F6E",
    flags: "i"
  },
  "actor.delaySeconds": {
    source: "(?:\u7B2C|\u540E|\u7B49|\u5EF6\u8FDF|\u665A)?\\s*(\\d+(?:\\.\\d+)?|[\u96F6\u4E00\u4E8C\u4E24\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341])\\s*\u79D2",
    flags: ""
  },
  "actor.groupStyle": {
    source: "^(?:\u8BF7|\u5E2E\u6211)?(?:\u8BA9)?(?:\u4ED6\u4EEC|\u8FD9\u4E9B\u4EBA|\u6240\u6709\u6F14\u5458|\u5168\u90E8\u6F14\u5458|\u8FD9\u51E0\u4E2A\u4EBA)(?:\u90FD)?(?:\u4F7F\u7528|\u64AD\u653E|\u6362\u6210|\u505A)(\u4E27\u5C38|\u50F5\u5C38|\u53EF\u7231)(?:\u4E00\u6837\u7684)?(?:\u52A8\u753B|\u52A8\u4F5C)$",
    flags: ""
  },
  "actor.stop": {
    source: "^(stop|\u6682\u505C|\u505C|\u505C\u4E0B|\u505C\u6B62|\u505C\u6B62\u52A8\u4F5C|\u6682\u505C\u52A8\u4F5C)$",
    flags: "i"
  },
  "actor.start": {
    source: "^(\u5F00\u59CB|\u5F00\u6F14|\u5F00\u59CB\u8868\u6F14|\u64AD\u653E\u52A8\u4F5C|\u64AD\u653E|\u91CD\u653E|\u91CD\u65B0\u5F00\u59CB|action|start|replay)$",
    flags: "i"
  },
  "actor.resume": {
    source: "^(\u7EE7\u7EED|\u7EE7\u7EED\u64AD\u653E|\u7EE7\u7EED\u8868\u6F14|resume)$",
    flags: "i"
  },
  "actor.edit": {
    source: "^(\u8FD4\u56DE\u7F16\u6392|\u7F16\u8F91\u6F14\u5458|\u56DE\u5230\u7F16\u6392)$",
    flags: ""
  },
  "actor.saveScene": {
    source: "^(\u4FDD\u5B58|\u4FDD\u5B58\u573A\u666F|\u4FDD\u5B58\u5F53\u524D\u573A\u666F)$",
    flags: ""
  },
  "actor.style": {
    source: "^(?:(?:\u8BF7|\u5E2E\u6211|\u6211\u4EEC)\\s*)?(?:(?:\u628A|\u8BA9)\\s*(?:\u6240\u6709|\u8FD9|\u8FD9\u4E94|\u4E94|5)?\\s*(?:\u4E2A\u4EBA|\u4F4D\u6F14\u5458|\u4E2A\u6F14\u5458|\u6F14\u5458|\u4EBA)(?:\u7684\u52A8\u4F5C)?\\s*)?(?:(?:\u5207\u6362\u5230|\u5207\u6362\u6210|\u5207\u6362\u4E3A|\u5207\u6362\u56DE|\u5207\u6362|\u6362\u4E00\u4E2A|\u6362\u6210|\u6362\u56DE|\u6539\u6210|\u6539\u4E3A|\u53D8\u6210|\u4F7F\u7528|\u6062\u590D)\\s*)?(\u53EF\u7231|\u751F\u65E5|\u4E27\u5C38|\u50F5\u5C38|\u6050\u6016)\\s*(?:\u98CE\u683C|\u6A21\u5F0F|\u52A8\u4F5C)(?:\u5427)?$",
    flags: ""
  },
  "actor.subject": {
    source: "(\u6F14\u5458|\u4EBA|\u50F5\u5C38|\u89D2\u8272)",
    flags: ""
  },
  "actor.clearMotion": {
    source: "^(\u53D6\u6D88\u52A8\u4F5C|\u6E05\u9664\u52A8\u4F5C|\u79FB\u9664\u52A8\u4F5C)$",
    flags: ""
  },
  "actor.numberedMotion": {
    source: "(?:\u4F7F\u7528|\u6307\u5B9A|\u7ED1\u5B9A|\u6362\u6210|\u6362\u4E3A|\u6539\u6210|\u7528)\\s*\u7B2C?\\s*([1-7\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03])\\s*(?:\u4E2A|\u53F7|\u6BB5)?\\s*(?:\u4E27\u5C38|\u50F5\u5C38)?\u52A8\u4F5C",
    flags: ""
  },
  "actor.motionSubject": {
    source: "(\u4ED6|\u6F14\u5458|\u4EBA|\u50F5\u5C38|\u89D2\u8272)",
    flags: ""
  },
  "actor.generatedMotion": {
    source: "(\u6325\u624B|\u8DF3|\u821E|\u8DD1|\u5750\u4E0B|\u884C\u8D70|\u8D70\u8DEF|\u8D70\u8FC7\u6765|\u8D70\u8FC7\u53BB|\u7AD9\u7ACB|\u8E72|\u8EBA|\u722C|\u6E38\u6CF3|\u98DE\u8D77\u6765|\u8F6C\u8EAB|\u6253\u62F3)",
    flags: ""
  },
  "actor.spatialSubject": {
    source: "(\u4ED6|\u6F14\u5458|\u8FD9\u4E2A\u4EBA|\u50F5\u5C38|\u89D2\u8272)",
    flags: ""
  },
  "actor.moveVerb": {
    source: "(\u79FB|\u632A|\u653E\u5230|\u6362\u5230)",
    flags: ""
  },
  "actor.here": {
    source: "(\u8FD9\u91CC|\u8FD9\u513F|\u8FD9\u8FB9)",
    flags: ""
  },
  "actor.createVerb": {
    source: "(\u751F\u6210|\u521B\u5EFA|\u653E|\u52A0|\u5B89\u6392)",
    flags: ""
  },
  "legacy.lungeMotion": {
    source: "(\u524D\u6251|\u50F5\u5C38\u52A8\u4F5C)",
    flags: ""
  },
  "legacy.motionAssignmentSubject": {
    source: "(\u4ED6|\u6F14\u5458|\u8FD9\u4E2A\u4EBA|\u50F5\u5C38|\u89D2\u8272|\u4F7F\u7528|\u7ED1\u5B9A|\u6362\u6210)",
    flags: ""
  },
  "legacy.assignLungeMotion": {
    source: "^(\u4F7F\u7528|\u7ED1\u5B9A|\u6362\u6210)(\u8FD9\u4E2A|\u50F5\u5C38\u524D\u6251)\u52A8\u4F5C$",
    flags: ""
  },
  "actor.delayVerb": {
    source: "(\u51FA\u73B0|\u51FA\u573A|\u5F00\u59CB|\u665A|\u5EF6\u8FDF)",
    flags: ""
  },
  "actor.faceViewer": {
    source: "(\u9762\u5411\u6211|\u671D\u5411\u6211|\u770B\u5411\u6211|\u9762\u5BF9\u6211)",
    flags: ""
  },
  "actor.removeVerb": {
    source: "(\u5220\u9664|\u79FB\u9664)",
    flags: ""
  },
  "punctuation.actors.1": {
    source: "[\u3002\uFF01!\uFF0C,\uFF1F?]",
    flags: "g"
  },
  "punctuation.actors.2": {
    source: "[?\uFF1F]",
    flags: ""
  },
  "punctuation.actors.3": {
    source: "[?\uFF1F]",
    flags: ""
  },
  "scene.boundaryWall": {
    source: "wall|\u5899|capture-boundary",
    flags: "i"
  },
  "category.seating": {
    source: "chair|seat|sofa|\u6905|\u5EA7|\u6C99\u53D1",
    flags: "i"
  },
  "category.table": {
    source: "table|desk|bench|\u684C|\u5DE5\u4F5C\u53F0|\u652F\u6491\u677F",
    flags: "i"
  },
  "category.equipment": {
    source: "monitor|screen|equipment|instrument|server|\u663E\u793A\u5668|\u5C4F\u5E55|\u8BBE\u5907|\u4EEA\u5668|\u670D\u52A1\u5668",
    flags: "i"
  },
  "category.cabinet": {
    source: "cabinet|\u67DC",
    flags: "i"
  },
  "category.storage": {
    source: "cabinet|bookcase|storage|shelf|rack|\u67DC|\u4E66\u67B6|\u8D27\u67B6",
    flags: "i"
  },
  "category.structure": {
    source: "ground|floor|wall|ceiling|column|\u5730\u9762|\u5730\u677F|\u5899|\u5929\u82B1|\u9876\u677F|\u7ACB\u67F1|\u65B9\u67F1",
    flags: "i"
  },
  "category.workstation": {
    source: "workstation|\u5DE5\u4F4D",
    flags: "i"
  },
  "category.ceiling": {
    source: "\u5929\u82B1\u677F|\u9876\u677F",
    flags: ""
  },
  "category.floor": {
    source: "floor|\u5730\u677F|\u5730\u9762",
    flags: "i"
  },
  "category.wall": {
    source: "wall|\u5899",
    flags: "i"
  },
  "scene.floor": {
    source: "floor|\u5730\u9762",
    flags: "i"
  },
  "scene.ceiling": {
    source: "ceiling|\u5929\u82B1",
    flags: "i"
  },
  "category.wall.caseSensitive": {
    source: "wall|\u5899",
    flags: ""
  },
  "scene.scanTitleSuffix": {
    source: "(?:\u626B\u63CF\u7ED3\u6784\u9884\u89C8|Scan structure preview)$",
    flags: "i"
  },
  "scene.scanNamePrefix": {
    source: "^(?:\u626B\u63CF|Scanned\\s+)",
    flags: "i"
  },
  "transform.request": {
    source: "(\u79FB\u52A8|\u632A|\u5E73\u79FB|\u79FB\u5230|\u79FB\u5411|\u79FB[\u4E00\u534A\u4E24\\d]|\u8F6C\u5411|\u9762\u5411|\u671D\u5411|\u65CB\u8F6C|\u8F6C.{0,8}\u5EA6|\u5347\u9AD8|\u62AC\u9AD8|\u964D\u4F4E|\u964D\u4E0B|\u5F80.{0,3}[\u5DE6\u53F3\u524D\u540E\u4E0A\u4E0B]|\u5411.{0,3}[\u5DE6\u53F3\u524D\u540E\u4E0A\u4E0B]|\\b(move|translate|rotate|face|raise|lower)\\b)",
    flags: "i"
  },
  "transform.ambiguousRequest": {
    source: "\u4E0D|\u522B|\u559C\u6B22|\u504F\u597D|\u5982\u679C|\u5047\u5982|\u662F\u5426|\u5417|[?\uFF1F]|\u7136\u540E|\u5E76|\u540C\u65F6|\u518D|\u3001|\uFF0C|,|\u548C|\u53CA",
    flags: ""
  },
  "transform.placeHere": {
    source: "\u79FB\u5230.*(\u8FD9\u91CC|\u8FD9\u513F|\u6307\u7684|\u6307\u5411)|move.*here",
    flags: "i"
  },
  "transform.faceViewer": {
    source: "\u9762\u5411\u6211|\u671D\u5411\u6211|face me",
    flags: "i"
  },
  "transform.quantity": {
    source: "(\\d+(?:\\.\\d+)?|\u4E5D\u5341|\u56DB\u5341\u4E94|\u4E09\u5341|\u5341\u4E94|\u534A|\u4E00|\u4E24|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D|\u5341)\\s*(\u5398\u7C73|\u7C73|\u5EA6|cm|meters?|metres?|degrees?)",
    flags: "gi"
  },
  "transform.degrees": {
    source: "\u5EA6|degree",
    flags: "i"
  },
  "transform.rotation": {
    source: "\u8F6C|rotate",
    flags: "i"
  },
  "transform.horizontalDirection": {
    source: "[\u5DE6\u53F3]|left|right",
    flags: "i"
  },
  "transform.right": {
    source: "\u53F3|right",
    flags: "i"
  },
  "transform.distanceUnit": {
    source: "\u7C73|cm|meter|metre",
    flags: "i"
  },
  "transform.centimeterQuantity": {
    source: "\u5398\u7C73|cm",
    flags: "i"
  },
  "transform.objectFrame": {
    source: "\u81EA\u5DF1|\u81EA\u8EAB|\u672C\u8EAB",
    flags: ""
  },
  "transform.left": {
    source: "\u5DE6|left",
    flags: "i"
  },
  "transform.up": {
    source: "\u5347|\u62AC\u9AD8|\u4E0A|raise",
    flags: "i"
  },
  "transform.down": {
    source: "\u964D|\u4E0B|lower",
    flags: "i"
  },
  "transform.forward": {
    source: "\u524D|forward",
    flags: "i"
  },
  "transform.backward": {
    source: "\u540E|backward",
    flags: "i"
  },
  "studio.cancel": {
    source: "^(stop|cancel|\u505C\u6B62|\u53D6\u6D88)$",
    flags: "i"
  },
  "camera.summon": {
    source: "^(?:(?:\u53EC\u5524|\u547C\u53EB|\u6253\u5F00|\u542F\u52A8|call|open))?cameraagent$",
    flags: ""
  },
  "camera.summonPrefix": {
    source: "^(?:\u8BF7)?(?:(?:\u53EC\u5524|\u547C\u53EB|\u6253\u5F00|\u542F\u52A8|call|open))?cameraagent",
    flags: ""
  },
  "camera.politePrefix": {
    source: "^\u8BF7",
    flags: ""
  },
  "camera.recenter": {
    source: "^(?:(?:\u628A|\u5C06)?(?:\u76F8\u673A)?(?:\u9884\u89C8\u5C4F|\u9884\u89C8\u7A97\u53E3|\u76D1\u89C6\u5C4F)(?:\u79FB\u5230|\u653E\u5230|\u53EC\u56DE\u5230)(?:\u6211|\u7528\u6237)(?:\u7684)?(?:\u9762\u524D|\u6B63\u524D\u65B9)|(?:\u590D\u4F4D|\u91CD\u7F6E|\u53EC\u56DE)(?:\u76F8\u673A)?(?:\u9884\u89C8\u5C4F|\u9884\u89C8\u7A97\u53E3|\u76D1\u89C6\u5C4F)|(?:\u9884\u89C8\u5C4F|\u9884\u89C8\u7A97\u53E3|\u76D1\u89C6\u5C4F)\u590D\u4F4D)$",
    flags: ""
  },
  "camera.preview": {
    source: "^(?:\u9884\u89C8|\u67E5\u770B|\u770B\u4E00\u4E0B|\u770B\u770B|\u6253\u5F00)(?:\u5F53\u524D|\u8FD9\u4E2A|\u5DF2\u4FDD\u5B58\u7684)?(?:\u76F8\u673A|\u673A\u4F4D|\u955C\u5934)(?:\u753B\u9762|\u89C6\u91CE|\u62CD\u6444\u5185\u5BB9)?$",
    flags: ""
  },
  "camera.framingQuestion": {
    source: "^(?:\u5F53\u524D|\u8FD9\u4E2A)?\u76F8\u673A\u80FD\u62CD\u5230\u4EC0\u4E48(?:\u5185\u5BB9)?$",
    flags: ""
  },
  "camera.next": {
    source: "^(?:\u67E5\u770B|\u5207\u6362\u5230|\u5207\u6362)?(?:\u4E0B\u4E00\u4E2A|\u4E0B\u4E00\u53F0|\u4E0B\u4E2A)(?:\u76F8\u673A|\u673A\u4F4D|\u955C\u5934)$",
    flags: ""
  },
  "camera.previous": {
    source: "^(?:\u67E5\u770B|\u5207\u6362\u5230|\u5207\u6362)?(?:\u4E0A\u4E00\u4E2A|\u4E0A\u4E00\u53F0|\u4E0A\u4E2A)(?:\u76F8\u673A|\u673A\u4F4D|\u955C\u5934)$",
    flags: ""
  },
  "camera.close": {
    source: "^(?:\u5173\u95ED|\u6536\u8D77)(?:\u76F8\u673A\u9884\u89C8|\u76F8\u673A\u753B\u9762|\u76F8\u673A\u89C6\u91CE|\u76F8\u673A\u76D1\u89C6\u5C4F|\u76D1\u89C6\u5C4F)$",
    flags: ""
  },
  "punctuation.camera-view-intent.1": {
    source: "[\uFF0C,\u3002.!\uFF01?\uFF1F\uFF1A:\\s]+",
    flags: "g"
  },
  "specialist.flow": {
    source: "\u8840\u6C34|\u6D2A\u6C34|\u6D41\u4F53|\u6DB2\u4F53|\u6EA2\u51FA|\u6D8C\u51FA|\u51FA\u6D41|\u6D41\u91CF|\u6F0F\u6C34|\u51FA\u6C34|\u55B7\u6C34|\u6C34\u6D41|water.*flow|flow.*water|\\b(flood|blood|fluid|overflow|spill|leak)\\b",
    flags: "i"
  },
  "specialist.flowAdjustment": {
    source: "\u6E90\u533A|\u5E95\u90E8|\u5DE6\u4FA7|\u505C\u7559|\\b(source|amount|bottom|dwell)\\b",
    flags: "i"
  },
  "specialist.path": {
    source: "\u66F2\u7EBF|\u8F68\u8FF9|\u6CBF\u7EBF|\u8DEF\u7EBF|\u8F68\u9053|path|curve|trajectory",
    flags: "i"
  },
  "specialist.camera": {
    source: "\u76F8\u673A|camera|\u673A\u4F4D|\u955C\u5934|\u8FD0\u955C",
    flags: "i"
  },
  "specialist.lighting": {
    source: "\u706F\u5149|\u70B9\u5149|\u805A\u5149|\u5149\u6E90|light|\u4EAE\u5EA6",
    flags: "i"
  },
  "specialist.trigger": {
    source: "\u89E6\u53D1|\u8303\u56F4|\u533A\u57DF|\u5708|trigger|region|zone",
    flags: "i"
  },
  "specialist.motionAdjustment": {
    source: "\u5FEB|\u6162|\u79D2|\u65F6\u957F|\u901F\u5EA6|\u505C|\u671D\u5411|\u8F6C\u5411|\u65B9\u5411|speed|duration|delay|orientation",
    flags: "i"
  },
  "specialist.objectEdit": {
    source: "\u62C9\u76F4|\u63A7\u5236\u70B9|\u65B9\u5757|\u7ACB\u65B9\u4F53|\u521B\u5EFA\u7269|\u5220\u9664|\u79FB\u9664|cube|box",
    flags: "i"
  },
  "ui.legacyText": {
    source: "[\\p{Script=Han}\uFF1A\uFF0C\uFF1B\u3002\uFF01\uFF1F\u3001]+",
    flags: "gu"
  }
};

// src/shared/language/entity-labels.json
var entity_labels_default = {
  \u5730\u9762\u5206\u533A: "Floor area",
  \u5929\u82B1\u677F\u5206\u533A: "Ceiling area",
  \u5899\u6BB5: "Wall segment",
  \u95E8\u6846: "Door frame",
  \u5DE5\u4F5C\u53F0: "Worktable",
  \u529E\u516C\u684C: "Desk",
  \u684C\u9762: "Table top",
  \u684C\u817F: "Table leg",
  \u4E66\u67B6: "Bookshelf",
  \u50A8\u7269\u67DC: "Storage cabinet",
  \u663E\u793A\u5668: "Monitor",
  \u6253\u5370\u673A: "Printer",
  \u7A7A\u8C03: "Air conditioner",
  \u7ACB\u65B9\u4F53: "Box",
  \u5706\u67F1\u4F53: "Cylinder",
  \u5706\u9525\u4F53: "Cone",
  \u7403\u4F53: "Sphere",
  \u70B9\u5149\u6E90: "Point light",
  \u805A\u5149\u706F: "Spotlight",
  \u5929\u82B1\u677F: "Ceiling",
  \u5730\u677F: "Floor",
  \u5730\u9762: "Floor",
  \u4FA7\u5899: "Side wall",
  \u5899\u9762: "Wall",
  \u7A97\u6237: "Window",
  \u524D\u65B9: "Front",
  \u540E\u65B9: "Back",
  \u5DE6\u4FA7: "Left",
  \u53F3\u4FA7: "Right",
  \u5DE6\u8FB9: "Left",
  \u53F3\u8FB9: "Right",
  \u5B9E\u9A8C\u5BA4: "Lab",
  \u623F\u95F4: "Room",
  \u5206\u533A: "Area",
  \u5165\u53E3: "Entrance",
  \u51FA\u53E3: "Exit",
  \u6F14\u5458: "Actor",
  \u89D2\u8272: "Actor",
  \u4EBA\u5076: "Mannequin",
  \u76F8\u673A: "Camera",
  \u955C\u5934: "Camera",
  \u5149\u6E90: "Light",
  \u65B9\u5757: "Box",
  \u5706\u67F1: "Cylinder",
  \u5706\u9525: "Cone",
  \u7ACB\u67F1: "Column",
  \u652F\u6491\u677F: "Support panel",
  \u67DC\u5B50: "Cabinet",
  \u684C\u5B50: "Table",
  \u6905\u5B50: "Chair",
  \u5EA7\u6905: "Chair",
  \u6C99\u53D1: "Sofa",
  \u8BBE\u5907: "Equipment",
  \u5C4F\u5E55: "Screen",
  \u5DE5\u4F4D: "Workstation",
  \u5E95\u5EA7: "Base",
  \u9876\u677F: "Top panel",
  \u95E8: "Door",
  \u5899: "Wall",
  \u7A97: "Window",
  \u67DC: "Cabinet",
  \u684C: "Table",
  \u6905: "Chair",
  \u5DE6: "Left",
  \u53F3: "Right",
  \u4E0A: "Upper",
  \u4E0B: "Lower",
  \u524D: "Front",
  \u540E: "Back",
  \u4E00: "1",
  \u4E8C: "2",
  \u4E09: "3",
  \u56DB: "4",
  \u4E94: "5"
};

// src/shared/language/legacy-ui.json
var legacy_ui_default = {
  "\u6F14\u5458\u8D44\u4EA7 {0} \u65E0\u6548": "Invalid actor asset: {0}",
  \u4E0D\u652F\u6301\u7684\u6F14\u5458\u9AA8\u67B6\u683C\u5F0F: "Unsupported actor skeleton",
  \u4EBA\u4F53\u9876\u70B9\u6570\u65E0\u6548: "Invalid mesh vertex count",
  \u4EBA\u4F53\u62D3\u6251\u65E0\u6548: "Invalid mesh topology",
  \u52A8\u4F5C\u65F6\u95F4\u65E0\u6548: "Invalid motion timing",
  \u6F14\u5458\u89C4\u8303\u5316\u671D\u5411\u65E0\u6548: "Invalid normalized actor orientation",
  \u52A8\u4F5C\u56DB\u5143\u6570\u672A\u5F52\u4E00\u5316: "Motion quaternions are not normalized",
  \u52A8\u4F5C\u65F6\u95F4\u5FC5\u987B\u4E3A\u6709\u9650\u6570\u503C: "Motion time must be finite",
  \u6F14\u5458\u8D44\u4EA7\u76EE\u5F55\u4E0D\u53EF\u7528: "Actor asset directory is unavailable",
  "\u52A8\u4F5C {0} \u52A0\u8F7D\u5931\u8D25": "Could not load motion: {0}",
  \u8BF7\u6C42\u5931\u8D25: "Request failed",
  "\u8FDE\u63A5\u672C\u673A\u670D\u52A1\u8D85\u65F6\u3002\u8BF7\u68C0\u67E5 USB \u8FDE\u63A5\uFF1B\u5237\u65B0\u540E\u53EF\u76F4\u63A5\u8FDB\u5165\u5DF2\u4FDD\u5B58\u4E16\u754C\u3002": "Local server timed out. Check the USB connection, then refresh to reopen the saved world.",
  \u8FD4\u56DE\u623F\u95F4\u62CD\u6444: "Back to room capture",
  \u4ECE\u56FE\u7247\u6784\u5EFA\u65B0\u4E16\u754C: "Build a world from images",
  \u91CD\u65B0\u6F14\u793A: "Replay demo",
  "\u8BF7\u5148\u4FDD\u5B58\u5F55\u50CF\uFF0C\u518D\u8C03\u6574\u624B\u548C\u81C2\u957F": "Save the recording before adjusting hand or arm size",
  "\u624B {0}% \xB7 \u81C2\u957F {1}% \xB7 \u503E\u89D2 {2}\xB0": "Hands {0}% \xB7 Arms {1}% \xB7 Grip tilt {2}\xB0",
  "\u63A7\u5236\u5668\u5DF2\u65AD\u5F00\uFF0C\u672C\u7B14\u672A\u4FDD\u7559": "Controller disconnected. Unfinished stroke discarded.",
  \u63A7\u5236\u5668\u5DF2\u65AD\u5F00: "Controller disconnected",
  \u8BF7\u7B49\u5F55\u50CF\u5B58\u50A8\u51C6\u5907\u6216\u4FDD\u5B58\u5B8C\u6210: "Wait for recording storage to finish preparing or saving",
  \u5148\u5904\u7406\u5F53\u524D\u8BF7\u6C42\u6216\u9884\u89C8: "Finish the current request or preview first",
  "\u8BF7\u5148\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C\uFF0C\u518D\u8BBE\u7F6E\u4EA4\u4E92": "Finish the current action before setting up an interaction",
  \u8BF7\u5148\u9009\u62E9\u5BF9\u8C61\u5E76\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C: "Select an object and finish the current action first",
  "\u5DF2\u8FDB\u5165\u8349\u56FE\u7F16\u8F91\uFF0C\u8BF7\u5728\u8DEF\u5F84\u51C6\u5907\u5B8C\u6210\u540E\u91CD\u65B0\u786E\u8BA4\u9884\u89C8\u3002": "Draft is open. Confirm Preview again after preparing the path.",
  "Draft\uFF1A\u53F3\u6273\u673A\u753B\u5730\u9762\u8DEF\u7EBF \xB7 \u5DE6\u6447\u6746\u64A4\u56DE \xB7 A \u53D6\u6D88": "Draft: right trigger to draw \xB7 Left stick click to undo \xB7 A to cancel",
  "Transform\uFF1A\u6307\u5411\u5DF2\u9009\u5BF9\u8C61\uFF0C\u518D\u6309\u4F4F\u53F3\u6273\u673A\u62D6\u52A8\uFF1B\u53F3\u6447\u6746\u8F6C\u5411\uFF0F\u5347\u964D": "Transform: hold the right trigger to drag \xB7 Right stick to turn or raise",
  \u8BF7\u5148\u9009\u62E9\u5BF9\u8C61: "Select an object first",
  "\u6309\u4F4F X \u63CF\u8FF0\u4EA4\u4E92\uFF0C\u677E\u5F00\u63D0\u4EA4\u3002": "Hold X to describe the interaction. Release to submit.",
  "{0} \u4E2A\u5BF9\u8C61\u5DF2\u9501\u5B9A": "{0} objects locked",
  "\u9009\u62E9\u63CF\u8FF0\u4EA4\u4E92\u7684\u65B9\u5F0F\u3002": "How would you like to describe the interaction?",
  "\u573A\u666F\u6216\u7A7A\u95F4\u5DF2\u53D8\u5316\uFF0C\u8349\u56FE\u7F16\u8F91\u5DF2\u53D6\u6D88": "Scene or alignment changed. Draft closed.",
  "\u8BF7\u9690\u85CF\u83DC\u5355\u5E76\u4FDD\u6301\u63A7\u5236\u5668\u8FFD\u8E2A\uFF0C\u518D\u753B\u4E0B\u4E00\u7B14": "Hide the menu and restore controller tracking before drawing",
  "\u5148\u6309\u5DE6\u63E1\u628A\u6682\u505C\u52A8\u4F5C\uFF0C\u518D\u8C03\u6574\u6F14\u5458\u4F4D\u7F6E\u6216\u671D\u5411": "Pause with the left grip before moving or turning actors",
  "\u8C03\u6574\u4E2D\uFF1A\u62D6\u52A8\u4F4D\u7F6E \xB7 \u53F3\u6447\u6746\u8F6C\u5411 / \u5347\u964D \xB7 \u677E\u6273\u673A\u4FDD\u5B58 \xB7 \u5DE6\u6447\u6746\u53D6\u6D88": "Drag to move \xB7 Right stick to turn or raise \xB7 Release trigger to save \xB7 Left stick click to cancel",
  \u5DF2\u53D6\u6D88\u672C\u6B21\u8C03\u6574: "Adjustment cancelled",
  \u672A\u6539\u53D8\u4F4D\u7F6E\u6216\u671D\u5411: "Position and orientation unchanged",
  "\u4F4D\u7F6E\u4E0E\u671D\u5411\u5DF2\u4FDD\u5B58 \xB7 \u6309\u4E0B\u5DE6\u6447\u6746\u64A4\u9500": "Position and orientation saved \xB7 Left stick click to undo",
  "\u4FDD\u5B58\u53CD\u9988\u5F02\u5E38\uFF1A{0}": "Save feedback error: {0}",
  "{0} \xB7 {1}/{2} \u4F4D\u6F14\u5458 \xB7 {3} \u4F4D\u5DF2\u6307\u5B9A\u52A8\u4F5C \xB7 {4}\n{5}": `{0} \xB7 {1}/{2} actors \xB7 {3} motions assigned \xB7 {4}
{5}`,
  "T-Pose \u7AD9\u4F4D\u9884\u89C8": "T-Pose layout",
  \u8868\u6F14\u5DF2\u7ED3\u675F: "Performance finished",
  \u8868\u6F14\u4E2D: "Playing",
  \u52A8\u4F5C\u5DF2\u6682\u505C: "Motion paused",
  "\u6B63\u5728\u8F7D\u5165\u4EBA\u4F53\u2026": "Loading actor mesh\u2026",
  \u9009\u62E9\u4E00\u4F4D\u6F14\u5458: "Select an actor",
  "\u53D6\u6D88\u6F14\u5458\u653E\u7F6E \xB7 P": "Cancel placement \xB7 P",
  "\u653E\u7F6E T-Pose \u4EBA\u4F53 \xB7 P": "Place T-Pose actor \xB7 P",
  "\u91CD\u653E \xB7 \u7A7A\u683C": "Replay \xB7 Space",
  "\u6682\u505C \xB7 \u7A7A\u683C": "Pause \xB7 Space",
  "\u7EE7\u7EED \xB7 \u7A7A\u683C": "Resume \xB7 Space",
  "\u5F00\u6F14 \xB7 \u7A7A\u683C": "Play \xB7 Space",
  "\u672A\u6307\u5B9A\u52A8\u4F5C \xB7 T-Pose": "No motion \xB7 T-Pose",
  "{0} \xB7 {1} \u79D2": "{0} \xB7 {1} s",
  "\u8BF7\u5148\u8FDB\u5165\u521B\u4F5C\u5E76\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C\u3002": "Enter the world and finish the current action first.",
  "\u8BF7\u6307\u5411\u6709\u6548\u5730\u9762\uFF1B\u7A7A\u95F4\u53D8\u5316\u540E\u9700\u91CD\u65B0\u6307\u5B9A\u843D\u70B9\u3002": "Point at a valid floor. Choose a new location after alignment changes.",
  "\u597D\u7684\uFF0C\u6211\u4F1A\u5728\u6307\u5B9A\u4F4D\u7F6E\u653E\u7F6E\u4E00\u4F4D\u9762\u5411\u4F60\u7684\u6F14\u5458\u3002": "I will place an actor at that point, facing you.",
  "\u597D\u7684\uFF0C\u6211\u4F1A\u6CBF\u7528\u7B2C\u4E00\u4EBA\u7684\u7AD9\u4F4D\u548C\u671D\u5411\uFF0C\u5C06\u7F16\u961F\u8865\u9F50\u5230\u4E94\u4EBA\u3002": "I will expand the group to five, using the first actor's position and orientation.",
  "\u6F14\u5458\u5DF2\u653E\u7F6E\uFF0C\u4FDD\u6301 T-Pose\u3002": "Actor placed in T-Pose.",
  "\u5DF2\u6682\u505C\uFF0C\u8BF4\u201C\u5F00\u542F\u9884\u89C8\u201D\u53EF\u4EE5\u7EE7\u7EED\u3002": "Paused. Press the left grip to resume.",
  "\u5DF2\u6682\u505C\uFF1B\u5DF2\u7ECF\u63D0\u4EA4\u7684\u4FDD\u5B58\u53EF\u80FD\u5B8C\u6210\uFF0C\u4F46\u4E0D\u4F1A\u5F00\u59CB\u9884\u89C8\u3002": "Paused. A submitted save may still finish; playback will stay stopped.",
  "\u5DF2\u505C\u6B62\u51C6\u5907\u548C\u9884\u89C8\uFF0C\u6F14\u5458\u4FDD\u6301\u6682\u505C\u3002": "Preparation and preview stopped. Actors remain paused.",
  "\u8BF7\u5148\u5B8C\u6210\u5E76\u5E94\u7528\u8349\u56FE\uFF0C\u518D\u9884\u89C8\u3002": "Finish and apply the draft before previewing.",
  "\u6B63\u5728\u5904\u7406\u9884\u8BBE\u52A8\u4F5C\uFF0C\u8BF7\u7A0D\u5019\u6216\u8BF4 Stop\u3002": "Preparing the preset. Please wait or say Stop.",
  "\u597D\u7684\uFF0C\u6211\u6765\u4E3A\u4ED6\u4EEC\u51C6\u5907\u9884\u8BBE\u50F5\u5C38\u52A8\u4F5C\u3002": "I will prepare their zombie motions.",
  "\u50F5\u5C38\u52A8\u4F5C\u5DF2\u51C6\u5907\u597D\uFF0C\u6F14\u5458\u505C\u5728\u7B2C\u4E00\u5E27\u3002\u8BF4\u201C\u5F00\u542F\u9884\u89C8\u201D\u6216\u201CYes\u201D\uFF0C\u786E\u8BA4\u540E\u624D\u5F00\u59CB\u64AD\u653E\u3002": "Zombie motions are ready at the first frame. Say \u201CPreview\u201D or \u201CYes\u201D to start.",
  "\u8349\u56FE\u5C1A\u672A\u5E94\u7528\uFF0C\u8BF7\u5148\u4FDD\u7559\u67E5\u770B\u6216\u9000\u51FA Draft\uFF1B\u8DEF\u5F84\u6307\u4EE4\u6682\u4E0D\u53EF\u7528": "The draft has not been applied. Review it or exit Draft before continuing.",
  "\u4FEE\u6539\u5DF2\u5E94\u7528\u3002": "Changes applied.",
  "\u5DF2\u653E\u5F03\u9884\u89C8\u3002": "Preview discarded.",
  \u5DF2\u53D6\u6D88: "Cancelled",
  \u6F14\u5458\u64CD\u4F5C\u672A\u5B8C\u6210: "Actor action did not complete",
  \u8349\u56FE\u8DEF\u5F84\u5C1A\u672A\u5E94\u7528: "Draft path has not been applied",
  \u672A\u652F\u6301\u7684\u5267\u672C\u64CD\u4F5C: "Unsupported script action",
  \u65E0\u6CD5\u52A0\u8F7D\u5267\u672C\u914D\u7F6E: "Could not load the script",
  \u8BF7\u5148\u5B8C\u6210\u5F53\u524D\u64CD\u4F5C: "Finish the current action first",
  \u5DF2\u53D6\u6D88\u91CD\u5EFA: "Build cancelled",
  "\u573A\u666F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u6784\u5EFA": "Scene changed. Build again.",
  \u5DF2\u53D6\u6D88\u6216\u573A\u666F\u5DF2\u53D8\u5316: "Cancelled or scene changed",
  \u8BF7\u5148\u586B\u5199\u63CF\u8FF0: "Enter a description first",
  \u8BF7\u5148\u9009\u62E9\u95E8: "Select a door first",
  \u5DF2\u53D6\u6D88\u51C6\u5907: "Preparation cancelled",
  \u573A\u666F\u5DF2\u53D8\u5316: "Scene changed",
  "\u95E8\u4EA4\u4E92\u5DF2\u51C6\u5907\u3002\u9000\u51FA\u7F16\u8F91\uFF0C\u6309\u4F4F\u53F3\u63E1\u628A\u62C9\u95E8\uFF0C\u677E\u624B\u56DE\u5173\u3002": "Door interaction ready. Exit edit mode, hold the right grip to pull the door, and release to close.",
  \u8BF7\u5148\u9009\u4E2D\u6F14\u5458\u5E76\u5B8C\u6210\u6709\u6548\u8349\u56FE: "Select actors and finish a valid draft first",
  "\u597D\u7684\uFF0C\u6211\u6765\u8BA9\u8FD9\u7EC4\u6F14\u5458\u6CBF\u8349\u56FE\u524D\u8FDB\u3002": "I will prepare this group to follow the draft.",
  "\u8DEF\u5F84\u5DF2\u51C6\u5907\uFF0C\u786E\u8BA4 Preview \u540E\u5F00\u59CB\u3002": "Path ready. Press the left grip or select Preview.",
  \u76EE\u6807\u5DF2\u53D8\u5316: "Target changed",
  "\u597D\u7684\uFF0C\u5F00\u95E8\u65F6\u5C06\u542F\u52A8\u8FD9\u7EC4\u6F14\u5458\u7684\u8DEF\u5F84\u3002": "Opening the door will start this group's path.",
  "\u5DF2\u7ED1\u5B9A\u3002\u95E8\u5173\u95ED\u5F85\u547D\uFF0C\u5F00\u95E8\u89E6\u53D1\u4E00\u6B21\uFF1BReset \u53EF\u91CD\u62CD\u3002": "Bound. The closed door is armed for one trigger. Reset to repeat.",
  \u8BF7\u7B49\u95E8\u56DE\u5173\u540E\u91CD\u8BD5: "Wait for the door to close, then retry",
  "\u6821\u51C6\u5DF2\u5C31\u7EEA\u3002\u5E94\u7528\u540E\uFF0C\u771F\u5B9E\u8D70\u52A8\u5C06\u6309 1:1 \u9A71\u52A8\u865A\u62DF\u6444\u5F71\u673A\u3002": "Alignment ready. After applying it, physical movement drives the virtual camera at 1:1 scale.",
  "\u4F18\u5148\u91C7\u7528 Quest \u626B\u63CF\uFF1B\u6216\u7528\u53F3\u6273\u673A\u70B9\u5730\u9762\u5899\u89D2 A\u3002": "Use the Quest scan, or point at floor corner A with the right trigger.",
  "\u6CBF\u540C\u4E00\u9762\u5899\uFF0C\u70B9\u53E6\u4E00\u4E2A\u5730\u9762\u5899\u89D2 B\u3002": "Choose floor corner B along the same wall.",
  "\u4ECE B \u6CBF\u76F8\u90BB\u5899\u9762\uFF0C\u70B9\u4E0B\u4E00\u4E2A\u5730\u9762\u5899\u89D2 C\u3002": "From B, choose corner C along the adjacent wall.",
  "\u7784\u51C6 A\u2013B \u90A3\u9762\u5899\u4E0E\u5929\u82B1\u677F\u7684\u4EA4\u754C\uFF0C\u6263\u53F3\u6273\u673A\u6D4B\u9AD8\u5EA6\u3002": "Point at the ceiling edge above wall A\u2013B and press the right trigger to measure height.",
  \u5C1A\u672A\u53D6\u5F97\u623F\u95F4\u5C3A\u5BF8: "Room dimensions unavailable",
  "\u5B9E\u4F53\u767D\u6A21 \xB7 \u4E0E\u6D4F\u89C8\u5668\u91C7\u7528\u76F8\u540C\u906E\u6321": "Solid blockout \xB7 Standard occlusion",
  "\u534A\u900F\u660E\u53E0\u52A0 \xB7 \u900F\u89C6\u73B0\u5B9E\uFF0C\u865A\u62DF\u5899\u4ECD\u906E\u6321\u540E\u65B9\u7269\u5757": "Translucent overlay \xB7 Virtual walls still occlude objects behind them",
  \u8BF7\u5148\u9009\u4E2D\u6F14\u5458: "Select an actor first",
  \u7B49\u5F85\u5730\u9762\u4E0E\u5929\u82B1\u677F\u6570\u636E: "Waiting for floor and ceiling data",
  \u9884\u89C8\u5C1A\u672A\u4FDD\u5B58: "Preview not saved",
  \u5DF2\u4FDD\u5B58: "Saved",
  \u5DF2\u81EA\u52A8\u4FDD\u5B58: "Autosaved",
  \u5C1A\u672A\u4FDD\u5B58: "Not saved",
  "03 / \u4F53\u9A8C\u4E0E\u521B\u4F5C": "03 / Explore and create",
  "\u9009\u62E9\u56FE\u7247\uFF0C\u70B9\u51FB\u6784\u5EFA\uFF0C3 \u79D2\u540E\u81EA\u52A8\u8FDB\u5165\u5DF2\u51C6\u5907\u7684\u4E16\u754C\u3002": "Choose an image and build. Enter the prepared world after a 3-second countdown.",
  "\u9009\u62E9\u4E00\u5F20\u53C2\u8003\u56FE\uFF0C\u7136\u540E\u5F00\u59CB\u6784\u5EFA\u3002": "Choose a reference image, then start building.",
  "\u6B63\u5728\u6839\u636E\u56FE\u7247\u6784\u5EFA\u7C97\u573A\u666F\u3002": "Building a rough scene from the image.",
  "\u5148\u770B\u6574\u4F53\uFF0C\u91C7\u7528\u540E\u81EA\u52A8\u751F\u6210\u5019\u9009\u5165\u53E3\u3002": "Review the layout, then apply it to create entry points.",
  "\u7B49\u5F85\u5934\u663E\u5B9A\u4F4D\uFF0C\u6062\u590D\u540E\u91CD\u65B0\u5012\u8BA1\u65F6\u3002": "Waiting for headset tracking. The countdown will restart when tracking returns.",
  "\u63A8\u8350\u5165\u53E3\u5DF2\u5C31\u7EEA\uFF0C\u5373\u5C06\u81EA\u52A8\u8FDB\u5165\u3002": "Entry point ready. Entering shortly.",
  "\u5DF2\u8F7D\u5165\u4FDD\u5B58\u7684\u4E16\u754C\uFF0C{0} \u4E2A\u5165\u53E3\u53EF\u76F4\u63A5\u8FDB\u5165\uFF0C\u65E0\u9700\u6784\u5EFA\u3002": "Saved world loaded. {0} entry points available.",
  "\u6CA1\u6709\u627E\u5230\u5408\u9002\u5165\u53E3\uFF0C\u8BF7\u6362\u56FE\u91CD\u5EFA\u6216\u8C03\u6574\u5730\u9762\u3002": "No suitable entry point found. Rebuild or adjust the floor.",
  "\u8FB9\u4F53\u9A8C\u8FB9\u521B\u4F5C\u3002\u9009\u4E2D\u5BF9\u8C61\u540E\uFF0C\u8BF4\u51FA\u60F3\u4FEE\u6539\u7684\u5185\u5BB9\u3002": "Explore and create. Select an object to describe a change.",
  "\u4ECE\u4E00\u5F20\u56FE\u7247\uFF0C\u8D70\u8FDB\u4E00\u4E2A\u4E16\u754C\u3002": "Step into a world from an image.",
  "\u5148\u6784\u5EFA\u7C97\u573A\u666F\uFF0C\u518D\u9009\u62E9\u5165\u53E3\uFF0C\u8FDB\u5165\u4E16\u754C\u7EE7\u7EED\u521B\u9020\u3002": "Build a rough scene, choose an entry point, then keep creating inside.",
  "\u6B63\u5728\u6784\u5EFA\u4F60\u7684\u4E16\u754C\u2026": "Building your world\u2026",
  "\u53C2\u8003\u56FE\uFF1A": "Reference: ",
  \u6839\u636E\u5DF2\u9009\u62E9\u7684\u56FE\u7247\u6784\u5EFA: "Build from the selected image",
  "\u7C97\u573A\u666F\u9884\u89C8 \xB7 \u91C7\u7528\u540E\u751F\u6210\u5165\u53E3": "Scene preview \xB7 Apply to create entry points",
  \u5DF2\u4FDD\u5B58\u7684\u7A0B\u5E8F\u5316\u793A\u4F8B: "Saved procedural example",
  "\u57FA\u4E8E\u53C2\u8003\u56FE\u751F\u6210 \xB7 \u4E0D\u53EF\u89C1\u90E8\u5206\u4E3A\u63A8\u65AD": "Generated from a reference \xB7 Unseen areas are inferred",
  "\u5F55\u5C4F\u6F14\u793A \xB7 \u56FE\u7247\u7528\u4E8E\u5C55\u793A\u521B\u4F5C\u8D77\u70B9\uFF0C\u8F7D\u5165\u5F53\u524D\u5DF2\u4FDD\u5B58\u4E16\u754C\u3002": "Recording demo \xB7 The image introduces the workflow; the saved world is loaded.",
  "\u7B49\u5F85\u5934\u663E\u5B9A\u4F4D\u2026": "Waiting for headset tracking\u2026",
  "{0} \u79D2\u540E\uFF0C\u8D70\u8FDB\u8FD9\u4E2A\u4E16\u754C\u3002": "Entering the world in {0} seconds.",
  "\u9884\u751F\u6210\u573A\u666F\u6F14\u793A \xB7 \u81EA\u52A8\u8FDB\u5165\u63A8\u8350\u4F4D\u7F6E": "Prepared scene demo \xB7 Automatic entry",
  "01 / \u62CD\u6444\u623F\u95F4": "01 / Capture the room",
  "\u6362\u4F4D\u7F6E\u62CD\uFF0C\u6309\u5FEB\u95E8\u65F6\u505C\u7A33\u3002\u7167\u7247\u7528\u4E8E\u91CD\u5EFA\u53C2\u8003\uFF1B\u4E0D\u4F1A\u663E\u793A\u539F\u59CB\u626B\u63CF\u5E73\u9762\u3002": "Move between shots and hold still at capture. Photos guide reconstruction.",
  "\u628A\u8EAB\u8FB9\u7684\u623F\u95F4\uFF0C\n\u53D8\u6210\u521B\u4F5C\u7684\u8D77\u70B9\u3002": `Start with the room
around you.`,
  "\u72EC\u7ACB\u573A\u666F \xB7 \u6309\u626B\u63CF\u8303\u56F4\u6784\u5EFA \xB7 \u672A\u626B\u63CF\u672B\u7AEF\u4EE5\u865A\u62DF\u5899\u5C01\u95ED": "Independent scene \xB7 Scan-constrained layout \xB7 Unscanned ends are closed with virtual walls",
  "\u62CD\u6444\u771F\u5B9E\u7A7A\u95F4 \xB7 \u642D\u5EFA\u7B80\u6D01\u767D\u6A21 \xB7 \u8FDB\u5165\u540E\u81EA\u7531\u4FEE\u6539": "Capture a real room \xB7 Build a blockout \xB7 Edit from inside",
  "\u5DF2\u4FDD\u5B58\u7684\u4E16\u754C\u53EF\u4ECE\u201C\u66F4\u591A\u201D\u7EE7\u7EED": "Continue your saved world from More",
  "\u65B0\u573A\u666F\u5DF2\u51C6\u5907 \xB7 \u7B49\u5F85\u62CD\u7167": "New scene ready \xB7 Waiting for photos",
  "01 / \u626B\u63CF\u53C2\u8003 \u2192 \u53EF\u7F16\u8F91\u767D\u6A21": "01 / Scan to editable blockout",
  "\u4EE5\u626B\u63CF\u5E03\u5C40\u91CD\u5EFA\u72EC\u7ACB\u7269\u5757\uFF0C\u6574\u7406\u91CD\u53E0\u4E0E\u8FDE\u63A5\uFF1B\u7167\u7247\u53EF\u9009\u3002": "Rebuild separate objects from the scan, resolving overlaps and connections.",
  "\u6309\u626B\u63CF\u5E03\u5C40\uFF0C\u91CD\u5EFA\u53EF\u7F16\u8F91\u573A\u666F\u3002": "Build an editable scene from the scan.",
  "\u626B\u63CF\u7EA6\u675F\u5E03\u5C40\u4E0E\u5C3A\u5EA6 \xB7 \u7167\u7247\u8F85\u52A9\u8BC6\u522B\u5BB6\u5177": "Scan-constrained layout and scale \xB7 Photos guide object classification",
  "\u5DF2\u6709\u573A\u666F\u4FDD\u7559 \xB7 \u91CD\u5EFA\u7ED3\u679C\u5148\u9884\u89C8\uFF0C\u91C7\u7528\u540E\u66FF\u6362": "Review the new build before replacing the current scene",
  "02 / \u6784\u5EFA\u623F\u95F4": "02 / Build the room",
  "\u6B63\u5728\u5408\u5E76\u591A\u4E2A\u89C6\u89D2\uFF0C\u53EA\u6784\u5EFA\u623F\u95F4\u7ED3\u6784\u4E0E\u5927\u4EF6\u5BB6\u5177\u3002": "Combining views to build room structure and large furniture.",
  "{0} \u5F20\u623F\u95F4\u7167\u7247 \xB7 \u5FFD\u7565\u684C\u9762\u7EC6\u8282": "{0} room photos \xB7 Small tabletop details excluded",
  "\u6B63\u5728\u6574\u7406\u626B\u63CF\u8F6E\u5ED3\u548C\u8D70\u5ECA\u8FDE\u63A5\uFF0C\u6784\u5EFA\u72EC\u7ACB\u53EF\u7F16\u8F91\u7269\u5757\u3002": "Resolving scan contours and connections into editable objects.",
  "{0} \u5F20\u53C2\u8003\u7167 \xB7 \u53EA\u8F85\u52A9\u5BB6\u5177\u5206\u7C7B": "{0} reference photos \xB7 Furniture classification only",
  \u6839\u636E\u626B\u63CF\u751F\u6210\u573A\u666F\u7269\u5757: "Build scene objects from the scan",
  "\u9009\u62E9\u4E00\u4E2A\u7A7A\u65F7\u4F4D\u7F6E\uFF0C\u8FDB\u5165\u623F\u95F4\u4F53\u9A8C\u3002": "Choose an open spot to enter the room.",
  "\u672A\u627E\u5230\u53EF\u7AD9\u7ACB\u7684\u5165\u53E3\uFF0C\u53EF\u8FD4\u56DE\u62CD\u6444\u540E\u91CD\u65B0\u6784\u5EFA\u3002": "No clear entry point found. Return to capture and rebuild.",
  "\u5BF9\u9F50\u771F\u5B9E\u623F\u95F4\u540E\uFF0C\u7528\u771F\u5B9E\u8D70\u52A8\u8FD0\u955C\uFF1B\u4E5F\u53EF\u5148\u67E5\u770B\u5C1A\u672A\u6821\u51C6\u7684\u573A\u666F\u3002": "Align with the real room to film through physical movement, or inspect the estimated scene first.",
  "\u5DF2\u6307\u5B9A {0} \u4E2A\u5730\u9762\u89D2\u70B9": "{0} floor corners marked",
  "\u6839\u636E\u771F\u5B9E\u623F\u95F4\u7167\u7247\u751F\u6210 \xB7 \u5C3A\u5BF8\u4E0E\u4E0D\u53EF\u89C1\u7ED3\u6784\u4E3A\u4F30\u8BA1": "Generated from room photos \xB7 Dimensions and unseen geometry are estimates",
  "{0} \xB7 \u5BB6\u5177\u5E03\u5C40\u4ECD\u9700\u5BF9\u7167\u4FEE\u6B63{1}": "{0} \xB7 Check furniture placement against the room{1}",
  \u5C3A\u5BF8\u4F30\u8BA1: "Estimated dimensions",
  \u623F\u95F4\u5C3A\u5BF8\u5DF2\u6821\u51C6: "Room dimensions calibrated",
  " \xB7 \u771F\u5B9E\u8D70\u52A8 1:1": " \xB7 Physical movement 1:1",
  "\u626B\u63CF\u7EA6\u675F\u7684\u53EF\u7F16\u8F91\u767D\u6A21 \xB7 \u72EC\u7ACB\u7269\u5757 \xB7 \u95E8\u4F4D\u7F6E\u53C2\u8003\u4FDD\u7559": "Editable scan blockout \xB7 Separate objects \xB7 Door locations preserved",
  "\u9010\u9762 Quest \u626B\u63CF\u7ED3\u6784 \xB7 \u95E8\u4E3A\u9759\u6001\u5FEB\u7167 \xB7 \u8DE8\u533A\u8FDE\u63A5\u5F85\u6838\u5BF9": "Quest scan surfaces \xB7 Doors are static snapshots \xB7 Check cross-area connections",
  "\u7EE7\u7EED\u5DF2\u4FDD\u5B58\u7684\u5E03\u7F6E\uFF1B\u9700\u8981\u65F6\u518D\u786E\u8BA4\u4E0E\u771F\u5B9E\u623F\u95F4\u7684\u5BF9\u9F50\u3002": "Continue your saved layout and confirm real-room alignment when needed.",
  "\u4ECE\u771F\u5B9E\u623F\u95F4\u7167\u7247\u5F00\u59CB\uFF0C\u5148\u642D\u5EFA\u53EF\u8FDB\u5165\u7684\u767D\u6A21\u3002": "Start with room photos and build a blockout you can enter.",
  "\u67E5\u770B\u6574\u4F53\u5E03\u7F6E\uFF0C\u8FD4\u56DE\u65F6\u4FDD\u7559\u5F53\u524D\u4F4D\u7F6E\u4E0E\u5BF9\u9F50\u3002": "Inspect the whole layout. Your position and alignment are kept when you return.",
  "\u5BF9\u7167\u771F\u5B9E\u5899\u9762\u68C0\u67E5\u4F4D\u7F6E\u548C\u671D\u5411\u3002\u786E\u8BA4\u540E\u5373\u53EF\u521B\u4F5C\uFF1B\u623F\u95F4\u5927\u5C0F\u4FDD\u6301\u4FDD\u5B58\u503C\u3002": "Check position and orientation against the real walls. Saved room dimensions stay in place.",
  "\u6B63\u5728\u8BFB\u53D6 Quest \u623F\u95F4\u626B\u63CF\u3002\u6CA1\u6709\u6570\u636E\u65F6\u53EF\u5C55\u5F00\u201C\u8C03\u6574\u5BF9\u9F50\u201D\u624B\u52A8\u6307\u5B9A\u5899\u89D2\u3002": "Reading the Quest scan. If unavailable, use Adjust alignment to mark corners manually.",
  "\u67E5\u770B\u6574\u4F53\uFF0C\u91C7\u7528\u540E\u8FDB\u5165\u521B\u4F5C\u3002\u539F\u573A\u666F\u4FDD\u7559\u5230\u4F60\u786E\u8BA4\u91C7\u7528\u3002": "Review the layout, then apply it to enter. The current scene remains until you apply.",
  "\u6307\u5411\u5730\u9762\uFF0C\u6263\u53F3\u6273\u673A\u653E\u7F6E\u6F14\u5458\uFF1BA \u53D6\u6D88\u3002": "Point at the floor and press the right trigger to place an actor \xB7 A to cancel",
  "\u53F3\u6447\u6746\u6309\u4E0B\u7F16\u8F91 \xB7 \u5DE6 X \u8BF4\u8BDD \xB7 B \u5F55\u5236 \xB7 Y \u83DC\u5355": "Right stick click: edit \xB7 X: speak \xB7 B: record \xB7 Y: menu",
  "Draft \xB7 \u753B\u7EBF\u7ED3\u675F\u540E\u4FDD\u7559\u8349\u56FE\uFF0C\u53EF\u91CD\u753B\u6216\u64A4\u56DE\u3002": "Draft \xB7 Draw a path, then review, redraw, or undo.",
  "\u7EE7\u7EED\u4F60\u7684\u521B\u4F5C\u3002": "Continue creating.",
  \u4ECE\u8EAB\u8FB9\u7684\u771F\u5B9E\u7A7A\u95F4\u5F00\u59CB: "Start with a real space",
  "\u53EF\u7F16\u8F91\u91CD\u5EFA\u767D\u6A21 \xB7 \u91C7\u7528\u540E\u6309\u53F3\u6447\u6746\u8FDB\u5165\u7F16\u8F91": "Editable blockout \xB7 Apply, then click the right stick to edit",
  "\u6309\u626B\u63CF\u8865\u5EFA \xB7 \u539F\u6709\u5899\u95E8\u4FDD\u6301\u4E0D\u53D8": "Scan-based furnishing \xB7 Existing walls and doors preserved",
  "\u9010\u9762 Quest \u626B\u63CF\u7ED3\u6784 \xB7 \u8DE8\u533A\u8FDE\u63A5\u5F85\u6838\u5BF9": "Quest scan surfaces \xB7 Check cross-area connections",
  "\u7C97\u573A\u666F\u9884\u89C8 \xB7 \u91C7\u7528\u540E\u8FDB\u5165\u521B\u4F5C": "Scene preview \xB7 Apply to enter",
  \u5C1A\u672A\u6821\u51C6: "Not calibrated",
  \u5DF2\u8BB0\u5F55\u623F\u95F4\u5C3A\u5BF8: "Room dimensions recorded",
  "Quest \u5E73\u9762\uFF1A{0} \xB7 {1}": "Quest planes: {0} \xB7 {1}",
  "\u5728 Quest \u6C89\u6D78\u6A21\u5F0F\u4E2D\u53EF\u8BFB\u53D6\u623F\u95F4\u626B\u63CF\u3002": "Room scans are available in Quest immersive mode.",
  "\u505C\u6B62\u5E76\u4FDD\u5B58 \xB7 \u53F3 B": "Stop and save \xB7 B",
  "\u5F55\u5236\u7EAF\u865A\u62DF\u753B\u9762 \xB7 \u53F3 B": "Record virtual view \xB7 B",
  \u8FDB\u5165\u623F\u95F4\u540E\u5F55\u5236: "Enter the room to record",
  " \xB7 {0} \u79D2": " \xB7 {0} s",
  \u8FD4\u56DE\u521B\u4F5C: "Back to creating",
  "\u6309\u4F4F\u5DE6 X \u8BF4\u8BDD\uFF0C\u6216\u5C55\u5F00\u6587\u5B57\u8F93\u5165\u3002": "Hold X to speak, or open text input.",
  "\u4F60\uFF1A": "You: ",
  "\u9636\u6BB5\u5DF2\u53D8\u5316\uFF0C\u9000\u51FA\u8349\u56FE\u7F16\u8F91": "Stage changed. Draft closed.",
  "\u5165\u53E3 {0} \u5DF2\u9009\uFF1B\u70B9\u201C\u8FDB\u5165\u4E16\u754C\u201D": "Entry {0} selected \xB7 Select Enter world",
  "\u5165\u53E3 {0}{1}": "Entry {0}{1}",
  " \xB7 \u63A8\u8350": " \xB7 Recommended",
  "\u5F00\u59CB\u521B\u4F5C \xB7 \u6309\u4E0B\u53F3\u6447\u6746\u7F16\u8F91 \xB7 A \u653E\u7F6E\u6F14\u5458 \xB7 X \u8BF4\u8BDD \xB7 B \u5F55\u5236 \xB7 Y \u83DC\u5355": "Create \xB7 Right stick: edit \xB7 A: cancel / back \xB7 X: speak \xB7 B: record \xB7 Y: menu",
  "\u626B\u63CF\u4EC5\u4F5C\u4E3A\u53C2\u8003\uFF0C\u8BF7\u5148\u6309\u626B\u63CF\u6784\u5EFA\u53EF\u7F16\u8F91\u767D\u6A21": "The scan is a reference. Build an editable blockout first.",
  \u7B49\u5F85\u5934\u663E\u5B9A\u4F4D\u540E\u518D\u7EE7\u7EED: "Wait for headset tracking before continuing",
  "\u8BF7\u5148\u9009\u62E9\u201C\u5E94\u7528\u4FEE\u6539\u201D\u6216\u201C\u653E\u5F03\u9884\u89C8\u201D\uFF0C\u518D\u7ED3\u675F\u521B\u4F5C": "Apply or discard the preview before finishing",
  "\u8BF7\u5148\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C\uFF0C\u518D\u4FDD\u5B58\u5E76\u7ED3\u675F\u521B\u4F5C": "Finish the current action before saving and exiting",
  "\u573A\u666F\u5DF2\u4FDD\u5B58\uFF0C\u5DF2\u8FD4\u56DE\u73B0\u5B9E\uFF1B\u53EF\u4EE5\u7EE7\u7EED\u4E0A\u6B21\u521B\u4F5C": "Scene saved. You can resume your work later.",
  \u8BF7\u5148\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C: "Finish the current action first",
  "\u5DF2\u53D6\u6D88\u8FDB\u5165\uFF0C\u53EF\u4EE5\u91CD\u65B0\u5F00\u59CB": "Entry cancelled. You can start again.",
  "\u573A\u666F\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u91CD\u65B0\u70B9\u51FB\u6784\u5EFA\u573A\u666F": "Scene updated. Select Build again.",
  "\u6784\u9020\u7ED3\u679C\u9884\u89C8 \xB7 \u5C1A\u672A\u5E94\u7528": "Build preview \xB7 Not applied",
  "\u7A0B\u5E8F\u5316\u793A\u4F8B \xB7 \u975E\u56FE\u7247\u91CD\u5EFA\u7ED3\u679C": "Procedural example \xB7 Not a photo reconstruction",
  "\u6A21\u578B\u751F\u6210\u7684\u7C97\u573A\u666F \xB7 \u5305\u542B\u63A8\u65AD\u51E0\u4F55": "Generated blockout \xB7 Includes inferred geometry",
  "{0} \u5DF2\u9009": "{0} selected",
  " \u2026 \u5171 {0} \u9879": " \u2026 {0} items total",
  " \xB7 \u8349\u56FE\u76EE\u6807\u5DF2\u9501\u5B9A": " \xB7 Draft targets locked",
  " \xB7 \u518D\u6309\u4F4F\u6273\u673A\u8C03\u6574": " \xB7 Hold trigger again to adjust",
  "\u8FDB\u5165\u7F16\u8F91\u540E\uFF0C\u6307\u5411\u5BF9\u8C61\u67E5\u770B\u7C7B\u522B\u5E76\u786E\u8BA4\u9009\u62E9\u3002": "Enter edit mode, then point at an object to inspect and select it.",
  "{0} \u6846\u5185\u5019\u9009": "{0} objects in selection box",
  \u6CA1\u6709\u9009\u4E2D\u5BF9\u8C61: "No objects selected",
  "\u5148\u9009\u62E9\u5165\u53E3\u5E76\u8FDB\u5165\u4E16\u754C\uFF0C\u518D\u8FDB\u884C\u6846\u9009": "Enter the world before using box selection",
  "\u5148\u7ED3\u675F\u5F55\u97F3\u6216\u5904\u7406\u5F53\u524D\u8BF7\u6C42 / \u9884\u89C8": "Finish voice input or the current request / preview first",
  "\u6B63\u5728\u653E\u7F6E\u6F14\u5458\uFF1A\u53F3\u6273\u673A\u786E\u8BA4\uFF0CA \u53D6\u6D88": "Place actor: right trigger to confirm \xB7 A to cancel",
  "\u5148\u6309\u4E0B\u53F3\u6447\u6746\u8FDB\u5165\u7F16\u8F91\uFF0C\u518D\u6309\u4F4F\u53F3\u63E1\u628A\u6846\u9009": "Click the right stick to edit, then hold the right grip for box selection",
  "\u6846\u9009\u5F00\u59CB\uFF1A\u6307\u5411\u53E6\u4E00\u89D2\uFF0C\u53F3\u6447\u6746\u8C03\u6574\u6DF1\u5EA6\uFF1B\u677E\u5F00\u63E1\u628A\u786E\u8BA4": "Point at the opposite corner \xB7 Right stick adjusts depth \xB7 Release grip to confirm",
  "\u9009\u6846\u592A\u5C0F\uFF0C\u4FDD\u7559\u539F\u9009\u62E9": "Selection box too small. Previous selection kept.",
  \u9000\u51FA\u7F16\u8F91\u6A21\u5F0F: "Exit edit mode",
  \u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F: "Enter edit mode",
  "\u7F16\u8F91\uFF1A\u6273\u673A\u70B9\u9009\u540E\u518D\u6B21\u6309\u4F4F\u8C03\u6574 \xB7 \u6447\u6746\u8F6C\u5411/\u5347\u964D \xB7 \u5DE6\u6447\u6746\u64A4\u9500": "Edit: select, then hold trigger to adjust \xB7 Stick to turn or raise \xB7 Left stick click to undo",
  "\u4F53\u9A8C\uFF1A\u573A\u666F\u9009\u62E9\u5DF2\u5173\u95ED \xB7 \u6309\u4E0B\u53F3\u6447\u6746\u8FDB\u5165\u7F16\u8F91": "Explore \xB7 Click the right stick to edit",
  \u8BF7\u5148\u8FDB\u5165\u4E16\u754C: "Enter the world first",
  "\u8BF7\u5148\u6263\u53F3\u6273\u673A\u653E\u7F6E\u6F14\u5458\uFF0C\u6216\u6309 A \u53D6\u6D88": "Place the actor with the right trigger, or press A to cancel",
  "\u5DF2\u8FDB\u5165\u7F16\u8F91\uFF1A\u8868\u9762\u5706\u70B9\u663E\u793A\u547D\u4E2D\u4F4D\u7F6E\uFF0C\u53F3\u6273\u673A\u9009\u62E9\uFF0C\u53F3\u63E1\u628A\u6846\u9009": "Edit mode \xB7 Right trigger to select \xB7 Right grip for box selection",
  "\u5DF2\u9000\u51FA\u7F16\u8F91\uFF1A\u53EF\u81EA\u7531\u4F53\u9A8C\u4E0E\u8FD0\u955C\uFF0C\u5DF2\u786E\u8BA4\u7684\u9009\u62E9\u4FDD\u7559\u5728\u5BF9\u8BDD\u4E0A\u4E0B\u6587\u4E2D": "Explore mode \xB7 Selection is retained for your next request",
  "\u5148\u8FDB\u5165\u4E16\u754C\uFF0C\u518D\u8FDB\u884C\u7F16\u8F91": "Enter the world before editing",
  "\u53F3\u63E1\u628A\u6309\u4F4F\u62D6\u6846\uFF0C\u677E\u5F00\u786E\u8BA4\uFF1B\u53F3\u6447\u6746\u8C03\u6574\u6DF1\u5EA6": "Hold right grip to select a box \xB7 Release to confirm \xB7 Right stick adjusts depth",
  "\u6307\u5411\u7A7A\u5730\uFF0C\u6263\u52A8\u6273\u673A\u8BBE\u7F6E\u8FDB\u5165\u70B9": "Point at an open area and press the trigger to choose an entry point",
  "\u9009\u62E9\u6A21\u5F0F\uFF1A{0}": "Selection mode: {0}",
  \u5206\u7EC4: "Group",
  \u5BF9\u8C61: "Object",
  "Draft \xB7 \u53F3\u6273\u673A\u753B\u7EBF \xB7 \u5DE6\u6447\u6746\u6309\u4E0B\u64A4\u56DE \xB7 \u53F3 A \u53D6\u6D88 \xB7 B \u5F55\u5236 \xB7 Y \u83DC\u5355": "Draft \xB7 Right trigger: draw \xB7 Left stick click: undo \xB7 A: cancel \xB7 B: record \xB7 Y: menu",
  "Draft \xB7 \u6309\u4F4F\u9F20\u6807\u5DE6\u952E\u753B\u7EBF \xB7 Ctrl / \u2318 Z \u64A4\u56DE \xB7 Esc \u53D6\u6D88 \xB7 R \u5F55\u5236": "Draft \xB7 Drag with left mouse: draw \xB7 Ctrl / \u2318 Z: undo \xB7 Esc: cancel \xB7 R: record",
  "\u9009\u62E9\u56FE\u7247 \u2192 \u6784\u5EFA\u573A\u666F \u2192 \u9009\u62E9\u5165\u53E3 \u2192 \u8FDB\u5165\u4E16\u754C": "Choose image \u2192 Build scene \u2192 Choose entry \u2192 Enter world",
  "\u70B9\u9009\u5165\u53E3\u5149\u5708\uFF0C\u6216\u6307\u5411\u7A7A\u5730\u6307\u5B9A\u4F4D\u7F6E": "Select an entry ring, or point at an open area",
  "\u6309\u4F4F\u9F20\u6807\u5DE6\u952E\u62D6\u51FA\u4E09\u7EF4\u9009\u6846 \xB7 \u4E2D\u5FC3\u70B9\u5728\u6846\u5185\u5373\u9009\u4E2D": "Drag with the left mouse to box-select object centers",
  "\u62D6\u52A8\u65CB\u8F6C \xB7 \u6EDA\u8F6E\u7F29\u653E": "Drag to orbit \xB7 Scroll to zoom",
  "WASD \u79FB\u52A8 \xB7 Q/E \u5347\u964D \xB7 \u53F3\u952E\u770B\u5411 \xB7 V \u5207\u6362\u7F16\u8F91": "WASD: move \xB7 Q/E: vertical \xB7 Right mouse: look \xB7 V: edit",
  "\u9009\u62E9\u56FE\u7247 \u2192 \u6784\u5EFA\u573A\u666F \u2192 3 \u79D2\u540E\u81EA\u52A8\u8FDB\u5165": "Choose image \u2192 Build scene \u2192 Enter after 3 seconds",
  "\u5934\u663E\u671D\u5411\u53D6\u666F \xB7 \u53F3\u98DF\u6307\u6273\u673A\u62CD\u7167 \xB7 \u83DC\u5355\u64A4\u56DE\u4E0A\u4E00\u5F20 \xB7 \u5DE6 Y \u5524\u51FA\u83DC\u5355": "Aim with the headset \xB7 Right trigger: photo \xB7 Menu: undo photo \xB7 Y: menu",
  "{0} \xB7 \u6309\u4E0B\u53F3\u6447\u6746 / V \u5207\u6362 \xB7 {1} \xB7 B \u5F55\u5236": "{0} \xB7 Right stick / V: toggle \xB7 {1} \xB7 B: record",
  "\u7F16\u8F91 \xB7 \u6273\u673A\u70B9\u9009\u540E\u518D\u6309\u4F4F\u8C03\u6574 \xB7 \u6447\u6746\u8F6C\u5411/\u5347\u964D \xB7 \u5DE6\u6447\u6746\u64A4\u9500 \xB7 \u53F3\u63E1\u628A\u6846\u9009": "Edit \xB7 Hold trigger: adjust \xB7 Stick: turn / raise \xB7 Left stick click: undo \xB7 Right grip: box-select",
  "\u4F53\u9A8C\u6A21\u5F0F \xB7 \u4E0D\u9009\u4E2D\u573A\u666F": "Explore mode",
  "\u771F\u5B9E\u8D70\u52A8 1:1": "Physical movement 1:1",
  "WASD / \u6447\u6746\u79FB\u52A8": "WASD / stick to move",
  "\u7EE7\u7EED\u5DF2\u6709\u521B\u4F5C\uFF0C\u6216\u62CD\u6444\u65B0\u623F\u95F4": "Resume your work or capture a new room",
  "\u603B\u89C8 \xB7 \u8FD4\u56DE\u521B\u4F5C\u4FDD\u7559\u4F4D\u7F6E \xB7 \u5DE6 Y \u6574\u7EC4\u9690\u85CF\u6216\u53EC\u56DE": "Overview \xB7 Position preserved \xB7 Y: hide / show",
  "\u91C7\u7528 Quest \u626B\u63CF\uFF0C\u6216\u7528\u53F3\u6273\u673A\u6307\u5B9A\u4E09\u4E2A\u5899\u89D2\u4E0E\u9876\u9762\u9AD8\u5EA6": "Use the Quest scan, or mark three corners and ceiling height with the right trigger",
  \u5148\u9009\u62E9\u53C2\u8003\u56FE\u5E76\u6784\u5EFA\u573A\u666F: "Choose a reference and build first",
  \u8BF7\u6307\u5411\u573A\u666F\u5185\u66F4\u7A7A\u65F7\u7684\u5730\u9762: "Point at a clearer area of the floor",
  \u8FDB\u5165\u70B9\u5DF2\u8BBE\u7F6E: "Entry point set",
  \u5C0F\u4E16\u754C\u603B\u89C8: "World overview",
  \u7B49\u5F85\u5934\u663E\u5B9A\u4F4D\u540E\u518D\u8FDB\u5165: "Wait for headset tracking before entering",
  \u5148\u6784\u5EFA\u573A\u666F\u5E76\u9009\u62E9\u5165\u53E3: "Build a scene and choose an entry point first",
  "\u5F53\u524D\u8FDB\u5165\u70B9\u9644\u8FD1\u6709\u969C\u788D\uFF0C\u8BF7\u5148\u9009\u4E00\u5904\u7A7A\u5730": "Entry point is obstructed. Choose an open area.",
  \u4E16\u754C\u5185\u90E8: "Inside the world",
  "\u5DF2\u8FDB\u5165\u4F53\u9A8C\u6A21\u5F0F\uFF1B\u6309\u4E0B\u53F3\u6447\u6746\u8FDB\u5165\u7F16\u8F91\uFF0C\u5DE6 Y \u5524\u51FA / \u9690\u85CF\u83DC\u5355": "Explore mode \xB7 Right stick click: edit \xB7 Y: show / hide menu",
  \u5148\u8F7D\u5165\u5DF2\u7ECF\u6784\u5EFA\u7684\u623F\u95F4: "Load a built room first",
  "\u8BF7\u5728 Quest \u900F\u89C6\u6C89\u6D78\u6A21\u5F0F\u4E2D\u786E\u8BA4\u5BF9\u9F50": "Confirm alignment in Quest passthrough mode",
  \u7B49\u5F85\u5934\u663E\u5B9A\u4F4D: "Waiting for headset tracking",
  "\u8BF7\u5728 Quest \u6C89\u6D78\u4E2D\u7B49\u5F85\u5B9A\u4F4D\u540E\u6D4B\u91CF": "Enter immersive mode and wait for tracking before measuring",
  \u8BF7\u5411\u4E0B\u6307\u5411\u771F\u5B9E\u5730\u9762\u4E0A\u7684\u5899\u89D2: "Point down at a real floor corner",
  \u9700\u8981\u91CD\u65B0\u5BF9\u9F50\u771F\u5B9E\u623F\u95F4: "Real-room alignment is required",
  "\u771F\u5B9E\u8D70\u52A8 \xB7 1:1": "Physical movement \xB7 1:1",
  "\u5C1A\u672A\u53D6\u5F97\u5730\u9762\u4E0E\u5929\u82B1\u677F\uFF0C\u6216\u89D2\u70B9\u5C1A\u672A\u6307\u5B9A\u5B8C\u6210": "Floor / ceiling data or corner measurements are incomplete",
  \u7B49\u5F85\u5934\u663E\u5B9A\u4F4D\u540E\u518D\u5E94\u7528: "Wait for headset tracking before applying",
  \u8BF7\u5148\u53D6\u5F97\u5BF9\u9F50\u9884\u89C8: "Create an alignment preview first",
  "\u671D\u5411\u5DF2\u65CB\u8F6C 180\xB0\uFF0C\u8BF7\u5BF9\u7167\u5899\u9762\u4E0E\u5BB6\u5177": "Rotated 180\xB0. Check against the walls and furniture.",
  "\u626B\u63CF\u7ED3\u6784\u4FDD\u7559\u771F\u5B9E\u5C3A\u5BF8\uFF1B\u8BF7\u7528\u5BF9\u9F50\u8C03\u6574\u4F4D\u7F6E\u548C\u671D\u5411": "Scan dimensions are preserved. Adjust alignment to change position and orientation.",
  "\u5C3A\u5BF8\u5DF2\u8C03\u6574\uFF1B\u7EE7\u7EED\u521B\u4F5C\u65F6\u8BF7\u91CD\u65B0\u5BF9\u9F50": "Dimensions updated. Align the room again before continuing.",
  "\u5F53\u524D\u6D4F\u89C8\u5668\u6CA1\u6709\u7CFB\u7EDF\u626B\u63CF\u5165\u53E3\uFF1B\u8BF7\u5728 Quest \u7CFB\u7EDF\u8BBE\u7F6E\u4E2D\u626B\u63CF\u623F\u95F4": "Room scanning is unavailable here. Use the Quest system settings.",
  "\u7B49\u5F85\u626B\u63CF\u6570\u636E\u8FD4\u56DE\uFF0C\u53EF\u7A0D\u540E\u91C7\u7528 Quest \u626B\u63CF": "Waiting for scan data. You can apply the Quest scan later.",
  \u8BF7\u5148\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C\u518D\u5F00\u59CB\u5F55\u5236: "Finish the current action before starting a recording",
  "\u4E0B\u8F7D\u53C2\u8003\u89C6\u9891 \xB7 {0} \u79D2": "Download reference video \xB7 {0} s",
  \u4E0B\u8F7D\u8FD0\u955C\u4E0E\u4E8B\u4EF6\u6570\u636E: "Download camera and event data",
  \u6F14\u5458: "Actor",
  "\u8C03\u6574\u4E2D \xB7 \u6447\u6746\u8F6C\u5411 / \u5347\u964D \xB7 \u677E\u624B\u4FDD\u5B58": "Adjusting \xB7 Stick: turn / raise \xB7 Release to save",
  " \xB7 \u518D\u6309\u4F4F\u8C03\u6574": " \xB7 Hold again to adjust",
  "\u83DC\u5355\u5DF2\u6253\u5F00\uFF0C\u672C\u7B14\u672A\u4FDD\u7559": "Menu opened. Unfinished stroke discarded.",
  "\u83DC\u5355\u5DF2\u5728\u5F53\u524D\u6B63\u524D\u65B9 \xB7 \u5DE6 Y \u9690\u85CF": "Menu placed in front of you \xB7 Y to hide",
  \u8BF7\u5728\u6C89\u6D78\u6A21\u5F0F\u4E2D\u91CD\u65B0\u70B9\u51FB\u6784\u5EFA\u573A\u666F: "Select Build again in immersive mode",
  "\u6B64\u6D4F\u89C8\u5668\u6CA1\u6709 WebXR\uFF1B\u8BF7\u5728 Quest Browser \u6253\u5F00\u672C\u9875\u9762": "WebXR is unavailable. Open this page in Quest Browser.",
  \u8FFD\u8E2A\u539F\u70B9\u5DF2\u6539\u53D8: "Tracking origin changed",
  "\u8FFD\u8E2A\u539F\u70B9\u5DF2\u6539\u53D8\uFF1B\u7EE7\u7EED\u521B\u4F5C\u65F6\u8BF7\u91CD\u65B0\u786E\u8BA4\u5BF9\u9F50": "Tracking origin changed. Confirm alignment before continuing.",
  \u6C89\u6D78\u5DF2\u6682\u505C: "Immersive session paused",
  "\u6C89\u6D78\u5DF2\u6682\u505C\uFF0C\u8BF7\u91CD\u65B0\u5F00\u59CB\u8FDB\u5165": "Immersive session paused. Start entry again.",
  "\u6C89\u6D78\u5DF2\u6682\u505C\uFF0C\u76F8\u673A\u5DF2\u5173\u95ED\uFF0C\u7167\u7247\u4ECD\u4FDD\u7559\u3002": "Immersive session paused. Camera closed; photos retained.",
  \u6C89\u6D78\u5DF2\u9000\u51FA: "Immersive session ended",
  "\u65E0\u6CD5\u8FDB\u5165 XR\uFF1A{0}": "Could not enter XR: {0}",
  \u5148\u9009\u4E2D\u8981\u6539\u8272\u7684\u5BF9\u8C61: "Select objects before changing their color",
  \u989C\u8272\u5DF2\u66F4\u65B0: "Color updated",
  \u5DF2\u64A4\u9500\u6700\u8FD1\u4E00\u6B21\u4FEE\u6539: "Last change undone",
  "\u5148\u5E94\u7528\u6216\u653E\u5F03\u5F53\u524D\u9884\u89C8\uFF0C\u518D\u4FDD\u5B58\u573A\u666F": "Apply or discard the preview before saving",
  "\u5148\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C\uFF0C\u518D\u4FDD\u5B58\u573A\u666F": "Finish the current action before saving",
  "\u5DF2\u4FDD\u5B58 {0} \u4E2A\u5BF9\u8C61\uFF1B\u4E0B\u6B21\u6253\u5F00\u4F1A\u8F7D\u5165\u8FD9\u4E2A\u4E16\u754C": "Saved {0} objects. This world will reopen next time.",
  " \xB7 \u5DF2\u5B58": " \xB7 Saved",
  " \xB7 \u5F85\u5236\u4F5C": " \xB7 Not yet created",
  "{0} \u4E2A\u7269\u5757 \xB7 {1} \u4F4D\u6F14\u5458 \xB7 \u7B2C {2} \u4E2A\u5B58\u6863\u7248\u672C": "{0} objects \xB7 {1} actors \xB7 Archive version {2}",
  "\u5C1A\u672A\u4FDD\u5B58\uFF0C\u5B8C\u6210\u5E03\u7F6E\u540E\u4FDD\u5B58\u8FD9\u4E00\u5E55\u3002": "No archive yet. Finish the layout, then save this act.",
  "{0} \xB7 {1} \xB7 90\xB0 / {2} \u79D2{3}": "{0} \xB7 {1} \xB7 90\xB0 / {2} s{3}",
  \u5DF2\u6253\u5F00: "Open",
  \u5DF2\u5173\u95ED: "Closed",
  \u5C1A\u672A\u6DFB\u52A0\u5F00\u95E8\u6548\u679C: "No door effect configured",
  " \xB7 {0} \u4EBA\u5F00\u95E8\u89E6\u53D1": " \xB7 {0} actors triggered by door",
  \u5173\u95ED\u767D\u6A21\u95E8: "Close blockout door",
  \u6253\u5F00\u767D\u6A21\u95E8: "Open blockout door",
  "\u94F0\u94FE\uFF1A{0}\u4FA7": "Hinge: {0}",
  \u53F3: "Right",
  \u5DE6: "Left",
  \u5148\u5B8C\u6210\u6216\u53D6\u6D88\u6F14\u5458\u653E\u7F6E: "Finish or cancel actor placement first",
  "{0}\u5DF2\u4FDD\u5B58\uFF1B\u6B64\u524D\u7248\u672C\u4FDD\u7559": "{0} saved. Earlier versions retained.",
  "{0}\u5DF2\u8F7D\u5165 \xB7 \u5F53\u524D\u5DE5\u4F5C\u5DF2\u5907\u4EFD\uFF0C\u53EF\u64A4\u9500\u8F7D\u5165": "{0} loaded. Previous work backed up; Undo restores it.",
  \u8BF7\u5148\u8FDB\u5165\u521B\u4F5C: "Enter creation mode first",
  "\u573A\u666F\u6216\u5BF9\u9F50\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u95E8": "Scene or alignment changed. Select the door again.",
  \u8BF7\u5148\u9009\u4E2D\u4E00\u6247\u767D\u6A21\u95E8: "Select a blockout door first",
  "{0}\u6B63\u5728\u6253\u5F00\u3002": "Opening {0}.",
  "{0}\u6B63\u5728\u5173\u95ED\u3002": "Closing {0}.",
  "\u5F00\u95E8\u65B9\u5411\u5DF2\u8C03\u6574\uFF0C\u8BF7\u518D\u8BD5\u5F00\u4E00\u6B21\u3002": "Opening direction changed. Try the door again.",
  \u8BF7\u5148\u5B8C\u6210\u5F53\u524D\u64CD\u4F5C\u5E76\u505C\u6B62\u5F55\u50CF: "Finish the current action and stop recording first",
  "\u5F00\u95E8\u89E6\u53D1\u5DF2\u542F\u7528\u3002": "Door trigger enabled.",
  "\u5F00\u95E8\u89E6\u53D1\u5DF2\u6682\u505C\u3002": "Door trigger paused.",
  "\u573A\u666F\u5DF2\u53D8\u5316\uFF0C\u8349\u56FE\u7F16\u8F91\u5DF2\u53D6\u6D88": "Scene changed. Draft closed.",
  "\u573A\u666F\u7248\u672C\u5DF2\u66F4\u65B0\uFF0C\u672C\u6B21\u62D6\u52A8\u5DF2\u53D6\u6D88": "Scene version changed. Drag cancelled.",
  "\u573A\u666F\u7248\u672C\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u57FA\u4E8E\u65B0\u573A\u666F\u7EE7\u7EED\u5BF9\u8BDD": "Scene version changed. Start a new request.",
  "\u623F\u95F4\u7ED3\u6784\u5DF2\u66F4\u65B0\uFF0C\u7EE7\u7EED\u521B\u4F5C\u65F6\u8BF7\u91CD\u65B0\u786E\u8BA4\u5BF9\u9F50": "Room structure changed. Confirm alignment before continuing.",
  \u81F3\u5C11\u62CD\u6444\u6216\u4E0A\u4F20\u56DB\u5F20\u7167\u7247: "Capture or upload at least four photos",
  \u8BF7\u5148\u5904\u7406\u5F53\u524D\u8BF7\u6C42\u6216\u9884\u89C8: "Finish the current request or preview first",
  "\u5148\u8FDB\u5165\u4E16\u754C\uFF0C\u518D\u4E0E\u52A9\u624B\u7F16\u8F91\u573A\u666F": "Enter the world before editing with the agent",
  \u8BF7\u5148\u8F93\u5165\u521B\u4F5C\u610F\u56FE: "Enter a description first",
  \u8BF7\u5148\u62CD\u6444\u623F\u95F4\u7167\u7247: "Capture room photos first",
  \u8BF7\u5148\u9009\u62E9\u4E00\u5F20\u53C2\u8003\u56FE\u7247: "Choose a reference image first",
  "\u76F8\u673A\u5DF2\u5173\u95ED\uFF0C\u6B63\u5728\u6784\u5EFA\u623F\u95F4\u3002": "Camera closed. Building the room.",
  "\u8BF4\u8BDD\u540E\u7684\u573A\u666F\u6216\u7A7A\u95F4\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BF7\u6C42": "Scene or alignment changed since you spoke. Submit again.",
  "\u6B63\u5728\u6574\u7406\u626B\u63CF\u5E03\u5C40\uFF0C\u751F\u6210\u53EF\u7F16\u8F91\u767D\u6A21\u2026": "Building an editable blockout from the scan\u2026",
  "\u6B63\u5728\u6839\u636E\u53C2\u8003\u56FE\u6784\u5EFA\u7C97\u573A\u666F\u2026": "Building a rough scene from references\u2026",
  "\u52A9\u624B\u6B63\u5728\u7406\u89E3\u4F60\u7684\u610F\u56FE\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u89C2\u5BDF\u573A\u666F\u2026": "The agent is processing your request. You can keep looking around.",
  "\u52A9\u624B\u6B63\u5728\u5904\u7406\u8BF7\u6C42\u2026": "Processing your request\u2026",
  "\u7B49\u5F85\u751F\u6210\u7ED3\u679C\u8D85\u65F6\uFF0C\u5DF2\u9000\u51FA\u7B49\u5F85\uFF1B\u53EF\u8FD4\u56DE\u5DF2\u6709\u4E16\u754C\u7EE7\u7EED\u6D4B\u8BD5\u3002": "Build timed out. Return to the saved world or try again.",
  \u8BF7\u6C42\u5DF2\u505C\u6B62: "Request stopped",
  "\u6B63\u5728\u6574\u7406\u8F6E\u5ED3\u3001\u6784\u5EFA\u53EF\u7F16\u8F91\u7269\u5757": "Building editable objects from scan contours",
  "\u6B63\u5728\u6309\u626B\u63CF\u8865\u5EFA\uFF0C\u7167\u7247\u8F85\u52A9\u5206\u7C7B": "Building from the scan with photo-based classification",
  \u6B63\u5728\u7406\u89E3\u610F\u56FE: "Interpreting your request",
  \u6B63\u5728\u751F\u6210\u53C2\u8003\u56FE\u7247: "Generating a reference image",
  \u6B63\u5728\u6784\u5EFA\u7C97\u573A\u666F: "Building the blockout",
  \u6B63\u5728\u6784\u9020\u4FEE\u6539\u65B9\u6848: "Preparing changes",
  "{0} \xB7 \u5DF2\u7B49\u5F85 {1} \u79D2": "{0} \xB7 {1} s elapsed",
  \u52A9\u624B\u5DF2\u56DE\u590D: "Agent replied",
  "\u573A\u666F\u5DF2\u7ECF\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BF7\u6C42": "Scene changed. Submit again.",
  "\u623F\u95F4\u5BF9\u9F50\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BF7\u6C42": "Room alignment changed. Submit again.",
  "\u9884\u89C8\u4E2D\uFF1A{0}": "Preview: {0}",
  "\u7ED3\u679C\u5DF2\u9884\u89C8\uFF0C\u8BF7\u5E94\u7528\u6216\u653E\u5F03": "Review the result, then apply or discard",
  \u8FD8\u6CA1\u6709\u53EF\u5E94\u7528\u7684\u7ED3\u679C: "No result is ready to apply",
  "\u7C97\u573A\u666F\u5DF2\u91C7\u7528\uFF0C\u53EF\u7EE7\u7EED\u521B\u4F5C": "Blockout applied. Continue creating.",
  \u4FEE\u6539\u5DF2\u5E94\u7528: "Changes applied",
  "\u8BF7\u6C42\u4ECD\u5728\u8FD0\u884C\uFF0C\u8BF7\u4F7F\u7528\u505C\u6B62\u8BF7\u6C42": "Request is still running. Use Stop request.",
  "\u8BF7\u6C42\u6B63\u5728\u63D0\u4EA4\uFF0C\u8BF7\u7A0D\u540E\u505C\u6B62": "Request is submitting. Wait before stopping.",
  "\u6B63\u5728\u505C\u6B62\u8BF7\u6C42\u2026": "Stopping request\u2026",
  \u5F53\u524D\u6CA1\u6709\u8FD0\u884C\u4E2D\u7684\u8BF7\u6C42: "No request is running",
  "\u6307\u9488\u5DF2\u4E2D\u65AD\uFF0C\u672C\u7B14\u672A\u4FDD\u7559": "Pointer interrupted. Unfinished stroke discarded.",
  "\u6307\u9488\u5DF2\u79BB\u5F00\u753B\u5E03\uFF0C\u672C\u7B14\u672A\u4FDD\u7559": "Pointer left the canvas. Unfinished stroke discarded.",
  \u9875\u9762\u5DF2\u6682\u505C: "Page paused",
  "\u9875\u9762\u5DF2\u6682\u505C\uFF0C\u8BF7\u91CD\u65B0\u5F00\u59CB\u8FDB\u5165": "Page paused. Start entry again.",
  "\u9875\u9762\u5DF2\u6682\u505C\uFF0C\u76F8\u673A\u5DF2\u5173\u95ED\uFF0C\u7167\u7247\u4ECD\u4FDD\u7559\u3002": "Page paused. Camera closed; photos retained.",
  "\u7A97\u53E3\u5931\u53BB\u7126\u70B9\uFF0C\u672C\u7B14\u672A\u4FDD\u7559": "Window lost focus. Unfinished stroke discarded.",
  \u7A97\u53E3\u5DF2\u5931\u53BB\u7126\u70B9: "Window lost focus",
  "\u6846\u5185 {0} \u9879 \xB7 \u6DF1\u5EA6 {1} m \xB7 \u677E\u5F00\u63E1\u628A\u786E\u8BA4": "{0} items \xB7 Depth {1} m \xB7 Release grip to confirm",
  "\u573A\u666F\u5DF2\u8F7D\u5165\uFF1B\u53EF\u4EE5\u64A4\u9500\u672C\u6B21\u8F7D\u5165": "Scene loaded. Undo can restore the previous scene.",
  "\u8BF7\u9009\u62E9\u5C0F\u4E8E 6 MB \u7684\u56FE\u7247": "Choose an image smaller than 6 MB",
  "\u6839\u636E\u8FD9\u5F20\u56FE\u7247\uFF0C\u521B\u5EFA\u53EF\u8FDB\u5165\u7684\u7C97\u7CD9\u4E09\u7EF4\u573A\u666F\uFF0C\u4FDD\u7559\u4E3B\u8981\u7A7A\u95F4\u5173\u7CFB\u548C\u8272\u5F69\u3002": "Create an inhabitable blockout from this image, preserving spatial relationships and colors.",
  \u8BF7\u5148\u8FDB\u5165\u623F\u95F4: "Enter the room first",
  \u8BF7\u5148\u677E\u5F00\u53F3\u63E1\u628A\u7ED3\u675F\u6846\u9009: "Release the right grip to finish box selection",
  "Draft\uFF1A\u53F3\u6273\u673A\u753B\u7EBF \xB7 \u5DE6\u6447\u6746\u64A4\u56DE \xB7 A \u53D6\u6D88": "Draft: right trigger to draw \xB7 Left stick click to undo \xB7 A to cancel",
  "\u6B63\u5728\u653E\u7F6E\u6F14\u5458\uFF1A\u53F3\u98DF\u6307\u6273\u673A\u786E\u8BA4\uFF0CA \u53D6\u6D88": "Place actor: right trigger to confirm \xB7 A to cancel",
  "\u8BF7\u5148\u677E\u5F00\u6273\u673A\u6216\u63E1\u628A\uFF0C\u7ED3\u675F\u5F53\u524D\u8C03\u6574\u6216\u6846\u9009": "Release the trigger or grip to finish the adjustment or selection",
  \u63A7\u5236\u5668\u8FFD\u8E2A\u5DF2\u4E2D\u65AD: "Controller tracking interrupted",
  \u5148\u8FD4\u56DE\u623F\u95F4\u62CD\u6444: "Return to room capture first",
  "\u7B2C {0} \u5F20\u5DF2\u62CD \xB7 {1} \xD7 {2}": "Photo {0} captured \xB7 {1} \xD7 {2}",
  "{0} \u5F20 \xB7 \u81F3\u5C11 4 \u5F20": "{0} photos \xB7 Minimum 4",
  \u81EA\u52A8\u9009\u62E9\u73AF\u5883\u76F8\u673A: "Auto-select environment camera",
  "\u623F\u95F4\u53C2\u8003\u7167\u7247 {0}": "Room reference photo {0}",
  "\u79FB\u9664 / \u91CD\u62CD": "Remove / retake",
  \u5220\u9664\u8FD9\u4E2A\u6F14\u5458: "Remove this actor",
  "\u6839\u636E\u8FD9\u5F20\u53C2\u8003\u56FE\uFF0C\u521B\u5EFA\u53EF\u8FDB\u5165\u7684\u7C97\u7CD9\u4E09\u7EF4\u573A\u666F\uFF0C\u4FDD\u7559\u4E3B\u8981\u7A7A\u95F4\u5173\u7CFB\u4E0E\u8272\u5F69\uFF0C\u63A8\u65AD\u4E0D\u53EF\u89C1\u7684\u7A7A\u95F4\u3002": "Create an inhabitable blockout from this reference. Preserve its layout and colors; infer unseen areas.",
  "\u52A9\u624B\uFF1A": "Agent: ",
  "\u53C2\u8003\u89C6\u9891\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u5728\u7535\u8111\u7F51\u9875\u4E0B\u8F7D": "Reference video saved. Download it from the desktop page.",
  "\u51FA\u573A\u79D2\u6570\u5DF2\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5F00\u6F14\u751F\u6548": "Entry timing saved for the next playback",
  "\u65E0\u6CD5\u8BFB\u53D6\u672C\u5730\u5F55\u50CF\uFF1A": "Could not read local recording: ",
  "\u672C\u5730\u670D\u52A1 \xB7 Codex \u53EF\u7528": "Local server \xB7 Codex available",
  "\u672C\u5730\u670D\u52A1 \xB7 \u672A\u627E\u5230 Codex": "Local server \xB7 Codex unavailable",
  "\u8FDE\u63A5\u4E2D\u65AD\uFF0C\u6B63\u5728\u91CD\u8FDE": "Connection lost. Reconnecting\u2026",
  \u672C\u5730\u670D\u52A1\u5DF2\u8FDE\u63A5: "Local server connected",
  "\u7B49\u5F85\u5934\u663E\u5B9A\u4F4D\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4\u5F53\u524D\u53F0\u8BCD": "Waiting for headset tracking. Submit this line again.",
  \u6CA1\u6709\u53EF\u7528\u7684\u73AF\u5883\u76F8\u673A\u753B\u9762: "No live environment camera stream",
  "\u5148\u8FDB\u5165\u623F\u95F4\uFF0C\u518D\u6307\u5730\u9762\u653E\u7F6E\u6F14\u5458\u3002": "Enter the room, then point at the floor to place an actor.",
  \u8BF7\u5148\u5B8C\u6210\u5F53\u524D\u8BF7\u6C42\u6216\u9884\u89C8: "Finish the current request or preview first",
  "\u5DF2\u653E\u7F6E {0} \u4F4D\u6F14\u5458\uFF0C\u8BF7\u5148\u79FB\u9664\u4E00\u4F4D\u518D\u653E\u7F6E\u3002": "{0} actors already placed. Remove one before adding another.",
  "\u8BF7\u6307\u5411\u5730\u9762\uFF1B\u7A7A\u95F4\u53D8\u5316\u540E\u9700\u8981\u91CD\u65B0\u6307\u5B9A\u843D\u70B9": "Point at the floor. Select a new location after alignment changes.",
  \u52A8\u4F5C\u8D44\u4EA7\u5C1A\u672A\u8F7D\u5165: "Motion assets are still loading",
  "\u6F14\u5458 {0}": "Actor {0}",
  "T-Pose \u6F14\u5458\u5DF2\u653E\u7F6E \xB7 \u5DF2\u5206\u914D{0}\u3002\u5DE6\u63E1\u628A\u5F00\u6F14\uFF1B\u9009\u4E2D\u540E\u53EF\u8BF4\u201C\u4F7F\u7528\u7B2C\u4E8C\u4E2A\u52A8\u4F5C\u201D\u66F4\u6362\u3002": "T-Pose actor placed \xB7 {0} assigned. Use the left grip to play or select another motion.",
  \u5C1A\u672A\u6307\u5B9A\u52A8\u4F5C: "No motion assigned",
  "\u8BF7\u6307\u5411\u53EF\u89C1\u5730\u9762\uFF0C\u518D\u6263\u98DF\u6307\u6273\u673A\u3002": "Point at a visible floor, then press the trigger.",
  "\u8BF7\u7B49\u5C31\u7EEA\u540E\u8BF4\u201C\u5F00\u542F\u9884\u89C8\u201D\uFF0C\u6216\u70B9\u51FB\u786E\u8BA4\u9884\u89C8\u3002": "Wait until ready, then say Preview or select the Preview button.",
  \u5F00\u95E8\u6F14\u51FA\u7684\u6F14\u5458\u5DF2\u53D8\u5316: "The door-triggered cast has changed",
  \u8BF7\u5148\u653E\u7F6E\u6F14\u5458: "Place actors first",
  "\u8BF7\u5148\u9009\u4E2D\u6F14\u5458\u5E76\u6307\u5B9A\u52A8\u4F5C\uFF0C\u4F8B\u5982\u201C\u4F7F\u7528\u50F5\u5C38\u524D\u6251\u52A8\u4F5C\u201D": "Select an actor and assign a motion first",
  "\u6F14\u5458\u52A8\u4F5C\u672A\u52A0\u8F7D\uFF0C\u6682\u4E0D\u80FD\u5F00\u6F14": "Actor motions are not loaded. Playback is unavailable.",
  "\u5F00\u6F14 \xB7 \u5DE6\u63E1\u628A\u6216\u8BF4 Stop \u6682\u505C\uFF1B\u672A\u6307\u5B9A\u52A8\u4F5C\u7684\u6F14\u5458\u4FDD\u6301 T-Pose\u3002": "Playing \xB7 Left grip or Stop to pause \xB7 Unassigned actors remain in T-Pose",
  "\u6F14\u5458\u5DF2\u5728\u52A8\u4F5C\u7B2C\u4E00\u5E27\u5F85\u547D\uFF0C\u7B49\u5F85\u786E\u8BA4\u9884\u89C8\u3002": "Actors are ready at the first frame. Press the left grip to preview.",
  "\u6F14\u5458\u5DF2\u5728\u52A8\u4F5C\u7B2C\u4E00\u5E27\u5F85\u547D\uFF0C\u6253\u5F00\u767D\u6A21\u95E8\u540E\u4E00\u8D77\u8868\u6F14\u3002": "Actors are ready at the first frame. Open the door to start them together.",
  "\u52A8\u4F5C\u5DF2\u505C\uFF0C\u4ECD\u53EF\u8D70\u52A8\u3001\u8BF4\u8BDD\u548C\u7F16\u8F91\u3002": "Motion stopped. You can still move, speak, and edit.",
  "\u8BF7\u5148\u786E\u8BA4\u9884\u89C8\u3002": "Confirm Preview first.",
  "\u7EE7\u7EED\u8868\u6F14 \xB7 \u5DE6\u63E1\u628A\u53EF\u518D\u6B21\u6682\u505C\u3002": "Playing \xB7 Left grip to pause",
  "\u5148\u6263\u53F3\u6273\u673A\u653E\u7F6E\uFF0C\u6216\u6309 A \u53D6\u6D88\u653E\u7F6E": "Place with the right trigger, or press A to cancel",
  "\u5DF2\u8FD4\u56DE T-Pose \u7AD9\u4F4D\u7F16\u6392\uFF1B\u5DF2\u6307\u5B9A\u52A8\u4F5C\u4FDD\u7559\uFF0C\u4E0B\u6B21\u5F00\u6F14\u4ECE\u5934\u64AD\u653E\u3002": "Back to T-Pose layout. Assigned motions are kept and restart on the next playback.",
  \u8BF7\u5148\u9009\u62E9\u6F14\u5458: "Select an actor first",
  \u8BE5\u52A8\u4F5C\u5C1A\u672A\u5BFC\u5165: "This motion has not been imported",
  "\u5DF2\u4E3A{0}\u6307\u5B9A\u201C{1}\u201D\u3002": "Assigned \u201C{1}\u201D to {0}.",
  "\u5DF2\u6E05\u9664{0}\u7684\u52A8\u4F5C\u3002": "Cleared the motion for {0}.",
  "\u4E0B\u6B21\u5F00\u6F14\u751F\u6548\uFF0C\u5F53\u524D\u8868\u6F14\u65F6\u95F4\u4E0D\u53D8\u3002": "Takes effect on the next playback. Current timing is unchanged.",
  "\u73B0\u5728\u4FDD\u6301 T-Pose\uFF0C\u6309\u5DE6\u63E1\u628A\u6216\u8BF4\u201C\u5F00\u6F14\u201D\u5F00\u59CB\u3002": "Holding T-Pose. Use the left grip to play.",
  "\u4FDD\u6301 T-Pose\u3002": "Holding T-Pose.",
  \u5C1A\u672A\u5BFC\u5165\u53EF\u7528\u52A8\u4F5C: "No motion assets imported",
  "\u8BF7\u5148\u786E\u8BA4\u9884\u89C8\uFF0C\u6216\u91CD\u65B0\u53D1\u51FA\u51C6\u5907\u52A8\u4F5C\u7684\u6307\u4EE4\u3002": "Confirm Preview or prepare the motions again.",
  "\u8BF4\u8BDD\u540E\u573A\u666F\u6216\u7A7A\u95F4\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BF4\u51FA\u52A8\u4F5C\u98CE\u683C": "Scene or alignment changed since you spoke. Submit the style request again.",
  "\u52A8\u4F5C\u98CE\u683C\u5DF2\u4FDD\u5B58\uFF1B\u7A7A\u95F4\u5DF2\u53D8\u5316\uFF0C\u8FD4\u56DE\u521B\u4F5C\u540E\u6309\u5DE6\u63E1\u628A\u5F00\u6F14\u3002": "Motion style saved. Alignment changed; return to creating before playing.",
  "\u5DF2\u5C06 {0} \u4F4D\u6F14\u5458\u5207\u6362\u4E3A{1}\u52A8\u4F5C\u3002{2}": "Changed {0} actors to {1} motions. {2}",
  "\u4E0B\u6B21\u5F00\u6F14\u751F\u6548\u3002": "Takes effect on the next playback.",
  "\u4FDD\u7559\u6682\u505C / \u7F16\u6392\u72B6\u6001\uFF0C\u5DE6\u63E1\u628A\u5F00\u59CB\u3002": "Paused / layout state retained. Left grip to play.",
  "\u4ECE\u5934\u64AD\u653E\uFF0C\u5DE6\u63E1\u628A\u53EF\u6682\u505C\u3002": "Playing from the start. Left grip to pause.",
  "\u7B2C {0} \u4E2A\u52A8\u4F5C\u5C1A\u672A\u8F7D\u5165": "Motion {0} has not loaded",
  "\u573A\u666F\u4E0E\u6F14\u5458\u4F4D\u7F6E\u3001\u51FA\u573A\u5B89\u6392\u5DF2\u4FDD\u5B58\u3002": "Scene, actor positions, and entry timing saved.",
  "\u4E0B\u4E00\u6B21\u5F00\u6F14\u540E {0} \u79D2\u51FA\u73B0\u3002": "Will appear {0} seconds after the next playback starts.",
  "\u6F14\u5458\u5DF2\u79FB\u52A8\u5230\u6307\u5B9A\u843D\u70B9\uFF0C\u52A8\u4F5C\u4FDD\u6301\u539F\u6709\u65F6\u95F4\u3002": "Actor moved to the selected point. Motion timing is unchanged.",
  "\u6F14\u5458\u5DF2\u9762\u5411\u4F60\u5F53\u524D\u7684\u4F4D\u7F6E\u3002": "Actor now faces your current position.",
  "{0} \u5DF2\u5220\u9664\u5E76\u4FDD\u5B58 \xB7 \u5DE6\u6447\u6746\u6309\u4E0B\u64A4\u9500": "{0} removed and saved \xB7 Left stick click to undo",
  "\u6307\u5411\u5730\u9762\uFF0C\u6263\u53F3\u98DF\u6307\u6273\u673A\u653E\u7F6E\u6F14\u5458\u3002": "Point at the floor and press the right trigger to place an actor.",
  "\u5DF2\u9000\u51FA\u6F14\u5458\u653E\u7F6E\u3002\u6309\u4E0B\u53F3\u6447\u6746\u53EF\u5207\u6362\u573A\u666F\u7F16\u8F91\u3002": "Placement closed. Click the right stick to toggle editing.",
  "\u6F14\u5458\u653E\u7F6E\uFF1A\u53F3\u6273\u673A\u786E\u8BA4\u843D\u70B9\uFF0CA \u53D6\u6D88\u3002": "Place actor: right trigger to confirm \xB7 A to cancel",
  "\u672A\u83B7\u5F97\u76F8\u673A\u6743\u9650\u3002\u8BF7\u9000\u51FA\u6C89\u6D78\uFF0C\u5728\u7F51\u9875\u5141\u8BB8\u76F8\u673A\u8BBF\u95EE\uFF0C\u518D\u91CD\u65B0\u6253\u5F00\u3002": "Camera permission denied. Exit immersive mode, allow camera access, then reopen it.",
  "\u6CA1\u6709\u627E\u5230\u73AF\u5883\u76F8\u673A\u3002\u8BF7\u68C0\u67E5 Quest Browser \u7684\u5934\u663E\u76F8\u673A\u6743\u9650\uFF0C\u4E5F\u53EF\u5148\u4E0A\u4F20\u623F\u95F4\u7167\u7247\u6D4B\u8BD5\u3002": "No environment camera found. Check Quest Browser camera permissions, or upload room photos.",
  "\u76F8\u673A\u6B63\u88AB\u5360\u7528\u6216\u6682\u65F6\u4E0D\u53EF\u8BFB\u3002\u8BF7\u5173\u95ED\u5176\u4ED6\u76F8\u673A\u5E94\u7528\u540E\u91CD\u8BD5\u3002": "Camera is busy or unavailable. Close other camera apps and retry.",
  "\u76F8\u673A\u6253\u5F00\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5": "Could not open the camera. Try again.",
  "\u6253\u5F00\u76F8\u673A\uFF0C\u5148\u62CD 4 \u5F20\u623F\u95F4\u5168\u666F\u3002": "Take at least four photos of your surroundings.",
  "\u76F8\u673A\u5DF2\u5173\u95ED\uFF0C\u7167\u7247\u4ECD\u4FDD\u7559\u5728\u672C\u6B21\u9875\u9762\u4E2D\u3002": "Camera closed. Photos remain in this session.",
  \u76F8\u673A: "Camera",
  "\u7B49\u5F85\u76F8\u673A\u6743\u9650\u4E0E\u753B\u9762\u2026": "Waiting for camera permission and video\u2026",
  "\u5F53\u524D\u9875\u9762\u65E0\u6CD5\u8BBF\u95EE\u76F8\u673A\u3002\u8BF7\u7528 Quest Browser \u6253\u5F00 localhost \u9875\u9762\u3002": "Camera access is unavailable. Open the localhost page in Quest Browser.",
  "\u6D4F\u89C8\u5668\u76EE\u524D\u53EA\u63D0\u4F9B\u5934\u50CF\uFF0F\u81EA\u62CD\u76F8\u673A\uFF0C\u672A\u53D6\u5F97\u623F\u95F4\u753B\u9762\u3002\u8BF7\u68C0\u67E5\u5934\u663E\u76F8\u673A\u6743\u9650\u3002": "Only a selfie camera is available. Check headset camera permissions for the room view.",
  "\u76F8\u673A\u5DF2\u8FDE\u63A5\uFF0C\u4F46\u6CA1\u6709\u53EF\u7528\u753B\u9762\u3002\u8BF7\u5173\u95ED\u76F8\u673A\u540E\u91CD\u8BD5\u3002": "Camera connected, but no video is available. Close it and try again.",
  "\u76F8\u673A\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF1B\u7167\u7247\u5DF2\u4FDD\u7559\uFF0C\u53EF\u91CD\u65B0\u6253\u5F00\u76F8\u673A\u3002": "Camera disconnected. Photos retained; you can reopen the camera.",
  "\u73AF\u5883\u76F8\u673A\u5DF2\u5F00\u542F\u3002\u753B\u9762\u6765\u81EA\u5934\u663E\u671D\u5411\uFF1B\u53F3\u98DF\u6307\u6273\u673A\u62CD\u7167\u3002": "Environment camera ready \xB7 Aim with the headset \xB7 Right trigger to capture",
  "\u753B\u9762\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u7A0D\u540E\u62CD\u7167": "Video is not ready. Wait before taking a photo.",
  "\u7167\u7247\u8FC7\u5927\uFF0C\u8BF7\u91CD\u65B0\u62CD\u6444": "Photo too large. Try another shot.",
  "\u5DF2\u4FDD\u5B58\u7B2C {0} \u5F20\u3002{1}": "Photo {0} saved. {1}",
  "\u8BF7\u5148\u6253\u5F00\u76F8\u673A\uFF0C\u7B49\u753B\u9762\u51FA\u73B0\u540E\u518D\u62CD": "Open the camera and wait for video before capturing",
  \u76F8\u673A\u62CD\u6444: "Camera capture",
  "\u8BF7\u9009\u62E9\u4E0D\u8D85\u8FC7 20 MB \u7684 JPEG \u6216 PNG": "Choose a JPEG or PNG no larger than 20 MB",
  \u4E0A\u4F20\u7167\u7247: "Uploaded photo",
  \u7167\u7247\u6B63\u5728\u8F7D\u5165: "Loading photos",
  "\u5DF2\u4FDD\u7559 {0} \u5F20\u3002{1}": "{0} photos retained. {1}",
  "\u7167\u7247\u5DF2\u6E05\u7A7A\uFF0C\u53EF\u4EE5\u91CD\u65B0\u62CD\u6444\u3002": "Photos cleared. Ready for new shots.",
  \u672A\u5206\u7C7B: "Unclassified",
  \u56DE\u590D\u64AD\u653E\u5DF2\u53D6\u6D88: "Reply playback cancelled",
  "\u56DE\u590D\u97F3\u9891\u64AD\u653E\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5": "Reply playback timed out. Try again.",
  "\u65E0\u6CD5\u64AD\u653E\u5F53\u524D\u56DE\u590D WAV\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u540E\u91CD\u8BD5": "Could not play the agent\u2019s reply. Please try again.",
  "\u56DE\u590D\u97F3\u9891\u672A\u80FD\u5F00\u59CB\u64AD\u653E\uFF0C\u8BF7\u518D\u6B21\u6309\u4F4F X \u91CD\u8BD5": "Reply audio did not start. Hold X again to retry.",
  \u56DE\u590D\u97F3\u9891\u672A\u80FD\u5F00\u59CB\u64AD\u653E: "Reply audio did not start",
  \u4F60: "You",
  \u573A\u666F\u52A9\u624B: "Scene agent",
  "\u5DF2\u8BB0\u5F55\u504F\u597D\uFF1A": "Saved preferences: ",
  "\u6717\u8BFB\u8D85\u65F6\uFF0C\u6587\u5B57\u56DE\u590D\u5DF2\u4FDD\u7559\u3002": "Speech timed out. The text reply is still available.",
  "\u6587\u5B57\u56DE\u590D\u5DF2\u4FDD\u7559\uFF1B\u6717\u8BFB\u672A\u5B8C\u6210\uFF1A": "Text reply retained. Speech did not finish: ",
  "\u62CD\u6444\u6A21\u5F0F\u8BF7\u6309\u4F4F X\uFF0C\u677E\u5F00\u63D0\u4EA4\u5F53\u524D\u6B65\u9AA4": "Hold X to speak, then release",
  \u5148\u8F93\u5165\u6216\u8BF4\u51FA\u4F60\u7684\u60F3\u6CD5: "Enter or speak your request first",
  "\u6B63\u5728\u5904\u7406\u4E0A\u4E00\u53E5\uFF0C\u8BF7\u7A0D\u5019\u6216\u8BF4 Stop\u3002": "Processing the previous request. Please wait or say Stop.",
  "\u6587\u5B57\u56DE\u590D\u5DF2\u4FDD\u7559\uFF1B\u5BF9\u8BDD\u8BB0\u5F55\u6682\u672A\u4FDD\u5B58\u3002": "Text reply retained. Conversation history could not be saved.",
  "\u5148\u5904\u7406\u5F53\u524D\u8BF7\u6C42\u3001\u5F55\u97F3\u6216\u9884\u89C8": "Finish the current request, voice input, or preview first",
  "\u25A0 \u7ED3\u675F\u5E76\u53D1\u9001": "\u25A0 Finish and send",
  "\u6B63\u5728\u8F6C\u5199\u2026": "Transcribing\u2026",
  "\u7B49\u5F85\u9EA6\u514B\u98CE\u2026": "Waiting for microphone\u2026",
  "\u25CF \u8BED\u97F3\u8F93\u5165": "\u25CF Voice input",
  "\u5148\u5904\u7406\u5F53\u524D\u8BF7\u6C42\u3001\u9009\u6846\u6216\u9884\u89C8": "Finish the current request, selection, or preview first",
  "\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u5F55\u97F3\uFF0C\u8BF7\u4F7F\u7528\u6587\u5B57\u8F93\u5165": "Audio recording is unavailable. Use text input.",
  "\u5F55\u97F3\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u9EA6\u514B\u98CE\u6743\u9650": "Audio recording failed. Check microphone permission.",
  "\u65E0\u6CD5\u4F7F\u7528\u8BED\u97F3\uFF1A": "Voice input unavailable: ",
  \u8BED\u97F3\u8F6C\u5199: "Speech transcription",
  \u56DE\u590D\u6717\u8BFB: "Spoken replies",
  \u5BF9\u8BDD\u4E0E\u504F\u597D\u5206\u6790: "Conversation and preferences",
  "3D \u573A\u666F\u6784\u9020": "3D scene construction",
  "AI \u56FE\u7247\u751F\u6210": "Image generation",
  \u6D4F\u89C8\u5668\u6717\u8BFB: "Browser speech",
  \u5173\u95ED: "Off",
  "\u672C\u673A Codex": "Local Codex",
  "OpenAI \u517C\u5BB9 API": "OpenAI-compatible API",
  \u672A\u542F\u7528: "Disabled",
  "OpenAI Images \u517C\u5BB9 API": "OpenAI Images-compatible API",
  \u534F\u8BAE: " protocol",
  \u6A21\u578B\u540D\u79F0: "Model name",
  "\u8BED\u8A00\uFF0C\u5982 zh-CN": "Language, e.g. en-US",
  "\u5DF2\u4FDD\u5B58\u5BC6\u94A5\uFF1B\u7559\u7A7A\u4FDD\u7559": "Key saved; leave blank to keep it",
  \u6E05\u9664\u5DF2\u4FDD\u5B58\u5BC6\u94A5: "Clear saved key",
  "API \u8BBE\u7F6E\u5DF2\u4FDD\u5B58\u5230\u672C\u673A": "API settings saved locally",
  \u9884\u8BBE\u53C2\u8003\u56FE: "Preset reference",
  "AI \u751F\u6210\u56FE\u7247": "Generated image",
  "\u5DF2\u9009\u62E9\uFF1A": "Selected: ",
  "\u53C2\u8003\u56FE\u5DF2\u9009\u62E9\uFF1A": "Reference selected: ",
  \u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6301\u4E45\u5F55\u50CF\u5B58\u50A8: "Persistent recording storage is unavailable",
  \u672C\u5730\u5F55\u50CF\u4FDD\u5B58\u5931\u8D25: "Local recording save failed",
  \u5F55\u50CF\u4E0A\u4F20\u5931\u8D25: "Recording upload failed",
  \u672C\u5730\u5F55\u50CF\u5206\u5757\u7F3A\u5931: "A local recording chunk is missing",
  \u5F55\u50CF\u670D\u52A1\u5668\u672A\u786E\u8BA4\u5206\u5757: "Recording server did not acknowledge a chunk",
  "\u53D1\u73B0\u5C1A\u672A\u4FDD\u5B58\u5B8C\u6210\u7684\u5F55\u50CF\uFF0C\u53EF\u91CD\u8BD5\u4FDD\u5B58\u5DF2\u5F55\u90E8\u5206": "An unfinished recording is available. Retry saving the recorded portion.",
  "\u4E0A\u4E00\u6BB5\u5F55\u50CF\u5C1A\u672A\u4FDD\u5B58\uFF0C\u8BF7\u5148\u91CD\u8BD5": "The previous recording is not saved. Retry it first.",
  "\u6D4F\u89C8\u5668\u4E2D\u8FD8\u6709\u672A\u4FDD\u5B58\u5F55\u50CF\uFF0C\u8BF7\u5148\u6062\u590D": "An unsaved recording is stored in this browser. Recover it first.",
  "\u672C\u5730\u5B58\u50A8\u5199\u5165\u8FC7\u6162\uFF0C\u5DF2\u505C\u6B62\u7EE7\u7EED\u5F55\u5236": "Local storage is too slow. Recording stopped.",
  "Take \u5DF2\u7ED3\u675F": "Take ended",
  \u672C\u5730\u5F55\u50CF\u8FBE\u5230\u5BB9\u91CF\u9650\u5236: "Local recording storage limit reached",
  "Take \u5C1A\u672A\u7ED3\u675F": "Take is still running",
  \u5DF2\u5F55\u7247\u6BB5\u5C1A\u65E0\u53EF\u6062\u590D\u7684\u753B\u9762: "No recoverable frames in the recorded portion",
  "\u8BF7\u7A0D\u5FAE\u5411\u4E0B\u6307\uFF0C\u518D\u6B21\u6309\u4F4F\u6273\u673A\u8C03\u6574": "Point slightly downward, then hold the trigger to adjust again",
  \u573A\u666F\u6216\u7A7A\u95F4\u5DF2\u53D8\u5316: "Scene or alignment changed",
  \u7528\u6237\u53D6\u6D88: "Cancelled by user",
  "\u53F3 B \u5F00\u59CB\uFF0F\u505C\u6B62\u8FD0\u955C\u5F55\u5236": "B: start / stop camera recording",
  "\u6B63\u5728\u6574\u7406\u5E76\u9A8C\u8BC1\u89C6\u9891\u2026": "Processing and verifying video\u2026",
  "\u6B63\u5728\u4E0A\u4F20\u5DF2\u5F55\u7247\u6BB5\u2026": "Uploading recorded chunks\u2026",
  "\u6B63\u5728\u5F55\u5236 \xB7 \u7247\u6BB5\u5DF2\u4FDD\u5B58\u5728\u6D4F\u89C8\u5668\uFF0C\u7B49\u5F85\u91CD\u8BD5\u4E0A\u4F20": "Recording \xB7 Chunks stored in browser; upload will retry",
  "\u53C2\u8003\u89C6\u9891\u5DF2\u4FDD\u5B58\uFF0C\u4EC5\u5305\u542B\u865A\u62DF\u573A\u666F": "Reference video saved \xB7 Virtual scene only",
  "\u89C6\u9891\u4ECD\u7559\u5728\u5F53\u524D\u9875\u9762\uFF0C\u8BF7\u91CD\u8BD5\u4FDD\u5B58\uFF1A{0}": "Video retained in this page. Retry saving: {0}",
  "\u6B63\u5728\u91CD\u8BD5\u4FDD\u5B58\u89C6\u9891\u2026": "Retrying video save\u2026",
  \u53C2\u8003\u89C6\u9891\u5DF2\u4FDD\u5B58: "Reference video saved",
  "\u5F55\u50CF\u5206\u5757\u5DF2\u4FDD\u7559\uFF0C\u8BF7\u91CD\u8BD5\uFF1A": "Recording chunks retained. Retry: ",
  "\u53D1\u73B0\u672A\u5B8C\u6210\u5F55\u50CF\uFF0C\u70B9\u51FB\u91CD\u8BD5\u4FDD\u5B58\u5DF2\u5F55\u90E8\u5206": "Unfinished recording found. Retry saving the recorded portion.",
  \u5F55\u5236\u5931\u8D25: "Recording failed",
  \u6B63\u5728\u5F55\u5236\u6216\u4FDD\u5B58: "Recording or saving in progress",
  "\u4E0A\u4E00\u6BB5\u89C6\u9891\u5C1A\u672A\u4FDD\u5B58\uFF0C\u8BF7\u5148\u91CD\u8BD5\u4FDD\u5B58": "Previous video is unsaved. Retry saving it first.",
  \u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u89C6\u9891\u5F55\u5236: "Video recording is unavailable in this browser",
  \u6D4F\u89C8\u5668\u6CA1\u6709\u53EF\u7528\u7684\u89C6\u9891\u7F16\u7801\u5668: "No compatible video encoder",
  \u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u753B\u5E03\u5F55\u5236: "Canvas recording is unavailable in this browser",
  \u89C6\u9891\u7F16\u7801\u5931\u8D25: "Video encoding failed",
  "\u6CA1\u6709\u5F55\u5230\u6709\u6548\u753B\u9762\uFF0C\u8BF7\u91CD\u65B0\u5F00\u59CB\u5F55\u5236": "No valid frames recorded. Start a new recording.",
  "\u6B63\u5728\u4E0A\u4F20\u5E76\u6574\u7406\u5F55\u50CF\u2026": "Uploading and processing recording\u2026",
  "\u5F55\u50CF\u5C1A\u672A\u4FDD\u5B58\u5B8C\u6210\uFF0C\u5DF2\u5F55\u7247\u6BB5\u53EF\u91CD\u8BD5\uFF1A": "Recording is not fully saved. Retry the retained chunks: ",
  "\u6B63\u5728\u5F55\u5236 \xB7 \u6700\u957F 3 \u5206\u949F \xB7 \u53F3 B \u505C\u6B62": "Recording \xB7 Maximum 3 minutes \xB7 B to stop",
  "\u6B63\u5728\u51C6\u5907\u672C\u5730\u5F55\u50CF\u5B58\u50A8\u2026": "Preparing local recording storage\u2026",
  "\u6B63\u5728\u4FDD\u5B58\u53C2\u8003\u89C6\u9891\u2026": "Saving reference video\u2026",
  \u89C6\u9891\u7F16\u7801\u7ED3\u675F\u8D85\u65F6: "Video encoder did not finish in time",
  "\u6309\u4F4F\u5DE6 X \u4E0E\u52A9\u624B\u8BF4\u8BDD\u3002": "Hold X to speak to the agent.",
  \u91CD\u65B0\u8BFB\u53D6\u626B\u63CF: "Read scan again",
  \u624B\u52A8\u6307\u5B9A\u5899\u89D2: "Mark corners manually",
  \u671D\u5411\u7FFB\u8F6C: "Flip orientation",
  \u8FD4\u56DE: "Back",
  \u62CD\u6444\u623F\u95F4: "Capture room",
  \u5206\u5E55\u5B58\u6863: "Act archive",
  "\u767D\u6A21\u95E8 \xB7 \u5F00\u95E8\u8BBE\u7F6E": "Blockout door \xB7 Opening settings",
  \u62CD\u6444\u9009\u9879: "Capture options",
  \u9009\u62E9\u53C2\u8003\u56FE: "Choose reference",
  \u6587\u5B57\u8F93\u5165: "Text input",
  \u5F53\u524D\u6F14\u5458: "Current actor",
  \u6F14\u5458\u9009\u9879: "Actor options",
  \u663E\u793A\u4E0E\u5BF9\u9F50: "Display and alignment",
  \u624B\u4E0E\u624B\u81C2\u5C3A\u5BF8: "Hand and arm size",
  \u8C03\u6574\u5BF9\u9F50: "Adjust alignment",
  \u5176\u4ED6\u64CD\u4F5C: "Other actions",
  \u6309\u952E\u5E2E\u52A9: "Controller help",
  "\u7EE7\u7EED\u4FDD\u5B58\u7684\u5E03\u7F6E\uFF0C\u6216\u4ECE\u65B0\u623F\u95F4\u5F00\u59CB\u3002": "Continue the saved layout or start with a new room.",
  "\u62CD\u6444\u771F\u5B9E\u7A7A\u95F4\uFF0C\u642D\u5EFA\u53EF\u7F16\u8F91\u7684\u767D\u6A21\u3002": "Capture a real space and build an editable blockout.",
  "\u6309\u626B\u63CF\u5E03\u5C40\u6784\u5EFA\u53EF\u7F16\u8F91\u767D\u6A21\uFF1B\u7167\u7247\u53EF\u9009\u3002": "Build an editable blockout from the scan and reference photos.",
  "\u6253\u5F00\u76F8\u673A\uFF0C\u62CD\u6444\u7EA6 4 \u4E2A\u89D2\u5EA6\u3002": "Open the camera and capture at least four views.",
  "\u6574\u7406\u91CD\u53E0\u4E0E\u8FDE\u63A5\uFF0C\u6784\u5EFA\u72EC\u7ACB\u7269\u5757\u2026": "Resolving overlaps and connections into separate objects\u2026",
  "\u6B63\u5728\u7528 {0} \u5F20\u7167\u7247\u642D\u5EFA\u7C97\u573A\u666F\u2026": "Building a rough scene from {0} photos\u2026",
  "\u67E5\u770B\u6574\u4F53\uFF0C\u91C7\u7528\u540E\u8FDB\u5165\u521B\u4F5C\u3002": "Review the layout, then apply it to enter.",
  "\u5BF9\u7167\u5899\u9762\u68C0\u67E5\u4F4D\u7F6E\u4E0E\u671D\u5411\uFF1B\u4FDD\u7559\u5DF2\u4FDD\u5B58\u7684\u5C3A\u5BF8\u3002": "Check position and orientation against the walls. Saved dimensions are retained.",
  "\u7B49\u5F85\u623F\u95F4\u626B\u63CF\uFF1B\u53EF\u5C55\u5F00\u8C03\u6574\uFF0C\u624B\u52A8\u6307\u5B9A\u5899\u89D2\u3002": "Waiting for a room scan. Use manual corner alignment if needed.",
  "\u6307\u5411\u5730\u9762\uFF0C\u6263\u53F3\u6273\u673A\u653E\u7F6E\uFF1BA \u53D6\u6D88\u3002": "Point at the floor \xB7 Right trigger to place \xB7 A to cancel",
  "\u6B63\u5728\u5F55\u5236 \xB7 {0} \u79D2": "Recording \xB7 {0} s",
  "\u8FDB\u5165\u4E16\u754C\u540E\uFF0C\u5F00\u59CB\u521B\u4F5C\u3002": "Enter the world to start creating.",
  \u9009\u62E9\u53C2\u8003\u56FE\u7247: "Choose a reference image",
  "\u63A7\u5236\u5668\u8F93\u5165\uFF0C\u6216\u6309\u4F4F\u5DE6 X \u8BF4\u8BDD\u3002": "Use the controller keyboard, or hold X to speak.",
  \u5C1A\u672A\u8F93\u5165\u6587\u5B57: "No text entered",
  "{0} \xB7 {1} \u79D2\u540E\u51FA\u573A\n{2}": `{0} \xB7 Appears after {1} s
{2}`,
  \u5148\u9009\u4E2D\u6F14\u5458: "Select an actor",
  "\u91CD\u5EFA\u767D\u6A21 \xB7 \u5B9E\u4F53\u663E\u793A": "Blockout \xB7 Solid",
  "\u91CD\u5EFA\u767D\u6A21 {0}% + \u73B0\u5B9E\u900F\u89C6": "Blockout {0}% + passthrough",
  \u5BF9\u9F50\u540E\u53EF\u7528\u771F\u5B9E\u8D70\u52A8\u8FD0\u955C: "Align the room to film through physical movement",
  "\u68C0\u67E5\u671D\u5411\uFF1B\u82E5\u4F4D\u7F6E\u504F\u5DEE\uFF0C\u91CD\u65B0\u8BFB\u53D6\u626B\u63CF\u6216\u6307\u5B9A\u771F\u5B9E\u5899\u89D2\u3002": "Check orientation. If the position is off, read the scan again or mark real corners.",
  "\u624B {0}% \xB7 \u81C2\u957F {1}%\n\u63E1\u59FF\u503E\u89D2 {2}\xB0 \xB7 \u53C2\u6570\u4FDD\u5B58\u5728\u672C\u6D4F\u89C8\u5668\u3002": `Hands {0}% \xB7 Arms {1}%
Grip tilt {2}\xB0 \xB7 Saved in this browser`,
  "\u6587\u5B57\u8F93\u5165\u3001\u6309\u952E\u8BF4\u660E\u4E0E\u7ED3\u675F\u6C89\u6D78\u3002": "Text input, controller help, and exit immersive mode.",
  "A \u653E\u4EBA \xB7 \u5DE6\u63E1\u628A\u64AD\u653E / \u6682\u505C\nB \u5F55\u5236 \xB7 X \u6309\u4F4F\u8BF4\u8BDD \xB7 Y \u83DC\u5355": `A: cancel / back \xB7 Left grip: preview / pause
B: record \xB7 Hold X: speak \xB7 Y: menu`,
  "\u7167\u7247\u4FDD\u7559\u5230\u5237\u65B0\uFF1B\u7EE7\u7EED\u521B\u4F5C\u53EF\u8FD4\u56DE\u539F\u573A\u666F\u3002": "Photo list lasts for this session. Resume creating to return to your scene.",
  "{0} \u4F4D\u6F14\u5458 \xB7 \u5B58\u6863\u7248\u672C {1}": "{0} actors \xB7 Archive version {1}",
  \u8FD9\u4E00\u5E55\u5C1A\u672A\u4FDD\u5B58: "This act has not been saved",
  "{0} \u4EBA\u5F85\u547D \xB7 \u5F00\u95E8\u89E6\u53D1\n\u9000\u51FA\u7F16\u8F91\u3001Y \u9690\u85CF\u83DC\u5355\uFF0C\u7528\u865A\u62DF\u624B\u78B0\u95E8\u3002": `{0} actors armed \xB7 Door trigger
Exit edit mode, hide the menu with Y, then touch the door.`,
  \u5148\u9009\u4E2D\u4E00\u6247\u95E8: "Select a door",
  "Draft \xB7 \u5730\u9762\u8349\u56FE": "Draft \xB7 Ground sketch",
  "Interaction \xB7 \u8BBE\u7F6E\u4EA4\u4E92": "Interaction \xB7 Set behavior",
  "{0}\n{1} \u4E2A\u76EE\u6807 \xB7 {2} m \xB7 \u5C1A\u672A\u5E94\u7528": `{0}
{1} targets \xB7 {2} m \xB7 Not applied`,
  "\u76EE\u6807\u5DF2\u9501\u5B9A \xB7 \u9009\u62E9\u8868\u8FBE\u65B9\u5F0F\n\u9009\u62E9\u63CF\u8FF0\u65B9\u5F0F": `Targets locked
Choose how to describe the interaction`,
  \u5207\u6362\u5F00\u95E8\u65B9\u5411: "Change opening direction",
  "\u5173\u95E8\u590D\u4F4D \xB7 \u51C6\u5907\u91CD\u62CD": "Close and reset",
  "\u534A\u900F\u660E\u53E0\u52A0 \xB7 50%": "Overlay \xB7 50%",
  "\u5B9E\u4F53\u767D\u6A21 \xB7 100%": "Solid blockout \xB7 100%",
  \u91CD\u65B0\u786E\u8BA4\u5BF9\u9F50: "Check alignment again",
  "\u624B\u7F29\u5C0F 5%": "Hands \u22125%",
  "\u624B\u653E\u5927 5%": "Hands +5%",
  "\u624B\u81C2\u7F29\u77ED 5%": "Arms \u22125%",
  "\u624B\u81C2\u52A0\u957F 5%": "Arms +5%",
  "\u63E1\u59FF\u503E\u89D2 \u221210\xB0": "Grip tilt \u221210\xB0",
  "\u63E1\u59FF\u503E\u89D2 +10\xB0": "Grip tilt +10\xB0",
  \u6062\u590D\u9ED8\u8BA4\u63E1\u59FF: "Reset hand fit",
  "\u671D\u5411\u7FFB\u8F6C 180\xB0": "Rotate 180\xB0",
  \u8FD4\u56DE\u5BF9\u9F50\u9884\u89C8: "Back to alignment preview",
  \u7CFB\u7EDF\u623F\u95F4\u626B\u63CF: "System room scan",
  \u9000\u51FA\u6C89\u6D78: "Exit immersive mode",
  \u5207\u6362\u4E0B\u4E00\u6BB5\u52A8\u4F5C: "Next motion",
  "\u63D0\u524D 0.5 \u79D2": "0.5 s earlier",
  "\u63A8\u8FDF 0.5 \u79D2": "0.5 s later",
  \u66F4\u591A\u6F14\u5458\u64CD\u4F5C: "More actor controls",
  \u4ECE\u5934\u91CD\u653E: "Replay from start",
  "\u6062\u590D T-Pose": "Reset to T-Pose",
  \u6E05\u9664\u5F53\u524D\u52A8\u4F5C: "Clear motion",
  \u64A4\u56DE\u4E0A\u4E00\u5F20: "Undo last photo",
  \u5207\u6362\u73AF\u5883\u76F8\u673A: "Switch environment camera",
  \u8FD4\u56DE\u5DF2\u4FDD\u5B58\u573A\u666F: "Back to saved scene",
  \u8FD4\u56DE\u62CD\u6444: "Back to capture",
  \u53D1\u9001\u6587\u5B57: "Send text",
  \u4E0A\u4E00\u9875: "Previous page",
  \u4E0B\u4E00\u9875: "Next page",
  \u4FDD\u5B58\u573A\u666F: "Save scene",
  \u7EE7\u7EED\u5DF2\u4FDD\u5B58\u573A\u666F: "Continue saved scene",
  \u7ED3\u675F\u6C89\u6D78: "End immersive session",
  "EmboDi \xB7 \u9009\u62E9\u53C2\u8003\u56FE": "EmboDi \xB7 Choose reference",
  "\u53F3\u6447\u6746\u6309\u4E0B\u7F16\u8F91 \xB7 \u6273\u673A\u70B9\u9009 / \u518D\u6309\u4F4F\u79FB\u52A8\n\u62D6\u52A8\u65F6\u6447\u6746\u8F6C\u5411 / \u5347\u964D \xB7 \u5DE6\u6447\u6746\u64A4\u9500 \xB7 \u53F3\u63E1\u628A\u6846\u9009": `Right stick click: edit \xB7 Select, then hold trigger to move
While dragging, stick turns / raises \xB7 Left stick: undo \xB7 Right grip: box-select`,
  "{0} \u5F20 \xB7 \u81F3\u5C11 4 \u5F20 \xB7 \u53F3\u6273\u673A\u62CD\u7167": "{0} photos \xB7 Minimum 4 \xB7 Right trigger to capture",
  "\u5DE6 Y \u9690\u85CF\uFF1B\u518D\u6B21\u6309\u4E0B\uFF0C\u5728\u5F53\u524D\u6B63\u524D\u65B9\u5524\u51FA": "Y: hide \xB7 Press again to place the menu in front of you",
  "Controller \u952E\u76D8 \xB7 \u4E2D\u6587\u53EF\u7528\u8BED\u97F3": "Controller keyboard \xB7 Hold X for voice input",
  \u7A7A\u683C: "Space",
  \u5220\u9664: "Delete",
  "\u25CF {0} \u79D2 \xB7 B / \u70B9\u51FB\u505C\u6B62\u5F55\u50CF": "\u25CF {0} s \xB7 B / click to stop recording",
  "\u6B63\u5728\u4FDD\u5B58\u5F55\u50CF\u2026": "Saving recording\u2026",
  "\u89C6\u9891\u672A\u4FDD\u5B58 \xB7 B / \u70B9\u51FB\u91CD\u8BD5": "Video unsaved \xB7 B / click to retry",
  "\u5F85\u53D1\u9001\uFF1A": "Draft: ",
  "\u7F16\u8F91\uFF1A\u53F3\u63E1\u628A\u6846\u9009 \xB7 \u6309\u4E0B\u53F3\u6447\u6746\u9000\u51FA": "Edit \xB7 Right grip: box-select \xB7 Right stick click: exit",
  "\u4F53\u9A8C\uFF1A\u6309\u4E0B\u53F3\u6447\u6746\u8FDB\u5165\u7F16\u8F91 \xB7 \u5DE6 X \u6309\u4F4F\u8BF4\u8BDD": "Explore \xB7 Right stick click: edit \xB7 Hold X: speak",
  "\u6B63\u5728\u542C\u2026 \u677E\u5F00 X \u7ED3\u675F\u5E76\u53D1\u9001": "Listening\u2026 Release X to send",
  \u5F00\u59CB\u521B\u4F5C: "Start creating",
  \u573A\u666F\u603B\u89C8: "Scene overview",
  \u786E\u8BA4\u623F\u95F4\u5BF9\u9F50: "Confirm room alignment",
  \u62CD\u6444\u65B0\u623F\u95F4: "Capture a new room",
  \u6784\u5EFA\u573A\u666F: "Build scene",
  \u67E5\u770B\u7C97\u573A\u666F: "Review blockout",
  \u5373\u5C06\u8FDB\u5165\u4E16\u754C: "Entering the world",
  \u9009\u62E9\u8FDB\u5165\u70B9: "Choose entry point",
  \u624B\u52A8\u5BF9\u9F50: "Manual alignment",
  \u521B\u4F5C\u4E2D: "Creating",
  "{0} \xB7 \u52A8\u4F5C\u4E0E\u51FA\u573A": "{0} \xB7 Motion and timing",
  "\u5220\u9664 {0}": "Remove {0}",
  \u9009\u4E2D\u6F14\u5458: "Selected actor",
  "\u6B63\u5728\u4FDD\u5B58\u5E76\u7ED3\u675F\u2026": "Saving and exiting\u2026",
  "\u6B63\u5728\u4FDD\u5B58\u2026": "Saving\u2026",
  "\u6B63\u5728\u4FDD\u5B58\u89C6\u9891\u2026": "Saving video\u2026",
  \u91CD\u8BD5\u4FDD\u5B58\u89C6\u9891: "Retry video save",
  \u4FDD\u5B58\u540E\u7ED3\u675F\u521B\u4F5C: "Save and finish",
  \u91C7\u7528\u5E76\u8FDB\u5165\u521B\u4F5C: "Apply and enter",
  \u5E94\u7528\u4FEE\u6539: "Apply changes",
  \u653E\u5F03\u9884\u89C8: "Discard preview",
  \u505C\u6B62\u5E76\u4FDD\u5B58\u5F55\u50CF: "Stop and save recording",
  \u505C\u6B62\u8BF7\u6C42: "Stop request",
  \u7ED3\u675F\u5E76\u53D1\u9001: "Finish and send",
  "\u8BED\u97F3\u5904\u7406\u4E2D\u2026": "Processing voice\u2026",
  \u53D6\u6D88\u8BED\u97F3: "Cancel voice input",
  \u7EE7\u7EED\u4E0A\u6B21\u521B\u4F5C: "Continue last session",
  \u6309\u5F53\u524D\u626B\u63CF\u91CD\u5EFA: "Rebuild from current scan",
  \u7ED3\u675F\u521B\u4F5C: "Finish creating",
  "\u5BF9\u9F50\u6B63\u786E\uFF0C\u5F00\u59CB\u521B\u4F5C": "Alignment looks right \xB7 Start",
  "\u7B49\u5F85\u623F\u95F4\u626B\u63CF\u2026": "Waiting for room scan\u2026",
  \u67E5\u770B\u5BF9\u9F50\u9884\u89C8: "Review alignment",
  \u91CD\u65B0\u6307\u5B9A\u89D2\u70B9: "Mark corners again",
  \u8FD4\u56DE\u626B\u63CF\u5BF9\u9F50: "Back to scan alignment",
  "\u505C\u6B62\u5E76\u4FDD\u5B58\u5F55\u50CF \xB7 B": "Stop and save recording \xB7 B",
  \u9000\u51FA\u7F16\u8F91: "Exit edit",
  \u8FDB\u5165\u7F16\u8F91: "Edit scene",
  "\u91CD\u653E \xB7 \u5DE6\u63E1\u628A": "Replay \xB7 Left grip",
  "\u6682\u505C\u8868\u6F14 \xB7 \u5DE6\u63E1\u628A": "Pause \xB7 Left grip",
  "\u7EE7\u7EED\u8868\u6F14 \xB7 \u5DE6\u63E1\u628A": "Resume \xB7 Left grip",
  "\u5F00\u6F14 \xB7 \u5DE6\u63E1\u628A": "Play \xB7 Left grip",
  "\u505C\u6B62\u5F55\u5236 \xB7 \u53F3 B": "Stop recording \xB7 B",
  \u66F4\u591A: "More",
  "\u91C7\u7528 Quest \u626B\u63CF": "Use Quest scan",
  \u5E94\u7528\u89D2\u70B9\u6821\u51C6: "Apply corner alignment",
  \u8FD4\u56DE\u603B\u89C8: "Back to overview",
  \u53D6\u6D88\u8FDB\u5165: "Cancel entry",
  \u91C7\u7528\u5E76\u751F\u6210\u5165\u53E3: "Apply and create entry points",
  \u53D6\u6D88\u6253\u5F00\u76F8\u673A: "Cancel camera startup",
  \u5173\u95ED\u76F8\u673A: "Close camera",
  \u6253\u5F00\u76F8\u673A: "Open camera",
  "\u6B63\u5728\u8F7D\u5165\u7167\u7247\u2026": "Loading photos\u2026",
  "\u62CD\u7167 \xB7 \u53F3\u6273\u673A": "Take photo \xB7 Right trigger",
  "\u6309\u626B\u63CF\u6784\u5EFA\u767D\u6A21{0}": "Build from scan{0}",
  " \xB7 {0} \u5F20\u53C2\u8003": " \xB7 {0} references",
  "\u6784\u5EFA\u623F\u95F4{0}": "Build room{0}",
  " \xB7 {0} \u5F20": " \xB7 {0} photos",
  \u66F4\u6362\u56FE\u7247: "Change image",
  \u9009\u62E9\u56FE\u7247: "Choose image",
  \u5F00\u59CB\u6784\u5EFA: "Start building",
  \u8FD4\u56DE\u5DF2\u6709\u4E16\u754C: "Back to existing world",
  \u5BF9\u9F50\u771F\u5B9E\u623F\u95F4: "Align real room",
  \u4EC5\u67E5\u770B\u4F30\u8BA1\u573A\u666F: "Inspect estimated scene",
  \u8FDB\u5165\u4E16\u754C: "Enter world",
  \u6362\u4E2A\u5165\u53E3: "Choose another entry",
  "\u53D6\u6D88\u653E\u7F6E \xB7 A": "Cancel placement \xB7 A",
  \u6307\u5B9A\u6F14\u5458\u52A8\u4F5C: "Assign actor motion",
  "\u653E\u7F6E\u6F14\u5458 \xB7 A": "Add actor",
  "\u5F55\u5236\u8FD0\u955C \xB7 \u53F3 B": "Record camera view \xB7 B",
  \u8BED\u97F3\u5BF9\u8BDD: "Voice chat",
  \u67E5\u770B\u603B\u89C8: "Show overview",
  \u91CD\u8BD5\u4FDD\u5B58\u5F55\u50CF: "Retry recording save",
  "\u5F00\u59CB\u5F55\u50CF \xB7 \u6700\u957F 3 \u5206\u949F": "Start recording \xB7 Up to 3 min",
  "\u5F55\u50CF\u672A\u4FDD\u5B58\uFF0C\u8BF7\u91CD\u8BD5": "Recording not saved. Retry.",
  "Ready \xB7 \u7B49\u5F85 Preview": "Ready \xB7 Select Preview",
  "\u53F0\u8BCD\u548C WAV \u5F85\u914D\u7F6E": "The agent is unavailable.",
  \u5B8C\u6210: "Complete",
  "{0} \u5F20\u7167\u7247 \xB7 \u53F3\u6273\u673A\u62CD\u7167": "{0} photos \xB7 Right trigger to capture",
  \u8BF7\u786E\u8BA4\u573A\u666F\u5BF9\u9F50: "Confirm scene alignment",
  \u7B49\u5F85\u623F\u95F4\u5BF9\u9F50: "Waiting for room alignment",
  "\u4E34\u65F6\u9A8C\u6536\u5267\u672C \xB7 \u6309\u4F4F X \u540E\u677E\u5F00": "Hold X to speak, then release",
  \u5F55\u50CF\u672A\u4FDD\u5B58: "Recording not saved",
  \u63D0\u4EA4\u63CF\u8FF0: "Submit description",
  \u4E0A\u4E00\u5F20: "Previous photo",
  \u4E0B\u4E00\u5F20: "Next photo",
  \u79FB\u9664\u8FD9\u5F20: "Remove this photo",
  \u5173\u95ED\u53D6\u666F: "Close camera view",
  "\u67E5\u770B / \u79FB\u9664\u7167\u7247": "Review / remove photos",
  \u62CD\u7167: "Take photo",
  "Done \xB7 \u51C6\u5907\u8DEF\u5F84": "Done \xB7 Prepare path",
  \u64A4\u56DE: "Undo",
  "\u9000\u51FA Draft": "Exit Draft",
  \u5F00\u95E8\u65F6\u542F\u52A8\u7F16\u961F: "Start group when door opens",
  "Describe it \xB7 \u4F60\u5E0C\u671B\u600E\u6837\u4FEE\u6539\uFF1F": "Describe it \xB7 What would you like to change?",
  "\u7B2C {0} / {1} \u5F20 \xB7 \u4FDD\u7559\u8FD9\u5F20\u5417\uFF1F": "Photo {0} / {1} \xB7 Keep this shot?",
  "\u7528\u54EA\u4E9B\u7167\u7247\u6784\u5EFA\u623F\u95F4\uFF1F": "Let\u2019s build your scene",
  "\u8FD9\u7EC4\u6F14\u5458\u6CBF\u54EA\u6761\u8DEF\u7EBF\u524D\u8FDB\uFF1F": "Which path should this group follow?",
  "\u7528\u54EA\u79CD\u65B9\u5F0F\u8868\u8FBE\u4EA4\u4E92\uFF1F": "How would you like to describe the interaction?",
  "\u51C6\u5907\u597D\u4E86\uFF0C\u73B0\u5728\u9884\u89C8\u5417\uFF1F": "Ready. Preview now?",
  "\u60F3\u600E\u6837\u4FEE\u6539{0}\uFF1F": "What would you like to change about {0}?",
  \u8FD9\u7EC4\u5BF9\u8C61: "these objects",
  "\u9884\u89C8\u3001\u590D\u4F4D\uFF0C\u8FD8\u662F\u4FDD\u5B58\uFF1F": "Preview, reset, or save?",
  "Transform \xB7 \u79FB\u52A8\u4E0E\u8F6C\u5411": "Transform \xB7 Move and turn",
  \u51C6\u5907\u95E8\u4EA4\u4E92: "Prepare door interaction",
  \u5B8C\u6210\u5E76\u51C6\u5907\u8DEF\u5F84: "Finish and prepare path",
  \u6E05\u9664\u8349\u56FE: "Clear draft",
  \u64A4\u56DE\u7B14\u753B: "Undo stroke",
  "\u53D6\u6D88\u5E76\u9000\u51FA Draft": "Cancel and exit Draft",
  "Voice \xB7 \u8BED\u97F3": "Voice \xB7 Spoken request",
  \u8FD4\u56DE\u5BF9\u8C61\u83DC\u5355: "Back to object controls",
  "\u5DF2\u786E\u8BA4\u7684\u7A7A\u95F4\u767D\u6A21\uFF1B\u4FDD\u7559\u4E3A\u521B\u4F5C\u8D77\u70B9\u3002": "Confirmed blockout, preserved as the starting point.",
  "\u9009\u4E2D\u767D\u6A21\u95E8\uFF0C\u8BBE\u7F6E\u5F00\u95E8\u65B9\u5411\u5E76\u8BD5\u5F00\uFF0C\u518D\u4FDD\u5B58\u3002": "Select the door, configure its opening direction, preview, and save.",
  "\u653E\u7F6E T-Pose \u4EBA\u4F53\uFF0C\u8C03\u6574\u4F4D\u7F6E\u4E0E\u671D\u5411\uFF0C\u5148\u4E0D\u6307\u5B9A\u52A8\u4F5C\u3002": "Place T-Pose actors and adjust their positions and orientations before assigning motions.",
  \u5206\u5E55\u7F16\u53F7\u65E0\u6548: "Invalid act ID",
  "\u8BF7\u4FDD\u5B58\u91CD\u5EFA\u767D\u6A21\uFF0C\u4E0D\u662F\u539F\u59CB\u626B\u63CF\u53C2\u8003": "Save the rebuilt blockout, not the raw scan reference",
  "\u7B2C\u4E00\u3001\u4E8C\u5E55\u5E94\u5148\u4FDD\u7559\u6CA1\u6709\u6F14\u5458\u7684\u5E03\u666F": "Acts 1 and 2 should contain no actors",
  \u57FA\u7840\u573A\u666F\u5E94\u4FDD\u7559\u672A\u6DFB\u52A0\u5F00\u95E8\u6548\u679C\u7684\u767D\u6A21: "The base scene should have no door effects",
  \u8BF7\u5148\u9009\u4E2D\u767D\u6A21\u95E8\u5E76\u6DFB\u52A0\u5F00\u95E8\u6548\u679C: "Select a blockout door and add an opening effect first",
  \u57FA\u7840\u573A\u666F\u5DF2\u9501\u5B9A: "Base scene locked",
  \u4FDD\u5B58\u5F53\u524D\u4E3A\u8FD9\u4E00\u5E55: "Save current scene as this act",
  \u8F7D\u5165\u8FD9\u4E00\u5E55: "Load this act",
  \u7ED3\u6784: "Structure",
  \u684C\u53F0: "Tables",
  \u5EA7\u6905: "Seating",
  \u67DC\u67B6: "Storage",
  \u8BBE\u5907: "Equipment",
  \u5176\u4ED6: "Other",
  "\u8BF7\u5148\u653E\u7F6E\u6F14\u5458\uFF0C\u518D\u5207\u6362\u52A8\u4F5C\u98CE\u683C": "Place actors before changing motion style",
  "\u8FD9\u7EC4\u98CE\u683C\u7684\u4E94\u6BB5\u52A8\u4F5C\u5C1A\u672A\u5B8C\u6574\u8F7D\u5165\uFF0C\u672A\u4FEE\u6539\u4EFB\u4F55\u6F14\u5458": "The five motions for this style are not fully loaded. No actors were changed.",
  "\u505C\u6B62\u51C6\u5907 \xB7 Stop": "Cancel preparation",
  \u7EE7\u7EED\u9884\u89C8: "Resume preview",
  \u786E\u8BA4\u9884\u89C8: "Confirm preview",
  \u53D6\u6D88\u9884\u89C8: "Cancel preview",
  "\u505C\u6B62\u9884\u89C8 \xB7 Stop": "Stop preview",
  "\u5DF2\u53D6\u6D88\uFF0C\u6F14\u5458\u4FDD\u6301\u6682\u505C\u3002": "Cancelled. Actors remain paused.",
  "\u573A\u666F\u3001\u9009\u533A\u6216\u7A7A\u95F4\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u53D1\u51FA\u6307\u4EE4\u3002": "Scene, selection, or alignment changed. Submit again.",
  "\u6B63\u5728\u5904\u7406\u5F53\u524D\u6307\u4EE4\uFF0C\u8BF7\u7A0D\u5019\u6216\u8BF4 Stop\u3002": "Processing the current request. Please wait or say Stop.",
  "\u8BF4\u8BDD\u540E\u573A\u666F\u6216\u9009\u533A\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u53D1\u51FA\u6307\u4EE4\u3002": "Scene or selection changed since you spoke. Submit again.",
  "\u6B63\u5728\u51C6\u5907\u9884\u8BBE\u52A8\u4F5C\u2026": "Preparing motions\u2026",
  "\u51C6\u5907\u671F\u95F4\u573A\u666F\u6216\u9009\u533A\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u53D1\u51FA\u6307\u4EE4\u3002": "Scene or selection changed during preparation. Submit again.",
  "\u4ECD\u5728\u5904\u7406\u4E2D\uFF0C\u8BF7\u7B49\u5C31\u7EEA\u63D0\u793A\u540E\u518D\u786E\u8BA4\u9884\u89C8\u3002": "Still processing. Wait until ready before confirming Preview.",
  "\u5F53\u524D\u6CA1\u6709\u7B49\u5F85\u786E\u8BA4\u7684\u9884\u89C8\uFF0C\u8BF7\u5148\u51C6\u5907\u52A8\u4F5C\u3002": "No preview is waiting. Prepare motions first.",
  "\u8FD9\u6B21\u786E\u8BA4\u5BF9\u5E94\u7684\u573A\u666F\u6216\u9009\u533A\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u51C6\u5907\u52A8\u4F5C\u3002": "This confirmation is out of date. Prepare the motions again.",
  "\u9884\u89C8\u5DF2\u5F00\u59CB\uFF1B\u8BF4 Stop \u53EF\u4EE5\u6682\u505C\u3002": "Preview started \xB7 Say Stop to pause",
  \u5267\u672C\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E: "This interaction is unavailable.",
  "\u5267\u672C\u6B65\u9AA4 ID \u91CD\u590D\u6216\u65E0\u6548": "This interaction is unavailable.",
  "\u5267\u672C\u9636\u6BB5\u3001\u64CD\u4F5C\u6216\u76EE\u6807\u89E3\u6790\u5668\u65E0\u6548": "This interaction is unavailable.",
  "\u8BF7\u586B\u5199\u7528\u6237\u53F0\u8BCD\u548C Agent \u56DE\u590D": "This interaction is unavailable.",
  \u5267\u672C\u5B88\u536B\u914D\u7F6E\u65E0\u6548: "This interaction is unavailable.",
  \u64CD\u4F5C\u4E0E\u76EE\u6807\u6216\u9884\u89C8\u7EA6\u675F\u4E0D\u5339\u914D: "This interaction is unavailable.",
  \u9884\u89C8\u6B65\u9AA4\u5FC5\u987B\u68C0\u67E5\u5F53\u524D\u9884\u89C8\u8BF7\u6C42: "This preview is unavailable.",
  "\u4E0B\u4E00\u6B65\u5FC5\u987B\u6307\u5411\u540E\u7EED\u6B65\u9AA4\u6216 null": "This interaction is unavailable.",
  "\u8BF7\u5148\u5B8C\u6210\u5F53\u524D\u573A\u666F\u9636\u6BB5\uFF0C\u518D\u63D0\u4EA4\u8FD9\u53E5\u53F0\u8BCD": "Finish the current scene stage before submitting this line",
  \u5F53\u524D\u5DF2\u6709\u6F14\u5458: "Actors already exist",
  \u8BF7\u5148\u9009\u62E9\u76EE\u6807: "Select a target first",
  \u8BF7\u5148\u6307\u5411\u6709\u6548\u5730\u9762: "Point at a valid floor first",
  \u8BF7\u5148\u5B8C\u6210\u5730\u9762\u8349\u56FE: "Finish a ground sketch first",
  \u5F53\u524D\u6CA1\u6709\u7B49\u5F85\u786E\u8BA4\u7684\u9884\u89C8: "No preview is waiting for confirmation",
  "\u5DF2\u53D6\u6D88\uFF0C\u53EF\u91CD\u65B0\u6309\u4F4F X \u63D0\u4EA4\u5F53\u524D\u53F0\u8BCD": "Cancelled. Hold X again to retry this step.",
  "\u5DF2\u505C\u6B62\u63A8\u8FDB\uFF1B\u5DF2\u63D0\u4EA4\u7684\u4FEE\u6539\u53EF\u80FD\u5DF2\u4FDD\u5B58\uFF0C\u8BF7\u68C0\u67E5\u573A\u666F": "Advancement stopped. Submitted changes may have saved; inspect the scene.",
  "\u76EE\u6807\u6216\u573A\u666F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u63D0\u4EA4\u5F53\u524D\u53F0\u8BCD": "Target or scene changed. Submit this line again.",
  "\u53F0\u8BCD\u548C WAV \u5C1A\u672A\u914D\u7F6E": "The agent is unavailable.",
  "\u5F53\u524D\u56DE\u590D\u7684 WAV \u5C1A\u672A\u914D\u7F6E": "The agent\u2019s reply is unavailable.",
  "\u64CD\u4F5C\u5C1A\u672A\u6210\u529F\uFF0C\u4FDD\u7559\u5F53\u524D\u6B65\u9AA4": "Action did not succeed. Current step retained.",
  "\u6839\u636E\u8FD9\u4E9B\u7167\u7247\u642D\u5EFA\u540C\u4E00\u4E2A\u5BA4\u5185\u623F\u95F4\u7684\u53EF\u7F16\u8F91\u5206\u7C7B\u767D\u6A21\u3002\u4FDD\u7559\u5730\u9762\u3001\u5899\u9762\u3001\u5929\u82B1\u677F\u3001\u95E8\u7A97\u4F4D\u7F6E\u53CA\u4E3B\u8981\u5927\u4EF6\u5BB6\u5177\u8F6E\u5ED3\uFF0C\u5FFD\u7565\u684C\u9762\u5C0F\u7269\u4EF6\u548C\u88C5\u9970\uFF0C\u4F18\u5148\u4FDD\u6301\u7A7A\u95F4\u5173\u7CFB\u3002": "Build an editable, categorized room blockout from these photos. Preserve floors, walls, ceiling, doors, windows, and large furniture. Omit small tabletop objects and decoration; prioritize spatial relationships.",
  "\u7B2C 1 \u5F20\uFF1A\u4ECE\u623F\u95F4\u4E00\u4FA7\u671D\u5185\u62CD\uFF0C\u5305\u542B\u5899\u89D2\u3001\u5730\u9762\u548C\u4E3B\u8981\u5BB6\u5177\u3002": "Shot 1: include corners, floor, and large furniture.",
  "\u7B2C 2 \u5F20\uFF1A\u6362\u4E00\u4E2A\u4F4D\u7F6E\uFF0C\u4FDD\u7559\u4E0A\u4E00\u5F20\u4E2D\u7684\u90E8\u5206\u5899\u9762\u6216\u5BB6\u5177\u3002": "Shot 2: move to another position, keeping some walls or furniture from the first view.",
  "\u7B2C 3 \u5F20\uFF1A\u8865\u53E6\u4E00\u4FA7\u7684\u5899\u89D2\u3001\u95E8\u7A97\uFF1B\u5C3D\u91CF\u770B\u5230\u5899\u4E0E\u5730\u9762\u7684\u4EA4\u754C\u3002": "Shot 3: cover another corner, doors, and windows. Include wall\u2013floor boundaries.",
  "\u7B2C 4 \u5F20\uFF1A\u8865\u8FD8\u6CA1\u770B\u5230\u7684\u4E00\u4FA7\uFF1B\u7AD9\u7A33\u518D\u62CD\uFF0C\u907F\u514D\u9006\u7740\u660E\u4EAE\u7A97\u6237\u3002": "Shot 4: cover the remaining side. Hold still and avoid shooting into bright windows.",
  "\u5DF2\u62CD 4 \u5F20\uFF0C\u53EF\u4EE5\u6784\u5EFA\u3002\u82E5\u8FD8\u6709\u88AB\u6321\u4F4F\u7684\u5899\u89D2\uFF0C\u53EF\u7EE7\u7EED\u8865\u62CD\uFF0C\u4E0D\u9650\u5F20\u6570\u3002": "Ready to build. Add more photos if needed.",
  "\u8BF7\u63D0\u4F9B\u623F\u95F4\u7167\u7247\uFF0C\u6784\u5EFA\u524D\u81F3\u5C11\u51C6\u5907\u56DB\u5F20": "Provide room photos. At least four are required before building.",
  "\u5355\u5F20\u7167\u7247\u8FC7\u5927\uFF0C\u8BF7\u7F29\u5C0F\u81F3 1 MB \u5185": "Photo too large. Reduce it to under 1 MB.",
  "\u623F\u95F4\u7167\u7247\u5FC5\u987B\u662F PNG \u6216 JPEG": "Room photos must be PNG or JPEG",
  \u7167\u7247\u6570\u636E\u65E0\u6548: "Invalid photo data",
  \u7167\u7247\u5185\u5BB9\u4E0E\u683C\u5F0F\u4E0D\u4E00\u81F4: "Photo content does not match its format",
  "This is a PARTIALLY surveyed elevator / corridor set, not a complete building. Reconstruct only the photographed part within the selected scan envelope. Preserve turns and internal walls visible in the photos; do not turn an L/T-shaped corridor into an empty rectangle. End unseen corridor continuations with simple editable virtual closure walls at the selected scan limits. Do not extend into unobserved rooms. Name any invented end wall '\u672A\u626B\u63CF\u533A\u5C01\u95ED\u5899' and use group='capture-boundary'. These are authored set boundaries, not measured real walls. The runtime will also close remaining gaps at the envelope perimeter.\n": `This is a partially surveyed elevator / corridor set. Reconstruct only the photographed area within the selected scan envelope. Preserve turns and interior walls. Close unseen continuations with editable virtual end walls named 'Unscanned boundary wall', group='capture-boundary'. These are authored boundaries, not measured walls.
`,
  \u623F\u95F4\u7F3A\u5C11\u5E73\u9762\u5730\u677F: "The room has no flat floor",
  "\u91CD\u5EFA\u573A\u666F\u4F7F\u7528\u626B\u63CF\u5750\u6807\uFF0C\u8BF7\u8C03\u6574\u5177\u4F53\u7269\u5757\u6216\u6574\u4F53\u5BF9\u9F50\uFF0C\u4E0D\u4F7F\u7528\u5355\u623F\u95F4\u5C3A\u5BF8\u91CD\u6620\u5C04": "This scene uses scan coordinates. Edit individual objects or room alignment instead of remapping room dimensions.",
  "\u623F\u95F4\u767D\u6A21\u5305\u542B\u8FC7\u591A\u5BF9\u8C61\uFF0C\u8BF7\u91CD\u8BD5\u7B80\u5316\u6784\u5EFA": "Too many objects in the blockout. Retry with a simpler build.",
  "\u623F\u95F4\u7F3A\u5C11\u53EF\u8FDB\u5165\u7684\u5E73\u9762\u5730\u677F\uFF0C\u8BF7\u91CD\u65B0\u6784\u5EFA": "No flat, accessible floor found. Rebuild the room.",
  \u5929\u82B1\u677F: "Ceiling",
  "\u6309\u4F4F\u53F3\u6273\u673A\u5728\u5730\u9762\u753B\u7EBF\uFF0C\u677E\u5F00\u7ED3\u675F\u3002": "Hold the right trigger to draw on the floor. Release to finish.",
  "\u7B14\u753B\u5DF2\u53D6\u6D88\uFF0C\u539F\u8DEF\u7EBF\u4FDD\u7559\u3002": "Stroke cancelled. Previous path retained.",
  \u8BF7\u6307\u5411\u53EF\u89C1\u5730\u9762: "Point at a visible floor",
  \u8BF7\u5148\u677E\u5F00\u6273\u673A: "Release the trigger first",
  "\u6B63\u5728\u7ED8\u5236 \xB7 \u677E\u5F00\u7ED3\u675F \xB7 A \u53D6\u6D88": "Drawing \xB7 Release to finish \xB7 A to cancel",
  "\u5DF2\u79BB\u5F00\u53EF\u89C1\u5730\u9762\uFF0C\u672C\u7B14\u672A\u4FDD\u7559\uFF1B\u677E\u5F00\u540E\u91CD\u65B0\u7ED8\u5236\u3002": "Left the visible floor. Stroke discarded; release and try again.",
  "\u7B14\u753B\u8DE8\u8D8A\u8FC7\u5927\uFF0C\u8BF7\u677E\u5F00\u540E\u8FDE\u7EED\u6CBF\u5730\u9762\u91CD\u753B\u3002": "Stroke contains a large jump. Release and redraw continuously along the floor.",
  "\u672C\u7B14\u8FC7\u957F\uFF0C\u8BF7\u677E\u5F00\u540E\u7ED8\u5236\u8F83\u77ED\u8DEF\u7EBF\u3002": "Stroke too long. Release and draw a shorter path.",
  "\u7B14\u753B\u592A\u77ED\uFF0C\u8BF7\u91CD\u65B0\u753B\u4E00\u6761\u524D\u8FDB\u8DEF\u7EBF\u3002": "Stroke too short. Draw a forward path again.",
  "\u8349\u56FE\u5DF2\u4FDD\u7559\u5728\u672C\u6B21\u7F16\u8F91\u4E2D \xB7 \u53EF\u91CD\u753B\u6216\u64A4\u56DE": "Draft retained for this edit \xB7 Redraw or undo",
  \u5DF2\u64A4\u56DE\u4E0A\u4E00\u7B14: "Last stroke undone",
  \u5F00\u95E8\u6548\u679C\u683C\u5F0F\u65E0\u6548: "Invalid door effect",
  \u5F00\u95E8\u6548\u679C\u5FC5\u987B\u7ED1\u5B9A\u552F\u4E00\u7684\u95E8\u7269\u5757: "A door effect must reference a unique door object",
  \u5F00\u95E8\u53C2\u6570\u65E0\u6548: "Invalid door parameters",
  \u8BF7\u5148\u70B9\u9009\u4E00\u6247\u767D\u6A21\u95E8: "Select a blockout door first",
  \u5F00\u95E8\u64CD\u4F5C\u65E0\u6548: "Invalid door action",
  "{0} \xB7 \u5F00\u95E8\u8BBE\u7F6E": "{0} \xB7 Door settings",
  "\u8F93\u51FA 1280 \xD7 720\uFF0CMac \u6574\u7406\u4E3A 30 fps MP4\uFF0C\u5355\u6BB5\u6700\u957F 3 \u5206\u949F\uFF0C\u5230\u65F6\u81EA\u52A8\u505C\u6B62\u5E76\u4FDD\u5B58\uFF1B\u5305\u542B\u865A\u62DF\u624B\u4E0E\u624B\u81C2\uFF1B\u4E0D\u5305\u542B\u771F\u5B9E\u76F8\u673A\u753B\u9762\u3001\u58F0\u97F3\u3001\u83DC\u5355\u6216\u63A7\u5236\u5668\u6A21\u578B\u3002\u6587\u4EF6\u4FDD\u5B58\u5728\u672C\u673A\uFF0C\u53EF\u4E0B\u8F7D\u3002": "Exports 1280 \xD7 720 MP4 at 30 fps, processed on this Mac. Each take stops and saves at three minutes. Includes virtual hands and arms; excludes the real camera view, audio, menus, and controller models. Files are saved locally for download.",
  "\u677E\u5F00\u65F6\u56DB\u6307\u7565\u5F2F\u3001\u62C7\u6307\u653E\u677E\u5916\u5C55\uFF1B\u98DF\u6307\u6273\u673A\u5F2F\u66F2\u98DF\u6307\uFF0C\u63E1\u628A\u5F2F\u66F2\u5176\u4F59\u4E09\u6307\uFF0C\u5B9E\u9645\u6309\u4E0B\u62C7\u6307\u6309\u94AE\u65F6\u62C7\u6307\u6536\u8D77\u3002\u624B\u52BF\u7531\u6309\u952E\u6A21\u62DF\uFF0C\u80A9\u8098\u7531\u5934\u663E\u4E0E\u624B\u67C4\u4F30\u7B97\u3002\u5C3A\u5BF8\u5728\u5F55\u5236\u524D\u8C03\u6574\uFF0C\u4FDD\u5B58\u5728\u672C\u6D4F\u89C8\u5668\u3002": "Fingers rest slightly curled. The trigger bends the index finger; grip bends the other fingers; thumb buttons fold the thumb. Hand poses use controller inputs, while shoulders and elbows are estimated from the headset and controllers. Adjust sizes before recording; settings are saved in this browser.",
  "Quest\uFF1A\u53F3\u6447\u6746\u6309\u4E0B\u7F16\u8F91\uFF1B\u53F3\u6273\u673A\u70B9\u9009\u540E\u518D\u6309\u4F4F\u8C03\u6574\uFF0C\u6447\u6746\u8F6C\u5411/\u5347\u964D\uFF1B\u5DE6\u6447\u6746\u6309\u4E0B\u64A4\u9500\uFF1B\u53F3\u63E1\u628A\u6846\u9009\u3002A \u653E\u7F6E\u6F14\u5458\uFF0C\u5DE6\u63E1\u628A\u64AD\u653E/\u6682\u505C\uFF0CB \u5F55\u5236\uFF0CX \u6309\u4F4F\u8BF4\u8BDD\uFF0CY \u83DC\u5355\u3002": "Quest: right stick click edits; select then hold the trigger to adjust; stick turns / raises; left stick click undoes; right grip box-selects. A places actors, left grip plays / pauses, B records, hold X to speak, and Y opens the menu.",
  "\u4EC5\u4FDD\u7559\u623F\u95F4\u7ED3\u6784\u4E0E\u5927\u4EF6\u5BB6\u5177\u8F6E\u5ED3\u3002\u7167\u7247\u9010\u5F20\u4FDD\u5B58\u5230\u672C\u673A\u670D\u52A1\uFF1B\u5F53\u524D\u7167\u7247\u5217\u8868\u5728\u672C\u6B21\u9875\u9762\u5185\u7BA1\u7406\u3002\u5C3A\u5BF8\u4E3A\u4F30\u8BA1\uFF0C\u53EF\u8FDB\u5165\u540E\u8C03\u6574\u3002": "Builds room structure and large furniture. Each photo is saved locally; the photo list belongs to this page session. Dimensions are estimates and can be adjusted inside the scene.",
  "\u7535\u8111\uFF1AV \u7F16\u8F91\uFF0CP \u653E\u7F6E\uFF0C\u7A7A\u683C\u64AD\u653E\uFF0CR \u5F55\u5236\uFF1B\u9F20\u6807\u9009\u4E2D\u540E\u518D\u62D6\u52A8\uFF0C\u65B9\u5411\u952E\u8C03\u6574\uFF0CCtrl/Cmd+Z \u64A4\u9500\u3002": "Desktop: V edits, P places, Space plays, R records. Select then drag with the mouse; arrow keys adjust; Ctrl/Cmd+Z undoes.",
  "\u6BCF\u4E00\u5C42\u53EF\u4EE5\u4F7F\u7528\u4E0D\u540C\u7684\u670D\u52A1\u3002\u5BC6\u94A5\u4FDD\u5B58\u5728\u8FD9\u53F0 Mac \u672C\u5730\uFF0C\u4E0D\u8FDB\u5165 Git\uFF0C\u4E0D\u56DE\u663E\u5230\u9875\u9762\u3002\u7559\u7A7A\u4FDD\u7559\u539F\u5BC6\u94A5\u3002": "Each stage can use a different service. Keys stay on this Mac, are excluded from Git, and are never displayed back on this page. Leave blank to keep a saved key.",
  "\u5BF9\u9F50\u540E\u4EC5\u7528\u771F\u5B9E\u8D70\u52A8\u8FD0\u955C\uFF0C\u6447\u6746\u4F4D\u79FB\u5173\u95ED\u3002\u7A7A\u95F4\u91CD\u7F6E\u6216\u91CD\u65B0\u8FDB\u5165 XR \u540E\u9700\u8981\u91CD\u65B0\u5BF9\u9F50\u3002": "Once aligned, move physically to film; stick translation is disabled. Realign after a spatial reset or a new XR session.",
  "\u8F93\u5165\u5C3A\u5BF8\u53EA\u8C03\u6574\u623F\u95F4\u6BD4\u4F8B\uFF0C\u4E0D\u80FD\u66FF\u4EE3\u4E0E\u73B0\u5B9E\u4F4D\u7F6E\u7684\u5BF9\u9F50\uFF1B\u5BB6\u5177\u5E03\u5C40\u4ECD\u53EF\u80FD\u9700\u8981\u4FEE\u6539\u3002": "Dimensions change room proportions, not alignment with the real room. Furniture placement may still need adjustment.",
  "\u4FDD\u6301\u5934\u90E8\u5927\u81F4\u6C34\u5E73\uFF0C\u5305\u542B\u5899\u4E0E\u5730\u9762\u7684\u4EA4\u754C\uFF1B\u6709\u4F59\u91CF\u518D\u8865\u95E8\u7A97\u4E0E\u4E0A\u90E8\u5899\u9762\u3002": "Keep your head level and include wall\u2013floor boundaries. Add doors, windows, and upper walls when possible.",
  "\u76F8\u90BB\u7167\u7247\u4FDD\u7559\u7EA6\u4E09\u5206\u4E4B\u4E00\u5230\u4E00\u534A\u76F8\u540C\u5185\u5BB9\uFF1B\u907F\u514D\u53EA\u5728\u539F\u5730\u8F6C\u5934\u3002": "Keep roughly one-third to one-half overlap between views. Move around instead of only turning in place.",
  "\u5148\u62CD 4 \u5F20\u3002\u6362\u4F4D\u7F6E\u671D\u623F\u95F4\u5185\u62CD\uFF0C\u5C3D\u91CF\u8986\u76D6\u5404\u9762\u5899\u548C\u5899\u89D2\u3002": "Take at least four shots from different positions, covering the walls and corners.",
  "\u9009\u62E9\u4E00\u4E2A\u5149\u5708\u4F5C\u4E3A\u8FDB\u5165\u4F4D\u7F6E\uFF0C\u4E5F\u53EF\u6307\u5411\u7A7A\u5730\u81EA\u884C\u6307\u5B9A\u3002": "Choose an entry ring, or point at an open area to set your own entry.",
  "\u7AD9\u7A33\u518D\u62CD\u3002\u4E3B\u8981\u62CD\u623F\u95F4\u5E03\u5C40\uFF0C\u684C\u9762\u7EC6\u8282\u4E0D\u7528\u7279\u5199\u3002": "Hold still while capturing. Focus on room layout rather than small tabletop details.",
  "\u62CD\u7167\u524D\u5373\u53EF\u6309\u53F3 B \u5F00\u59CB\u5F55\u50CF\uFF1B\u518D\u6B21\u6309\u4E0B\u505C\u6B62\u3002": "Press B to record before taking photos. Press again to stop.",
  "\u4F8B\u5982\uFF1A\u4FDD\u7559\u6751\u5E84\u4E0E\u5C71\u4E18\uFF0C\u589E\u52A0\u53EF\u8FDB\u5165\u7684\u5DE5\u4F5C\u5BA4\u3002": "For example: keep the village and hills, and add a workshop you can enter.",
  "\u53F3\u6273\u673A\u9009\u62E9\u5BF9\u8C61\uFF0C\u53F3\u63E1\u628A\u6846\u9009\uFF1BA \u653E\u7F6E\u6F14\u5458\u3002": "Right trigger: select \xB7 Right grip: box-select \xB7 A: cancel / back",
  "\u6253\u5F00\u5373\u53EF\u4F53\u9A8C\u5DF2\u4FDD\u5B58\u7684\u573A\u666F\uFF0C\u65E0\u9700\u91CD\u65B0\u6784\u5EFA\u3002": "Open the saved scene and continue creating.",
  "\u4E0A\u4F20\u623F\u95F4\u7167\u7247\uFF08\u81F3\u5C11\u56DB\u5F20\uFF0C\u53EF\u7EE7\u7EED\u589E\u52A0\uFF09": "Upload room photos (minimum four; add more anytime)",
  "\u63CF\u8FF0\u60F3\u8C61\u4E2D\u7684\u4E16\u754C\uFF0C\u5148\u751F\u6210\u53C2\u8003\u56FE\u7247\u3002": "Describe a world to generate a reference image.",
  "\u5DE6 Y \u5728\u6B63\u524D\u65B9\u5524\u51FA / \u9690\u85CF\u83DC\u5355": "Y: show / hide the menu in front of you",
  "\u5EFA\u8BAE\u5148\u62CD 4 \u5F20\u6709\u91CD\u53E0\u7684\u73AF\u5883\u7167\u3002": "Start with four overlapping views of the room.",
  "\u624B 100% \xB7 \u81C2\u957F 100%": "Hands 100% \xB7 Arms 100%",
  "\u8F7D\u5165\u4E16\u754C\u540E\uFF0C\u9009\u62E9\u5165\u53E3\u5373\u53EF\u8FDB\u5165\u3002": "Once the world loads, choose an entry point.",
  "AI \u751F\u6210\u53C2\u8003\u56FE / \u4E0A\u4F20\u56FE\u7247": "Generate reference / Upload image",
  "\u9009\u62E9\u56FE\u7247\u4E0D\u4F1A\u8986\u76D6\u5DF2\u4FDD\u5B58\u7684\u573A\u666F\u3002": "Choosing an image does not replace the saved scene.",
  "\u4F8B\u5982\uFF1A\u8BA9\u4ED6\u4EEC\u6CBF\u7740\u8FD9\u6761\u8DEF\u5F84\u79FB\u52A8": "For example: let them follow this path",
  "\u751F\u6210\u5E76\u52A0\u5165 Library": "Generate and add to library",
  "\u4E0A\u4F20 PNG / JPEG": "Upload PNG / JPEG",
  "\u544A\u8BC9\u52A9\u624B\u4F60\u60F3\u600E\u6837\u4FEE\u6539\u8FD9\u91CC\u3002": "Tell the agent what you would like to change.",
  "\u5F55\u5C4F\u6F14\u793A \xB7 \u9884\u751F\u6210\u573A\u666F": "Recording demo \xB7 Prepared scene",
  "\u771F\u5B9E\u623F\u95F4 \u2192 \u53EF\u7F16\u8F91\u767D\u6A21": "Real room \u2192 Editable blockout",
  "0 \u5F20 \xB7 \u81F3\u5C11 4 \u5F20": "0 photos \xB7 Minimum 4",
  "\u64AD\u653E / \u6682\u505C \xB7 \u7A7A\u683C": "Play / Pause \xB7 Space",
  "\u5F55\u50CF\u72B6\u6001\uFF0C\u70B9\u51FB\u505C\u6B62\u6216\u91CD\u8BD5": "Recording status; click to stop or retry",
  "\u6253\u5F00\u76F8\u673A\uFF0C\u671D\u623F\u95F4\u5185\u90E8\u770B": "Open the camera and face into the room",
  "\u6587\u5B57\u8F93\u5165 / \u5BF9\u8BDD\u8BB0\u5F55": "Text input / Conversation",
  "\u5728 Quest \u4E2D\u6253\u5F00": "Open in Quest",
  "03 / \u9009\u62E9\u8FDB\u5165\u70B9": "03 / Choose entry point",
  "\u8865\u5145\u6784\u5EFA\u8BBE\u60F3\uFF08\u53EF\u9009\uFF09": "Build notes (optional)",
  "\u8F7D\u5165 v0.1 \u5B58\u6863": "Load v0.1 archive",
  "\u6B63\u5728\u8F7D\u5165\u5DF2\u6709\u4E16\u754C\u2026": "Loading saved world\u2026",
  \u62CD\u6444\u6307\u5F15\u4E0E\u5907\u7528\u4E0A\u4F20: "Capture guide and uploads",
  "\u671D\u5411\u65CB\u8F6C 180\xB0": "Rotate 180\xB0",
  \u6309\u8F93\u5165\u5C3A\u5BF8\u8C03\u6574\u767D\u6A21: "Apply room dimensions",
  "\u5F00\u6F14 / \u4ECE\u5934\u91CD\u653E": "Play / Replay from start",
  \u4E3A\u5F53\u524D\u6F14\u5458\u6307\u5B9A\u52A8\u4F5C: "Assign motion to actor",
  \u5907\u7528\u64CD\u4F5C\u4E0E\u6309\u952E\u5E2E\u52A9: "Other actions and controller help",
  "\u5173\u95ED API \u8BBE\u7F6E": "Close API settings",
  "\u4FDD\u5B58 API \u8BBE\u7F6E": "Save API settings",
  \u53EF\u4EA4\u4E92\u7684\u4E09\u7EF4\u4E16\u754C: "Interactive 3D world",
  \u73AF\u5883\u76F8\u673A\u5B9E\u65F6\u753B\u9762: "Live environment camera",
  \u5DF2\u62CD\u6444\u7684\u623F\u95F4\u7167\u7247: "Captured room photos",
  \u91CD\u65B0\u8FDB\u884C\u7CFB\u7EDF\u626B\u63CF: "Run system scan again",
  \u91CD\u5EFA\u767D\u6A21\u4E0D\u900F\u660E\u5EA6: "Blockout opacity",
  \u8FDE\u63A5\u4F60\u7684\u521B\u4F5C\u5DE5\u5177: "Connect your tools",
  \u7528\u6237\u7684\u53C2\u8003\u56FE\u7247: "Your reference image",
  \u6821\u51C6\u4E0E\u5C3A\u5BF8\u8C03\u6574: "Calibration and dimensions",
  \u67E5\u770B\u5C0F\u4E16\u754C\u603B\u89C8: "Show world overview",
  \u5F55\u5236\u7EAF\u865A\u62DF\u753B\u9762: "Record virtual view",
  \u9009\u62E9\u4E0E\u6750\u8D28\u5DE5\u5177: "Selection and materials",
  \u6307\u5730\u9762\u653E\u7F6E\u6F14\u5458: "Point at floor to place actor",
  \u5F00\u6F14\u540E\u51E0\u79D2\u51FA\u73B0: "Appear after playback starts (s)",
  "API \u8BBE\u7F6E": "API settings",
  \u9009\u62E9\u73AF\u5883\u76F8\u673A: "Choose environment camera",
  \u81EA\u5DF1\u6307\u5B9A\u5165\u53E3: "Set an entry point",
  \u7269\u54C1\u7C7B\u522B\u56FE\u4F8B: "Object category legend",
  \u8FD4\u56DE\u7AD9\u4F4D\u7F16\u6392: "Back to layout",
  \u4FDD\u5B58\u51FA\u573A\u65F6\u95F4: "Save entry timing",
  \u79FB\u9664\u9009\u4E2D\u6F14\u5458: "Remove selected actor",
  \u4FDD\u5B58\u5F53\u524D\u573A\u666F: "Save current scene",
  "\u573A\u666F\u6570\u636E \u2197": "Scene data \u2197",
  "\u5BBD / m": "Width / m",
  "\u6DF1 / m": "Depth / m",
  "\u9AD8 / m": "Height / m",
  \u5F55\u5236\u4E0E\u5BFC\u51FA: "Recording and export",
  \u81EA\u5B9A\u4E49\u989C\u8272: "Custom color",
  "\u94F0\u94FE\uFF1A\u5DE6\u4FA7": "Hinge: Left",
  \u9009\u62E9\u76F8\u673A: "Choose camera",
  \u8FDB\u5165\u671D\u5411: "Entry orientation",
  \u573A\u666F\u9636\u6BB5: "Scene stage",
  "0 \u5DF2\u9009": "0 selected",
  \u4E09\u7EF4\u6846\u9009: "Box select",
  \u9009\u6846\u6DF1\u5EA6: "Selection depth",
  \u6F14\u5458\u7F16\u6392: "Actor layout",
  \u52A8\u4F5C\u7D20\u6750: "Motion asset",
  \u6F14\u5458\u52A8\u4F5C: "Actor motion",
  \u64A4\u9500\u4FEE\u6539: "Undo change",
  \u6062\u590D\u793A\u4F8B: "Restore example",
  \u8FDE\u63A5\u4E2D: "Connecting",
  \u6696\u9EC4\u8272: "Warm yellow",
  \u671D\u5411: "Orientation",
  \u6536\u8D77: "Close",
  \u767D\u8272: "White",
  \u84DD\u8272: "Blue",
  \u7EFF\u8272: "Green",
  \u6539\u8272: "Apply color",
  \u6784\u5EFA: "Build",
  \u603B\u89C8: "Overview",
  \u7F16\u8F91: "Edit",
  \u8BED\u97F3: "Voice",
  \u505C\u6B62: "Stop",
  \u5E94\u7528: "Apply",
  \u653E\u5F03: "Discard",
  "\u53C2\u8003\u56FE\u5DF2\u9009\u62E9\uFF1A{0}": "Reference selected: {0}",
  "\u5DF2\u9009\u62E9\uFF1A{0}": "Selected: {0}",
  "\u5DF2\u8BB0\u5F55\u504F\u597D\uFF1A{0}": "Saved preferences: {0}",
  "{0}\u534F\u8BAE": "{0} protocol",
  \u8BED\u97F3\u8BC6\u522B: "Speech recognition",
  "\u4FDD\u5B58\u5931\u8D25\uFF1A{0}": "Save failed: {0}",
  \u7F51\u7EDC\u9519\u8BEF: "Network error",
  "\u5DF2\u62CD\u6444 {0} \u5F20\u7167\u7247": "{0} photos captured",
  "\u8349\u56FE\uFF1A{0}": "Draft: {0}",
  "\u5F85\u53D1\u9001\uFF1A{0}": "Draft: {0}",
  "\u5730\u9762\u5206\u533A {0}": "Floor section {0}",
  "\u5899\u6BB5 {0}": "Wall segment {0}",
  "\u5929\u82B1\u677F\u5206\u533A {0}": "Ceiling section {0}",
  "\u5EA7\u6905 {0}": "Chair {0}",
  "\u67DC\u67B6 {0}": "Cabinet {0}",
  "\u684C\u53F0 {0}": "Table {0}",
  "\u684C\u53F0 {0} \u684C\u817F": "Table {0} legs",
  "\u7A97\u9762 {0}": "Window {0}",
  "\u95E8 {0}": "Door {0}",
  \u8D70\u5ECA\u4E0E\u5B9E\u9A8C\u5BA4: "Corridor and laboratory",
  "\u8D70\u5ECA\u4E0E\u5B9E\u9A8C\u5BA4 \xB7 \u91CD\u5EFA\u767D\u6A21": "Corridor and laboratory \xB7 Blockout",
  \u91CD\u5EFA\u767D\u6A21: "Blockout",
  "\u5BF9\u8BDD ID \u65E0\u6548": "Invalid conversation ID",
  \u53C2\u8003\u56FE\u683C\u5F0F\u65E0\u6548: "Invalid reference image format",
  \u53C2\u8003\u56FE\u7247\u4E0D\u5B58\u5728: "Reference image not found",
  \u53C2\u8003\u56FE\u7247\u8FC7\u5927: "Reference image is too large",
  "\u573A\u666F\u6B63\u5728\u4FDD\u5B58\uFF0C\u8BF7\u91CD\u8BD5": "Scene is saving. Try again shortly.",
  "\u9700\u8981 JSON \u8BF7\u6C42": "A JSON request is required",
  \u8BF7\u6C42\u8FC7\u5927: "Request is too large",
  "\u573A\u666F\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u57FA\u4E8E\u5F53\u524D\u7248\u672C\u91CD\u8BD5": "Scene changed. Retry using the current version.",
  \u9009\u62E9\u5305\u542B\u65E0\u6548\u5BF9\u8C61: "Selection contains an invalid object",
  "\u5F53\u524D\u626B\u63CF\u6CA1\u6709\u53EF\u8865\u5EFA\u7684\u5BB6\u5177\u5E73\u9762\uFF0C\u539F\u7ED3\u6784\u4FDD\u6301\u4E0D\u53D8": "No furniture planes can be added from this scan. Existing structure is unchanged.",
  \u8BF7\u5148\u7ED3\u675F\u5F53\u524D\u8BF7\u6C42\u6216\u4FDD\u5B58: "Finish the current request or save first",
  \u8BF7\u5148\u7ED3\u675F\u5F53\u524D\u6A21\u578B\u8BF7\u6C42: "Finish the current model request first",
  \u8FD9\u4E00\u5E55\u6240\u9700\u7684\u4EBA\u4F53\u6216\u52A8\u4F5C\u8D44\u4EA7\u5C1A\u672A\u8F7D\u5165: "Required body or motion assets for this act are not loaded",
  \u5148\u5B8C\u6210\u6216\u53D6\u6D88\u5F53\u524D\u6A21\u578B\u8BF7\u6C42: "Finish or cancel the current model request first",
  \u5BFC\u6F14\u5BF9\u8BDD\u65E0\u6548: "Invalid directing request",
  \u5148\u7ED3\u675F\u5F53\u524D\u6A21\u578B\u8BF7\u6C42: "Finish the current model request first",
  \u8BF7\u5148\u8F7D\u5165\u5DF2\u751F\u6210\u7684\u623F\u95F4: "Load a generated room first",
  \u6CA1\u6709\u53EF\u64A4\u9500\u7684\u4FEE\u6539: "No changes to undo",
  "Codex \u6B63\u5728\u5904\u7406\u53E6\u4E00\u4E2A\u8BF7\u6C42": "Codex is processing another request",
  \u4EFB\u52A1\u7C7B\u578B\u65E0\u6548: "Invalid task type",
  "\u8BF7\u8F93\u5165 1\u20133000 \u5B57\u7684\u521B\u4F5C\u610F\u56FE": "Enter a creative request of 1\u20133000 characters",
  \u53D8\u6362\u76EE\u6807\u65E0\u6548: "Invalid transform target",
  \u8FDB\u5165\u70B9\u65E0\u6548: "Invalid entry point",
  \u573A\u666F\u6784\u5EFA\u7C7B\u578B\u65E0\u6548: "Invalid scene construction type",
  \u8BF7\u5148\u91C7\u7528\u626B\u63CF\u53C2\u8003: "Apply the scan reference first",
  \u53C2\u8003\u7167\u7247\u683C\u5F0F\u65E0\u6548: "Invalid reference photo format",
  \u8BF7\u5148\u91C7\u7528\u626B\u63CF\u7ED3\u6784: "Apply the scan structure first",
  "\u6CA1\u6709\u5DF2\u4FDD\u5B58\u7684\u626B\u63CF\uFF1B\u8BF7\u8FDB\u5165 Quest \u6C89\u6D78\u5E76\u5141\u8BB8\u7A7A\u95F4\u6570\u636E\u8BBF\u95EE": "No saved scan. Enter Quest immersive mode and allow spatial data access.",
  \u751F\u6210\u7ED3\u679C\u5C1A\u4E0D\u53EF\u5E94\u7528: "Generated result is not ready to apply",
  "\u8FD9\u7EC4\u6F14\u793A\u4F7F\u7528 {0} \u4F4D\u6F14\u5458\uFF0C\u8BF7\u5148\u79FB\u9664\u591A\u4F59\u6F14\u5458\uFF1B\u5DF2\u6709\u573A\u666F\u4E0D\u4F1A\u81EA\u52A8\u5220\u4EBA": "This demo uses {0} actors. Remove extra actors first; existing actors are not deleted automatically.",
  \u6F14\u5458\u52A8\u4F5C\u7EC4\u7F16\u53F7\u65E0\u6548\u6216\u91CD\u590D: "Invalid or duplicate actor motion slot",
  \u6F14\u5458\u6807\u8BC6\u65E0\u6548: "Invalid actor identifier",
  "\u6F14\u5458\u4F4D\u7F6E/\u671D\u5411\u65E0\u6548": "Invalid actor position or orientation",
  \u6F14\u5458\u51FA\u573A\u8BBE\u7F6E\u65E0\u6548: "Invalid actor entry settings",
  \u6F14\u5458\u52A8\u4F5C\u6807\u8BC6\u65E0\u6548: "Invalid actor motion identifier",
  \u6F14\u5458\u52A8\u4F5C\u7EC4\u7F16\u53F7\u65E0\u6548: "Invalid actor motion slot",
  \u6F14\u5458\u52A8\u4F5C\u8854\u63A5\u4F4D\u79FB\u65E0\u6548: "Invalid motion transition offset",
  "\u5F53\u524D\u6700\u591A\u5B89\u6392 {0} \u4F4D\u6F14\u5458": "A maximum of {0} actors is supported",
  "\u6F14\u5458 ID \u91CD\u590D": "Duplicate actor ID",
  \u6F14\u5458\u52A8\u4F5C\u7EC4\u7F16\u53F7\u91CD\u590D: "Duplicate actor motion slot",
  "\u8FD9\u7EC4\u6F14\u793A\u6700\u591A\u653E\u7F6E {0} \u4F4D\u6F14\u5458": "This demo supports up to {0} actors",
  \u52A8\u4F5C\u8D44\u4EA7\u672A\u5C31\u7EEA: "Motion assets are not ready",
  "\u6F14\u5458 ID \u5DF2\u5B58\u5728": "Actor ID already exists",
  \u6F14\u5458\u4FEE\u6539\u5B57\u6BB5\u65E0\u6548: "Invalid actor edit field",
  \u6F14\u5458\u64CD\u4F5C\u65E0\u6548: "Invalid actor action",
  \u884C\u4E3A\u573A\u666F\u683C\u5F0F\u65E0\u6548: "Invalid behavior scene format",
  \u95E8\u6293\u63E1\u914D\u7F6E\u65E0\u6548: "Invalid door grip configuration",
  \u95E8\u4E0E\u8DEF\u5F84\u7ED1\u5B9A\u65E0\u6548: "Invalid door and path binding",
  "\u5148\u51C6\u5907\u8DEF\u5F84\u4E0E\u95E8\u4EA4\u4E92\uFF0C\u518D\u7ED1\u5B9A\u5F00\u95E8\u89E6\u53D1": "Prepare the path and door interaction before binding the trigger",
  \u884C\u4E3A\u64CD\u4F5C\u65E0\u6548: "Invalid behavior action",
  \u91C7\u96C6\u8303\u56F4\u914D\u7F6E\u65E0\u6548: "Invalid capture bounds",
  \u5C01\u95ED\u91C7\u96C6\u8303\u56F4\u9700\u8981\u5730\u9762\u4E0E\u5929\u82B1\u677F: "Enclosed capture bounds require a floor and ceiling",
  \u5C01\u95ED\u5899\u9AD8\u5EA6\u65E0\u6548: "Invalid enclosure wall height",
  \u8BF7\u6307\u5411\u6709\u6548\u5730\u9762: "Point at a valid floor",
  "\u843D\u70B9\u79BB\u4F60\u592A\u8FD1\uFF0C\u8BF7\u6307\u5411\u524D\u65B9\u5730\u9762": "That point is too close. Aim at the floor ahead of you.",
  "\u6B63\u5728\u8FDB\u5165\uFF0C\u8BF7\u7A0D\u5019": "Entering. Please wait.",
  \u8BF7\u5148\u9009\u62E9\u4E00\u5F20\u56FE\u7247: "Select an image first",
  "\u6F14\u793A\u4E16\u754C\u5C1A\u672A\u8F7D\u5165\uFF0C\u8BF7\u68C0\u67E5\u672C\u673A\u8FDE\u63A5": "Demo world is not loaded. Check the local connection.",
  "\u5F53\u524D\u4E16\u754C\u6CA1\u6709\u5B89\u5168\u5165\u53E3\uFF0C\u8BF7\u5148\u5728\u5E38\u89C4\u6A21\u5F0F\u8C03\u6574\u573A\u666F": "No clear entry point. Adjust the scene in regular mode first.",
  \u5BF9\u8BDD\u6A21\u578B\u8FD4\u56DE\u683C\u5F0F\u65E0\u6548: "Invalid conversation model response format",
  \u7F3A\u5C11\u6784\u9020\u6307\u4EE4: "Construction instructions are missing",
  \u5F00\u95E8\u6F14\u51FA\u914D\u7F6E\u65E0\u6548: "Invalid door performance configuration",
  \u5F00\u95E8\u6F14\u51FA\u5F15\u7528\u4E86\u65E0\u6548\u6F14\u5458: "Door performance references an invalid actor",
  \u8BF7\u5148\u9009\u4E2D\u8981\u89E6\u53D1\u6F14\u51FA\u7684\u767D\u6A21\u95E8: "Select the blockout door that should trigger the performance",
  \u7F16\u961F\u951A\u70B9\u6216\u671D\u5411\u65E0\u6548: "Invalid group anchor or orientation",
  "\u6F14\u5458 {0} \u7684\u521D\u59CB\u7AD9\u4F4D\u78B0\u5230\u7269\u5757\u6216\u4E0D\u5728\u5730\u9762\u4E0A\uFF0C\u8BF7\u8C03\u6574\u7F16\u961F\u951A\u70B9": "Actor {0} intersects an object or is off the floor. Adjust the group anchor.",
  "\u7F16\u961F\u6F14\u5458 ID \u5DF2\u5B58\u5728": "Group actor ID already exists",
  \u5F00\u95E8\u6F14\u51FA\u64CD\u4F5C\u65E0\u6548: "Invalid door performance action",
  \u8BF7\u9009\u62E9\u6F14\u5458\u7EC4: "Select a group of actors",
  \u8BF7\u5148\u4E3A\u6240\u9009\u6F14\u5458\u51C6\u5907\u52A8\u4F5C: "Prepare motions for the selected actors first",
  \u8DEF\u7EBF\u70B9\u65E0\u6548: "Invalid path point",
  \u8DEF\u7EBF\u5FC5\u987B\u4F4D\u4E8E\u540C\u4E00\u5C42\u6709\u6548\u5730\u9762: "The path must stay on valid floor at one level",
  "\u8BF7\u7ED8\u5236 0.15\u201330 \u7C73\u7684\u8FDE\u7EED\u8DEF\u7EBF": "Draw a continuous path between 0.15 and 30 meters",
  "\u8DEF\u7EBF\u8D77\u70B9\u79BB\u7F16\u961F\u592A\u8FDC\uFF0C\u8BF7\u4ECE\u6F14\u5458\u9644\u8FD1\u5F00\u59CB\u7ED8\u5236": "Path starts too far from the group. Start drawing near the actors.",
  \u7F16\u961F\u8DEF\u5F84\u914D\u7F6E\u65E0\u6548: "Invalid group path configuration",
  \u8DEF\u5F84\u5F15\u7528\u7684\u6F14\u5458\u65E0\u6548: "Path references an invalid actor",
  \u8DEF\u5F84\u521D\u59CB\u7AD9\u4F4D\u65E0\u6548: "Invalid initial path position",
  \u624B\u90E8\u91C7\u6837\u65E0\u6548: "Invalid hand sample",
  \u624B\u90E8\u59FF\u6001\u65E0\u6548: "Invalid hand pose",
  \u624B\u6A21\u578B\u7248\u672C\u65E0\u6548: "Invalid hand model version",
  \u624B\u6A21\u578B\u914D\u8272\u65E0\u6548: "Invalid hand model colors",
  \u624B\u6A21\u578B\u914D\u7F6E\u65E0\u6548: "Invalid hand model configuration",
  \u624B\u81C2\u6A21\u578B\u914D\u7F6E\u65E0\u6548: "Invalid arm model configuration",
  \u7F3A\u5C11\u624B\u81C2\u6A21\u578B\u914D\u7F6E: "Arm model configuration is missing",
  \u624B\u81C2\u91C7\u6837\u65E0\u6548: "Invalid arm sample",
  \u624B\u81C2\u5173\u8282\u65E0\u6548: "Invalid arm joint",
  \u5931\u6548\u624B\u81C2\u5FC5\u987B\u9690\u85CF: "Untracked arms must be hidden",
  \u624B\u81C2\u8FFD\u8E2A\u65E0\u6548: "Invalid arm tracking",
  \u624B\u8155\u4E0E\u624B\u90E8\u59FF\u6001\u4E0D\u4E00\u81F4: "Wrist and hand poses do not match",
  \u624B\u81C2\u957F\u5EA6\u65E0\u6548: "Invalid arm length",
  "\u624B\u90E8\u5927\u5C0F\u5E94\u5728 70%\u2013130%": "Hand size must be between 70% and 130%",
  "\u624B\u81C2\u957F\u5EA6\u5E94\u5728 80%\u2013120%": "Arm length must be between 80% and 120%",
  "\u63E1\u59FF\u503E\u89D2\u5E94\u5728 0\u201390\xB0": "Grip tilt must be between 0\xB0 and 90\xB0",
  \u8EAB\u4F53\u663E\u793A\u500D\u7387\u65E0\u6548: "Invalid body display scale",
  \u7F3A\u5C11\u623F\u95F4\u5C3A\u5BF8: "Room dimensions are missing",
  "\u623F\u95F4\u957F\u5BBD\u987B\u4E3A 1\u201340 \u7C73": "Room width and depth must be between 1 and 40 meters",
  "\u623F\u95F4\u9AD8\u5EA6\u987B\u4E3A 1.8\u20138 \u7C73": "Room height must be between 1.8 and 8 meters",
  \u623F\u95F4\u5C3A\u5BF8\u6765\u6E90\u65E0\u6548: "Invalid room dimension source",
  \u89D2\u70B9\u5750\u6807\u65E0\u6548: "Invalid corner coordinates",
  \u4E09\u4E2A\u89D2\u70B9\u5E94\u5728\u540C\u4E00\u5730\u9762: "All three corners must be on the same floor",
  "A \u4E0E B \u592A\u8FD1\uFF0C\u8BF7\u9009\u62E9\u540C\u4E00\u9762\u5899\u7684\u4E24\u4E2A\u5730\u9762\u5899\u89D2": "A and B are too close. Select two floor corners on the same wall.",
  "C \u5E94\u662F\u6CBF B \u76F8\u90BB\u5899\u9762\u5230\u8FBE\u7684\u4E0B\u4E00\u4E2A\u5899\u89D2": "C should be the next corner along the wall adjacent to B",
  "\u8BF7\u4ECE\u623F\u95F4\u5185\u90E8\u7784\u51C6 A\u2013B \u5899\u9762\u4E0E\u5929\u82B1\u677F\u7684\u4EA4\u754C": "From inside the room, aim at the ceiling edge above wall A\u2013B",
  "\u6CA1\u6709\u6307\u5411 A\u2013B \u90A3\u9762\u5899": "Aim at wall A\u2013B",
  "\u8BF7\u7784\u51C6 A \u548C B \u4E4B\u95F4\u90A3\u9762\u5899\u7684\u4E0A\u8FB9\u7F18": "Aim at the upper edge of the wall between A and B",
  "\u6D4B\u5F97\u9AD8\u5EA6\u4E0D\u5408\u7406\uFF0C\u8BF7\u7784\u51C6\u5929\u82B1\u677F\u4E0E\u5899\u7684\u4EA4\u754C": "Measured height is outside the valid range. Aim at the wall\u2013ceiling edge.",
  \u626B\u63CF\u5BB6\u5177\u4F4D\u7F6E\u6570\u636E\u65E0\u6548: "Invalid scanned furniture position",
  \u7167\u7247\u53C2\u8003\u6807\u6CE8\u683C\u5F0F\u65E0\u6548: "Invalid photo reference annotations",
  \u7167\u7247\u53C2\u8003\u5305\u542B\u65E0\u6548\u6216\u91CD\u590D\u7684\u626B\u63CF\u6807\u6CE8: "Photo reference contains invalid or duplicate scan annotations",
  "\u626B\u63CF\u5BB6\u5177 ID \u51B2\u7A81\uFF0C\u8BF7\u4FDD\u7559\u539F\u5BF9\u8C61\u540E\u91CD\u65B0\u9009\u62E9": "Scanned furniture ID conflicts with an existing object. Keep it and select again.",
  \u626B\u63CF\u5BB6\u5177\u9AD8\u5EA6\u65E0\u6548: "Invalid scanned furniture height",
  "\u8BE5\u533A\u57DF\u5305\u542B\u660E\u663E\u659C\u5899\uFF0C\u5F53\u524D\u8F6E\u5ED3\u6574\u7406\u9700\u4EBA\u5DE5\u68C0\u67E5\uFF1B\u539F\u573A\u666F\u5DF2\u4FDD\u7559": "This area has a slanted wall and needs manual review. The existing scene is preserved.",
  "\u626B\u63CF\u5899\u7AEF\u70B9\u8FC7\u8FD1\uFF0C\u65E0\u6CD5\u7A33\u5B9A\u8FDE\u63A5\u8F6E\u5ED3": "Scanned wall endpoints are too close to connect reliably",
  "\u626B\u63CF\u5899\u7EBF\u672A\u95ED\u5408\uFF0C\u65E0\u6CD5\u53EF\u9760\u6574\u7406\u623F\u95F4\u8F6E\u5ED3\uFF1B\u8BF7\u68C0\u67E5\u626B\u63CF\u7F3A\u53E3": "Scanned walls do not form a closed outline. Check for gaps in the scan.",
  \u626B\u63CF\u8F6E\u5ED3\u8FDE\u63A5\u5F02\u5E38: "Invalid scan outline connection",
  "\u540C\u4E00\u533A\u57DF\u5B58\u5728\u591A\u4E2A\u4E0D\u76F8\u8FDE\u8F6E\u5ED3\uFF0C\u9700\u91CD\u65B0\u786E\u8BA4\u626B\u63CF": "This area contains separate outlines. Check the scan again.",
  \u626B\u63CF\u5750\u6807\u53D8\u6362\u65E0\u6548: "Invalid scan coordinate transform",
  \u626B\u63CF\u7F3A\u5C11\u5730\u9762\u6216\u5929\u82B1\u677F: "Scan is missing a floor or ceiling",
  "\u5899\u9762\u65E0\u6CD5\u5BF9\u5E94\u5230\u626B\u63CF\u697C\u9762\uFF0C\u8BF7\u5148\u6838\u5BF9\u626B\u63CF": "A wall cannot be matched to the scanned floor. Check the scan.",
  "\u9700\u8981 3\u2013500 \u4E2A\u626B\u63CF\u5E73\u9762": "Between 3 and 500 scanned planes are required",
  \u626B\u63CF\u5E73\u9762\u6570\u636E\u65E0\u6548: "Invalid scanned plane data",
  \u626B\u63CF\u5E73\u9762\u7F3A\u5C11\u89D2\u70B9: "Scanned plane corners are missing",
  "\u626B\u63CF\u9700\u8981\u53EF\u7528\u7684\u5730\u9762\u548C\u5929\u82B1\u677F\uFF1B\u8BF7\u5148\u5B8C\u6210 Quest \u623F\u95F4\u626B\u63CF": "A usable floor and ceiling are required. Complete the Quest room scan first.",
  "\u626B\u63CF\u6CA1\u6709\u8FD4\u56DE\u5899\u9762\uFF1B\u4E0D\u80FD\u4EC5\u51ED\u5730\u9762\u5305\u7EDC\u786E\u5B9A\u8D70\u5ECA\u6784\u9020": "Scan returned no walls. A floor outline alone cannot define the corridor.",
  \u65E0\u6548\u7684\u5BF9\u8C61: "Invalid object",
  "\u5BF9\u8C61 ID \u65E0\u6548": "Invalid object ID",
  \u5BF9\u8C61\u540D\u79F0\u65E0\u6548: "Invalid object name",
  \u5206\u7EC4\u65E0\u6548: "Invalid group",
  \u7269\u54C1\u7C7B\u522B\u65E0\u6548: "Invalid object category",
  \u7F16\u8F91\u5C5E\u6027\u65E0\u6548: "Invalid editing property",
  \u573A\u666F\u90E8\u4EF6\u7C7B\u578B\u65E0\u6548: "Invalid scene part type",
  "\u5BB6\u5177\u5B9E\u4F53 ID \u65E0\u6548": "Invalid furniture entity ID",
  \u4E0D\u652F\u6301\u8FD9\u79CD\u51E0\u4F55\u4F53: "Unsupported geometry type",
  \u989C\u8272\u5FC5\u987B\u4E3A\u516D\u4F4D\u5341\u516D\u8FDB\u5236: "Color must be a six-digit hexadecimal value",
  "{0} \u65E0\u6548": "Invalid {0}",
  \u5BF9\u8C61\u8D85\u51FA\u539F\u578B\u573A\u666F\u8FB9\u754C: "Object is outside the prototype scene bounds",
  \u5BF9\u8C61\u5C3A\u5BF8\u8D85\u51FA\u8303\u56F4: "Object dimensions are outside the supported range",
  \u65CB\u8F6C\u89D2\u5EA6\u65E0\u6548: "Invalid rotation angle",
  \u6750\u8D28\u53C2\u6570\u65E0\u6548: "Invalid material parameters",
  \u573A\u666F\u4FE1\u606F\u65E0\u6548: "Invalid scene information",
  "\u573A\u666F\u9700\u8981 1\u2013180 \u4E2A\u5BF9\u8C61": "Scene must contain between 1 and 180 objects",
  \u6F14\u5458\u98CE\u683C\u65E0\u6548: "Invalid actor style",
  "\u5BF9\u8C61 ID \u91CD\u590D": "Duplicate object ID",
  "\u6F14\u5458\u4E0E\u5BF9\u8C61 ID \u51B2\u7A81": "Actor ID conflicts with an object ID",
  \u4FEE\u6539\u683C\u5F0F\u65E0\u6548: "Invalid change format",
  \u6CA1\u6709\u53EF\u5E94\u7528\u7684\u4FEE\u6539: "No changes to apply",
  \u4FEE\u6539\u5305\u542B\u672A\u9009\u4E2D\u7684\u5BF9\u8C61: "Changes include an unselected object",
  \u540C\u4E00\u5BF9\u8C61\u88AB\u91CD\u590D\u4FEE\u6539: "The same object was edited more than once",
  \u9009\u6846\u6DF1\u5EA6\u65E0\u6548: "Invalid selection depth",
  \u5F55\u50CF\u65F6\u95F4\u7EBF\u7247\u6BB5\u8FC7\u5927: "Recording timeline segment is too large",
  "\u5F55\u50CF\u7247\u6BB5\u8FC7\u5927\uFF0C\u5DF2\u505C\u6B62\u7EE7\u7EED\u5F55\u5236": "Recording segment is too large. Recording has stopped.",
  "\u7AD9\u4F4D\u4E0D\u5728\u6709\u6548\u5730\u9762\u4E0A\u6216\u78B0\u5230\u7269\u5757\uFF0C\u8BF7\u6362\u4E00\u4E2A\u843D\u70B9": "That point is off the floor or intersects an object. Choose another point.",
  "\u7B2C\u4E00\u4F4D\u6F14\u5458\u5DF2\u7ECF\u5B58\u5728\uFF1B\u8BF4\u201CI need more\u201D\u8865\u9F50\u7F16\u961F": "The first actor already exists. Say \u201CI need more\u201D to complete the group.",
  "\u8BF7\u5148\u8BF4\u201CPut an avatar here\u201D\u653E\u7F6E\u7B2C\u4E00\u4F4D\u6F14\u5458": "Say \u201CPut an avatar here\u201D to place the first actor",
  "\u7B2C\u4E00\u4F4D\u6F14\u5458\u5DF2\u88AB\u5220\u9664\uFF0C\u8BF7\u5148\u6062\u590D\u7AD9\u4F4D\u6216\u91CD\u65B0\u653E\u7F6E": "The first actor was removed. Restore the layout or place another actor.",
  \u4EBA\u4F53\u8D44\u4EA7\u5C1A\u672A\u8F7D\u5165: "Body assets are not loaded",
  "\u6F14\u5458 ID \u4E0E\u573A\u666F\u7269\u5757\u51B2\u7A81": "Actor ID conflicts with a scene object",
  \u8BF7\u5148\u9009\u62E9\u6709\u6548\u7684\u4EBA\u7269\u6216\u7269\u54C1: "Select a valid actor or object first",
  "\u8BE5\u626B\u63CF\u53C2\u8003\u7ED3\u6784\u5DF2\u9501\u5B9A\uFF1B\u8BF7\u5148\u57FA\u4E8E\u626B\u63CF\u6784\u5EFA\u53EF\u7F16\u8F91\u573A\u666F": "Scan reference is locked. Build an editable scene from the scan first.",
  \u53D8\u6362\u53C2\u6570\u65E0\u6548: "Invalid transform parameters",
  "\u7A7A\u95F4\u4E0A\u4E0B\u6587\u65E0\u6548\uFF0C\u8BF7\u91CD\u65B0\u6307\u5411\u76EE\u6807": "Spatial context is invalid. Point at the target again.",
  \u7528\u6237\u671D\u5411\u65E0\u6548: "Invalid viewer orientation",
  \u52A9\u624B\u7684\u53D8\u6362\u6307\u4EE4\u65E0\u6548: "Invalid transform instruction from the agent",
  "\u591A\u4E2A\u5BF9\u8C61\u7684\u81EA\u8EAB\u671D\u5411\u4E0D\u540C\uFF0C\u8BF7\u8BF4\u660E\u76F8\u5BF9\u4F60\u8FD8\u662F\u623F\u95F4\u79FB\u52A8": "Selected objects face different directions. Specify movement relative to you or the room.",
  "\u8BF7\u5148\u6307\u5411\u843D\u70B9\uFF0C\u6216\u660E\u786E\u8981\u9762\u5411\u54EA\u4E2A\u5BF9\u8C61": "Point at a destination or specify an object to face",
  "\u8BF7\u9010\u4E2A\u9009\u62E9\u6F14\u5458\u8BBE\u7F6E\u671D\u5411\uFF1B\u591A\u9009\u53EF\u4F7F\u7528\u201C\u5411\u5DE6\u8F6C 30 \u5EA6\u201D\u6574\u4F53\u65CB\u8F6C": "Set actors' facing direction individually, or rotate the selected group together",
  "\u671D\u5411\u76EE\u6807\u592A\u8FD1\uFF0C\u8BF7\u91CD\u65B0\u6307\u5B9A": "Facing target is too close. Choose another target.",
  "\u78C1\u76D8\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u62CD\u6444\u7D20\u6750\u672A\u4FDD\u5B58": "Not enough disk space. Capture media was not saved.",
  "\u7D20\u6750 ID \u65E0\u6548": "Invalid media ID",
  \u81F3\u5C11\u9700\u8981\u56DB\u5F20\u4E0D\u540C\u7684\u7167\u7247: "At least four different photos are required",
  \u7167\u7247\u5F15\u7528\u65E0\u6548: "Invalid photo reference",
  "API \u5730\u5740\u9700\u4E3A HTTPS\uFF1B\u672C\u673A localhost \u53EF\u4F7F\u7528 HTTP": "API URLs must use HTTPS; localhost may use HTTP",
  "\u672A\u77E5 API \u8BBE\u7F6E": "Unknown API setting",
  "API \u8BBE\u7F6E\u683C\u5F0F\u65E0\u6548": "Invalid API settings format",
  \u6B64\u529F\u80FD\u4E0D\u652F\u6301\u6240\u9009\u534F\u8BAE: "Selected protocol is not supported for this feature",
  \u5BC6\u94A5\u683C\u5F0F\u65E0\u6548: "Invalid API key format",
  "\u672C\u5730 API \u914D\u7F6E\u635F\u574F\uFF0C\u8BF7\u68C0\u67E5 data/providers.json": "Local API configuration is damaged. Check data/providers.json.",
  \u914D\u7F6E\u6B63\u5728\u4FDD\u5B58: "Configuration is saving",
  "{0} \u8BF7\u6C42\u5931\u8D25\uFF08HTTP {1}\uFF09\u3002\u8BF7\u68C0\u67E5\u5BC6\u94A5\u3001\u6A21\u578B\u3001\u989D\u5EA6\u4E0E\u5730\u5740\u3002": "{0} request failed (HTTP {1}). Check the key, model, quota, and URL.",
  \u8BF7\u53EA\u63D0\u4F9B\u4E00\u7EC4\u53C2\u8003\u56FE\u7247: "Provide one set of reference images",
  \u53C2\u8003\u56FE\u7247\u6570\u91CF\u65E0\u6548: "Invalid reference image count",
  \u65E0\u6548\u53C2\u8003\u56FE: "Invalid reference image",
  "Codex \u8BF7\u6C42\u8D85\u8FC7 5 \u5206\u949F": "Codex request exceeded five minutes",
  "Codex \u672A\u5B8C\u6210\uFF08{0}\uFF09\u3002\u8BF7\u68C0\u67E5\u672C\u673A\u767B\u5F55\u4E0E\u6A21\u578B\u53EF\u7528\u6027\u3002": "Codex did not complete ({0}). Check local sign-in and model availability.",
  "\u8BF7\u5148\u8BBE\u7F6E\u8BE5\u529F\u80FD\u7684 API \u5730\u5740\u3001\u6A21\u578B\u548C\u5BC6\u94A5": "Configure this feature's API URL, model, and key first",
  "\u6A21\u578B\u672A\u8FD4\u56DE JSON \u6587\u672C\uFF1B\u8BE5\u7AEF\u70B9\u987B\u652F\u6301 Chat Completions \u4E0E JSON Schema": "Model returned no JSON text. The endpoint must support Chat Completions and JSON Schema.",
  \u5F55\u97F3\u683C\u5F0F\u65E0\u6548: "Invalid audio recording format",
  \u5F55\u97F3\u592A\u77ED\u6216\u8FC7\u5927: "Audio recording is too short or too large",
  "\u6CA1\u6709\u8BC6\u522B\u5230\u8BED\u97F3\uFF0C\u8BF7\u91CD\u8BD5": "No speech recognized. Try again.",
  \u6717\u8BFB\u6587\u672C\u8FC7\u957F: "Spoken reply text is too long",
  "\u8BF7\u5148\u914D\u7F6E\u56FE\u7247\u751F\u6210 API\u3001\u6A21\u578B\u548C\u5BC6\u94A5": "Configure the image API, model, and key first",
  "\u56FE\u7247\u7AEF\u70B9\u987B\u8FD4\u56DE data[0].b64_json\uFF08PNG/JPEG\uFF09\uFF1BURL-only \u8F93\u51FA\u6682\u4E0D\u652F\u6301": "Image endpoint must return data[0].b64_json (PNG/JPEG). URL-only output is not supported.",
  "\u56FE\u7247 API \u6CA1\u6709\u8FD4\u56DE\u6709\u6548 PNG/JPEG": "Image API returned no valid PNG/JPEG",
  "\u53EA\u63A5\u53D7 WebM \u6216 MP4 \u89C6\u9891": "Only WebM and MP4 videos are accepted",
  \u89C6\u9891\u53C2\u6570\u65E0\u6548: "Invalid video parameters",
  "\u89C6\u9891\u8D85\u8FC7 96 MB": "Video exceeds 96 MB",
  \u89C6\u9891\u6587\u4EF6\u683C\u5F0F\u65E0\u6548: "Invalid video file format",
  "\u89C6\u9891\u6574\u7406\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u4FDD\u5B58": "Video processing failed. Retry saving.",
  \u89C6\u9891\u4E0D\u5B58\u5728: "Video not found",
  "\u5F55\u5236 ID \u65E0\u6548": "Invalid recording ID",
  \u5F55\u5236\u65F6\u95F4\u6570\u636E\u65E0\u6548: "Invalid recording timing data",
  \u7F3A\u5C11\u624B\u6A21\u578B\u914D\u7F6E: "Hand model configuration is missing",
  \u4E8B\u4EF6\u65F6\u95F4\u65E0\u6548: "Invalid event time",
  \u573A\u666F\u53D8\u6362\u91C7\u6837\u65E0\u6548: "Invalid scene transform sample",
  \u76F8\u673A\u91C7\u6837\u65E0\u6548: "Invalid camera sample",
  \u7269\u54C1\u53D8\u6362\u91C7\u6837\u65E0\u6548: "Invalid object transform sample",
  \u624B\u90E8\u91C7\u6837\u65F6\u95F4\u5012\u9000: "Hand sample timestamps are out of order",
  \u6F14\u5458\u91C7\u6837\u65E0\u6548: "Invalid actor sample",
  "\u627E\u4E0D\u5230\u5F53\u524D\u573A\u666F\u5BF9\u5E94\u7684\u539F\u59CB\u626B\u63CF\uFF0C\u8BF7\u5148\u9884\u89C8\u5E76\u91C7\u7528\u626B\u63CF\u7ED3\u6784": "Original scan for this scene was not found. Preview and apply the scan structure first.",
  "\u8BF7\u5148\u91C7\u7528\u626B\u63CF\u7ED3\u6784\uFF0C\u518D\u57FA\u4E8E\u626B\u63CF\u8865\u5EFA": "Apply the scan structure before adding scanned objects",
  "\u627E\u4E0D\u5230\u4E0E\u5F53\u524D\u7ED3\u6784\u4E00\u81F4\u7684\u539F\u59CB\u626B\u63CF\uFF0C\u5DF2\u4FDD\u7559\u5F53\u524D\u573A\u666F\uFF1B\u8BF7\u5148\u91CD\u65B0\u9884\u89C8\u626B\u63CF\u7ED3\u6784": "Matching original scan was not found. Current scene is preserved. Preview the scan structure again.",
  \u5F53\u524D\u573A\u666F\u6587\u4EF6\u914D\u7F6E\u65E0\u6548: "Invalid current scene file configuration",
  \u5206\u5E55\u573A\u666F\u6570\u636E\u65E0\u6548: "Invalid act scene data",
  \u5206\u5E55\u5B58\u6863\u6821\u9A8C\u5931\u8D25: "Act archive integrity check failed",
  \u5F55\u50CF\u5206\u5757\u65E0\u6548: "Invalid recording chunk",
  \u5F55\u50CF\u5206\u5757\u5934\u65E0\u6548: "Invalid recording chunk header",
  \u5F55\u50CF\u5206\u5757\u65F6\u95F4\u65E0\u6548: "Invalid recording chunk time",
  "Take ID \u65E0\u6548": "Invalid take ID",
  "Take \u914D\u7F6E\u65E0\u6548": "Invalid take configuration",
  "Take \u521D\u59CB\u573A\u666F\u8FC7\u5927": "Initial take scene is too large",
  "Take ID \u5DF2\u5BF9\u5E94\u5176\u4ED6\u5185\u5BB9": "Take ID is already associated with different content",
  "\u78C1\u76D8\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u5F00\u59CB\u65B0\u7684\u4E09\u5206\u949F\u5F55\u50CF": "Not enough disk space to start a three-minute recording",
  \u5206\u5757\u5E8F\u53F7\u65E0\u6548: "Invalid chunk sequence number",
  \u5F55\u50CF\u5206\u5757\u8FC7\u5927: "Recording chunk is too large",
  \u76F8\u540C\u5206\u5757\u5E8F\u53F7\u5185\u5BB9\u51B2\u7A81: "Conflicting content for the same chunk number",
  "\u5206\u5757\u5E8F\u5217\u4E0D\u8FDE\u7EED\u6216 Take \u5DF2\u7ED3\u675F": "Chunk sequence is incomplete or the take has ended",
  \u5206\u5757\u65F6\u95F4\u5012\u9000: "Chunk timestamps are out of order",
  \u5F55\u50CF\u8D85\u8FC7\u4E09\u5206\u949F\u5BB9\u91CF\u9650\u5236: "Recording exceeds the three-minute capacity limit",
  "Take \u5DF2\u4F7F\u7528\u5176\u4ED6\u7ED3\u675F\u53C2\u6570\u4FDD\u5B58": "Take was already saved with different final parameters",
  "Take \u7ED3\u675F\u53C2\u6570\u6216\u5206\u5757\u5E8F\u5217\u65E0\u6548": "Invalid take final parameters or chunk sequence",
  \u5F55\u50CF\u5206\u5757\u6821\u9A8C\u5931\u8D25: "Recording chunk integrity check failed",
  \u5F55\u50CF\u5E27\u6570\u4E0E\u65F6\u95F4\u7EBF\u4E0D\u4E00\u81F4: "Recording frame count does not match the timeline",
  \u89C6\u9891\u65F6\u957F\u6216\u5C3A\u5BF8\u4E0E\u5F55\u5236\u6570\u636E\u4E0D\u4E00\u81F4: "Video duration or dimensions do not match the recording data",
  \u63CF\u8FF0\u57FA\u7840\u52A8\u4F5C: "Describe a basic motion",
  \u63CF\u8FF0\u4FEE\u6539\u9700\u6C42: "Describe an edit",
  \u8BF4\u51FA\u521B\u4F5C\u9700\u6C42: "Describe your idea",
  "\u5DF2\u9009 {0} \u4E2A\u5BF9\u8C61": "{0} objects selected",
  \u5F53\u524D\u573A\u666F: "Current scene",
  "X \u8BED\u97F3 \xB7 Y \u83DC\u5355 \xB7 A \u786E\u8BA4 \xB7 B \u53D6\u6D88": "X Voice \xB7 Y Menu \xB7 A Confirm \xB7 B Cancel",
  "\u6838\u5BF9\u8BED\u97F3 \xB7 \u5C1A\u672A\u53D1\u9001": "Review speech \xB7 Not sent",
  "\u786E\u8BA4\u53D1\u9001 \xB7 A": "Send \xB7 A",
  "\u91CD\u65B0\u8BF4\u8BDD \xB7 X": "Speak again \xB7 X",
  "\u53D6\u6D88\u8FD9\u53E5\u8BDD \xB7 B": "Cancel speech \xB7 B",
  "\u53F3\u6447\u6746\u7FFB\u9875 \xB7 A \u53D1\u9001 \xB7 X \u91CD\u8BF4 \xB7 B \u53D6\u6D88": "Right stick: pages \xB7 A Send \xB7 X Retry \xB7 B Cancel",
  \u6B63\u5728\u542C: "Listening",
  \u8BED\u97F3\u5904\u7406\u4E2D: "Processing speech",
  \u7ED3\u675F\u5F55\u97F3: "Stop listening",
  "\u677E\u5F00 X \u540E\u6838\u5BF9\u6587\u5B57 \xB7 B \u53D6\u6D88": "Release X to review \xB7 B Cancel",
  \u6B63\u5728\u4FDD\u5B58\u6A21\u5F0F\u6216\u4FEE\u6539: "Saving changes",
  "\u8BF7\u7A0D\u5019\u2026": "Please wait\u2026",
  \u53D6\u6D88\u8BF7\u6C42: "Cancel request",
  "B \u53D6\u6D88": "B Cancel",
  \u9009\u62E9\u521B\u5EFA\u843D\u70B9: "Choose a placement point",
  "\u53D6\u6D88\u653E\u7F6E \xB7 B": "Cancel placement \xB7 B",
  "\u5706\u5708\u4E3A\u843D\u70B9 \xB7 A \u521B\u5EFA \xB7 B \u53D6\u6D88": "Place at the ring \xB7 A Create \xB7 B Cancel",
  "\u53F3\u624B\u6307\u5411\u53EF\u89C1\u5730\u9762\uFF0C\u518D\u6309 A \u521B\u5EFA": "Point at visible ground \xB7 A Create",
  \u7F16\u8F91\u66F2\u7EBF: "Edit curve",
  \u4FEE\u6539\u9884\u89C8: "Preview changes",
  "\u4FDD\u5B58 \xB7 A": "Save \xB7 A",
  "\u8FD8\u539F \xB7 B": "Revert \xB7 B",
  "\u5DE6\u6447\u6746\u79FB\u52A8 \xB7 \u53F3\u6447\u6746\u65CB\u8F6C \xB7 \u53F3\u63E1\u628A\u62FF\u53D6": "Left stick: move \xB7 Left grip + stick: height \xB7 Right stick: rotate \xB7 Right grip: grab",
  "\u53F3\u63E1\u628A\u62C9\u626F\u63A7\u5236\u70B9 \xB7 \u677E\u624B\u540E A \u4FDD\u5B58": "Right grip: pull control points \xB7 Release, then A Save",
  "A \u4FDD\u5B58 \xB7 B \u653E\u5F03": "A Save \xB7 B Discard",
  \u5F55\u5236: "Recording",
  \u505C\u6B62\u5E76\u4FDD\u5B58: "Stop and save",
  \u5F00\u59CB\u5F55\u5236: "Start recording",
  \u67E5\u770B\u5F55\u50CF: "View recordings",
  "\u76F8\u673A\u76D1\u89C6\u5C4F \xB7 {0}": "Camera monitor \xB7 {0}",
  "\u9884\u6F14\u5BF9\u8C61 \xB7 {0}": "Rehearse \xB7 {0}",
  \u63A2\u7D22\u6A21\u5F0F: "Explore mode",
  \u5207\u6362\u4E0B\u4E00\u673A\u4F4D: "Next camera",
  "Camera Agent \xB7 \u67E5\u770B\u76F8\u673A": "Camera Agent \xB7 View camera",
  "\u6682\u505C\u5F53\u524D\u9884\u6F14 \xB7 \u5DE6\u63E1\u628A": "Pause rehearsal \xB7 Left grip",
  "\u7EE7\u7EED\u5F53\u524D\u9884\u6F14 \xB7 \u5DE6\u63E1\u628A": "Resume rehearsal \xB7 Left grip",
  "\u9884\u6F14\u5F53\u524D\u5BF9\u8C61 \xB7 \u5DE6\u63E1\u628A": "Rehearse selection \xB7 Left grip",
  \u5173\u95ED\u76D1\u89C6\u5C4F: "Close monitor",
  "\u67E5\u770B Agent \u56DE\u590D": "View Agent reply",
  "\u53EA\u8FD0\u884C\u6240\u9009\u5BF9\u8C61\u53CA\u5173\u8054\u4EA4\u4E92 \xB7 \u53F3\u6447\u6746\u6309\u4E0B\u8FD4\u56DE\u7F16\u8F91": "Rehearse selection and linked interactions \xB7 Right stick click: edit",
  "\u53F3\u6447\u6746\u6309\u4E0B\u7F16\u8F91\uFF0C\u9009\u4E2D\u5BF9\u8C61\u540E\u9884\u6F14 \xB7 X \u8BED\u97F3": "Right stick click: edit and select a target \xB7 X Voice",
  \u6B63\u5728\u4FDD\u5B58: "Saving",
  \u9884\u89C8\u7ED3\u679C: "Preview result",
  \u91CD\u64AD\u52A8\u4F5C: "Replay motion",
  \u91CD\u64AD\u4EA4\u4E92: "Replay interaction",
  "A \u5E94\u7528 \xB7 B \u653E\u5F03 \xB7 X \u7EE7\u7EED\u8BF4\u8BDD": "A Apply \xB7 B Discard \xB7 X Voice",
  "Agent \u6B63\u5728\u5904\u7406": "Agent working",
  "B \u505C\u6B62 \xB7 X \u7EE7\u7EED\u8BF4\u8BDD": "B Stop \xB7 X Voice",
  \u653E\u7F6E\u89D2\u8272: "Place actor",
  \u53D6\u6D88\u653E\u7F6E: "Cancel placement",
  "\u6307\u5411\u5730\u9762\uFF0CA \u653E\u7F6E \xB7 B \u53D6\u6D88": "Point at ground \xB7 A Place \xB7 B Cancel",
  \u753B\u7B14\u8BBE\u7F6E: "Brush settings",
  "\u5E73\u6ED1\uFF1A": "Smoothing: ",
  \u6807\u51C6: "Standard",
  \u7B14\u5C16\u9760\u8FD1: "Bring tip closer",
  \u7B14\u5C16\u8FDC\u79BB: "Move tip farther",
  \u6E05\u7A7A\u672C\u6B21\u8349\u56FE: "Clear draft",
  \u5708\u5B9A\u4EA4\u4E92\u533A\u57DF: "Draw interaction regions",
  "\u7A7A\u4E2D\u8F68\u8FF9 \xB7 3D": "Spatial path \xB7 3D",
  "\u5730\u9762\u8F68\u8FF9 \xB7 2D": "Ground path \xB7 2D",
  \u5B8C\u6210\u533A\u57DF: "Finish regions",
  \u4FDD\u5B58\u66F2\u7EBF: "Save curve",
  \u64A4\u56DE\u4E0A\u4E00\u5708: "Undo last region",
  \u53D6\u6D88\u7ED8\u5236: "Cancel drawing",
  "\u53F3\u6273\u673A\u753B\u7EBF \xB7 \u677E\u5F00\u540EA \u4FDD\u5B58 \xB7 B \u53D6\u6D88": "Right trigger: draw \xB7 Release, then A Save \xB7 B Cancel",
  \u7F16\u8F91\u6A21\u5F0F: "Edit mode",
  \u521B\u5EFA: "Create",
  \u7A7A\u95F4\u8349\u56FE\u4E0E\u8F68\u9053: "Sketches and paths",
  "Agent \u5EFA\u8BAE": "Agent suggestions",
  "\u5E03\u7F6E\u5B8C\u6210\uFF0C\u8FDB\u5165\u63A2\u7D22": "Finish setup and explore",
  \u8FD4\u56DE\u63A2\u7D22: "Return to explore",
  "\u53F3\u6447\u6746\u9009\u62E9 \xB7 A \u786E\u8BA4 \xB7 B / Y \u6536\u8D77\u83DC\u5355": "Right stick: select \xB7 A Confirm \xB7 B / Y Hide menu",
  \u5149\u6E90: "Light",
  "\u9009\u62E9\u7C7B\u522B \xB7 B \u8FD4\u56DE \xB7 \u521B\u5EFA\u540E\u53EF\u7EE7\u7EED\u4FEE\u6539": "Choose a category \xB7 B Back \xB7 Edit after placement",
  \u5149\u6E90\u7C7B\u578B: "Light type",
  "\u70B9\u5149\u6E90 \xB7 \u5411\u56DB\u5468\u7167\u660E": "Point \xB7 All directions",
  "\u805A\u5149\u706F \xB7 \u5B9A\u5411\u7167\u660E": "Spot \xB7 Directional",
  "\u9009\u62E9\u7C7B\u578B\u540E\u6307\u5B9A\u5730\u9762\u843D\u70B9 \xB7 \u521B\u5EFA\u540E\u53EF\u5207\u6362\u7C7B\u578B": "Choose a type, then a ground point \xB7 Type stays editable",
  \u5149\u6E90\u8BBE\u7F6E: "Light settings",
  \u6539\u4E3A\u70B9\u5149\u6E90: "Switch to point",
  \u6539\u4E3A\u805A\u5149\u706F: "Switch to spot",
  "\u8BED\u97F3\u8C03\u6574\u4EAE\u5EA6\u3001\u989C\u8272": "Voice: brightness and color",
  "\u5148\u9884\u89C8 \xB7 A \u4FDD\u5B58 \xB7 B \u8FD8\u539F": "Review changes \xB7 A Save \xB7 B Revert",
  \u8C03\u6574\u8FD9\u4E2A\u673A\u4F4D: "Adjust this camera",
  "B \u5173\u95ED \xB7 \u4FDD\u5B58\u540E\u8BF4\u201C\u9884\u89C8\u76F8\u673A\u201D\u518D\u6B21\u67E5\u770B": "B Close \xB7 After saving, say \u201Cpreview camera\u201D",
  "\u5149\u6E90 \xB7 Interaction": "Light \xB7 Interaction",
  \u7C7B\u578B\u4E0E\u5149\u7167\u8BBE\u7F6E: "Type and light settings",
  \u7ED1\u5B9A\u5F53\u524D\u66F2\u7EBF: "Bind selected curve",
  \u9884\u6F14\u5F53\u524D\u5149\u6E90: "Rehearse this light",
  \u67E5\u770B\u5F53\u524D\u76F8\u673A: "View this camera",
  \u8BED\u97F3\u8BBE\u7F6E\u955C\u5934\u6216\u8FD0\u955C: "Voice: camera and movement",
  \u8BED\u97F3\u63CF\u8FF0\u4EA4\u4E92: "Describe an interaction",
  \u7ED8\u5236\u8DEF\u7EBF\u6216\u533A\u57DF: "Draw a path or region",
  "\u53F3\u6447\u6746\u9009\u62E9 \xB7 A \u786E\u8BA4 \xB7 Other \u81EA\u52A8\u5F00\u59CB\u8BED\u97F3": "Right stick: select \xB7 A Confirm \xB7 Other starts voice",
  "\u53F3\u6447\u6746\u4E0A\u4E0B\u9009\u62E9 \xB7 A \u786E\u8BA4 \xB7 B \u8FD4\u56DE": "Right stick: select \xB7 A Confirm \xB7 B Back",
  \u7A7A\u95F4\u8349\u56FE: "Spatial sketches",
  "\u753B\u5730\u9762\u8DEF\u7EBF \xB7 2D": "Draw ground path \xB7 2D",
  "\u753B\u7A7A\u4E2D\u8DEF\u7EBF \xB7 3D": "Draw spatial path \xB7 3D",
  \u5708\u5B9A\u95E8\u6846\u4E0E\u89E6\u53D1\u533A\u57DF: "Draw door sources and trigger region",
  "\u5DF2\u4FDD\u5B58\u66F2\u7EBF \xB7 {0}": "Saved curves \xB7 {0}",
  \u5DF2\u4FDD\u5B58\u66F2\u7EBF: "Saved curves",
  "\u5207\u6362\u66F2\u7EBF \xB7 ": "Next curve \xB7 ",
  \u62C9\u626F\u63A7\u5236\u70B9: "Pull control points",
  "Extreme \xB7 \u9996\u5C3E\u62C9\u76F4": "Extreme \xB7 Straight endpoints",
  \u5E73\u6ED1\u63A7\u5236\u70B9: "Smooth control points",
  \u5220\u9664\u5F53\u524D\u66F2\u7EBF: "Delete selected curve",
  \u5DF2\u4FDD\u5B58\u7684\u5F55\u50CF: "Saved recordings",
  \u79FB\u52A8\u4E0E\u8F6C\u5411: "Move and rotate",
  \u7D20\u6750\u4E0E\u51FA\u573A\u65F6\u95F4: "Motion assets and entrance",
  \u5220\u9664\u89D2\u8272: "Delete actor",
  \u573A\u666F\u5DE5\u5177: "Scene tools",
  \u5173\u95ED\u95E8: "Close door",
  \u6253\u5F00\u95E8: "Open door",
  \u5207\u6362\u94F0\u94FE\u4FA7: "Switch hinge side",
  \u6DFB\u52A0\u89D2\u8272: "Add actor",
  \u6682\u505C\u5F53\u524D\u9884\u6F14: "Pause rehearsal",
  \u9884\u6F14\u5F53\u524D\u5BF9\u8C61: "Rehearse selection",
  "\u5F55\u5236\u3001\u663E\u793A\u4E0E\u66F4\u591A": "Recording, display and more",
  \u573A\u666F\u8BBE\u7F6E: "Scene settings",
  "\u5F55\u50CF\u4E2D \xB7 \u505C\u6B62\u4E0E\u4FDD\u5B58": "Recording \xB7 Stop and save",
  \u64CD\u4F5C\u8BF4\u660E: "Controls",
  \u9009\u62E9\u4E0E\u6750\u8D28: "Selection and materials",
  \u6682\u4E0D\u91C7\u7528: "Dismiss suggestions",
  "\u9009\u62E9\u540E\u751F\u6210\u9884\u89C8 \xB7 \u53F3\u6447\u6746\u9009\u62E9\uFF0CA \u786E\u8BA4": "Choose a suggestion to preview \xB7 Right stick: select \xB7 A Confirm",
  \u751F\u6210\u57FA\u7840\u52A8\u4F5C: "Generate a basic motion",
  \u753B\u8FD0\u52A8\u8F68\u8FF9: "Draw a motion path",
  \u9884\u89C8\u5F53\u524D\u89D2\u8272: "Rehearse this actor",
  \u89D2\u8272\u8BBE\u7F6E: "Actor settings",
  \u63CF\u8FF0\u4EA4\u4E92\u9700\u6C42: "Describe an interaction",
  \u7ED8\u5236\u4EA4\u4E92\u533A\u57DF: "Draw interaction regions",
  \u9884\u6F14\u4EA4\u4E92: "Rehearse interaction",
  \u95E8\u7684\u8BBE\u7F6E: "Door settings",
  \u753B\u7A7A\u95F4\u8349\u56FE: "Draw a spatial sketch",
  \u7ED3\u675F\u9009\u62E9: "Finish selection",
  \u9009\u62E9\u5BF9\u8C61: "Select objects",
  "\u5DE5\u5177 \xB7 Y": "Tools \xB7 Y",
  \u52A8\u4F5C\u7D20\u6750\u4E0E\u51FA\u573A: "Motion assets and entrance",
  "\u5C1A\u672A\u53D1\u9001\uFF1A": "Not sent: ",
  \u6536\u8D77\u56DE\u590D: "Hide reply",
  \u67E5\u770B\u56DE\u590D: "View reply",
  "\u786E\u8BA4\u53D1\u9001 \xB7 Enter": "Send \xB7 Enter",
  "\u91CD\u8BF4 \xB7 X": "Speak again \xB7 X",
  "\u53D6\u6D88 \xB7 Esc": "Cancel \xB7 Esc",
  "\u6838\u5BF9\u8BED\u97F3 \xB7 \u76EE\u6807\uFF1A": "Review speech \xB7 Target: ",
  "Agent \u6B63\u5728\u5904\u7406 \xB7 ": "Agent working \xB7 ",
  \u5206\u6D3E\u4EFB\u52A1: "Routing task",
  "\u9884\u89C8\u5C31\u7EEA \xB7 \u786E\u8BA4\u540E\u5E94\u7528": "Preview ready \xB7 Confirm to apply",
  "\u5F53\u524D\u76EE\u6807\uFF1A{0}": "Target: {0}",
  "\u9009\u62E9\u5BF9\u8C61\uFF0C\u6216\u76F4\u63A5\u8BF4\u51FA\u9700\u6C42": "Select an object or describe your idea",
  "\u6838\u5BF9\u8BED\u97F3\uFF1AEnter \u53D1\u9001 \xB7 X \u91CD\u8BF4 \xB7 Esc \u53D6\u6D88": "Review speech: Enter Send \xB7 X Retry \xB7 Esc Cancel",
  "\u6307\u5411\u5730\u9762\u9009\u62E9\u5706\u5708\u843D\u70B9 \xB7 Enter \u521B\u5EFA \xB7 Esc \u53D6\u6D88": "Point at ground \xB7 Enter Create \xB7 Esc Cancel",
  "\u8C03\u6574\uFF1AWASD \u79FB\u52A8 \xB7 \u65B9\u5411\u952E\u65CB\u8F6C \xB7 Enter \u4FDD\u5B58 \xB7 Esc \u8FD8\u539F": "WASD Move \xB7 Shift + W/S Height \xB7 Arrows Rotate \xB7 Enter Save \xB7 Esc Revert",
  "\u4FEE\u6539\u9884\u89C8 \xB7 Enter \u4FDD\u5B58 \xB7 Esc \u8FD8\u539F": "Preview changes \xB7 Enter Save \xB7 Esc Revert",
  \u6B63\u5728\u7ED8\u5236: "Drawing",
  " \xB7 Enter \u4FDD\u5B58 \xB7 Esc \u53D6\u6D88": " \xB7 Enter Save \xB7 Esc Cancel",
  "\u53F3\u6447\u6746\u4E0A\u4E0B\u9009\u62E9 \xB7 A \u786E\u8BA4 \xB7 B \u8FD4\u56DE\nX \u8BED\u97F3 \xB7 Y \u5168\u5C40\u83DC\u5355": `Right stick: select \xB7 A Confirm \xB7 B Back
X Voice \xB7 Y Global menu`,
  "\u8BED\u97F3\u5BF9\u8BDD\u3001\u6309\u952E\u8BF4\u660E\u4E0E\u7ED3\u675F\u6C89\u6D78\u3002": "Voice, controls and exit XR.",
  \u5207\u6362\u52A8\u4F5C\u7D20\u6750: "Next motion asset",
  "\u95E8\u4EA4\u4E92 \xB7 \u95ED\u5408\u533A\u57DF": "Door interaction \xB7 Closed regions",
  "3D \xB7 \u7A7A\u4E2D\u66F2\u7EBF": "3D \xB7 Spatial curve",
  "2D \xB7 \u5730\u9762\u66F2\u7EBF": "2D \xB7 Ground curve",
  "\u7B14\u5C16\u8DDD\u79BB ": "Tip distance ",
  " m \xB7 \u79FB\u52A8\u53F3\u624B\u753B\u7EBF": " m \xB7 Move your right hand to draw",
  \u6307\u5411\u5730\u9762\u753B\u7EBF: "Point at ground to draw",
  "\nY \u9690\u85CF\u83DC\u5355\u7ED8\u5236 / \u6253\u5F00\u83DC\u5355\u4FDD\u5B58": `
Y Hide menu to draw / Show menu to save`,
  "\u5DE6 X \u8BF4\u8BDD \xB7 \u5DE6 Y \u6536\u8D77 / \u4FA7\u8FB9\u5524\u51FA": "X Voice \xB7 Y Hide / Show menu",
  "A \u786E\u8BA4 \xB7 B \u53D6\u6D88 / \u8FD4\u56DE\nX \u8BED\u97F3 \xB7 Y \u83DC\u5355 \xB7 \u5DE6\u63E1\u628A\u64AD\u653E / \u6682\u505C": `A Confirm \xB7 B Cancel / Back
X Voice \xB7 Y Menu \xB7 Left grip: play / pause`,
  \u6536\u8D77\u5BF9\u8BDD: "Hide dialogue",
  "\u5C1A\u672A\u53D1\u9001 \xB7 {0} \xB7 {1}/{2}\n{3}": `Not sent \xB7 {0} \xB7 {1}/{2}
{3}`,
  "\u6B63\u5728\u542C\u4F60\u8BF4\u8BDD\u2026": "Listening\u2026",
  "\u6B63\u5728\u8F6C\u5199\uFF0C\u8BF7\u7A0D\u5019\u2026": "Transcribing\u2026",
  "A \u53D1\u9001 \xB7 X \u91CD\u8BF4 \xB7 B \u53D6\u6D88": "A Send \xB7 X Retry \xB7 B Cancel",
  " \xB7 \u53F3\u6447\u6746\u7FFB\u9875": " \xB7 Right stick: pages",
  "\u8BB2\u5B8C\u540E\u6838\u5BF9\u6587\u5B57 \xB7 B \u53D6\u6D88": "Review after speaking \xB7 B Cancel",
  "A \u53D1\u9001": "A Send",
  "X \u91CD\u8BF4": "X Retry",
  "\u6309\u4F4F X \u8BF4\u8BDD\uFF0C\u677E\u5F00\u540E\u6838\u5BF9\u6587\u5B57": "Hold X to speak, release to review",
  "\u6B63\u5728\u542C \xB7 \u8BB2\u5B8C\u540E\u6838\u5BF9 \xB7 B \u53D6\u6D88": "Listening \xB7 Review after speaking \xB7 B Cancel",
  "\u6B63\u5728\u542C \xB7 \u677E\u5F00 X \u540E\u6838\u5BF9": "Listening \xB7 Release X to review",
  \u6B63\u5728\u8F6C\u5199: "Transcribing",
  \u7B49\u5F85\u9EA6\u514B\u98CE: "Waiting for microphone",
  "Y \u2192 Agent \u5EFA\u8BAE": "Y \u2192 Agent suggestions",
  "X \u7EE7\u7EED\u8BF4\u8BDD \xB7 Y \u2192 \u67E5\u770B Agent \u56DE\u590D": "X Voice \xB7 Y \u2192 View Agent reply",
  "\u25CF {0} \u79D2 \xB7 \u70B9\u51FB\u505C\u6B62\u5F55\u50CF": "\u25CF {0} s \xB7 Click to stop recording",
  "\u6B63\u5728\u542C\u2026 \u677E\u5F00 X \u7ED3\u675F\u5E76\u6838\u5BF9": "Listening\u2026 Release X to review",
  \u6536\u8D77\u5DE5\u5177: "Hide tools",
  \u7528\u8BED\u97F3\u63CF\u8FF0\u53C2\u8003\u56FE: "Describe reference by voice",
  \u521B\u4F5C\u52A9\u624B: "Creative assistant",
  \u5BF9\u8BDD\u8BB0\u5F55: "Conversation history",
  \u8BB0\u5F55: "History",
  "\u9009\u62E9\u5BF9\u8C61\uFF0C\u6309\u4F4F\u5DE6 X \u8BF4\u8BDD": "Select an object \xB7 Hold X to speak",
  "\u9009\u62E9\u5EFA\u8BAE\u4F1A\u751F\u6210\u65B0\u9884\u89C8\uFF0C\u518D\u7531\u4F60\u786E\u8BA4\u5E94\u7528\u3002": "Suggestions create a preview for you to review and confirm.",
  "\u7ED3\u675F\u5F55\u97F3\u540E\u6838\u5BF9\u6587\u5B57 \xB7 Enter \u53D1\u9001 / X \u91CD\u8BF4 / Esc \u53D6\u6D88": "Review speech \xB7 Enter Send / X Retry / Esc Cancel",
  "\u25CF \u91CD\u65B0\u8BF4\u8BDD": "\u25CF Speak again",
  "\u25CF \u5F00\u59CB\u8BF4\u8BDD": "\u25CF Start speaking",
  "\u6838\u5BF9\u540E A / Enter \u53D1\u9001 \xB7 X \u91CD\u8BF4 \xB7 B / Esc \u53D6\u6D88": "Review, then A / Enter Send \xB7 X Retry \xB7 B / Esc Cancel",
  "\u70B9\u51FB\u8BF4\u8BDD \xB7 Quest \u6309\u4F4F X\uFF0C\u677E\u5F00\u540E\u6838\u5BF9\u6587\u5B57": "Click to speak \xB7 Quest: hold X, release to review",
  "\u6B63\u5728\u542C \xB7 \u8BB2\u5B8C\u540E\u6838\u5BF9\u6587\u5B57 \xB7 B \u53D6\u6D88": "Listening \xB7 Review after speaking \xB7 B Cancel",
  "\u6B63\u5728\u542C \xB7 \u70B9\u51FB\u7ED3\u675F\uFF0C\u6216\u677E\u5F00 X": "Listening \xB7 Click to stop or release X",
  "\u6784\u5EFA\u8981\u6C42\u5DF2\u8BB0\u5F55\uFF0C\u62CD\u6444\u5B8C\u6210\u540E\u70B9\u51FB\u6784\u5EFA\u3002": "Requirements saved. Click Build after adding your photos.",
  "\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u5F55\u97F3\uFF0C\u8BF7\u5728\u652F\u6301\u9EA6\u514B\u98CE\u7684\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00\u672C\u5730\u9875\u9762": "This browser cannot record audio. Open the local page in a browser with microphone support.",
  "\u6CA1\u6709\u8BC6\u522B\u5230\u6587\u5B57\uFF0C\u8BF7\u91CD\u65B0\u8BF4\u8BDD": "No speech recognized. Please speak again.",
  "\u8BF7\u6838\u5BF9\u8BC6\u522B\u6587\u5B57 \xB7 A \u53D1\u9001 \xB7 X \u91CD\u8BF4 \xB7 B \u53D6\u6D88": "Review transcript \xB7 A Send \xB7 X Retry \xB7 B Cancel",
  \u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u81EA\u52A8\u8BED\u97F3\u68C0\u6D4B: "Automatic speech detection is unavailable in this browser.",
  "\u6CA1\u6709\u542C\u5230\u8BED\u97F3\uFF0C\u5DF2\u7ED3\u675F\u672C\u8F6E\u3002\u9009\u62E9 Other \u53EF\u4EE5\u518D\u8BF4\u3002": "No speech detected. Choose Other to try again.",
  "\u6B63\u5728\u542C\uFF0C\u8BB2\u5B8C\u540E\u6838\u5BF9\u6587\u5B57 \xB7 B \u53D6\u6D88": "Listening \xB7 Review after speaking \xB7 B Cancel",
  "\u6B63\u5728\u542C\uFF0C\u8BB2\u5B8C\u540E\u81EA\u52A8\u53D1\u9001 \xB7 B \u53D6\u6D88": "Listening \xB7 Sends after speaking \xB7 B Cancel",
  \u8BF7\u5148\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F: "Enter edit mode first.",
  "\u6A21\u5F0F\u540C\u6B65\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5\uFF1A": "Mode sync failed. Refresh and retry: ",
  "\u6B63\u5728\u4FDD\u5B58\uFF0C\u5B8C\u6210\u540E\u53EF\u64A4\u9500": "Saving. Undo will be available when finished.",
  "\u6CA1\u6709\u5DF2\u4FDD\u5B58\u7684\u865A\u62DF\u76F8\u673A\u3002\u8BF7\u5148\u521B\u5EFA\u76F8\u673A\u5E76\u4FDD\u5B58\u3002": "Create and save a virtual camera first.",
  \u8BF7\u9009\u62E9\u573A\u666F\u4E2D\u5DF2\u4FDD\u5B58\u7684\u76F8\u673A: "Select a saved scene camera.",
  "\u8BF7\u5148 A \u4FDD\u5B58\u6216 B \u53D6\u6D88\u5F53\u524D\u64CD\u4F5C\uFF0C\u518D\u67E5\u770B\u5DF2\u4FDD\u5B58\u7684\u76F8\u673A": "A Save or B Cancel the current edit before viewing a saved camera.",
  "{0} \xB7 A \u53EC\u56DE\u5C4F\u5E55 \xB7 B \u5173\u95ED \xB7 \u8C03\u6574\u673A\u4F4D\u65F6\u81EA\u52A8\u6536\u8D77\uFF0C\u4FDD\u5B58\u540E\u53EF\u518D\u6B21\u67E5\u770B": "{0} \xB7 A Recenter \xB7 B Close \xB7 Save camera edits before reopening",
  \u8BF7\u5148\u9009\u62E9\u4E00\u4E2A\u5DF2\u4FDD\u5B58\u673A\u4F4D: "Select a saved camera first.",
  "\u5F53\u524D\u673A\u4F4D\uFF1A": "Current camera: ",
  \u8BF7\u5148\u4FDD\u5B58\u6216\u53D6\u6D88\u5F53\u524D\u64CD\u4F5C: "Save or cancel the current operation first.",
  \u8BF7\u5148\u70B9\u9009\u5BF9\u8C61: "Select an object first.",
  \u53C2\u8003\u7ED3\u6784\u5DF2\u9501\u5B9A: "Reference structure is locked.",
  "Transform\uFF1A\u5DE6\u6447\u6746\u79FB\u52A8 \xB7 \u53F3\u6447\u6746\u65CB\u8F6C \xB7 \u53F3\u63E1\u628A\u62FF\u53D6 \xB7 A \u4FDD\u5B58 \xB7 B \u8FD8\u539F": "Transform: L stick Move \xB7 L grip + stick Height \xB7 R stick Rotate \xB7 R grip Grab \xB7 A Save \xB7 B Revert",
  \u8BF7\u5148\u4FDD\u5B58\u5E76\u9009\u62E9\u4E00\u6761\u66F2\u7EBF: "Save and select a curve first.",
  "\u63E1\u4F4F\u66F2\u7EBF\u62C9\u51FA\u63A7\u5236\u70B9 \xB7 A \u4FDD\u5B58\u5E73\u6ED1\u66F2\u7EBF \xB7 B \u53D6\u6D88": "Grip and pull control points \xB7 A Save smoothed curve \xB7 B Cancel",
  "\u6700\u591A 64 \u4E2A\u63A7\u5236\u70B9": "Up to 64 control points.",
  "\u573A\u666F\u6216\u7A7A\u95F4\u5DF2\u53D8\u5316\uFF0C\u672C\u6B21\u8C03\u6574\u5DF2\u8FD8\u539F": "Scene or alignment changed. Edits reverted.",
  "\u8FFD\u8E2A\u4E2D\u65AD\uFF0C\u8C03\u6574\u5DF2\u53D6\u6D88": "Tracking interrupted. Edits cancelled.",
  "\u53F3\u624B\u6307\u5411\u5730\u9762\u9009\u62E9\u843D\u70B9 \xB7 A \u521B\u5EFA \xB7 B \u53D6\u6D88": "Point at ground with your right hand \xB7 A Create \xB7 B Cancel",
  "\u573A\u666F\u6216\u7A7A\u95F4\u5DF2\u53D8\u5316\uFF0C\u653E\u7F6E\u5DF2\u53D6\u6D88": "Scene or alignment changed. Placement cancelled.",
  "\u8BF7\u5148\u677E\u5F00\u63E1\u628A\uFF0C\u518D\u4FDD\u5B58": "Release the grip before saving.",
  "\u573A\u666F\u6216\u7A7A\u95F4\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u843D\u70B9\u6216\u8C03\u6574": "Scene or alignment changed. Choose a new point or restart editing.",
  "\u573A\u666F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u53D6\u6D88\u540E\u91CD\u65B0\u8C03\u6574": "Scene changed. Cancel and restart editing.",
  "\u5DF2\u5728\u6240\u9009\u843D\u70B9\u521B\u5EFA \xB7 Transform \u53EF\u7EE7\u7EED\u8C03\u6574\u4F4D\u7F6E\u548C\u9AD8\u5EA6": "Created at your point \xB7 Use Transform to adjust position and height.",
  "\u5DF2\u4FDD\u5B58 \xB7 \u5DE6\u63E1\u628A\u6216 Interaction \u2192 \u9884\u6F14\u5F53\u524D\u5BF9\u8C61\uFF1B\u4E0D\u4F1A\u542F\u52A8\u5176\u4ED6\u5BF9\u8C61\u3002": "Saved \xB7 Left grip or Interaction \u2192 Rehearse selection.",
  "\u8BF7\u5148\u4FDD\u5B58\u4FEE\u6539\uFF0C\u6309\u4E0B\u53F3\u6447\u6746\u8FDB\u5165\u63A2\u7D22\uFF0C\u518D\u6309\u5DE6\u63E1\u628A\u9884\u6F14\u3002": "Save edits, click the right stick to explore, then use left grip to rehearse.",
  "\u8BF7\u5148\u8FDB\u5165\u7F16\u8F91\u5E76\u9009\u4E2D\u8981\u9884\u6F14\u7684\u5BF9\u8C61\u3002": "Enter edit mode and select an object to rehearse.",
  "\u8FD9\u4E2A\u5BF9\u8C61\u8FD8\u6CA1\u6709\u5DF2\u4FDD\u5B58\u7684\u52A8\u4F5C\u6216\u4EA4\u4E92\uFF0C\u8BF7\u5148\u7ED1\u5B9A\u66F2\u7EBF\u6216\u751F\u6210\u4EA4\u4E92\u3002": "Bind a curve or save an interaction for this object first.",
  "\u9884\u6F14\uFF1A{0} \xB7 \u5DE6\u63E1\u628A\u6682\u505C / \u7EE7\u7EED \xB7 \u53F3\u6447\u6746\u6309\u4E0B\u8FD4\u56DE\u7F16\u8F91": "Rehearsing: {0} \xB7 Left grip Pause / Resume \xB7 Right stick click Edit",
  "\u8BF7\u5148\u53EC\u5524 Camera Agent \u6253\u5F00\u76D1\u89C6\u5C4F\u3002": "Ask Camera Agent to open the monitor first.",
  "\u9884\u89C8\u5C4F\u5DF2\u7AD6\u76F4\u53EC\u56DE\u5230\u4F60\u9762\u524D\uFF1B\u673A\u4F4D\u548C\u64AD\u653E\u8FDB\u5EA6\u4FDD\u6301\u4E0D\u53D8\u3002": "Monitor recentered upright. Camera pose and playback are preserved.",
  "\u76F8\u673A\u76D1\u89C6\u5C4F\u5DF2\u5173\u95ED\u3002": "Camera monitor closed.",
  "\u8BF4\u8BDD\u671F\u95F4\u573A\u666F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u76F8\u673A": "Scene changed while speaking. Select the camera again.",
  "\u8BF7\u5148 A \u4FDD\u5B58\u6216 B \u53D6\u6D88\u5F53\u524D\u64CD\u4F5C\uFF0C\u518D\u67E5\u770B\u76F8\u673A\u3002": "A Save or B Cancel the current edit before viewing a camera.",
  "\u6B63\u5728\u67E5\u770B {0} \u7684\u5DF2\u4FDD\u5B58\u673A\u4F4D\u3002B \u5173\u95ED\uFF0C\u8C03\u6574\u673A\u4F4D\u65F6\u81EA\u52A8\u6536\u8D77\u3002": "Viewing saved camera {0}. B Close; editing closes the monitor.",
  "\u79FB\u52A8\u901F\u5EA6\u5DF2\u8C03\u6574\u4E3A {0} \u7C73/\u79D2\u3002": "Movement speed is now {0} m/s.",
  "\u9AD8\u5EA6\u9884\u89C8\u5DF2\u8C03\u6574\uFF0CA \u4FDD\u5B58\uFF0CB \u8FD8\u539F\u3002": "Height preview adjusted. A Save, B Revert.",
  "\u8BF7\u5148 A \u4FDD\u5B58\u6216 B \u53D6\u6D88\u8FD9\u8F6E\u8C03\u6574\uFF1B\u4E5F\u53EF\u4EE5\u8BF4\u52A0\u5FEB\u3001\u51CF\u6162\u6216\u62AC\u9AD8\u4E8C\u5341\u5398\u7C73\u3002": "A Save or B Cancel this edit. You can also say faster, slower, or raise by 20 centimetres.",
  "\u8BF7\u5148 A \u4FDD\u5B58\u6216 B \u53D6\u6D88\u5F53\u524D\u9884\u89C8\u3002": "A Save or B Cancel the current preview first.",
  "\u9884\u6F14\u5DF2\u6682\u505C\uFF0C\u5DE6\u63E1\u628A\u7EE7\u7EED\u3002": "Rehearsal paused. Left grip to resume.",
  "\u6B63\u5728\u9884\u6F14\uFF1A{0}\u3002\u5DE6\u63E1\u628A\u6682\u505C / \u7EE7\u7EED\u3002": "Rehearsing {0}. Left grip to pause / resume.",
  \u6B63\u5728\u5904\u7406\u4E0A\u4E00\u6761\u8BF7\u6C42: "The previous request is still processing.",
  "\u8BF4\u8BDD\u671F\u95F4\u573A\u666F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5": "Scene changed while speaking. Please retry.",
  "\u8BF4\u8BDD\u671F\u95F4\u6A21\u5F0F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5": "Mode changed while speaking. Please retry.",
  "\u5DF2\u8FDB\u5165\u653E\u7F6E\u6A21\u5F0F\u3002\u8BF7\u7528\u53F3\u624B\u6307\u5411\u5730\u9762\uFF0CA \u521B\u5EFA\uFF0CB \u53D6\u6D88\u3002": "Placement ready. Point at ground with your right hand. A Create, B Cancel.",
  "\u5DF2\u5904\u7406\u3002": "Done.",
  "\u573A\u666F\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u5BF9\u8C61\u9884\u6F14\u3002": "Scene updated. Select an object again to rehearse.",
  "\u8303\u56F4\u6761\u4EF6\u6EE1\u8DB3\uFF0C\u5F00\u59CB\u5F53\u524D\u5BF9\u8C61\u7684\u79FB\u52A8": "Region condition met. Starting this object's movement.",
  "\u8303\u56F4\u5185\u505C\u7559 {0} / {1} \u79D2": "Dwell in region: {0} / {1} s",
  "\u7B49\u5F85\u8FDB\u5165\u5730\u9762\u5708 \xB7 \u8FDE\u7EED\u505C\u7559 {0} \u79D2\u89E6\u53D1": "Enter the floor region \xB7 Dwell continuously for {0} s",
  \u5148\u4FDD\u5B58\u5F53\u524D\u5DE5\u5177\u4FEE\u6539: "Save the current tool edits first.",
  "\u5E03\u7F6E\u5DF2\u5B8C\u6210\uFF0C\u53EF\u4EE5\u8FDB\u5165\u63A2\u7D22\u9884\u89C8\u548C\u5F55\u5236\u3002": "Setup complete. Explore, rehearse and record.",
  \u91CD\u65B0\u9884\u6F14\u4EA4\u4E92: "Replay interaction",
  \u5E94\u7528\u4EA4\u4E92: "Apply interaction",
  "Quest\uFF1AA \u786E\u8BA4\uFF0CB \u53D6\u6D88\u6216\u8FD4\u56DE\uFF0CX \u6309\u4F4F\u8BF4\u8BDD\uFF0CY \u83DC\u5355\u3002\u83DC\u5355\u6253\u5F00\u65F6\u53F3\u6447\u6746\u4E0A\u4E0B\u9009\u9879\uFF0CA \u786E\u8BA4\uFF1B\u5DE6\u63E1\u628A\u64AD\u653E\u6216\u6682\u505C\u3002\u5F55\u50CF\u5728\u573A\u666F\u5DE5\u5177\u4E2D\u64CD\u4F5C\u3002\u7535\u8111\uFF1AV \u9009\u62E9\uFF0CX \u8BED\u97F3\uFF0CY \u5DE5\u5177\uFF0CEnter \u786E\u8BA4\uFF0CEsc \u53D6\u6D88\uFF0CSpace \u64AD\u653E\uFF0CR \u5F55\u50CF\uFF0CCtrl/Cmd+Z \u64A4\u9500\u3002": "Quest: A Confirm, B Cancel / Back, X Voice, Y Menu. Right stick selects menu options. In Transform: left stick moves, left grip + stick adjusts height, right stick rotates, right grip grabs. Left grip rehearses outside Transform. Desktop: V Edit, X Voice, Y Tools, WASD Move, Shift + W/S Height, arrows Rotate, Enter Confirm, Esc Cancel, Space Rehearse, Ctrl/Cmd+Z Undo. Recording is available after setup.",
  "\u9009\u95E8 \u2192 Interaction \u2192 Draft regions\uFF1A\u95E8\u6846\u5708\u6E90\u533A\u3001\u5730\u9762\u5708\u89E6\u53D1\u8303\u56F4\uFF0C\u518D\u8BED\u97F3\u63CF\u8FF0\u6D2A\u6C34\u4E0E\u505C\u7559\u6761\u4EF6\u3002\u4E5F\u53EF\u9884\u89C8\u5F00\u95E8\u3001\u8C03\u6574\u94F0\u94FE\u548C\u65B9\u5411\u3002": "Select a door \u2192 Interaction \u2192 Draw regions: mark door sources and a floor trigger, then describe the flow and dwell condition by voice. Door hinge and opening direction are editable.",
  \u8BF7\u5148\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F\u518D\u753B\u7EBF: "Enter edit mode before drawing.",
  \u8BF7\u5148\u8FDB\u5165\u521B\u4F5C\u5E76\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C: "Enter the scene and finish the current operation first.",
  "\u7A7A\u4E2D\u753B\u7B14\uFF1A\u79FB\u52A8\u53F3\u624B\u5E76\u6309\u4F4F\u6273\u673A\u753B\u7EBF\uFF1BY \u6253\u5F00\u83DC\u5355\u4FDD\u5B58\u3002": "Spatial brush: hold the right trigger and move your hand. Y opens the save menu.",
  "\u5730\u9762\u753B\u7B14\uFF1A\u6307\u5730\u9762\u5E76\u6309\u4F4F\u6273\u673A\u753B\u7EBF\uFF1BY \u6253\u5F00\u83DC\u5355\u4FDD\u5B58\u3002": "Ground brush: point at ground and hold the right trigger. Y opens the save menu.",
  \u8BF7\u5148\u5708\u51FA\u533A\u57DF: "Draw a region first.",
  "\u4EA4\u4E92\u533A\u57DF\u5DF2\u4FDD\u5B58\uFF0C\u6309\u4F4F X \u63CF\u8FF0\u51FA\u6D41\u6548\u679C\u548C\u505C\u7559\u6761\u4EF6\u3002": "Regions saved. Hold X to describe the flow and dwell condition.",
  "\u66F2\u7EBF\u5DF2\u4FDD\u5B58\u3002\u9009\u4E2D\u7269\u4F53\u6216\u6F14\u5458\uFF0C\u63CF\u8FF0\u6CBF\u7EBF\u8FD0\u52A8\uFF1BA \u4FDD\u5B58\u7ED3\u679C\uFF0C\u63A2\u7D22\u4E2D\u5DE6\u63E1\u628A\u9884\u6F14\u3002": "Curve saved. Select an object or actor and request movement along it. A Save; left grip rehearses in Explore.",
  \u8BF7\u5148\u53EA\u9009\u4E2D\u4E00\u6247\u95E8\u5E76\u7ED3\u675F\u5F53\u524D\u64CD\u4F5C: "Finish the current operation and select one door.",
  "\u95E8\u6846\u5708\u51FA\u6D41\u6E90\uFF0C\u5730\u9762\u5708\u505C\u7559\u8303\u56F4\uFF1B\u6BCF\u4E00\u5708\u56DE\u5230\u8D77\u70B9\u540E\u677E\u5F00\u3002\u5B8C\u6210\u540E\u76F4\u63A5\u8BED\u97F3\u63CF\u8FF0\u3002": "Draw sources on the door and a dwell region on the floor. Close each loop before releasing, then describe the interaction.",
  \u8BF7\u5148\u751F\u6210\u6216\u5E94\u7528\u4E00\u4E2A\u6D2A\u6C34\u4EA4\u4E92: "Generate or apply a flow interaction first.",
  \u8BF7\u5148\u9009\u4E2D\u8981\u9884\u6F14\u4EA4\u4E92\u7684\u95E8: "Select the door to rehearse.",
  "\u4EA4\u4E92\u9884\u6F14\u5F00\u59CB\uFF1A\u8D70\u8FDB\u5730\u9762\u5708\u5E76\u8FDE\u7EED\u505C\u7559\u3002\u79BB\u5F00\u4F1A\u91CD\u65B0\u8BA1\u65F6\uFF1B\u8BF4\u201C\u91CD\u65B0\u9884\u6F14\u4EA4\u4E92\u201D\u53EF\u518D\u6D4B\u4E00\u6B21\u3002": "Rehearsal started. Enter and remain in the floor region. Leaving resets the timer. Say \u201Creplay interaction\u201D to restart.",
  \u8BF7\u5148\u4FDD\u5B58\u66F2\u7EBF: "Save the curve first.",
  \u8BF7\u5148\u9009\u62E9\u66F2\u7EBF: "Select a curve first.",
  "{0} \xB7 {1}/{2} \u4F4D\u6F14\u5458 \xB7 {3} \u4F4D\u5DF2\u6307\u5B9A\u52A8\u4F5C{4}\n{5}": `{0} \xB7 Actor {1}/{2} \xB7 {3} with motions{4}
{5}`,
  \u89D2\u8272\u59FF\u6001\u9884\u89C8: "Actor pose preview",
  "\u57FA\u7840\u4EBA\u5076 \xB7 \u5C1A\u672A\u6307\u5B9A\u52A8\u4F5C": "Default actor \xB7 No motion assigned",
  "\u5BF9\u8BDD\u5DF2\u6536\u8D77\uFF0C\u6309 Y \u53EF\u518D\u6B21\u67E5\u770B\u3002": "Dialogue hidden. Use Y to view it again.",
  "\u6A21\u5F0F\u5DF2\u7ECF\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BF4\u51FA\u9700\u6C42": "Mode changed. Please repeat your request.",
  "\u672C\u6B21\u8C03\u6574\u5DF2\u4FDD\u5B58\u3002": "Edits saved.",
  "\u5DF2\u8FD8\u539F\u672C\u6B21\u8C03\u6574\u3002": "Edits reverted.",
  "\u5DF2\u505C\u6B62\u3002": "Stopped.",
  "\u4EA4\u4E92\u9884\u6F14\u5DF2\u5F00\u59CB\uFF0C\u8FDB\u5165\u5730\u9762\u5708\u5E76\u8FDE\u7EED\u505C\u7559\u5373\u53EF\u89E6\u53D1\u3002": "Rehearsal started. Enter the floor region and dwell to trigger it.",
  "\u8BF7\u5148\u8BF4\u201C\u5E94\u7528\u201D\u6216\u201C\u653E\u5F03\u201D\uFF0C\u5904\u7406\u5F53\u524D\u7ED3\u679C\u3002": "Apply or discard the current result first.",
  "\u8349\u56FE\u5DF2\u6E05\u7A7A\uFF0C\u8BF7\u91CD\u65B0\u5708\u5B9A\u533A\u57DF\u3002": "Draft cleared. Draw the regions again.",
  "\u5DF2\u64A4\u56DE\u4E0A\u4E00\u5708\u3002": "Last region removed.",
  "\u5DF2\u53D6\u6D88\u7ED8\u5236\u3002": "Drawing cancelled.",
  "\u8BF4\u8BDD\u540E\u7684\u573A\u666F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BF7\u6C42": "Scene changed after speaking. Please request again.",
  "\u8BF4\u8BDD\u540E\u7684\u8349\u56FE\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u63CF\u8FF0": "Sketch changed after speaking. Please describe again.",
  "\u533A\u57DF\u5DF2\u4FDD\u5B58\uFF0C\u8BF7\u63CF\u8FF0\u51FA\u6D41\u6548\u679C\u4E0E\u505C\u7559\u89E6\u53D1\u6761\u4EF6\u3002": "Regions saved. Describe the flow and dwell trigger.",
  "\u8BF7\u5148\u4FDD\u5B58\u5F53\u524D\u66F2\u7EBF\uFF0C\u518D\u63CF\u8FF0\u4F60\u60F3\u8981\u7684\u52A8\u4F5C\u3002": "Save the current curve, then describe the motion.",
  \u8BF7\u5148\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F\u518D\u521B\u5EFA\u5BF9\u8C61: "Enter edit mode to create objects.",
  "\u8BF7\u5148\u4FDD\u5B58\u6216\u53D6\u6D88\u5F53\u524D\u64CD\u4F5C\uFF0C\u518D\u9884\u6F14\u5BF9\u8C61\u3002": "Save or cancel the current edit before rehearsing.",
  "\u5F53\u524D\u5BF9\u8C61\u8FD8\u6CA1\u6709\u5DF2\u4FDD\u5B58\u7684\u52A8\u4F5C\u6216\u4EA4\u4E92\u3002": "This object has no saved motion or interaction.",
  "\u8BF7\u5148\u5B8C\u6210\u5F53\u524D\u64CD\u4F5C\uFF0C\u518D\u8FDB\u5165\u9884\u6F14\u3002": "Finish the current operation before rehearsing.",
  \u65E0: "None",
  "\u4E3B Agent": "Director Agent",
  "\u4EA4\u4E92 Agent": "Interaction Agent",
  "\u52A8\u4F5C Agent": "Motion Agent",
  "\u8349\u56FE Agent": "Sketch Agent",
  "\u5EFA\u8BAE Agent": "Recommendation Agent",
  "\u573A\u666F Agent": "Scene Agent",
  "{0} \xB7 \u5904\u7406\u4E2D": "{0} \xB7 Processing",
  "\u9884\u89C8\u5DF2\u5C31\u7EEA \xB7 \u8BF4\u201C\u5E94\u7528\u201D\u6216\u201C\u653E\u5F03\u201D": "Preview ready \xB7 A Apply \xB7 B Discard",
  "\u5F53\u524D\u9009\u62E9\uFF1A{0}": "Selection: {0}",
  "\u9009\u62E9\u5BF9\u8C61\uFF0C\u6216\u76F4\u63A5\u8BF4\u51FA\u521B\u4F5C\u9700\u6C42": "Select an object or describe your idea",
  "\u95E8\u4EA4\u4E92\uFF1A\u5708\u5B9A\u95E8\u6846\u6E90\u533A\u4E0E\u5730\u9762\u8303\u56F4\uFF0C\u518D\u8BED\u97F3\u63CF\u8FF0\u51FA\u6D41\u548C\u89E6\u53D1\u6761\u4EF6\u3002W/A/S/D \u79FB\u52A8\uFF0C\u53F3\u952E\u62D6\u52A8\u8F6C\u5411\u3002": "Door interaction: draw sources and a floor region, then describe the flow and trigger. WASD Move; right mouse drag Turn.",
  "\u9009\u6F14\u5458\u751F\u6210\u52A8\u4F5C\uFF0C\u9009\u95E8\u8BBE\u7F6E\u533A\u57DF\u4EA4\u4E92\u3002W/A/S/D \u79FB\u52A8\uFF0C\u53F3\u952E\u62D6\u52A8\u8F6C\u5411\u3002": "Select actors for motion or doors for region interactions. WASD Move; right mouse drag Turn.",
  "\u53EA\u7F16\u8F91\u5F53\u524D\u89D2\u8272 \xB7 Agent \u751F\u6210\u57FA\u7840\u52A8\u4F5C \xB7 \u66F2\u7EBF ": "Selected actor \xB7 Agent motion \xB7 Curve ",
  "\u6309\u4F4F\u5DE6 X \u8BF4\u8BDD\uFF0C\u677E\u5F00\u53D1\u9001\u3002": "Hold X to speak, release to review.",
  "\u5EFA\u8BAE\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6\u5EFA\u8BAE": "Suggestions expired. Request new suggestions.",
  "\u76EE\u6807\u6216\u573A\u666F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6\u5EFA\u8BAE": "Target or scene changed. Request new suggestions.",
  \u8BF7\u5148\u5904\u7406\u5F53\u524D\u64CD\u4F5C: "Finish the current operation first.",
  \u5148\u8FDB\u5165\u7F16\u8F91: "Enter edit mode first.",
  \u5148\u9009\u62E9\u4E00\u4E2A\u5149\u6E90: "Select a light first.",
  \u5148\u9009\u62E9\u4E00\u4E2A\u5BF9\u8C61\u548C\u4E00\u6761\u5DF2\u4FDD\u5B58\u66F2\u7EBF: "Select an object and a saved curve first.",
  \u5148\u9009\u62E9\u4E00\u4E2A\u5BF9\u8C61: "Select an object first.",
  "A \u786E\u8BA4 \xB7 B \u53D6\u6D88 / \u8FD4\u56DE \xB7 X \u8BED\u97F3 \xB7 Y \u83DC\u5355 \xB7 \u5DE6\u63E1\u628A\u64AD\u653E / \u6682\u505C": "A Confirm \xB7 B Cancel / Back \xB7 X Voice \xB7 Y Menu \xB7 Left grip Play / Pause",
  "\u6307\u5411\u5730\u9762 \xB7 A / \u53F3\u6273\u673A\u653E\u7F6E \xB7 B \u53D6\u6D88": "Point at ground \xB7 A Place \xB7 B Cancel",
  \u8BF7\u5148\u505C\u6B62\u5F55\u5236: "Stop recording first.",
  "\u5148\u5B8C\u6210\u6216\u53D6\u6D88\u5F53\u524D\u8BED\u97F3\u3001\u8349\u56FE\u6216 Agent \u64CD\u4F5C": "Finish or cancel the current voice, sketch or Agent operation.",
  "\u7F16\u8F91\uFF1A\u53F3\u6273\u673A\u70B9\u9009 \xB7 Transform \u786E\u8BA4\u540E\u6447\u6746/\u53F3\u63E1\u628A\u64CD\u4F5C \xB7 A \u4FDD\u5B58 B \u8FD8\u539F": "Edit: Right trigger Select \u2192 Transform \u2192 Stick / Grip controls \xB7 A Save \xB7 B Revert",
  "\u8BF7\u5148\u6309 A \u653E\u7F6E\u89D2\u8272\uFF0C\u6216 B \u53D6\u6D88": "A Place actor or B Cancel first.",
  "\u5DF2\u8FDB\u5165\u7F16\u8F91\uFF1A\u53F3\u6273\u673A\u70B9\u9009\uFF0C\u9009\u62E9 Transform / Interaction / Other": "Edit mode: select with right trigger \u2192 Transform / Interaction / Other",
  "\u5DF2\u8FDB\u5165\u63A2\u7D22\uFF1A\u4EA4\u4E92\u53EF\u89E6\u53D1\uFF0CX \u8BED\u97F3\u53EC\u5524 Camera Agent": "Explore mode: interactions enabled \xB7 X Voice to summon Camera Agent",
  "\u53F3\u6273\u673A\u9009\u62E9 / \u7ED8\u5236 \xB7 A \u786E\u8BA4 \xB7 B \u53D6\u6D88 \xB7 X \u8BED\u97F3 \xB7 Y \u83DC\u5355": "Right trigger Select / Draw \xB7 A Confirm \xB7 B Cancel \xB7 X Voice \xB7 Y Menu",
  "V \u9009\u62E9 \xB7 X \u8BED\u97F3 \xB7 Y \u5DE5\u5177 \xB7 Enter \u786E\u8BA4 \xB7 Esc \u53D6\u6D88": "V Edit \xB7 X Voice \xB7 Y Tools \xB7 Enter Confirm \xB7 Esc Cancel",
  "\u8BF7\u5148\u5728\u7F16\u8F91\u6A21\u5F0F\u9009\u62E9\u201C\u5E03\u7F6E\u5B8C\u6210\u201D\uFF0C\u518D\u5F00\u59CB\u5F55\u5236": "Choose Finish setup in Edit mode before recording.",
  " \xB7 \u83DC\u5355\u9009\u62E9 Transform": " \xB7 Choose Transform",
  "\u5DE5\u5177\u5DF2\u5728\u5DE6\u4FA7 \xB7 \u5DE6 Y \u6536\u8D77": "Tools on the left \xB7 Y Hide",
  "\u63A2\u7D22\u6A21\u5F0F\u4E0D\u80FD\u7F16\u8F91\uFF0C\u8BF7\u5148\u5207\u6362\u5230\u7F16\u8F91\u6A21\u5F0F": "Switch to Edit mode to make changes.",
  "Flood Agent \xB7 \u7406\u89E3\u533A\u57DF\u4E0E\u89E6\u53D1\u89C4\u5219": "Flood Agent \xB7 Reading regions and triggers",
  "\u4E3B Agent \xB7 \u5206\u6D3E\u4EFB\u52A1": "Director Agent \xB7 Routing task",
  "\u4EA4\u4E92 Agent \xB7 \u7EC4\u7EC7\u52A8\u4F5C": "Interaction Agent \xB7 Planning motion",
  "\u52A8\u4F5C Agent \xB7 \u751F\u6210\u57FA\u7840\u52A8\u4F5C": "Motion Agent \xB7 Generating motion",
  "\u8349\u56FE Agent \xB7 \u7406\u89E3\u66F2\u7EBF": "Sketch Agent \xB7 Interpreting curve",
  "\u5EFA\u8BAE Agent \xB7 \u6574\u7406\u53CD\u9988": "Recommendation Agent \xB7 Preparing suggestions",
  "\u573A\u666F Agent \xB7 \u6784\u9020\u4FEE\u6539": "Scene Agent \xB7 Preparing edits",
  "\u7ED3\u679C\u5DF2\u9884\u89C8\uFF0C\u8BF7\u8BF4\u201C\u5E94\u7528\u201D\u6216\u201C\u653E\u5F03\u201D": "Preview ready \xB7 A Apply \xB7 B Discard",
  \u8BF7\u5148\u6309\u4E0B\u53F3\u6447\u6746\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F: "Click the right stick to enter Edit mode.",
  "\u5F55\u50CF\u4FDD\u5B58\u5728\u672C\u5730\uFF0C\u53EF\u5728\u7535\u8111\u7684\u573A\u666F\u5DE5\u5177 \u2192 \u5F55\u5236\u4E0E\u5BFC\u51FA\u4E2D\u4E0B\u8F7D\u3002": "Recordings are saved locally. Download from Scene tools \u2192 Recording and export on desktop.",
  "\u5DF2\u89E6\u53D1 \xB7 \u8BF4\u201C\u91CD\u65B0\u9884\u6F14\u4EA4\u4E92\u201D\u53EF\u91CD\u6D4B": "Triggered \xB7 Say \u201Creplay interaction\u201D to restart",
  "\u5708\u5185\u505C\u7559 {0} / {1} \u79D2": "Dwell: {0} / {1} s",
  "\u5708\u5916 \xB7 \u8FDB\u5165\u5730\u9762\u5708\uFF0C\u8FDE\u7EED\u505C\u7559\u8D85\u8FC7 {0} \u79D2": "Enter the floor region and dwell for more than {0} s",
  \u5E03\u7F6E\u5B8C\u6210\u72B6\u6001\u65E0\u6548: "Invalid setup state",
  \u53D6\u666F\u76EE\u6807\u65E0\u6548: "Invalid camera target",
  \u7269\u4F53\u59FF\u6001\u65E0\u6548: "Invalid object pose",
  \u5DE5\u5177\u7C7B\u578B\u65E0\u6548: "Invalid tool type",
  \u76F8\u673A\u955C\u5934\u53C2\u6570\u65E0\u6548: "Invalid camera settings",
  \u706F\u5149\u53C2\u6570\u65E0\u6548: "Invalid light settings",
  \u8F68\u9053\u53C2\u6570\u65E0\u6548\u6216\u66F2\u7EBF\u4E0D\u5B58\u5728: "Invalid track or missing curve",
  \u53D6\u666F\u76EE\u6807\u5DF2\u4E0D\u5B58\u5728: "Camera target no longer exists",
  "\u6B64\u7248\u672C\u6700\u591A\u4FDD\u5B58 8 \u53F0\u76F8\u673A\u548C 8 \u76CF\u706F": "This edition supports up to 8 cameras and 8 lights",
  "\u63A7\u5236\u70B9\u65E0\u6548\uFF08\u9700\u8981 2\u201364 \u4E2A\uFF09": "Invalid control points (2\u201364 required)",
  "\u66F2\u7EBF\u8D77\u7EC8\u70B9\u592A\u8FD1\uFF0C\u8BF7\u4FDD\u7559\u6709\u6548\u8DDD\u79BB": "Curve endpoints are too close. Draw a longer path.",
  \u521B\u5EFA\u53C2\u6570\u65E0\u6548: "Invalid creation parameters",
  \u65B9\u5757: "Box",
  \u805A\u5149\u706F: "Spotlight",
  \u70B9\u5149\u6E90: "Point light",
  \u521B\u4F5C\u5DE5\u5177: "Authoring tools",
  "\u8BF7\u6307\u5411\u53EF\u89C1\u5730\u9762\uFF0C\u518D\u6309 A \u786E\u8BA4\u843D\u70B9": "Point at visible ground, then press A to place",
  \u843D\u70B9\u8D85\u51FA\u573A\u666F\u8303\u56F4: "Placement is outside the scene",
  \u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u59FF\u6001: "No pose changes to save",
  \u59FF\u6001\u76EE\u6807\u65E0\u6548: "Invalid pose target",
  \u8BF7\u9009\u62E9\u53EF\u5220\u9664\u7684\u5BF9\u8C61: "Select an editable object to delete",
  "\u8BF7\u5148\u9009\u62E9\u7269\u4EF6\u3001\u76F8\u673A\u6216\u706F\u5149": "Select an object, camera or light first",
  \u4F4D\u7F6E\u65E0\u6548: "Invalid position",
  \u8BE5\u5BF9\u8C61\u4E0D\u662F\u76F8\u673A: "This object is not a camera",
  \u8BE5\u5BF9\u8C61\u4E0D\u662F\u706F\u5149: "This object is not a light",
  \u706F\u5149\u7C7B\u578B\u65E0\u6548: "Invalid light type",
  \u5148\u7ED1\u5B9A\u4E00\u6761\u5DF2\u4FDD\u5B58\u66F2\u7EBF: "Bind a saved curve first",
  \u6CBF\u5207\u7EBF\u671D\u5411\u9700\u8981\u5148\u7ED1\u5B9A\u66F2\u7EBF: "Bind a curve before using tangent orientation",
  \u5F53\u524D\u5BF9\u8C61\u6CA1\u6709\u533A\u57DF\u89E6\u53D1\u6761\u4EF6: "This object has no region trigger",
  \u66F2\u7EBF\u5DF2\u4E0D\u5B58\u5728: "Curve no longer exists",
  \u672A\u77E5\u521B\u4F5C\u64CD\u4F5C: "Unknown authoring operation",
  "\u89E6\u53D1\u8303\u56F4\u9700\u8981\u4E00\u6761\u5DF2\u4FDD\u5B58\u7684 2D \u5730\u9762\u95ED\u5408\u66F2\u7EBF": "A trigger needs a saved closed 2D ground curve",
  \u8BF7\u753B\u4E00\u5708\u95ED\u5408\u533A\u57DF: "Draw a closed region",
  \u89E6\u53D1\u8303\u56F4\u5FC5\u987B\u4F4D\u4E8E\u540C\u4E00\u5730\u9762: "The trigger region must be on one ground plane",
  \u5730\u9762\u89E6\u53D1\u8303\u56F4: "Floor trigger region",
  "\u6700\u591A\u4FDD\u5B58 32 \u4E2A\u5730\u9762\u89E6\u53D1\u8303\u56F4": "Up to 32 floor trigger regions",
  \u5730\u9762\u89E6\u53D1\u8303\u56F4\u65E0\u6548: "Invalid floor trigger region",
  "\u8F68\u9053\u89E6\u53D1\u6761\u4EF6\u65E0\u6548\uFF1A\u9700\u8981\u7528\u6237\u5728\u8303\u56F4\u5185\u8FDE\u7EED\u505C\u7559 0.1\u201360 \u79D2": "Invalid track trigger: user must dwell continuously for 0.1\u201360 seconds",
  \u8BF7\u5148\u9009\u62E9\u9700\u8981\u89E6\u53D1\u7684\u5BF9\u8C61: "Select the object to trigger first",
  \u89E6\u53D1\u8303\u56F4\u548C\u79FB\u52A8\u8DEF\u5F84\u9700\u8981\u5206\u522B\u6307\u5B9A: "Specify the trigger region and movement path separately",
  \u79FB\u52A8\u8DEF\u5F84\u5DF2\u4E0D\u5B58\u5728: "Movement path no longer exists",
  "\u5148\u7ED9\u5F53\u524D\u5BF9\u8C61\u7ED1\u5B9A\u79FB\u52A8\u8DEF\u5F84\uFF0C\u518D\u8BBE\u7F6E\u89E6\u53D1\u8303\u56F4": "Bind a movement path before setting its trigger region",
  "\u5730\u9762\u5708\u662F\u89E6\u53D1\u8303\u56F4\uFF0C\u4E0D\u80FD\u540C\u65F6\u4F5C\u4E3A\u8FD9\u6B21\u79FB\u52A8\u8DEF\u5F84": "Use separate curves for the trigger region and movement path",
  \u8BF7\u6307\u5B9A\u5DF2\u4FDD\u5B58\u7684\u5730\u9762\u5708\u4F5C\u4E3A\u89E6\u53D1\u8303\u56F4: "Choose a saved closed ground curve as the trigger region",
  "\u573A\u666F\u3001\u6A21\u5F0F\u6216\u76EE\u6807\u5DF2\u53D8\u5316\u3002\u8BF7\u6309 B \u53D6\u6D88\u8FD9\u53E5\u8BDD\uFF0C\u518D\u6309 X \u91CD\u65B0\u8BF4\u8BDD\u3002": "Scene, mode or target changed. B Cancel this transcript, then X Speak again.",
  "\u7A7A\u95F4\u5BF9\u9F50\u5DF2\u53D8\u5316\uFF0C\u8BF7\u53D6\u6D88\u8FD9\u53E5\u8BDD\u5E76\u91CD\u65B0\u8BF4\u8BDD\u3002": "Alignment changed. Cancel this transcript and speak again.",
  "\u64CD\u4F5C\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u64CD\u4F5C": "Operation expired. Please retry.",
  "\u63A2\u7D22\u6A21\u5F0F\u4E0D\u80FD\u7F16\u8F91\u573A\u666F\uFF0C\u8BF7\u5148\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F": "Enter Edit mode to change the scene",
  \u6A21\u5F0F\u65E0\u6548: "Invalid mode",
  "\u6A21\u5F0F\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0": "Mode changed. Please refresh.",
  \u533A\u57DF\u8F6E\u5ED3\u70B9\u65E0\u6548\u6216\u8FC7\u591A: "Invalid or excessive region points",
  "\u533A\u57DF\u592A\u5C0F\u6216\u592A\u5927\uFF0C\u8BF7\u91CD\u65B0\u5708\u5B9A": "Region is too small or too large. Draw it again.",
  \u533A\u57DF\u5B58\u5728\u91CD\u590D\u9876\u70B9: "Region has duplicate vertices",
  "\u533A\u57DF\u8F6E\u5ED3\u4E0D\u80FD\u4EA4\u53C9\uFF0C\u8BF7\u91CD\u753B\u8FD9\u4E00\u5708": "Region boundaries cannot cross. Draw the loop again.",
  \u533A\u57DF\u8F6E\u5ED3\u8FC7\u957F: "Region boundary is too long",
  "\u8BF7\u628A\u7B14\u753B\u753B\u56DE\u8D77\u70B9\u9644\u8FD1\uFF0C\u5F62\u6210\u95ED\u5408\u533A\u57DF": "Return near the starting point to close the region",
  \u533A\u57DF\u6240\u5C5E\u7684\u95E8\u5DF2\u4E0D\u5B58\u5728: "The region's door no longer exists",
  "\u6700\u591A\u4FDD\u5B58 32 \u5757\u4EA4\u4E92\u533A\u57DF": "Up to 32 interaction regions",
  \u4EA4\u4E92\u533A\u57DF\u7684\u6807\u8BC6\u6216\u6240\u5C5E\u95E8\u65E0\u6548: "Invalid region ID or door",
  \u533A\u57DF\u8868\u9762\u65E0\u6548: "Invalid region surface",
  "\u6BCF\u6247\u95E8\u6700\u591A 8 \u5757\u533A\u57DF": "Up to 8 regions per door",
  \u533A\u57DF\u8D85\u51FA\u573A\u666F\u8FB9\u754C: "Region is outside the scene",
  "\u6E90\u533A\u8D85\u51FA\u95E8\u6846\u53C2\u8003\u9762\uFF0C\u8BF7\u91CD\u65B0\u5708\u5B9A": "Source region is outside the door frame. Draw it again.",
  \u8349\u56FE\u76EE\u6807\u4E0E\u6240\u9009\u95E8\u4E0D\u5339\u914D: "Sketch target does not match the selected door",
  "\u5E73\u6ED1\u7ED3\u679C\u4E0D\u9002\u5408\u5F53\u524D\u8DEF\u7EBF\uFF0C\u5DF2\u4FDD\u7559\u539F\u7EBF\u3002": "Smoothing did not fit this path. Original stroke retained.",
  \u753B\u7B14\u6A21\u5F0F\u65E0\u6548: "Invalid brush mode",
  "\u8BF7\u5148\u677E\u5F00\u6273\u673A\uFF0C\u518D\u8C03\u6574\u5E73\u6ED1": "Release the trigger before adjusting smoothing",
  "\u5E73\u6ED1\u66F2\u7EBF\u8D8A\u8FC7\u5730\u9762\u8FB9\u7F18\uFF0C\u5DF2\u4FDD\u7559\u539F\u7EBF\u3002": "Smoothed curve crossed the floor edge. Original stroke retained.",
  \u539F\u7EBF: "Original",
  \u66F4\u5E73\u6ED1: "Strong",
  "Extreme \xB7 \u62C9\u76F4": "Extreme \xB7 Straight",
  \u66F2\u7EBF\u5E73\u6ED1\u6A21\u5F0F\u65E0\u6548: "Invalid smoothing mode",
  "\u7A7A\u4E2D\u753B\u7B14 \xB7 \u79FB\u52A8\u53F3\u624B\u6309\u4F4F\u6273\u673A\u7ED8\u5236 \xB7 Y \u6253\u5F00\u83DC\u5355\u4FDD\u5B58": "Spatial brush \xB7 Hold right trigger and move your hand \xB7 Y Save menu"
};

// src/shared/language/number-words.json
var number_words_default = {
  actorDelays: {
    \u96F6: 0,
    \u4E00: 1,
    \u4E8C: 2,
    \u4E24: 2,
    \u4E09: 3,
    \u56DB: 4,
    \u4E94: 5,
    \u516D: 6,
    \u4E03: 7,
    \u516B: 8,
    \u4E5D: 9,
    \u5341: 10
  },
  actorMotionNumbers: {
    \u4E00: 1,
    \u4E8C: 2,
    \u4E09: 3,
    \u56DB: 4,
    \u4E94: 5,
    \u516D: 6,
    \u4E03: 7
  },
  transformAmounts: {
    \u534A: 0.5,
    \u4E00: 1,
    \u4E24: 2,
    \u4E8C: 2,
    \u4E09: 3,
    \u56DB: 4,
    \u4E94: 5,
    \u516D: 6,
    \u4E03: 7,
    \u516B: 8,
    \u4E5D: 9,
    \u5341: 10,
    \u5341\u4E94: 15,
    \u4E09\u5341: 30,
    \u56DB\u5341\u4E94: 45,
    \u4E5D\u5341: 90
  }
};

// src/shared/language/terms.json
var terms_default = {
  cute: "\u53EF\u7231",
  birthday: "\u751F\u65E5"
};

// src/shared/language.mjs
function languagePattern(id) {
  let pattern = intent_patterns_default[id];
  if (!pattern) throw Error(`Unknown language pattern: ${id}`);
  return new RegExp(pattern.source, pattern.flags);
}

// src/shared/doors.mjs
var isDoor = (o) => !!o && o.shape === "box" && (o.role === "door" || o.group === "rebuilt-doors" || o.group === "scan-doors");
function validateDoorEffects(scene2) {
  if (scene2.doorEffects === void 0) return;
  if (!Array.isArray(scene2.doorEffects) || scene2.doorEffects.length > 30) throw new Error("Invalid door effect");
  let ids = /* @__PURE__ */ new Set();
  for (let d of scene2.doorEffects) {
    if (!isDoor(scene2.objects.find((o) => o.id === d.objectId)) || ids.has(d.objectId)) throw new Error("A door effect must reference a unique door object");
    if (ids.add(d.objectId), !["left", "right"].includes(d.hinge) || ![-1, 1].includes(d.direction) || typeof d.open != "boolean" || !Number.isFinite(d.duration) || d.duration < 0.2 || d.duration > 10) throw new Error("Invalid door parameters");
  }
}
function doorTransform(object3, effect, progress = effect.open ? 1 : 0) {
  let h = (effect.hinge === "left" ? -1 : 1) * object3.size[0] / 2, base = object3.rotation, p = object3.position, rotation = base + effect.direction * Math.PI / 2 * progress;
  return { id: object3.id, position: [p[0] + h * Math.cos(base) - h * Math.cos(rotation), p[1], p[2] - h * Math.sin(base) + h * Math.sin(rotation)], rotation };
}
function createDoorPlayer() {
  let definitions = /* @__PURE__ */ new Map(), entries = /* @__PURE__ */ new Map(), paused = !1, initialized = !1;
  function sync(scene2, { reset = !1 } = {}) {
    definitions = new Map(scene2.objects.map((o) => [o.id, o]));
    let next = /* @__PURE__ */ new Map();
    for (let d of scene2.doorEffects || []) {
      let previous = !reset && entries.get(d.objectId), same = previous && previous.effect.hinge === d.hinge && previous.effect.direction === d.direction;
      next.set(d.objectId, { effect: d, progress: reset || !initialized ? d.open ? 1 : 0 : same ? previous.progress : 0 });
    }
    entries = next, initialized = !0, reset && (paused = !1);
  }
  function frame(dt) {
    let result = [];
    for (let [id, item2] of entries) {
      let target = item2.effect.open ? 1 : 0;
      if (!paused) {
        let step = Math.max(0, Math.min(dt, 0.1)) / item2.effect.duration;
        item2.progress += Math.sign(target - item2.progress) * Math.min(step, Math.abs(target - item2.progress));
      }
      let t = item2.progress;
      result.push(doorTransform(definitions.get(id), item2.effect, t * t * (3 - 2 * t)));
    }
    return result;
  }
  return { sync, frame, pause: () => {
    paused = !0;
  }, resume: () => {
    paused = !1;
  }, snapshot: () => ({ paused, doors: [...entries].map(([id, v2]) => ({ id, progress: v2.progress, ...v2.effect })) }) };
}
function doorMenuEntry(context) {
  return context.phase === "explore" && context.door && !context.job && !context.saving && !context.finishing && context.recording === "idle" && !context.actorPlacing ? [{ id: "doors", label: `${context.door.name} \xB7 Door settings`, disabled: !!context.editingBusy }] : [];
}

// src/shared/curve-smoothing.mjs
var CURVE_SMOOTHING = Object.freeze({
  off: Object.freeze({ label: "Original", radius: 0, tolerance: 0, rounding: 0 }),
  standard: Object.freeze({ label: "Standard", radius: 0.025, tolerance: 0.02, rounding: 0.06 }),
  strong: Object.freeze({ label: "Strong", radius: 0.045, tolerance: 0.04, rounding: 0.1 }),
  extreme: Object.freeze({ label: "Extreme \xB7 Straight", radius: 0.045, tolerance: 0, rounding: 0 })
}), distance = (a, b) => Math.hypot(...a.map((v2, i) => v2 - b[i])), mix = (a, b, t) => a.map((v2, i) => v2 + (b[i] - v2) * t);
function smoothingProfile(level) {
  let profile = Object.hasOwn(CURVE_SMOOTHING, level) && CURVE_SMOOTHING[level];
  if (!profile) throw Error("Invalid smoothing mode");
  return profile;
}
function stabilizedPoint(previous, input, level) {
  let { radius } = smoothingProfile(level), d = distance(previous, input);
  return d <= radius ? [...previous] : mix(previous, input, (d - radius) / d);
}
function segmentDistance(point2, a, b) {
  let delta = b.map((v2, i) => v2 - a[i]), lengthSquared = delta.reduce((s, v2) => s + v2 * v2, 0), t = lengthSquared ? Math.max(0, Math.min(1, delta.reduce((s, v2, i) => s + v2 * (point2[i] - a[i]), 0) / lengthSquared)) : 0;
  return distance(point2, mix(a, b, t));
}
function simplify(points, tolerance) {
  if (points.length < 3) return points.map((p) => [...p]);
  let keep = /* @__PURE__ */ new Set([0, points.length - 1]), pending = [[0, points.length - 1]];
  for (; pending.length; ) {
    let [start, end] = pending.pop(), furthest = -1, maximum = tolerance;
    for (let i = start + 1; i < end; i++) {
      let d = segmentDistance(points[i], points[start], points[end]);
      d > maximum && (maximum = d, furthest = i);
    }
    furthest >= 0 && (keep.add(furthest), pending.push([start, furthest], [furthest, end]));
  }
  return [...keep].sort((a, b) => a - b).map((i) => [...points[i]]);
}
function smoothCurve(raw, level = "standard", { maxPoints = 512 } = {}) {
  let profile = smoothingProfile(level);
  if (level === "extreme" && raw.length > 1) return [[...raw[0]], [...raw.at(-1)]];
  if (level === "off" || raw.length < 3) return raw.map((p) => [...p]);
  let knots = simplify(raw, profile.tolerance), result = [[...knots[0]]], extraBudget = Math.max(0, maxPoints - knots.length);
  for (let i = 1; i < knots.length - 1; i++) {
    let a = knots[i - 1], b = knots[i], c = knots[i + 1], ab = distance(a, b), bc = distance(b, c);
    if ((ab && bc ? b.reduce((sum, v2, k) => sum + (v2 - a[k]) * (c[k] - v2), 0) / (ab * bc) : -1) <= 0.5 || extraBudget < 4 || ab < 0.01 || bc < 0.01) {
      result.push([...b]);
      continue;
    }
    let cut = Math.min(profile.rounding, ab * 0.25, bc * 0.25), entry = mix(b, a, cut / ab), exit = mix(b, c, cut / bc);
    for (let t of [0, 0.25, 0.5, 0.75, 1]) result.push(mix(mix(entry, b, t), mix(b, exit, t), t));
    extraBudget -= 4;
  }
  return knots.length > 1 && result.push([...knots.at(-1)]), result;
}

// src/shared/region-surfaces.mjs
import { Vector3 as Vector32, Quaternion, Mesh, MeshBasicMaterial, DoubleSide, Raycaster } from "three";

// src/shared/object-geometry.mjs
import { BoxGeometry as BoxGeometry2, SphereGeometry, CylinderGeometry as CylinderGeometry2, ConeGeometry } from "three";

// src/shared/camera-geometry.mjs
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
function cameraGeometry() {
  let parts = [];
  function part(geometry2, color, position) {
    let g = geometry2.toNonIndexed();
    geometry2.dispose(), g.translate(...position);
    let rgb = new THREE.Color(color), colors = [];
    for (let i = 0; i < g.attributes.position.count; i++) colors.push(rgb.r, rgb.g, rgb.b);
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3)), parts.push(g);
  }
  part(new THREE.BoxGeometry(0.78, 0.62, 0.5), "#ffffff", [0, -0.06, 0.14]), part(new THREE.BoxGeometry(0.2, 0.76, 0.48), "#657080", [0.43, -0.1, 0.14]), part(new THREE.BoxGeometry(0.28, 0.23, 0.28), "#dce3ec", [0, 0.36, 0.12]), part(new THREE.BoxGeometry(0.42, 0.31, 0.025), "#142332", [-0.04, -0.04, 0.405]), part(new THREE.CylinderGeometry(0.25, 0.28, 0.44, 24).rotateX(Math.PI / 2), "#26323e", [0, -0.05, -0.32]), part(new THREE.CylinderGeometry(0.22, 0.22, 0.035, 24).rotateX(Math.PI / 2), "#7ecae8", [0, -0.05, -0.56]);
  let merged = mergeGeometries(parts, !1);
  parts.forEach((g) => g.dispose()), merged.computeBoundingBox();
  let center = merged.boundingBox.getCenter(new THREE.Vector3()), size = merged.boundingBox.getSize(new THREE.Vector3());
  return merged.translate(-center.x, -center.y, -center.z), merged.scale(1 / size.x, 1 / size.y, 1 / size.z), merged.computeBoundingBox(), merged.computeBoundingSphere(), merged;
}

// src/shared/object-geometry.mjs
function objectGeometry(o) {
  return o.kind === "camera" ? cameraGeometry() : o.shape === "box" ? new BoxGeometry2(1, 1, 1) : o.shape === "sphere" ? new SphereGeometry(0.5, 16, 10) : o.shape === "cylinder" ? new CylinderGeometry2(0.5, 0.5, 1, 24) : new ConeGeometry(0.5, 1, o.id.includes("roof") ? 4 : 16);
}

// src/shared/region-surfaces.mjs
var meshes = /* @__PURE__ */ new Map(), projections = /* @__PURE__ */ new WeakMap(), material = new MeshBasicMaterial({ side: DoubleSide }), vector = (v2) => Array.isArray(v2) && v2.length === 3 && v2.every(Number.isFinite), q = (o) => o.quaternion ? new Quaternion(...o.quaternion) : new Quaternion().setFromAxisAngle(new Vector32(0, 1, 0), o.rotation || 0), isRegionObject = (o) => !!o && ["box", "sphere", "cylinder", "cone"].includes(o.shape) && o.editable !== !1 && (o.editable === !0 || !(o.id === "ground" || o.category === "structure" || /^(wall|ceiling)(_|-|$)/.test(o.id)));
function geometryMesh(o) {
  let key = [o.shape, o.kind || "", o.id.includes("roof")].join(":");
  if (!meshes.has(key)) {
    let mesh = new Mesh(objectGeometry(o), material);
    mesh.updateMatrixWorld(), meshes.set(key, mesh);
  }
  return meshes.get(key);
}
function surfaceFrame(o, worldPoint, worldNormal) {
  let inverse = q(o).invert(), normal = new Vector32(...worldNormal).applyQuaternion(inverse).normalize(), vertical = new Vector32(0, 1, 0).applyQuaternion(inverse), u = new Vector32().crossVectors(vertical, normal);
  u.lengthSq() < 0.01 && (u = new Vector32(1, 0, 0).applyQuaternion(inverse).projectOnPlane(normal)), u.normalize();
  let v2 = new Vector32().crossVectors(normal, u).normalize();
  return { origin: new Vector32(...worldPoint).sub(new Vector32(...o.position)).applyQuaternion(inverse).toArray(), u: u.toArray(), v: v2.toArray(), normal: normal.toArray(), size: [...o.size] };
}
function validateSurfaceFrame(frame) {
  if (!frame || !["origin", "u", "v", "normal", "size"].every((k) => vector(frame[k])) || frame.size.some((n2) => n2 < 0.02 || n2 > 100)) throw Error("Invalid object surface frame.");
  let [u, v2, n] = ["u", "v", "normal"].map((k) => new Vector32(...frame[k]));
  if ([u, v2, n].some((a) => Math.abs(a.length() - 1) > 0.01) || Math.abs(u.dot(v2)) > 0.01 || new Vector32().crossVectors(u, v2).dot(n) < 0.99 || frame.origin.some((x, i) => Math.abs(x) > frame.size[i] * 0.55 + 0.01)) throw Error("Invalid object surface axes.");
  return frame;
}
function surfaceUV(o, frame, worldPoint) {
  let local = new Vector32(...worldPoint).sub(new Vector32(...o.position)).applyQuaternion(q(o).invert()).divide(new Vector32(...o.size)).multiply(new Vector32(...frame.size)).sub(new Vector32(...frame.origin));
  return [local.dot(new Vector32(...frame.u)), local.dot(new Vector32(...frame.v))];
}
function surfaceLocalPoint(o, frame, p) {
  let cache2 = projections.get(frame);
  cache2 || (cache2 = /* @__PURE__ */ new Map(), projections.set(frame, cache2));
  let key = [o.shape, o.kind || "", o.id.includes("roof"), ...p].join(":");
  if (cache2.has(key)) return cache2.get(key);
  let size = new Vector32(...frame.size), base = new Vector32(...frame.origin).addScaledVector(new Vector32(...frame.u), p[0]).addScaledVector(new Vector32(...frame.v), p[1]).divide(size), normal = new Vector32(...frame.normal).divide(size).normalize(), hit = new Raycaster(base.clone().addScaledVector(normal, 3), normal.clone().negate(), 0, 6).intersectObject(geometryMesh(o), !1)[0], point2 = !hit || hit.face.normal.dot(normal) < 0.08 ? null : hit.point.toArray();
  return cache2.set(key, point2), point2;
}
function objectRegionFrame(o, frame) {
  let rotation = q(o), size = new Vector32(...o.size), reference = new Vector32(...frame.size), scalePoint = (p) => new Vector32(...p).multiply(size).applyQuaternion(rotation).add(new Vector32(...o.position)).toArray(), direction = (a) => new Vector32(...a).divide(reference).multiply(size).applyQuaternion(rotation).toArray();
  return { origin: scalePoint(new Vector32(...frame.origin).divide(reference).toArray()), u: direction(frame.u), v: direction(frame.v), normal: new Vector32(...frame.normal).multiply(reference).divide(size).applyQuaternion(rotation).normalize().toArray(), project(p) {
    let point2 = surfaceLocalPoint(o, frame, p);
    if (!point2) throw Error("Region leaves the object surface. Redraw a smaller closed region.");
    return scalePoint(point2);
  } };
}

// src/shared/interaction-regions.mjs
var regionObjectId = (r) => r?.objectId || r?.doorId, isSourceRegion = (r) => r?.surface === "object-surface" || r?.surface === "door-frame", REGION_LIMITS = Object.freeze({ points: 128, regions: 32, perDoor: 8, spacing: 0.018, maxGap: 0.6, perimeter: 30 }), finite = (n) => Number.isFinite(n) && Math.abs(n) <= 100, distance2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]), cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]), polygonArea = (points) => Math.abs(points.reduce((s, p, i) => {
  let q2 = points[(i + 1) % points.length];
  return s + p[0] * q2[1] - q2[0] * p[1];
}, 0)) / 2;
function edgeDistance(p, a, b) {
  let dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
  return distance2(p, [a[0] + dx * t, a[1] + dy * t]);
}
function polygonContains(points, p, margin = 0) {
  let inside = !1, nearest = 1 / 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    let a = points[i], b = points[j];
    nearest = Math.min(nearest, edgeDistance(p, a, b)), a[1] > p[1] != b[1] > p[1] && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0] && (inside = !inside);
  }
  return inside || nearest <= margin + 1e-8;
}
function intersects(a, b, c, d) {
  let x = cross(a, b, c), y = cross(a, b, d), z = cross(c, d, a), w = cross(c, d, b);
  return x * y < 0 && z * w < 0 || Math.abs(x) < 1e-9 && edgeDistance(c, a, b) < 1e-8 || Math.abs(y) < 1e-9 && edgeDistance(d, a, b) < 1e-8 || Math.abs(z) < 1e-9 && edgeDistance(a, c, d) < 1e-8 || Math.abs(w) < 1e-9 && edgeDistance(b, c, d) < 1e-8;
}
function validatePolygon(points, surface, maxPoints = REGION_LIMITS.points) {
  if (!Array.isArray(points) || points.length < 3 || points.length > maxPoints || points.some((p) => !Array.isArray(p) || p.length !== 2 || !p.every(finite))) throw Error("Invalid or excessive region points");
  let area = polygonArea(points);
  if (area < (surface === "floor" ? 0.04 : 2e-3) || area > 30) throw Error("Region is too small or too large. Draw it again.");
  let length2 = 0;
  for (let i = 0; i < points.length; i++) {
    let a = points[i], b = points[(i + 1) % points.length], step = distance2(a, b);
    if (step < 1e-5) throw Error("Region has duplicate vertices");
    length2 += step;
    for (let j = i + 2; j < points.length; j++)
      if (!(i === 0 && j === points.length - 1) && intersects(a, b, points[j], points[(j + 1) % points.length]))
        throw Error("Region boundaries cannot cross. Draw the loop again.");
  }
  if (length2 > REGION_LIMITS.perimeter) throw Error("Region boundary is too long");
  return points;
}
function closeRegionStroke(raw, surface) {
  if (raw.length < 4) throw Error("Draw a closed region");
  if (distance2(raw[0], raw.at(-1)) > 0.18) throw Error("Return near the starting point to close the region");
  let points = raw.filter((p, i) => i === 0 || distance2(p, raw[i - 1]) > 1e-5).map((p) => [...p]);
  distance2(points[0], points.at(-1)) < 0.025 && points.pop(), validatePolygon(points, surface, 1024);
  let closed = [...points, points[0]].map((p) => [p[0], 0, p[1]]), smooth = smoothCurve(closed, "standard", { maxPoints: REGION_LIMITS.points + 1 }).slice(0, -1).map((p) => [p[0], p[2]]), bounded2 = points.length <= 128 ? points : points.filter((_, i) => Math.floor(i * 128 / points.length) !== Math.floor((i - 1) * 128 / points.length));
  try {
    return validatePolygon(smooth, surface), smooth;
  } catch {
    return validatePolygon(bounded2, surface), bounded2;
  }
}
function regionFrame(scene2, region) {
  if (region.surface === "floor") return { origin: [0, region.floorY, 0], u: [1, 0, 0], v: [0, 0, 1], normal: [0, 1, 0] };
  if (region.surface === "object-surface") {
    let object3 = scene2.objects.find((o) => o.id === regionObjectId(region));
    if (!object3) throw Error("The region object no longer exists.");
    return objectRegionFrame({ ...object3, ...scene2.regionPoses?.get(object3.id) }, region.frame);
  }
  let door = scene2.objects.find((o) => o.id === region.doorId);
  if (!door) throw Error("The region's door no longer exists");
  let c = Math.cos(door.rotation), s = Math.sin(door.rotation), side = region.side;
  return { origin: [door.position[0] + s * side * Math.max(door.size[2] / 2 + 0.025, 0.12), door.position[1], door.position[2] + c * side * Math.max(door.size[2] / 2 + 0.025, 0.12)], u: [c * side, 0, -s * side], v: [0, 1, 0], normal: [s * side, 0, c * side] };
}
var framePoint = (frame, p) => frame.project ? frame.project(p) : frame.origin.map((n, i) => n + frame.u[i] * p[0] + frame.v[i] * p[1]), frameUV = (frame, p) => [frame.u, frame.v].map((axis) => axis.reduce((sum, n, i) => sum + n * (p[i] - frame.origin[i]), 0));
function validateRegions(regions, scene2) {
  if (!Array.isArray(regions) || regions.length > REGION_LIMITS.regions) throw Error("Up to 32 interaction regions");
  let ids = /* @__PURE__ */ new Set(), counts = /* @__PURE__ */ new Map();
  for (let r of regions) {
    let owner = scene2.objects.find((o) => o.id === regionObjectId(r));
    if (!r || r.schema !== "vrbuild-region/1" || typeof r.id != "string" || !/^[\w-]{1,80}$/.test(r.id) || ids.has(r.id) || !(isRegionObject(owner) || isDoor(owner)) || r.objectId && r.doorId && r.objectId !== r.doorId || !["door-frame", "object-surface", "floor"].includes(r.surface) || typeof r.name != "string" || r.name.length > 80) throw Error("Invalid region ID or object target.");
    if (r.surface === "door-frame" && !isDoor(owner)) throw Error("Legacy door-frame regions require their original door.");
    if (validatePolygon(r.points, r.surface), r.surface === "object-surface") {
      if (validateSurfaceFrame(r.frame), !Array.isArray(r.points) || r.points.some((p) => !Array.isArray(p) || p.length !== 2 || !p.every(finite))) throw Error("Invalid surface region points.");
      for (let i = 0; i < r.points.length; i++) {
        let a = r.points[i], b = r.points[(i + 1) % r.points.length];
        for (let j = 0; j <= 4; j++) if (!surfaceLocalPoint(owner, r.frame, a.map((n, k) => n + (b[k] - n) * j / 4))) throw Error("Region leaves the object surface. Redraw a smaller closed region.");
      }
    }
    if (r.surface === "door-frame" && ![-1, 1].includes(r.side) || r.surface === "floor" && !finite(r.floorY)) throw Error("Invalid region surface");
    if (ids.add(r.id), counts.set(regionObjectId(r), (counts.get(regionObjectId(r)) || 0) + 1), counts.get(regionObjectId(r)) > REGION_LIMITS.perDoor) throw Error("Each object supports up to 8 regions.");
    let frame = regionFrame(scene2, r);
    if (r.points.some((p) => framePoint(frame, p).some((n) => !finite(n)))) throw Error("Region is outside the scene");
    if (r.surface === "door-frame") {
      let door = scene2.objects.find((o) => o.id === r.doorId);
      if (r.points.some((p) => Math.abs(p[0]) > door.size[0] / 2 + 0.6 || p[1] < -door.size[1] / 2 - 0.1 || p[1] > door.size[1] / 2 + 0.3)) throw Error("Source region is outside the door frame. Draw it again.");
    }
  }
  return regions;
}

// src/shared/transforms.mjs
import { Quaternion as Quaternion4, Vector3 as Vector35 } from "three";

// src/shared/scene.mjs
import { Quaternion as Quaternion3, Vector3 as Vector34 } from "three";

// src/shared/categories.mjs
var ROOM_PALETTE = Object.freeze({ wall: "#DFE4EA", floor: "#A4B0BE", ceiling: "#F1F2F6", door: "#FFA502" }), CATEGORIES = {
  structure: { label: "Structure", color: ROOM_PALETTE.wall },
  table: { label: "Tables", color: "#70A1FF" },
  seating: { label: "Seating", color: "#ECCC68" },
  storage: { label: "Storage", color: "#FF6B81" },
  equipment: { label: "Equipment", color: "#7BED9F" },
  other: { label: "Other", color: "#A4B0BE" }
}, CATEGORY_IDS = Object.keys(CATEGORIES);
function categoryOf(object3) {
  if (CATEGORY_IDS.includes(object3.category)) return object3.category;
  let group = object3.group || "", match = (text) => languagePattern("category.seating").test(text) ? "seating" : languagePattern("category.table").test(text) ? "table" : languagePattern("category.equipment").test(text) && !languagePattern("category.cabinet").test(text) ? "equipment" : languagePattern("category.storage").test(text) ? "storage" : languagePattern("category.structure").test(text) ? "structure" : languagePattern("category.workstation").test(text) ? "table" : null;
  return match(object3.id) || match(object3.name) || match(group) || "other";
}
function categoryInfo(object3) {
  return CATEGORIES[categoryOf(object3)];
}
function isCeiling(object3) {
  return object3.id === "ceiling" || object3.group === "ceiling" || languagePattern("category.ceiling").test(object3.name);
}
var legacy = Object.freeze({ wall: "#8d939a", floor: "#5b626b", ceiling: "#a7adb3", door: "#dfad78", window: "#79b9ce", table: "#72abd5", seating: "#e8ad67", storage: "#ac93cd", equipment: "#78b5a0", other: "#c6bcac" });
function blockoutColor(object3, scene2) {
  if (object3.colorSource === "custom" || object3.texture || object3.material || !scene2?.scanReconstruction || object3.editable !== !0 || object3.roughness !== 0.95 || object3.metalness !== 0) return object3.color;
  let color = object3.color?.toLowerCase();
  return object3.category === "structure" && (["ground", "ceiling"].includes(object3.id) || /^rebuilt-(floor|ceiling|wall|door|window)-\d+$/.test(object3.id)) && legacy[object3.role] === color ? ROOM_PALETTE[object3.role] || CATEGORIES.structure.color : object3.role === "furniture" && object3.scanAnchorId && object3.id.startsWith("rebuilt-content-" + object3.scanAnchorId + "-") && legacy[object3.category] === color ? CATEGORIES[object3.category].color : object3.role === "window" && object3.category === "structure" && object3.scanAnchorId && object3.id === "rebuilt-content-" + object3.scanAnchorId + "-surface" && color === legacy.window ? CATEGORIES.structure.color : object3.color;
}

// src/shared/behaviors.mjs
function validateBehaviors(scene2) {
  if (scene2.behaviors) throw Error("Unsupported scene data");
}

// src/shared/room-spatial.mjs
var dot = (a, b) => a.reduce((sum, v2, i) => sum + v2 * b[i], 0), sub = (a, b) => a.map((v2, i) => v2 - b[i]), length = (a) => Math.hypot(...a), point = (value) => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
function validateRoomMetrics(value) {
  if (!value || typeof value != "object") throw new Error("Room dimensions are missing");
  for (let key of ["width", "depth"]) if (!Number.isFinite(value[key]) || value[key] < 1 || value[key] > 40) throw new Error("Room width and depth must be between 1 and 40 meters");
  if (!Number.isFinite(value.height) || value.height < 1.8 || value.height > 8) throw new Error("Room height must be between 1.8 and 8 meters");
  if (!["estimated", "manual", "controller", "quest-planes"].includes(value.source)) throw new Error("Invalid room dimension source");
  return { width: value.width, depth: value.depth, height: value.height, source: value.source };
}
function calibrationFromCorners(a, b, c, height) {
  if (![a, b, c].every(point)) throw new Error("Invalid corner coordinates");
  if (Math.max(a[1], b[1], c[1]) - Math.min(a[1], b[1], c[1]) > 0.15) throw new Error("All three corners must be on the same floor");
  let ab = [b[0] - a[0], 0, b[2] - a[2]], width = length(ab), x = ab.map((v2) => v2 / width), z = [-x[2], 0, x[0]], bc = sub(c, b), signedDepth = dot(bc, z), depth = Math.abs(signedDepth);
  if (!Number.isFinite(width) || width < 1) throw new Error("A and B are too close. Select two floor corners on the same wall.");
  if (Math.abs(dot(bc, x)) > Math.max(0.35, depth * 0.15)) throw new Error("C should be the next corner along the wall adjacent to B");
  return { metrics: validateRoomMetrics({ width, depth, height, source: "controller" }), origin: [a[0] + x[0] * width / 2 + z[0] * signedDepth / 2, a[1], a[2] + x[2] * width / 2 + z[2] * signedDepth / 2], yaw: Math.atan2(-x[2], x[0]) };
}
function floorIntersection(origin, direction, floorY = 0) {
  if (!point(origin) || !point(direction) || direction[1] >= -0.015) return null;
  let t = (floorY - origin[1]) / direction[1];
  return t <= 0 || t > 20 ? null : origin.map((v2, i) => v2 + t * direction[i]);
}
function ceilingHeightAtWall(origin, direction, a, b) {
  let ab = sub(b, a), normal = [-ab[2], 0, ab[0]], denom = dot(direction, normal);
  if (Math.abs(denom) < 0.02) throw new Error("From inside the room, aim at the ceiling edge above wall A\u2013B");
  let t = dot(sub(a, origin), normal) / denom;
  if (t <= 0 || t > 25) throw new Error("Aim at wall A\u2013B");
  let hit = origin.map((v2, i) => v2 + t * direction[i]), u = dot(sub(hit, a), ab) / dot(ab, ab);
  if (u < -0.1 || u > 1.1) throw new Error("Aim at the upper edge of the wall between A and B");
  let height = hit[1] - a[1];
  if (height < 1.8 || height > 8) throw new Error("Measured height is outside the valid range. Aim at the wall\u2013ceiling edge.");
  return height;
}
function roomFromPlanes(planes, preferredAspect = 1) {
  let horizontal = planes.filter((p) => p.orientation === "horizontal" && p.points?.length >= 3), area = (p) => Math.abs(p.points.reduce((a, v2, i) => {
    let q2 = p.points[(i + 1) % p.points.length];
    return a + v2[0] * q2[2] - q2[0] * v2[2];
  }, 0) / 2), floor = horizontal.filter((p) => languagePattern("scene.floor").test(p.label || "")).sort((a, b) => area(b) - area(a))[0], ceiling = horizontal.filter((p) => languagePattern("scene.ceiling").test(p.label || "")).sort((a, b) => area(b) - area(a))[0];
  if (!floor || !ceiling || area(floor) < 1) return null;
  let edge = [1, 0, 0], longest = 0;
  for (let i = 0; i < floor.points.length; i++) {
    let d = sub(floor.points[(i + 1) % floor.points.length], floor.points[i]);
    d[1] = 0, length(d) > longest && (longest = length(d), edge = d);
  }
  if (longest < 1) return null;
  let x = edge.map((v2) => v2 / longest), z = [-x[2], 0, x[0]], bounds = (axis) => {
    let values = floor.points.map((p) => dot(p, axis));
    return [Math.min(...values), Math.max(...values)];
  }, bx = bounds(x), bz = bounds(z), width = bx[1] - bx[0], depth = bz[1] - bz[0];
  if (Math.abs(Math.log(depth / width / preferredAspect)) < Math.abs(Math.log(width / depth / preferredAspect))) {
    let old = x;
    x = z, z = old.map((v2) => -v2), bx = bounds(x), bz = bounds(z), width = bx[1] - bx[0], depth = bz[1] - bz[0];
  }
  let floorY = floor.points.reduce((v2, p) => v2 + p[1], 0) / floor.points.length, ceilingY = ceiling.points.reduce((v2, p) => v2 + p[1], 0) / ceiling.points.length;
  try {
    return { metrics: validateRoomMetrics({ width, depth, height: ceilingY - floorY, source: "quest-planes" }), origin: [x[0] * (bx[0] + bx[1]) / 2 + z[0] * (bz[0] + bz[1]) / 2, floorY, x[2] * (bx[0] + bx[1]) / 2 + z[2] * (bz[0] + bz[1]) / 2], yaw: Math.atan2(-x[2], x[0]) };
  } catch {
    return null;
  }
}

// src/shared/draft.mjs
var pointOK = (p) => Array.isArray(p) && p.length === 3 && p.every((n) => Number.isFinite(n) && Math.abs(n) <= 100), distance3 = (a, b) => Math.hypot(...a.map((v2, i) => v2 - b[i])), DRAFT_LIMITS = Object.freeze({ spacing: 0.025, minLength: 0.15, maxLength: 30, maxPoints: 512, maxGap: 0.75, maxStep: 0.15 });
function pathLength(points) {
  return points.slice(1).reduce((sum, p, i) => sum + distance3(p, points[i]), 0);
}
function createDraft({ mode: mode2 = "floor2d", smoothing = "off", validatePath = () => !0 } = {}) {
  smoothingProfile(smoothing);
  let points = [], rawPoints = [], stroke = null, rawStroke = null, rawLength = 0, history2 = [], version = 0, smoothingFallback = !1, message = "Hold the right trigger to draw on the floor. Release to finish.", changed = () => version++;
  function interrupt(reason = "Stroke cancelled. Previous path retained.") {
    stroke && (stroke = rawStroke = null, message = reason, changed());
  }
  function processed(raw) {
    let candidate = smoothCurve(raw, smoothing), fallback = smoothing !== "off" && candidate.length > 1 && !validatePath(candidate);
    return { points: fallback ? structuredClone(raw) : candidate, fallback };
  }
  function restore2(raw) {
    let result = processed(raw);
    rawPoints = raw;
    let tooShort = raw.length > 1 && pathLength(result.points) < DRAFT_LIMITS.minLength;
    points = tooShort ? structuredClone(raw) : result.points, smoothingFallback = result.fallback || tooShort, message = smoothingFallback ? "Smoothing did not fit this path. Original stroke retained." : "Draft retained for this edit \xB7 Redraw or undo";
  }
  return {
    setMode(next) {
      if (!["floor2d", "space3d"].includes(next)) throw Error("Invalid brush mode");
      mode2 = next;
    },
    setSmoothing(next) {
      if (smoothingProfile(next), stroke) throw Error("Release the trigger before adjusting smoothing");
      smoothing = next, restore2(rawPoints), changed();
    },
    begin(point2) {
      if (!pointOK(point2)) throw new Error("Point at a visible floor");
      if (stroke) throw new Error("Release the trigger first");
      stroke = [[...point2]], rawStroke = [[...point2]], rawLength = 0, message = "Drawing \xB7 Release to finish \xB7 A to cancel", changed();
    },
    sample(point2) {
      if (!stroke) return !1;
      if (!pointOK(point2))
        return interrupt("Left the visible floor. Stroke discarded; release and try again."), !1;
      let last = rawStroke.at(-1), step = distance3(point2, last);
      if (step > DRAFT_LIMITS.maxGap || mode2 === "floor2d" && Math.abs(point2[1] - last[1]) > DRAFT_LIMITS.maxStep)
        return interrupt("Stroke contains a large jump. Release and redraw continuously along the floor."), !1;
      if (step < DRAFT_LIMITS.spacing) return !0;
      if (rawStroke.length >= DRAFT_LIMITS.maxPoints || rawLength + step > DRAFT_LIMITS.maxLength)
        return interrupt("Stroke too long. Release and draw a shorter path."), !1;
      rawStroke.push([...point2]), rawLength += step;
      let tip = stabilizedPoint(stroke.at(-1), point2, smoothing);
      return distance3(tip, stroke.at(-1)) > 1e-6 && stroke.push(tip), changed(), !0;
    },
    finish() {
      if (!stroke) return !1;
      let result = processed(rawStroke);
      return pathLength(result.points) < DRAFT_LIMITS.minLength ? (interrupt("Stroke too short. Draw a forward path again."), !1) : (history2.push(rawPoints), history2.length > 20 && history2.shift(), rawPoints = rawStroke, points = result.points, smoothingFallback = result.fallback, stroke = rawStroke = null, message = result.fallback ? "Smoothed curve crossed the floor edge. Original stroke retained." : "Draft retained for this edit \xB7 Redraw or undo", changed(), !0);
    },
    interrupt,
    undo() {
      if (stroke) {
        interrupt();
        return;
      }
      history2.length && (restore2(history2.pop()), smoothingFallback || (message = "Last stroke undone"), changed());
    },
    load(saved) {
      points = structuredClone(saved || []), rawPoints = structuredClone(points), stroke = rawStroke = null, history2 = [], smoothingFallback = !1, changed();
    },
    reset() {
      points = [], rawPoints = [], stroke = rawStroke = null, history2 = [], smoothingFallback = !1, message = "Hold the right trigger to draw on the floor. Release to finish.", changed();
    },
    lastPoint: () => rawStroke?.length ? [...rawStroke.at(-1)] : null,
    summary: () => ({ mode: mode2, smoothing, smoothingLabel: smoothingProfile(smoothing).label, smoothingFallback, version, drawing: !!stroke, pointCount: (stroke || points).length, length: pathLength(stroke || points), canUndo: !!stroke || history2.length > 0, message }),
    snapshot: () => ({ schema: "vrbuild-draft/1", mode: mode2, smoothing, points: structuredClone(points), rawPoints: structuredClone(rawPoints), stroke: stroke ? structuredClone(stroke) : null })
  };
}

// src/shared/authoring-motion.mjs
var JOINTS = ["pelvis", "left_hip", "right_hip", "spine1", "left_knee", "right_knee", "spine2", "left_ankle", "right_ankle", "spine3", "left_foot", "right_foot", "neck", "left_collar", "right_collar", "head", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_hand", "right_hand"], number = { type: "number" }, vector2 = { type: "array", items: number, minItems: 3, maxItems: 3 }, object = (properties) => ({ type: "object", additionalProperties: !1, properties, required: Object.keys(properties) }), motionSchema = object({ reply: { type: "string" }, plan: { anyOf: [object({ name: { type: "string" }, cycle: number, repeats: { type: "integer" }, followCurve: { type: "boolean" }, speed: number, keyframes: { type: "array", items: object({ time: number, root: vector2, joints: { type: "array", items: object({ joint: { type: "string", enum: JOINTS }, rotation: vector2 }) } }) } }), { type: "null" }] } }), vec = (v2) => Array.isArray(v2) && v2.length === 3 && v2.every((n) => Number.isFinite(n));
function validateCurves(curves) {
  if (!Array.isArray(curves) || curves.length > 32) throw Error("At most 32 saved curves are supported");
  let ids = /* @__PURE__ */ new Set();
  for (let c of curves) {
    if (!c || typeof c.id != "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(c.id) || ids.has(c.id) || !["floor2d", "space3d"].includes(c.mode)) throw Error("Invalid curve identifier");
    if (ids.add(c.id), !Array.isArray(c.points) || c.points.length < 2 || c.points.length > 512 || c.points.some((p) => !vec(p) || p.some((n) => Math.abs(n) > 100)) || pathLength(c.points) < 0.15 || pathLength(c.points) > 30.01) throw Error("Curves require a continuous valid stroke between 0.15 and 30 meters");
    if (c.mode === "floor2d" && c.points.some((p) => Math.abs(p[1] - c.points[0][1]) > 0.05)) throw Error("Floor curves must stay on the same plane");
  }
  return curves;
}
function validateMotionPlan(p) {
  if (!p || p.schema !== "vrbuild-motion-plan/1" || typeof p.name != "string" || p.name.length > 120 || !Number.isFinite(p.cycle) || p.cycle < 0.25 || p.cycle > 12 || !Number.isInteger(p.repeats) || p.repeats < 1 || p.repeats > 120 || !Number.isFinite(p.duration) || p.duration < 0.25 || p.duration > 60) throw Error("Invalid generated motion duration or name");
  if (!Array.isArray(p.keyframes) || p.keyframes.length < 2 || p.keyframes.length > 32) throw Error("Motion requires 2 to 32 keyframes");
  let previous = -1;
  for (let f of p.keyframes) {
    if (!Number.isFinite(f.time) || f.time <= previous || f.time < 0 || f.time > p.cycle || !vec(f.root) || f.root.some((n) => Math.abs(n) > 2) || !Array.isArray(f.joints) || f.joints.length > 24) throw Error("Invalid generated motion keyframe");
    previous = f.time;
    let names = /* @__PURE__ */ new Set();
    for (let j of f.joints) {
      if (!JOINTS.includes(j.joint) || names.has(j.joint) || !vec(j.rotation) || j.rotation.some((n) => Math.abs(n) > 180)) throw Error("Invalid generated joint motion");
      names.add(j.joint);
    }
  }
  if (p.keyframes[0].time !== 0 || Math.abs(p.keyframes.at(-1).time - p.cycle) > 1e-3) throw Error("Keyframes must span the entire motion cycle");
  if (p.trajectory && (validateCurves([p.trajectory]), !Number.isFinite(p.trajectory.speed) || p.trajectory.speed < 0.1 || p.trajectory.speed > 2))
    throw Error("Curve speed must be between 0.1 and 2 meters per second");
  let expected = p.trajectory ? pathLength(p.trajectory.points) / p.trajectory.speed : p.cycle * p.repeats;
  if (Math.abs(expected - p.duration) > 1e-3) throw Error("Motion duration does not match its trajectory");
  return p;
}
function applyActorMotion(scene2, { actorId, plan }) {
  if (validateMotionPlan(plan), !scene2.actors?.some((a) => a.id === actorId)) throw Error("The actor no longer exists");
  let next = structuredClone(scene2);
  return next.actors = next.actors.map((a) => a.id === actorId ? { ...a, motionId: null, motionPlan: structuredClone(plan) } : a), next.behaviors?.path?.actorIds.includes(actorId) && (delete next.behaviors.path, delete next.behaviors.binding), next;
}
function sampleMotion(plan, seconds) {
  let time = Math.max(0, Math.min(seconds, plan.duration)), t = time >= plan.duration ? plan.cycle : time % plan.cycle, b = plan.keyframes.findIndex((f) => f.time >= t);
  b < 0 && (b = plan.keyframes.length - 1);
  let a = Math.max(0, b - 1), fa = plan.keyframes[a], fb = plan.keyframes[b], u = a === b ? 0 : (t - fa.time) / (fb.time - fa.time), alpha = u * u * (3 - 2 * u), root = fa.root.map((v2, i) => v2 + (fb.root[i] - v2) * alpha), position = null, yaw = null;
  if (plan.trajectory) {
    let { points, speed } = plan.trajectory, remaining = Math.min(time * speed, pathLength(points));
    for (let i = 1; i < points.length; i++) {
      let p = points[i - 1], q2 = points[i], length2 = Math.hypot(...q2.map((n, k) => n - p[k]));
      if (remaining <= length2 || i === points.length - 1) {
        let f = length2 ? Math.min(1, remaining / length2) : 0;
        position = p.map((n, k) => n + (q2[k] - n) * f), Math.hypot(q2[0] - p[0], q2[2] - p[2]) > 1e-5 && (yaw = Math.atan2(q2[0] - p[0], q2[2] - p[2]));
        break;
      }
      remaining -= length2;
    }
  }
  return { a: fa, b: fb, alpha, root, position, yaw };
}

// src/shared/actor-slots.mjs
function castSlots(actors) {
  if (actors.length > 5) throw new Error("This demo uses 5 actors. Remove extra actors first; existing actors are not deleted automatically.");
  let used = /* @__PURE__ */ new Set();
  for (let actor of actors) if (actor.castSlot !== void 0) {
    if (!Number.isInteger(actor.castSlot) || actor.castSlot < 1 || actor.castSlot > 5 || used.has(actor.castSlot)) throw new Error("Invalid or duplicate actor motion slot");
    used.add(actor.castSlot);
  }
  return actors.map((actor) => {
    if (actor.castSlot !== void 0) return { ...actor };
    let slot = Array.from({ length: 5 }, (_, i) => i + 1).find((i) => !used.has(i));
    return used.add(slot), { ...actor, castSlot: slot };
  });
}
function nextCastSlot(actors) {
  let used = new Set(castSlots(actors).map((a) => a.castSlot));
  return Array.from({ length: 5 }, (_, i) => i + 1).find((i) => !used.has(i)) ?? null;
}

// src/shared/entity-targets.mjs
function clearEntityTargets(objects, id) {
  return objects.map((object3) => {
    if (object3.aimTargetId !== id && object3.track?.targetId !== id) return object3;
    let next = { ...object3 };
    return next.aimTargetId === id && delete next.aimTargetId, next.track?.targetId === id && (next.track = { ...next.track, targetId: null, orientation: next.track.orientation === "target" ? "fixed" : next.track.orientation }), next;
  });
}

// src/shared/actors.mjs
var finite2 = (x, min, max) => typeof x == "number" && Number.isFinite(x) && x >= min && x <= max, idOK = (id) => typeof id == "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(id), MAX_ACTORS = 7, actorMotionId = (actor) => actor.motionId === void 0 ? actor.assetId : actor.motionId;
function validateActor(actor) {
  if (!actor || !idOK(actor.id) || !idOK(actor.assetId) || typeof actor.name != "string" || !actor.name.trim() || actor.name.length > 80) throw new Error("Invalid actor identifier");
  if (!Array.isArray(actor.position) || actor.position.length !== 3 || !actor.position.every((x) => finite2(x, -100, 100)) || !finite2(actor.yaw, -Math.PI * 8, Math.PI * 8)) throw new Error("Invalid actor position or orientation");
  if (!finite2(actor.delay, 0, 60) || actor.trigger !== "start" || !/^#[0-9a-fA-F]{6}$/.test(actor.color)) throw new Error("Invalid actor entry settings");
  if (actor.motionId !== void 0 && actor.motionId !== null && !idOK(actor.motionId)) throw new Error("Invalid actor motion identifier");
  if (actor.castSlot !== void 0 && (!Number.isInteger(actor.castSlot) || actor.castSlot < 1 || actor.castSlot > 5)) throw new Error("Invalid actor motion slot");
  if (actor.motionOffset !== void 0 && (!Array.isArray(actor.motionOffset) || actor.motionOffset.length !== 3 || !actor.motionOffset.every((x) => finite2(x, -100, 100)))) throw new Error("Invalid motion transition offset");
  return actor.motionPlan != null && validateMotionPlan(actor.motionPlan), actor;
}
function validateActors(actors) {
  if (!Array.isArray(actors) || actors.length > MAX_ACTORS) throw new Error(`A maximum of ${MAX_ACTORS} actors is supported`);
  let ids = /* @__PURE__ */ new Set(), slots = /* @__PURE__ */ new Set();
  for (let actor of actors) {
    if (validateActor(actor), ids.has(actor.id)) throw new Error("Duplicate actor ID");
    if (ids.add(actor.id), actor.castSlot !== void 0) {
      if (slots.has(actor.castSlot)) throw new Error("Duplicate actor motion slot");
      slots.add(actor.castSlot);
    }
  }
  return actors;
}
function createPerformance() {
  let mode2 = "editing", time = 0, runId = 0, actors = [], schedule = /* @__PURE__ */ new Map(), prepare = (ids, nextMode) => {
    runId++, time = 0, mode2 = nextMode;
    let chosen = ids ? new Set(ids) : null;
    schedule = new Map(actors.filter((a) => !chosen || chosen.has(a.id)).map((a) => [a.id, { delay: a.delay, assetId: a.assetId, motionId: actorMotionId(a), motionPlan: a.motionPlan }]));
  };
  return {
    sync(next) {
      actors = structuredClone(next);
    },
    start(ids) {
      prepare(ids, "running");
    },
    arm(ids) {
      prepare(ids, "paused");
    },
    switchMotions(offsets = {}, playback = "play") {
      if (playback === "assign") return;
      let oldMode = mode2, oldTime = time, oldSchedule = schedule;
      playback === "preserve" && oldMode === "editing" || (runId++, time = 0, mode2 = playback === "preserve" && oldMode === "paused" ? "paused" : "running", schedule = new Map(actors.map((a) => [a.id, { delay: oldMode === "editing" ? a.delay : Math.max(0, (oldSchedule.get(a.id)?.delay ?? a.delay) - oldTime), assetId: a.assetId, motionId: actorMotionId(a), motionOffset: [...offsets[a.id] || [0, 0, 0]] }])));
    },
    stop() {
      mode2 === "running" && (mode2 = "paused");
    },
    resume() {
      mode2 === "paused" && (mode2 = "running");
    },
    edit() {
      mode2 = "editing", time = 0;
    },
    advance(dt) {
      mode2 === "running" && Number.isFinite(dt) && dt > 0 && (time += dt);
    },
    snapshot() {
      return { mode: mode2, time, runId };
    },
    completed(assets) {
      let active = actors.map((a) => schedule.get(a.id)).filter((c) => c?.motionPlan || c?.motionId);
      return mode2 !== "editing" && active.length > 0 && active.every((c) => time >= c.delay + (c.motionPlan?.duration ?? assets.get(c.motionId)?.duration ?? 1 / 0));
    },
    frames(assets) {
      return actors.map((a) => {
        let cue = schedule.get(a.id), preview = mode2 === "editing" || !cue, visible = preview || !!cue && time >= cue.delay, motionId = preview ? actorMotionId(a) : cue.motionId, assetId = motionId || (preview ? a.assetId : cue.assetId), rest = preview || !motionId, motionPlan = preview ? a.motionPlan : cue.motionPlan;
        if (motionPlan) return { ...a, motionPlan, assetId: preview ? a.assetId : cue.assetId, motionId: null, pose: "generated", preview, visible, runId, clipTime: preview ? motionPlan.duration : Math.min(motionPlan.duration, Math.max(0, time - (cue?.delay || 0))) };
        let duration = assets.get(motionId)?.duration || 0;
        return { ...a, assetId, motionId, motionOffset: preview ? [0, 0, 0] : [...cue?.motionOffset || [0, 0, 0]], pose: rest ? "rest" : "motion", preview, visible, runId, clipTime: rest ? 0 : Math.min(duration, Math.max(0, time - (cue?.delay || 0))) };
      });
    }
  };
}
function delayValue(text) {
  let values = number_words_default.actorDelays, match = text.match(languagePattern("actor.delaySeconds"));
  return match ? Number(values[match[1]] ?? match[1]) : null;
}
function parseDirectorCommand(text) {
  let t = text.trim().replace(languagePattern("punctuation.actors.1"), " ").trim(), groupStyle = t.match(languagePattern("actor.groupStyle"));
  if (groupStyle && !languagePattern("punctuation.actors.2").test(text)) return { type: "style", style: groupStyle[1] === terms_default.cute ? "cute" : "zombie" };
  if (languagePattern("actor.stop").test(t)) return { type: "stop" };
  if (languagePattern("actor.start").test(t)) return { type: "start" };
  if (languagePattern("actor.resume").test(t)) return { type: "resume" };
  if (languagePattern("actor.edit").test(t)) return { type: "edit" };
  if (languagePattern("actor.saveScene").test(t)) return { type: "save" };
  let style = t.match(languagePattern("actor.style"));
  if (style && !languagePattern("punctuation.actors.3").test(text)) return { type: "style", style: [terms_default.cute, terms_default.birthday].includes(style[1]) ? "cute" : "zombie" };
  let actor = languagePattern("actor.subject").test(t), delay = delayValue(t);
  if (languagePattern("actor.clearMotion").test(t)) return { type: "clearMotion" };
  let numberedMotion = t.match(languagePattern("actor.numberedMotion"));
  return numberedMotion ? { type: "motion", number: Number(number_words_default.actorMotionNumbers[numberedMotion[1]] ?? numberedMotion[1]) } : languagePattern("actor.motionSubject").test(t) && languagePattern("actor.generatedMotion").test(t) ? { type: "unavailable" } : languagePattern("actor.spatialSubject").test(t) && languagePattern("actor.moveVerb").test(t) && languagePattern("actor.here").test(t) ? { type: "move" } : actor && languagePattern("actor.createVerb").test(t) ? { type: "create", delay: delay ?? 0 } : languagePattern("legacy.lungeMotion").test(t) && languagePattern("legacy.motionAssignmentSubject").test(t) || languagePattern("legacy.assignLungeMotion").test(t) ? { type: "motion" } : delay !== null && languagePattern("actor.delayVerb").test(t) ? { type: "delay", delay } : languagePattern("actor.spatialSubject").test(t) && languagePattern("actor.faceViewer").test(t) ? { type: "face" } : languagePattern("actor.spatialSubject").test(t) && languagePattern("actor.removeVerb").test(t) ? { type: "remove" } : null;
}

// src/shared/door-performance.mjs
function distanceToDoor(p, o) {
  let d = p.map((v2, i) => v2 - o.position[i]), c = Math.cos(o.rotation), s = Math.sin(o.rotation), q2 = [c * d[0] - s * d[2], d[1], s * d[0] + c * d[2]];
  return Math.hypot(...q2.map((v2, i) => Math.max(0, Math.abs(v2) - o.size[i] / 2)));
}
function validateDoorPerformance(scene2) {
  if (scene2.doorPerformance) throw Error("Unsupported scene data");
}
var createDoorPerformanceCue = () => ({ sync() {
}, update: () => null, touch: () => null, snapshot: () => ({ enabled: !1, actorIds: [] }) });

// src/shared/flood.mjs
var number2 = { type: "number" }, string = { type: "string" }, object2 = (properties) => ({ type: "object", additionalProperties: !1, properties, required: Object.keys(properties) }), floodSchema = object2({ reply: string, plan: { anyOf: [object2({ triggerRegionId: string, dwellSeconds: number2, sources: { type: "array", items: object2({ regionId: string, speed: number2, amount: number2, reach: number2, angle: number2 }) }, duration: number2, color: string }), { type: "null" }] } }), bounded = (n, min, max) => Number.isFinite(n) && n >= min && n <= max;
function validateFloods(scene2) {
  if (scene2.regions !== void 0 && validateRegions(scene2.regions, scene2), scene2.floods === void 0) return scene2;
  if (!Array.isArray(scene2.floods) || scene2.floods.length > 8) throw Error("At most 8 flow interactions are supported");
  let ids = /* @__PURE__ */ new Set(), objects = /* @__PURE__ */ new Set();
  for (let f of scene2.floods) {
    let ownerId = regionObjectId(f), owner = scene2.objects.find((o) => o.id === ownerId);
    if (!f || f.schema !== "vrbuild-flood/1" || typeof f.id != "string" || !/^[\w-]{1,80}$/.test(f.id) || ids.has(f.id) || objects.has(ownerId) || !(isRegionObject(owner) || isDoor(owner)) || f.objectId && f.doorId && f.objectId !== f.doorId) throw Error("Invalid flow ID or object target.");
    ids.add(f.id), objects.add(ownerId);
    let zone = scene2.regions?.find((r) => r.id === f.trigger?.regionId);
    if (f.trigger?.type !== "region-dwell" || f.trigger.subject !== "user" || f.trigger.repeat !== "once-per-preview" || !zone || zone.surface !== "floor" || regionObjectId(zone) !== ownerId || !bounded(f.trigger.seconds, 0.1, 60)) throw Error("Flow needs this object's floor region and a 0.1\u201360 second viewer-dwell condition.");
    if (!bounded(f.duration, 0.5, 30) || typeof f.color != "string" || !/^#[\da-f]{6}$/i.test(f.color)) throw Error("Invalid flow duration or color");
    if (!Array.isArray(f.sources) || !f.sources.length || f.sources.length > 6) throw Error("Select 1\u20136 surface source regions.");
    let sources = /* @__PURE__ */ new Set();
    for (let source of f.sources) {
      let region = scene2.regions?.find((r) => r.id === source.regionId);
      if (!region || !isSourceRegion(region) || regionObjectId(region) !== ownerId || sources.has(source.regionId)) throw Error("Flow sources must belong to the selected object.");
      if (sources.add(source.regionId), !bounded(source.speed, 0.1, 3) || !bounded(source.amount, 0.1, 3) || !bounded(source.reach, 0.2, 6) || !bounded(source.angle, -150, 150)) throw Error("Flow speed, amount, reach or direction is outside the supported range");
    }
  }
  return scene2;
}
function applyFlood(scene2, result, ids) {
  if (!Array.isArray(ids) || ids.length !== 1 || ids[0] !== regionObjectId(result.plan)) throw Error("Flow must modify only the selected object.");
  let next = structuredClone(scene2);
  return next.floods = [...(next.floods || []).filter((f) => regionObjectId(f) !== regionObjectId(result.plan)), structuredClone(result.plan)], validateFloods(next);
}
function createFloodRuntime() {
  let scene2 = null, states = [], armed = !1, last = null, enabledIds = null, paused = !1, reset = () => {
    states = (scene2?.floods || []).map((f) => ({ id: f.id, dwell: 0, inside: !1, fired: !1, time: 0, events: 0 })), last = null;
  };
  return {
    sync(next) {
      scene2 = next, armed = !1, paused = !1, enabledIds = null, reset();
    },
    start(ids = null) {
      enabledIds = ids === null ? null : new Set(ids), armed = ids === null || ids.length > 0, paused = !1, reset();
    },
    stop() {
      armed = !1, paused = !1, reset();
    },
    pause() {
      paused = !0, last = null;
    },
    resume() {
      paused = !1, last = null;
    },
    tick({ now, position, active = !0, tracked = !0 }) {
      let valid = armed && active && tracked && Array.isArray(position) && position.length === 3 && position.every(Number.isFinite) && Number.isFinite(now);
      if (paused) {
        if (last = null, !valid) for (let s of states)
          s.dwell = 0, s.inside = !1;
        return this.snapshot(valid);
      }
      let dt = last === null ? 0 : now - last;
      last = valid ? now : null;
      let interrupted = !valid || dt < 0 || dt > 0.25;
      for (let state2 of states) {
        if (enabledIds && !enabledIds.has(state2.id)) continue;
        let f = scene2.floods.find((f2) => f2.id === state2.id), zone = scene2.regions.find((r) => r.id === f.trigger.regionId);
        if (interrupted) {
          state2.dwell = 0, state2.inside = !1;
          continue;
        }
        if (state2.fired) {
          state2.time = Math.min(f.duration, state2.time + dt);
          continue;
        }
        let height = position[1] - zone.floorY;
        if (!(height >= 0.15 && height <= 3 && polygonContains(zone.points, [position[0], position[2]], state2.inside ? 0.03 : 0))) {
          state2.dwell = 0, state2.inside = !1;
          continue;
        }
        state2.inside ? state2.dwell += dt : state2.dwell = 0, state2.inside = !0, state2.dwell > f.trigger.seconds && (state2.fired = !0, state2.time = 0, state2.events++);
      }
      return this.snapshot(valid && !interrupted);
    },
    snapshot(visible = armed) {
      return { armed, paused, visible, activeIds: enabledIds ? [...enabledIds] : (scene2?.floods || []).map((f) => f.id), states: states.map((s) => ({ ...s })) };
    }
  };
}

// src/shared/cinema.mjs
import { CatmullRomCurve3, Vector3 as Vector33, Quaternion as Quaternion2, Euler } from "three";

// src/shared/track-triggers.mjs
function floorTriggerRegion(curve, id = "trigger-" + curve?.id) {
  if (curve?.mode !== "floor2d") throw Error("A trigger needs a saved closed 2D ground curve");
  if (!Array.isArray(curve.points) || curve.points.length < 4) throw Error("Draw a closed region");
  let heights = curve.points.map((p) => p[1]);
  if (Math.max(...heights) - Math.min(...heights) > 0.08) throw Error("The trigger region must be on one ground plane");
  let raw = curve.points.map((p) => [p[0], p[2]]), distance4 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]), points, trimmedSamples = 0;
  try {
    points = closeRegionStroke(raw, "floor");
  } catch (error) {
    if (distance4(raw[0], raw.at(-1)) > 0.12) throw error;
    let length2 = 0;
    for (let end = raw.length - 1; end >= 4 && (length2 += distance4(raw[end], raw[end - 1]), !(length2 > 0.2 || distance4(raw[end], raw[0]) > 0.12 || distance4(raw[end - 1], raw[0]) > 0.12)); end--)
      try {
        points = closeRegionStroke(raw.slice(0, end), "floor"), trimmedSamples = raw.length - end;
        break;
      } catch {
      }
    if (!points) throw error;
  }
  return { schema: "vrbuild-trigger-region/1", id, name: "Floor trigger region", surface: "floor", sourceCurveId: curve.id, floorY: heights.reduce((a, b) => a + b, 0) / heights.length, points, ...trimmedSamples ? { closureRepair: { trimmedSamples, reason: "small-closure-overshoot" } } : {} };
}
function validateTrackTriggers(scene2) {
  let regions = scene2.triggerRegions || [], ids = /* @__PURE__ */ new Set();
  if (!Array.isArray(regions) || regions.length > 32) throw Error("Up to 32 floor trigger regions");
  for (let r of regions) {
    if (!r || r.schema !== "vrbuild-trigger-region/1" || typeof r.id != "string" || !/^[-\w]{1,80}$/.test(r.id) || ids.has(r.id) || r.surface !== "floor" || !Number.isFinite(r.floorY) || Math.abs(r.floorY) > 100) throw Error("Invalid floor trigger region");
    validatePolygon(r.points, "floor"), ids.add(r.id);
  }
  for (let o of scene2.objects) {
    let t = o.track?.trigger;
    if (t && (t.type !== "region-dwell" || t.subject !== "user" || t.repeat !== "once-per-preview" || !ids.has(t.regionId) || !Number.isFinite(t.seconds) || t.seconds < 0.1 || t.seconds > 60))
      throw Error("Invalid track trigger: user must dwell continuously for 0.1\u201360 seconds");
  }
  return scene2;
}
function bindTrackTrigger(scene2, { id, regionCurveId, regionId, seconds, trackCurveId, values = {} }) {
  let target = scene2.objects.find((o) => o.id === id);
  if (!target) throw Error("Select the object to trigger first");
  if (trackCurveId) {
    if (trackCurveId === regionCurveId) throw Error("Specify the trigger region and movement path separately");
    if (!scene2.curves?.some((c) => c.id === trackCurveId)) throw Error("Movement path no longer exists");
    target.track = { duration: 8, delay: 0, fadeOut: 0, orientation: "fixed", targetId: null, ...target.track, curveId: trackCurveId };
  }
  if (!target.track) throw Error("Bind a movement path before setting its trigger region");
  if (regionCurveId === target.track.curveId) throw Error("Use separate curves for the trigger region and movement path");
  let region = scene2.triggerRegions?.find((r) => r.id === regionId);
  if (regionCurveId) {
    let curve = scene2.curves?.find((c) => c.id === regionCurveId);
    region = floorTriggerRegion(curve);
    let hash = 2166136261;
    for (let c of JSON.stringify([region.floorY, region.points])) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
    region.id = "trigger-" + curve.id + "-" + (hash >>> 0).toString(36), scene2.triggerRegions = [...(scene2.triggerRegions || []).filter((r) => r.id !== region.id), region];
  }
  if (!region) throw Error("Choose a saved closed ground curve as the trigger region");
  target.track.trigger = { type: "region-dwell", regionId: region.id, subject: "user", seconds, repeat: "once-per-preview" };
  for (let key of ["duration", "delay", "fadeOut", "orientation", "targetId"]) values[key] !== void 0 && (target.track[key] = values[key]);
  return validateTrackTriggers(scene2);
}
function createTrackTriggerRuntime() {
  let definition = { objects: [] }, states = [], last = null, armed = !1, paused = !1, resetDwell = (s) => {
    s.inside = !1, s.dwell = 0;
  };
  return {
    sync(scene2) {
      definition = scene2, states = [], last = null, armed = !1, paused = !1;
    },
    start(ids) {
      let selected = new Set(ids);
      states = definition.objects.filter((o) => selected.has(o.id) && o.track?.trigger).map((o) => ({ id: o.id, ...o.track.trigger, inside: !1, dwell: 0, fired: !1, time: 0 })), armed = !0, paused = !1, last = null;
    },
    stop() {
      armed = !1, states = [], last = null;
    },
    pause() {
      paused = !0, last = null;
      for (let s of states) s.fired || resetDwell(s);
    },
    resume() {
      paused = !1, last = null;
    },
    tick({ now, position, active = !0, tracked = !0 }) {
      let valid = armed && !paused && active && tracked && Number.isFinite(now) && Array.isArray(position) && position.length === 3 && position.every(Number.isFinite), gap = last === null ? 0 : now - last, continuous = valid && gap >= 0 && gap <= 0.25, dt = continuous ? gap : 0;
      last = valid ? now : null;
      for (let s of states) {
        if (s.fired) {
          continuous && (s.time += dt);
          continue;
        }
        if (!continuous) {
          resetDwell(s);
          continue;
        }
        let r = definition.triggerRegions.find((r2) => r2.id === s.regionId), height = position[1] - r.floorY;
        if (!(height >= 0.15 && height <= 3 && polygonContains(r.points, [position[0], position[2]], s.inside ? 0.03 : 0))) {
          resetDwell(s);
          continue;
        }
        s.dwell += s.inside ? dt : 0, s.inside = !0, s.dwell + 1e-8 >= s.seconds && (s.fired = !0, s.time = 0, s.dwell = s.seconds);
      }
      return this.snapshot();
    },
    snapshot() {
      return { armed, paused, states: structuredClone(states), clocks: Object.fromEntries(states.map((s) => [s.id, s.fired ? s.time : null])) };
    }
  };
}

// src/shared/cinema.mjs
var finite3 = (n, min, max) => Number.isFinite(n) && n >= min && n <= max, vector3 = (p, n = 3) => Array.isArray(p) && p.length === n && p.every((v2) => finite3(v2, -100, 100)), isCamera = (o) => o?.kind === "camera", isLight = (o) => o?.kind === "light", isRig = (o) => isCamera(o) || isLight(o);
function objectQuaternion(o) {
  return o.quaternion ? [...o.quaternion] : new Quaternion2().setFromEuler(new Euler(0, o.yaw ?? o.rotation ?? 0, 0)).toArray();
}
function validateCinema(scene2) {
  if (scene2.productionReady !== void 0 && typeof scene2.productionReady != "boolean") throw Error("Invalid setup state");
  for (let o of scene2.objects) {
    if (o.aimTargetId && (![...scene2.objects, ...scene2.actors || []].some((a) => a.id === o.aimTargetId) || o.aimTargetId === o.id)) throw Error("Invalid camera target");
    if (o.quaternion && (!vector3(o.quaternion, 4) || Math.abs(Math.hypot(...o.quaternion) - 1) > 0.01)) throw Error("Invalid object pose");
    if (o.kind !== void 0 && !["camera", "light"].includes(o.kind)) throw Error("Invalid tool type");
    if (isCamera(o) && (!o.camera || !finite3(o.camera.fov, 15, 110) || !finite3(o.camera.aspect, 0.5, 3))) throw Error("Invalid camera settings");
    if (isLight(o) && (!o.light || !["point", "spot"].includes(o.light.type) || !finite3(o.light.intensity, 0, 100) || !finite3(o.light.range, 0.1, 100) || !finite3(o.light.angle, 1, 85) || !/^#[\da-f]{6}$/i.test(o.light.color))) throw Error("Invalid light settings");
    if (o.track) {
      let t = o.track;
      if (!scene2.curves?.some((c) => c.id === t.curveId) || !finite3(t.duration, 0.25, 120) || !finite3(t.delay, 0, 120) || !finite3(t.fadeOut, 0, t.duration) || !["fixed", "target", "tangent"].includes(t.orientation)) throw Error("Invalid track or missing curve");
      if (t.targetId && ![...scene2.objects, ...scene2.actors || []].some((a) => a.id === t.targetId)) throw Error("Camera target no longer exists");
    }
  }
  if (scene2.objects.filter(isCamera).length > 8 || scene2.objects.filter(isLight).length > 8) throw Error("This edition supports up to 8 cameras and 8 lights");
  return validateTrackTriggers(scene2);
}
function curvePoints(controls2, smooth = !0) {
  if (!Array.isArray(controls2) || controls2.length < 2 || controls2.length > 64 || controls2.some((p) => !vector3(p))) throw Error("Invalid control points (2\u201364 required)");
  if (controls2.every((p) => new Vector33(...p).distanceTo(new Vector33(...controls2[0])) < 1e-3)) throw Error("Curve endpoints are too close. Draw a longer path.");
  return !smooth || controls2.length === 2 ? structuredClone(controls2) : new CatmullRomCurve3(controls2.map((p) => new Vector33(...p)), !1, "centripetal").getSpacedPoints(Math.min(256, controls2.length * 16)).map((p) => p.toArray());
}
function editableControls(curve) {
  if (curve.controls) return structuredClone(curve.controls);
  let p = curve.points;
  return p.length <= 12 ? structuredClone(p) : Array.from({ length: 12 }, (_, i) => [...p[Math.round(i * (p.length - 1) / 11)]]);
}
function newRig(kind, id, position) {
  if (!["camera", "spot", "point", "box"].includes(kind) || !vector3(position)) throw Error("Invalid creation parameters");
  let o = { id, name: kind === "camera" ? "Camera" : kind === "box" ? "Box" : kind === "spot" ? "Spotlight" : "Point light", group: "Authoring tools", shape: kind === "point" ? "sphere" : "box", position: [...position], size: kind === "box" ? [0.4, 0.4, 0.4] : [0.22, 0.16, 0.28], rotation: 0, roughness: 0.6, metalness: 0, color: kind === "camera" ? "#4098df" : kind === "box" ? "#71b68c" : "#ffd266", editable: !0 };
  return kind === "camera" && (o.kind = "camera", o.camera = { fov: 55, aspect: 16 / 9 }), ["spot", "point"].includes(kind) && (o.kind = "light", o.light = { type: kind, intensity: 8, range: 12, angle: 35, color: "#fff2da" }), o;
}
function groundCreateCommand(command, point2) {
  if (!vector3(point2)) throw Error("Point at visible ground, then press A to place");
  let { position: ignored, ...values } = command.values || {}, position = [...point2], body = newRig(command.kind, command.id, position);
  if (position[1] += body.size[1] / 2, !vector3(position)) throw Error("Placement is outside the scene");
  return { ...command, op: "create", position, values };
}
function applyCinema(scene2, command) {
  let next = structuredClone(scene2), c = command;
  next.productionReady = !1;
  let target = next.objects.find((o) => o.id === c.id);
  if (c.op === "create") {
    if (next.objects.some((o2) => o2.id === c.id) || !/^[-\w]{1,80}$/.test(c.id)) throw Error("Invalid object ID");
    let o = newRig(c.kind, c.id, c.position);
    if (o.name = c.name?.slice(0, 80) || `${o.name} ${next.objects.filter((a) => a.kind === o.kind).length + 1}`, next.objects.push(o), c.values) return applyCinema(next, { op: "update", id: o.id, values: c.values });
  } else if (c.op === "poses") {
    if (!Array.isArray(c.poses) || !c.poses.length || c.poses.length > 187) throw Error("No pose changes to save");
    for (let p of c.poses) {
      let o = [...next.objects, ...next.actors || []].find((a) => a.id === p.id);
      if (!o || !vector3(p.position) || !vector3(p.quaternion, 4) || Math.hypot(...p.quaternion) < 0.01) throw Error("Invalid pose target");
      if (o.editable !== !0 && (o.id === "ground" || o.category === "structure" || /^(wall|ceiling)(_|-|$)/.test(o.id))) throw Error("Reference structure is locked.");
      o.position = [...p.position];
      let q2 = new Quaternion2(...p.quaternion).normalize();
      o.assetId ? o.yaw = new Euler().setFromQuaternion(q2, "YXZ").y : (o.quaternion = q2.toArray(), o.rotation = new Euler().setFromQuaternion(q2, "YXZ").y);
    }
  } else if (c.op === "remove") {
    if (!target || target.editable !== !0 && (target.id === "ground" || target.category === "structure")) throw Error("Select an editable object to delete");
    next.objects = clearEntityTargets(next.objects.filter((o) => o.id !== c.id), c.id), next.regions && (next.regions = next.regions.filter((r) => (r.objectId || r.doorId) !== c.id)), next.floods && (next.floods = next.floods.filter((f) => (f.objectId || f.doorId) !== c.id));
  } else if (c.op === "update") {
    if (!target) throw Error("Select an object, camera or light first");
    let p = c.values || {};
    if (p.position !== void 0) {
      if (!vector3(p.position)) throw Error("Invalid position");
      target.position = [...p.position];
    }
    if (p.fov !== void 0) {
      if (!isCamera(target)) throw Error("This object is not a camera");
      target.camera.fov = p.fov;
    }
    if (p.lightType !== void 0) {
      if (!isLight(target)) throw Error("This object is not a light");
      if (!["point", "spot"].includes(p.lightType)) throw Error("Invalid light type");
      target.light.type = p.lightType, target.shape = p.lightType === "point" ? "sphere" : "box";
    }
    p.color !== void 0 && (target.color = p.color, isLight(target) && (target.light.color = p.color));
    for (let key of ["intensity", "range", "angle"]) if (p[key] !== void 0) {
      if (!isLight(target)) throw Error("This object is not a light");
      target.light[key] = p[key];
    }
    p.curveId !== void 0 && (p.curveId === null ? delete target.track : target.track = { duration: 8, delay: 0, fadeOut: 0, orientation: "fixed", targetId: null, ...target.track, curveId: p.curveId });
    for (let key of ["duration", "delay", "fadeOut"]) if (p[key] !== void 0) {
      if (!target.track) throw Error("Bind a saved curve first");
      target.track[key] = p[key];
    }
    if (p.targetId !== void 0 && (target.track ? target.track.targetId = p.targetId : target.aimTargetId = p.targetId), p.orientation !== void 0) {
      if (target.track) target.track.orientation = p.orientation;
      else if (p.orientation === "fixed") delete target.aimTargetId;
      else if (p.orientation !== "target" || !target.aimTargetId) throw Error("Bind a curve before using tangent orientation");
    }
  } else if (c.op === "regionTrigger") {
    if (bindTrackTrigger(next, c), c.values) return applyCinema(next, { op: "update", id: c.id, values: c.values });
  } else if (c.op === "clearTrigger") {
    if (!target?.track?.trigger) throw Error("This object has no region trigger");
    delete target.track.trigger;
  } else if (c.op === "curve") {
    let curve = next.curves?.find((p) => p.id === c.id);
    if (!curve) throw Error("Curve no longer exists");
    curve.rawPoints ||= structuredClone(curve.points), curve.controls = c.straight ? [[...curve.points[0]], [...curve.points.at(-1)]] : structuredClone(c.controls || editableControls(curve)), curve.smooth = c.smooth ?? !0, curve.points = curvePoints(curve.controls, curve.smooth), curve.editVersion = (curve.editVersion || 0) + 1;
  } else if (c.op === "complete")
    next.productionReady = !0;
  else throw Error("Unknown authoring operation");
  if (next.triggerRegions) {
    let used = new Set(next.objects.map((o) => o.track?.trigger?.regionId));
    next.triggerRegions = next.triggerRegions.filter((r) => used.has(r.id));
  }
  return validateCinema(next);
}
function rigFrame(o, curves, time, targets = []) {
  let position = [...o.position], quaternion = objectQuaternion(o), intensity = o.light?.intensity, t = o.track, curve = t && curves.find((c) => c.id === t.curveId);
  if (!curve) {
    let target = targets.find((v2) => v2.id === o.aimTargetId);
    return target && (quaternion = lookAt(position, target, quaternion)), { id: o.id, position, quaternion, rotation: new Euler().setFromQuaternion(new Quaternion2(...quaternion), "YXZ").y, intensity };
  }
  let points = curve.points, lengths = [0];
  for (let i2 = 1; i2 < points.length; i2++) lengths.push(lengths[i2 - 1] + new Vector33(...points[i2]).distanceTo(new Vector33(...points[i2 - 1])));
  let progress = Math.max(0, Math.min(1, (time - t.delay) / t.duration)), distance4 = progress * lengths.at(-1), i = 1;
  for (; i < lengths.length - 1 && lengths[i] < distance4; ) i++;
  let ratio = (distance4 - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1), a = new Vector33(...points[i - 1]), b = new Vector33(...points[i]);
  position = a.clone().lerp(b, ratio).toArray();
  let direction = t.orientation === "tangent" ? b.sub(a) : null;
  if (t.orientation === "target") {
    let target = targets.find((v2) => v2.id === t.targetId);
    target && (direction = new Vector33(...target.position).add(new Vector33(0, target.assetId ? 1.1 : 0, 0)).sub(new Vector33(...position)));
  }
  if (direction?.lengthSq() > 1e-8) {
    direction.normalize();
    let yaw = Math.atan2(-direction.x, -direction.z), pitch = Math.asin(Math.max(-1, Math.min(1, direction.y)));
    quaternion = new Quaternion2().setFromEuler(new Euler(pitch, yaw, 0, "YXZ")).toArray();
  }
  return intensity !== void 0 && t.fadeOut > 0 && (intensity *= Math.max(0, Math.min(1, (t.delay + t.duration - time) / t.fadeOut))), { id: o.id, position, quaternion, rotation: new Euler().setFromQuaternion(new Quaternion2(...quaternion), "YXZ").y, intensity };
}
function lookAt(position, target, fallback) {
  let d = new Vector33(...target.position).add(new Vector33(0, target.assetId ? 1.1 : 0, 0)).sub(new Vector33(...position));
  return d.lengthSq() < 1e-8 ? fallback : (d.normalize(), new Quaternion2().setFromEuler(new Euler(Math.asin(Math.max(-1, Math.min(1, d.y))), Math.atan2(-d.x, -d.z), 0, "YXZ")).toArray());
}

// src/shared/scene.mjs
var SHAPES = ["box", "sphere", "cylinder", "cone"], clone = (value) => structuredClone(value);
function validateObject(object3) {
  if (!object3 || typeof object3 != "object") throw new Error("Invalid object");
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(object3.id)) throw new Error("Invalid object ID");
  if (typeof object3.name != "string" || object3.name.length > 100) throw new Error("Invalid object name");
  if (typeof object3.group != "string" || object3.group.length > 100) throw new Error("Invalid group");
  if (object3.category !== void 0 && !CATEGORY_IDS.includes(object3.category)) throw new Error("Invalid object category");
  if (object3.editable !== void 0 && typeof object3.editable != "boolean") throw new Error("Invalid editing property");
  if (object3.role !== void 0 && !["floor", "ceiling", "wall", "door", "window", "furniture"].includes(object3.role)) throw new Error("Invalid scene part type");
  if (object3.assemblyId !== void 0 && object3.assemblyId !== null && !/^[a-zA-Z0-9_-]{1,64}$/.test(object3.assemblyId)) throw new Error("Invalid furniture entity ID");
  if (!SHAPES.includes(object3.shape)) throw new Error("Unsupported geometry type");
  if (!/^#[\da-f]{6}$/i.test(object3.color)) throw new Error("Color must be a six-digit hexadecimal value");
  for (let key of ["position", "size"])
    if (!Array.isArray(object3[key]) || object3[key].length !== 3 || !object3[key].every(Number.isFinite)) throw new Error(`Invalid ${key}`);
  if (object3.position.some((v2) => Math.abs(v2) > 100)) throw new Error("Object is outside the prototype scene bounds");
  if (object3.size.some((v2) => v2 < 0.02 || v2 > 100)) throw new Error("Object dimensions are outside the supported range");
  if (!Number.isFinite(object3.rotation) || Math.abs(object3.rotation) > Math.PI * 2) throw new Error("Invalid rotation angle");
  for (let key of ["roughness", "metalness"])
    if (!Number.isFinite(object3[key]) || object3[key] < 0 || object3[key] > 1) throw new Error("Invalid material parameters");
  return object3;
}
function validateScene(scene2) {
  if (!scene2 || typeof scene2.title != "string" || scene2.title.length > 100 || typeof scene2.description != "string" || scene2.description.length > 2e3) throw new Error("Invalid scene information");
  if (!Array.isArray(scene2.objects) || !scene2.objects.length || scene2.objects.length > 180) throw new Error("Scene must contain between 1 and 180 objects");
  if (scene2.room !== void 0 && validateRoomMetrics(scene2.room), scene2.referenceFloor !== void 0 && (validateObject(scene2.referenceFloor), scene2.referenceFloor.shape !== "box"))
    throw new Error("The scene reference floor must be rectangular");
  if (scene2.actorStyle !== void 0 && !["zombie", "cute"].includes(scene2.actorStyle)) throw new Error("Invalid actor style");
  let ids = /* @__PURE__ */ new Set();
  for (let object3 of scene2.objects) {
    if (validateObject(object3), ids.has(object3.id)) throw new Error("Duplicate object ID");
    ids.add(object3.id);
  }
  if (scene2.actors !== void 0) {
    validateActors(scene2.actors);
    for (let actor of scene2.actors) if (ids.has(actor.id)) throw new Error("Actor ID conflicts with an object ID");
  }
  return scene2.curves !== void 0 && validateCurves(scene2.curves), validateCinema(scene2), validateBehaviors(scene2), validateDoorEffects(scene2), validateDoorPerformance(scene2), validateFloods(scene2), scene2;
}
function applyPatch(scene2, patch, allowedIds = scene2.objects.map((o) => o.id)) {
  if (!patch || !Array.isArray(patch.updates) || !Array.isArray(patch.creates)) throw new Error("Invalid change format");
  if (patch.updates.length + patch.creates.length === 0) throw new Error("No changes to apply");
  let next = clone(scene2), allowed = new Set(allowedIds), updated = /* @__PURE__ */ new Set();
  for (let object3 of patch.updates) {
    validateObject(object3);
    let index = next.objects.findIndex((o) => o.id === object3.id);
    if (index < 0 || !allowed.has(object3.id)) throw new Error("Changes include an unselected object");
    if (updated.has(object3.id)) throw new Error("The same object was edited more than once");
    updated.add(object3.id);
    let old = next.objects[index], metadata = Object.fromEntries(["assemblyId", "scanAnchorId", "role", "editable", "sourcePlanes", "kind", "camera", "light", "track", "aimTargetId"].filter((k) => old[k] !== void 0).map((k) => [k, old[k]]));
    next.objects[index] = { ...clone(object3), ...object3.category === void 0 && old.category ? { category: old.category } : {}, ...metadata, ...old.quaternion ? { quaternion: new Quaternion3().setFromAxisAngle(new Vector34(0, 1, 0), object3.rotation - old.rotation).multiply(new Quaternion3(...old.quaternion)).normalize().toArray() } : {}, ...old.colorSource === "custom" || object3.color !== old.color ? { colorSource: "custom" } : {} };
  }
  for (let object3 of patch.creates) next.objects.push(clone(validateObject(object3)));
  return validateScene(next);
}
var objectSchema = {
  type: "object",
  additionalProperties: !1,
  properties: { id: { type: "string" }, name: { type: "string", description: "A concise English object name, regardless of the user language." }, group: { type: "string", description: "An English group name." }, shape: { type: "string", enum: SHAPES }, position: { type: "array", items: { type: "number" }, minItems: 3, maxItems: 3 }, size: { type: "array", items: { type: "number" }, minItems: 3, maxItems: 3 }, color: { type: "string" }, rotation: { type: "number" }, roughness: { type: "number" }, metalness: { type: "number" } },
  required: ["id", "name", "group", "shape", "position", "size", "color", "rotation", "roughness", "metalness"]
}, sceneSchema = { type: "object", additionalProperties: !1, properties: { title: { type: "string" }, description: { type: "string" }, objects: { type: "array", items: objectSchema } }, required: ["title", "description", "objects"] };
objectSchema.properties.assemblyId = { type: ["string", "null"], description: "Same explicit ID for the parts of ONE furniture assembly; null for independent objects. Not a semantic category." };
objectSchema.required.push("assemblyId");

// src/shared/transforms.mjs
var vector4 = (v2) => Array.isArray(v2) && v2.length === 3 && v2.every((n) => Number.isFinite(n) && Math.abs(n) <= 200), wrapYaw = (a) => Math.atan2(Math.sin(a), Math.cos(a)), allEntities = (scene2) => [...scene2.objects, ...scene2.actors || []];
function expandSelection(scene2, ids) {
  let chosen = new Set(ids), assemblies = new Set(scene2.objects.filter((o) => chosen.has(o.id) && o.assemblyId).map((o) => o.assemblyId));
  return allEntities(scene2).filter((o) => chosen.has(o.id) || o.assemblyId && assemblies.has(o.assemblyId)).map((o) => o.id);
}
function transformTargets(scene2, ids) {
  if (!Array.isArray(ids) || !ids.length || ids.length > 187 || new Set(ids).size !== ids.length || ids.some((id) => !allEntities(scene2).some((o) => o.id === id))) throw new Error("Select a valid actor or object first");
  let expanded = expandSelection(scene2, ids), targets = allEntities(scene2).filter((o) => expanded.includes(o.id));
  if (targets.some((o) => o.editable !== !0 && (o.id === "ground" || o.category === "structure" || /^(wall|ceiling)(_|-|$)/.test(o.id)))) throw new Error("Scan reference is locked. Build an editable scene from the scan first.");
  return targets;
}
function validateTransform(scene2, op) {
  let targets = transformTargets(scene2, op?.ids);
  if (!vector4(op.pivot) || !vector4(op.translation) || !Number.isFinite(op.yaw) || Math.abs(op.yaw) > Math.PI * 2) throw new Error("Invalid transform parameters");
  return { ...op, ids: targets.map((o) => o.id) };
}
function transformUpdates(targets, op) {
  let c = Math.cos(op.yaw), s = Math.sin(op.yaw), [px, , pz] = op.pivot, [dx, dy, dz] = op.translation;
  return targets.map((o) => {
    let [x, y, z] = o.position;
    return { id: o.id, position: [px + c * (x - px) + s * (z - pz) + dx, y + dy, pz - s * (x - px) + c * (z - pz) + dz], ...o.assetId ? { yaw: wrapYaw(o.yaw + op.yaw) } : { rotation: wrapYaw(o.rotation + op.yaw), ...o.quaternion ? { quaternion: new Quaternion4().setFromAxisAngle(new Vector35(0, 1, 0), op.yaw).multiply(new Quaternion4(...o.quaternion)).normalize().toArray() } : {} } };
  });
}
function applyTransform(scene2, input) {
  let op = validateTransform(scene2, input), updates = new Map(transformUpdates(transformTargets(scene2, op.ids), op).map((o) => [o.id, o])), next = structuredClone(scene2);
  for (let o of allEntities(next)) updates.has(o.id) && Object.assign(o, updates.get(o.id));
  return validateScene(next);
}
var isTransformRequest = (text) => languagePattern("transform.request").test(text);

// src/shared/ui-text.mjs
var han = /\p{Script=Han}/u, escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), patterns = Object.entries(legacy_ui_default).filter(([key]) => /\{\d+\}/.test(key)).map(([key, value]) => {
  let slots = [], parts = key.split(/(\{\d+\})/g).map((part) => /^\{\d+\}$/.test(part) ? (slots.push(part), "([\\s\\S]*?)") : escape(part));
  return { regex: new RegExp("^" + parts.join("") + "$"), slots, value, weight: key.replace(/\{\d+\}/g, "").length };
}).sort((a, b) => b.weight - a.weight), cache = /* @__PURE__ */ new Map();
function uiText(value, depth = 0) {
  if (value == null) return "";
  let text = String(value);
  if (!han.test(text)) return text;
  if (Object.hasOwn(legacy_ui_default, text) && !text.includes("{")) return legacy_ui_default[text];
  if (cache.has(text)) return cache.get(text);
  if (depth > 5) return text;
  let result = text;
  for (let { regex, slots, value: english } of patterns) {
    let match = regex.exec(text);
    if (match) {
      result = english.replace(/\{\d+\}/g, (slot) => {
        let i = slots.indexOf(slot);
        return i < 0 ? slot : uiText(match[i + 1], depth + 1);
      });
      break;
    }
  }
  return result === text && (/[\n·]/.test(text) && (result = text.split(/(\n|\s*·\s*)/).map((part) => part.trim() ? uiText(part, depth + 1) : part).join("")), result === text && (result = text.replace(languagePattern("ui.legacyText"), (part) => Object.hasOwn(legacy_ui_default, part) ? legacy_ui_default[part] : part))), cache.size >= 1e3 && cache.clear(), cache.set(text, result), result;
}

// src/shared/interaction-session.mjs
function createInteractionSession() {
  let current = null;
  return {
    open({ ids, revision, spatialKey: spatialKey2, standalone = !1 }) {
      if (!Array.isArray(ids) || !ids.length && !standalone || new Set(ids).size !== ids.length || ids.some((id) => typeof id != "string") || !Number.isInteger(revision) || typeof spatialKey2 != "string") throw new Error("Select an object first");
      current = { ids: [...ids], revision, spatialKey: spatialKey2, mode: "interaction" };
    },
    draft() {
      if (!current) throw new Error("Select an object first");
      current.mode = "draft";
    },
    demonstration() {
      if (!current) throw Error("Select a door");
      current.mode = "demonstration";
    },
    close() {
      current = null;
    },
    valid({ revision, spatialKey: spatialKey2, ids }) {
      return !current || current.revision === revision && current.spatialKey === spatialKey2 && current.ids.every((id) => ids.includes(id));
    },
    snapshot: () => current ? structuredClone(current) : null,
    active: () => current !== null,
    drawing: () => current?.mode === "draft"
  };
}
function objectActions(context) {
  if (context.authoring && context.actorSelected) return [];
  if (context.phase !== "explore" || !context.objectSelection?.length || context.actorPlacing) return [];
  if (context.objectInteraction?.mode === "draft") return [];
  let disabled = !!context.editingBusy || !!context.job || !!context.saving || !!context.finishing;
  return [{ id: "objectInteraction", label: "Interaction \xB7 Set behavior", disabled }, { id: "objectTransform", label: "Transform \xB7 Move and turn", disabled }];
}
function interactionActions(context) {
  return context.objectInteraction ? context.objectInteraction.mode === "demonstration" ? context.demonstration?.state === "recording" ? [{ id: "demonstrationStop", label: "X \xB7 Stop and prepare interaction" }] : context.demonstration?.state === "saving" ? [{ id: "demonstrationStop", label: "Saving demonstration...", disabled: !0 }] : [...context.demonstration?.state === "ready" ? [{ id: "demonstrationApply", label: "Prepare door interaction" }] : [], { id: context.demonstration?.canRetry ? "demonstrationRetry" : "demonstrationStart", label: context.demonstration?.canRetry ? "X \xB7 Retry saving" : "X \xB7 Start demonstration" }, { id: "interactionClose", label: "Back" }] : context.authoring && context.objectInteraction.mode === "draft" && context.draft?.kind === "regions" ? [
    { id: "draftApply", label: "Finish sketch", disabled: !context.draft?.regionCount || context.draft?.drawing },
    { id: "draftUndo", label: "Undo last region", disabled: !context.draft?.canUndo },
    { id: "draftCancel", label: "Cancel drawing" }
  ] : context.authoring && context.objectInteraction.mode === "draft" ? [
    { id: "draftApply", label: "Save curve", disabled: !context.draft?.pointCount || context.draft?.drawing },
    { id: "draftSmooth", label: "Smoothing: " + (context.draft?.smoothingLabel || "Standard"), disabled: !!context.draft?.drawing },
    ...context.draft?.mode === "space3d" ? [{ id: "brushNear", label: "Tip nearer", disabled: context.draft.drawing }, { id: "brushFar", label: "Tip farther", disabled: context.draft.drawing }] : [],
    { id: "draftClear", label: "Redraw curve" },
    { id: "draftUndo", label: "Undo stroke", disabled: !context.draft?.canUndo },
    { id: "draftCancel", label: "Cancel drawing" }
  ] : context.objectInteraction.mode === "draft" ? [
    ...context.videoState === "recording" ? [{ id: "record", label: "Stop and save recording \xB7 B" }] : [],
    { id: "draftApply", label: "Finish and prepare path", disabled: !context.draft?.pointCount || context.draft?.drawing },
    { id: "draftClear", label: "Clear draft" },
    { id: "draftUndo", label: "Undo stroke", disabled: !context.draft?.canUndo },
    { id: "draftCancel", label: "Cancel and exit Draft" }
  ] : context.authoring && context.door && context.objectInteraction.ids.length === 1 && context.objectInteraction.ids[0] === context.door.id ? [
    { id: "regionDraft", label: "Draw regions" },
    ...context.floodAvailable ? [{ id: "floodPreview", label: "Replay interaction" }] : [],
    { id: "interactionVoice", label: "Voice description \xB7 Hold X" },
    { id: "interactionClose", label: "Back" }
  ] : context.authoring ? [{ id: "drawFloor", label: "Draw on floor \xB7 2D" }, { id: "drawSpace", label: "Draw in air \xB7 3D" }, { id: "interactionVoice", label: "Describe intent \xB7 hold X" }, { id: "interactionClose", label: "Back" }] : [
    { id: "interactionDraft", label: "Draft \xB7 Ground sketch" },
    { id: "interactionVoice", label: "Voice \xB7 Spoken request" },
    { id: "interactionDemonstration", label: "Video demonstration", disabled: !context.door || context.objectInteraction.ids.length !== 1 || context.objectInteraction.ids[0] !== context.door.id },
    { id: "interactionClose", label: "Back to object controls" }
  ] : [];
}

// src/client/tools/drawing-actions.mjs
function createDrawingActions(appRuntime) {
  function beginCurve2(mode2) {
    if (appRuntime.openSourceMode && !appRuntime.editing) throw Error("Enter edit mode before drawing.");
    if (appRuntime.phase !== "explore" || appRuntime.busy()) throw Error("Enter the scene and finish the current operation first.");
    appRuntime.objectInteraction.active() || appRuntime.objectInteraction.open({ ids: [...appRuntime.selection], revision: appRuntime.state.revision, spatialKey: appRuntime.spatialKey(), standalone: !0 }), appRuntime.pausePerformance(), appRuntime.objectInteraction.draft(), appRuntime.draftTool.open([], { mode: mode2, depth: appRuntime.renderer.xr.isPresenting ? 0.6 : 2 }), appRuntime.navigationGate.block(), appRuntime.keys.clear(), appRuntime.setHover([]), appRuntime.controls.enabled = !1, appRuntime.renderer.xr.isPresenting && (appRuntime.draftInputBlocked = new Set(appRuntime.triggerHeld), appRuntime.xrPanel.visible = !1, appRuntime.updatePresentationVisibility()), appRuntime.updateHint(), appRuntime.updateSelection(), appRuntime.syncFlow(), appRuntime.toast(mode2 === "space3d" ? "Spatial brush: hold the right trigger and move your hand. Y opens the save menu." : "Ground brush: point at ground and hold the right trigger. Y opens the save menu.");
  }
  async function saveCurve2() {
    let draft = appRuntime.draftTool.snapshot();
    if (draft.stroke) throw Error("Release the trigger first");
    if (draft.kind === "regions") {
      if (!draft.regions.length) throw Error("Draw a region first.");
      let next2 = await appRuntime.api("/api/interaction-sketch", { objectId: draft.objectId || draft.doorId, regions: draft.regions, revision: appRuntime.state.revision });
      appRuntime.closeObjectInteraction(), appRuntime.acceptState(next2), appRuntime.syncFlow(), appRuntime.toast("Regions saved. Hold X to describe the flow and dwell condition.");
      return;
    }
    let curve = { id: "curve-" + crypto.randomUUID(), mode: draft.mode, points: draft.points, rawPoints: draft.rawPoints, smoothing: draft.smoothing }, next = await appRuntime.api("/api/curves", { type: "add", curve, revision: appRuntime.state.revision });
    appRuntime.selectedCurveId = curve.id, appRuntime.closeObjectInteraction(), appRuntime.acceptState(next), appRuntime.syncFlow(), appRuntime.toast("Curve saved. Select an object or actor and request movement along it. A Save; left grip rehearses in Explore.");
  }
  function beginRegionDraft2() {
    if (appRuntime.phase !== "explore" || !appRuntime.editing || appRuntime.busy() || appRuntime.selection.length !== 1 || !isRegionObject(appRuntime.state.scene.objects.find((o) => o.id === appRuntime.selection[0]))) throw Error("Select one editable object and finish the current operation first.");
    appRuntime.objectInteraction.active() || appRuntime.openObjectInteraction(), appRuntime.pausePerformance(), appRuntime.objectInteraction.draft(), appRuntime.draftTool.openRegions(appRuntime.state.scene, appRuntime.selection[0], appRuntime.actorViewPosition().toArray()), appRuntime.navigationGate.block(), appRuntime.keys.clear(), appRuntime.setHover([]), appRuntime.controls.enabled = !1, appRuntime.renderer.xr.isPresenting && (appRuntime.draftInputBlocked = new Set(appRuntime.triggerHeld), appRuntime.xrPanel.visible = !1, appRuntime.updatePresentationVisibility()), appRuntime.updateHint(), appRuntime.updateSelection(), appRuntime.syncFlow(), appRuntime.toast("Draw sources on this object and a floor dwell region. Close each loop, then save and describe the flow.");
  }
  function previewFlood2() {
    if (appRuntime.phase !== "explore" || !(appRuntime.previewScene || appRuntime.state.scene).floods?.length || appRuntime.currentJob && appRuntime.currentJob.status !== "ready") throw Error("Generate or apply a flow interaction first.");
    if (appRuntime.openSourceMode && appRuntime.production && !appRuntime.currentJob) return appRuntime.startObjectPreview({ restart: !0 });
    let ids = (appRuntime.previewScene || appRuntime.state.scene).floods.filter((f) => appRuntime.selection.includes(regionObjectId(f))).map((f) => f.id);
    if (!ids.length) throw Error("Select the object whose flow effect you want to rehearse.");
    appRuntime.pausePerformance(), appRuntime.closeObjectInteraction(), appRuntime.currentJob || appRuntime.setEditing(!1), appRuntime.floodRuntime.start(ids), appRuntime.renderer.xr.isPresenting && (appRuntime.xrPanel.visible = !1), appRuntime.syncFlow(), appRuntime.toast("Rehearsal started. Enter and remain in the floor region. Leaving resets the timer. Say \u201Creplay interaction\u201D to restart.");
  }
  function nextCurve2() {
    let curves = appRuntime.state.scene.curves || [];
    if (!curves.length) throw Error("Save the curve first.");
    appRuntime.selectedCurveId = curves[(curves.findIndex((c) => c.id === appRuntime.selectedCurveId) + 1) % curves.length].id, appRuntime.curveLayer.sync(curves, appRuntime.selectedCurveId), appRuntime.syncFlow();
  }
  async function removeCurve2() {
    if (!appRuntime.selectedCurveId) throw Error("Select a curve first.");
    let next = await appRuntime.api("/api/curves", { type: "remove", id: appRuntime.selectedCurveId, revision: appRuntime.state.revision });
    appRuntime.selectedCurveId = null, appRuntime.acceptState(next);
  }
  function beginObjectDraft2() {
    if (appRuntime.openSourceMode) return beginCurve2("floor2d");
    if (!appRuntime.objectInteraction.active() || appRuntime.busy()) throw new Error("Select an object and finish the current action first");
    appRuntime.presetSequence?.ownsPerformance() && appRuntime.presetSequence.cancel("Draft is open. Confirm Preview again after preparing the path."), appRuntime.objectInteraction.draft(), appRuntime.draftTool.open(appRuntime.state.scene.behaviors?.path?.actorIds.every((id) => appRuntime.selection.includes(id)) ? appRuntime.state.scene.behaviors.path.rawPoints : []), appRuntime.navigationGate.block(), appRuntime.keys.clear(), appRuntime.setHover([]), appRuntime.renderer.xr.isPresenting && (appRuntime.draftInputBlocked = new Set(appRuntime.triggerHeld), appRuntime.xrPanel.visible = !1, appRuntime.updatePresentationVisibility()), appRuntime.controls.enabled = !1, appRuntime.updateHint(), appRuntime.updateSelection(), appRuntime.syncFlow(), appRuntime.toast("Draft: right trigger to draw \xB7 Left stick click to undo \xB7 A to cancel");
  }
  function paintObjectInteraction2(context) {
    let session = context.objectInteraction;
    if (appRuntime.$("object-interaction-panel").hidden = !session, !session) return;
    let names = session.ids.map((id) => appRuntime.uiName(allEntities(appRuntime.state.scene).find((o) => o.id === id)) || id);
    appRuntime.$("interaction-targets").textContent = uiText(names.length === 1 ? names[0] : `${names.length} objects locked`), appRuntime.$("interaction-status").textContent = uiText(session.mode === "draft" ? context.draft.kind === "regions" ? context.draft.message : `${context.draft.message} \xB7 ${context.draft.length.toFixed(2)} m` : "How would you like to describe the interaction?"), appRuntime.$("interaction-actions").replaceChildren();
    for (let item2 of interactionActions(context)) {
      let button = document.createElement("button");
      button.textContent = uiText(item2.label), button.dataset.action = item2.id, button.disabled = !!item2.disabled, button.onclick = appRuntime.action(() => appRuntime.flowAction(item2.id)), appRuntime.$("interaction-actions").append(button);
    }
  }
  function updateDraftDrawing2() {
    if (appRuntime.objectInteraction.active()) {
      if (!appRuntime.objectInteraction.valid({ revision: appRuntime.state.revision, spatialKey: appRuntime.spatialKey(), ids: allEntities(appRuntime.state.scene).map((o) => o.id) })) {
        appRuntime.closeObjectInteraction("Scene or alignment changed. Draft closed.");
        return;
      }
      if (appRuntime.draftTool.active())
        if (appRuntime.renderer.xr.isPresenting) {
          let controller = appRuntime.controllers.find((c) => c.userData.inputSource?.handedness === "right");
          if (!appRuntime.xrViewer.valid || !controller?.visible || !controller?.userData.inputSource || appRuntime.xrPanel.visible) {
            appRuntime.draftTool.suspend("Hide the menu and restore controller tracking before drawing");
            return;
          }
          appRuntime.raycaster.setFromXRController(controller), appRuntime.draftTool.update(appRuntime.raycaster, controller);
        } else appRuntime.pointerInside && (appRuntime.raycaster.setFromCamera(appRuntime.pointer, appRuntime.camera), appRuntime.draftTool.update(appRuntime.raycaster, "mouse"));
    }
  }
  function canRecordDraft2() {
    return appRuntime.draftTool.active() && !appRuntime.scriptDemo?.snapshot().busy && !appRuntime.videoStartPending && !appRuntime.transformPending && !appRuntime.currentJob && !appRuntime.submitting && !appRuntime.saving && !appRuntime.finishing && !appRuntime.director.snapshot().pending && appRuntime.studio.getRecordingState() === "idle" && appRuntime.virtualRecorder.snapshot().status === "idle";
  }
  return { beginCurve: beginCurve2, saveCurve: saveCurve2, beginRegionDraft: beginRegionDraft2, previewFlood: previewFlood2, nextCurve: nextCurve2, removeCurve: removeCurve2, beginObjectDraft: beginObjectDraft2, paintObjectInteraction: paintObjectInteraction2, updateDraftDrawing: updateDraftDrawing2, canRecordDraft: canRecordDraft2 };
}

// src/client/ui/creation-layout.mjs
import * as THREE2 from "three";

// src/shared/scene-space.mjs
var referenceFloor = (scene2) => scene2?.scanReconstruction?.referenceFloor || scene2?.referenceFloor || scene2?.objects.find((o) => o.id === "ground"), isScanScene = (scene2) => !!(scene2?.scanStructure || scene2?.scanReconstruction), isRawScanScene = (scene2) => !!scene2?.scanStructure && !scene2?.scanReconstruction;

// src/shared/entry-points.mjs
function localXZ(object3, point2) {
  let x = point2[0] - object3.position[0], z = point2[2] - object3.position[2], c = Math.cos(object3.rotation), s = Math.sin(object3.rotation);
  return [c * x - s * z, s * x + c * z];
}
var isFloor = (object3) => object3?.role === "floor" || object3?.id === "ground" || object3?.group === "scan-floors";
function entryIsClear(scene2, point2, { radius = 0.45, height = 1.8 } = {}) {
  if (!point2?.every(Number.isFinite)) return !1;
  let floors = scene2.objects.filter(isFloor);
  return (scene2.scanReconstruction ? [point2, ...Array.from({ length: 16 }, (_, i) => [point2[0] + radius * Math.cos(i * Math.PI / 8), point2[1], point2[2] + radius * Math.sin(i * Math.PI / 8)])].every((p) => floors.some((f) => {
    let [x, z] = localXZ(f, p);
    return Math.abs(p[1] - f.position[1] - f.size[1] / 2) < 0.15 && Math.abs(x) <= f.size[0] / 2 + 1e-6 && Math.abs(z) <= f.size[2] / 2 + 1e-6;
  })) : floors.some((ground) => {
    if (!["box", "cylinder"].includes(ground.shape)) return !1;
    let [x, z] = localXZ(ground, point2), rx = ground.size[0] / 2 - radius, rz = ground.size[2] / 2 - radius;
    return rx <= 0 || rz <= 0 || Math.abs(point2[1] - (ground.position[1] + ground.size[1] / 2)) > 0.15 ? !1 : !(ground.shape === "cylinder" ? (x / rx) ** 2 + (z / rz) ** 2 > 1 : Math.abs(x) > rx || Math.abs(z) > rz);
  })) ? !scene2.objects.some((o) => {
    if (isFloor(o) || o.position[1] + o.size[1] / 2 <= point2[1] + 0.18 || o.position[1] - o.size[1] / 2 >= point2[1] + height) return !1;
    let [ox, oz] = localXZ(o, point2);
    return Math.abs(ox) < o.size[0] / 2 + radius && Math.abs(oz) < o.size[2] / 2 + radius;
  }) : !1;
}
function findEntryCandidates(scene2, { count = 3 } = {}) {
  let ground = referenceFloor(scene2);
  if (!ground) return [];
  let top = ground.position[1] + ground.size[1] / 2 + 0.01, c = Math.cos(ground.rotation), s = Math.sin(ground.rotation), candidates = [], toWorld = (x, z) => [ground.position[0] + c * x + s * z, top, ground.position[2] - s * x + c * z], preferred = toWorld(0, ground.size[2] * 0.25), tryPoint = (point2) => {
    entryIsClear(scene2, point2) && candidates.push({ position: point2, score: (point2[0] - preferred[0]) ** 2 + (point2[2] - preferred[2]) ** 2 });
  };
  tryPoint(preferred);
  for (let x = -8; x <= 8; x++) for (let z = -8; z <= 8; z++) tryPoint(toWorld(x * ground.size[0] / 18, z * ground.size[2] / 18));
  candidates.sort((a, b) => a.score - b.score);
  let chosen = [];
  for (let item2 of candidates)
    if (chosen.every((o) => Math.hypot(o.position[0] - item2.position[0], o.position[2] - item2.position[2]) >= Math.min(3, Math.min(ground.size[0], ground.size[2]) * 0.18)) && (chosen.push({ position: item2.position, heading: Math.atan2(item2.position[0] - ground.position[0], item2.position[2] - ground.position[2]) }), chosen.length === count))
      break;
  return chosen;
}

// src/client/ui/creation-layout.mjs
function scanPresentationBounds(definition) {
  let bounds = new THREE2.Box3();
  for (let o of (definition?.objects || []).filter(isFloor)) {
    let c = Math.cos(o.rotation), s = Math.sin(o.rotation);
    for (let x of [-o.size[0] / 2, o.size[0] / 2]) for (let z of [-o.size[2] / 2, o.size[2] / 2]) bounds.expandByPoint(new THREE2.Vector3(o.position[0] + c * x + s * z, 0, o.position[2] - s * x + c * z));
  }
  return { center: bounds.getCenter(new THREE2.Vector3()).toArray(), extent: Math.max(...bounds.getSize(new THREE2.Vector3()).toArray()) };
}
function createCreationLayout(panel, world2) {
  let yaw = 0, hasYaw = !1, stableSince = null, start = null, previous = null, up2 = new THREE2.Vector3(0, 1, 0);
  function sample(view) {
    let position = view.getWorldPosition(new THREE2.Vector3()), q2 = view.getWorldQuaternion(new THREE2.Quaternion()), forward = new THREE2.Vector3(0, 0, -1).applyQuaternion(q2);
    forward.y = 0;
    let horizontal = forward.lengthSq() > 0.04;
    return horizontal && (yaw = Math.atan2(-forward.x, -forward.z), hasYaw = !0), { position, yaw, horizontal };
  }
  return {
    reset() {
      stableSince = start = null, previous = null, hasYaw = !1, yaw = 0;
    },
    ready(view, time, valid = !0) {
      if (!valid)
        return stableSince = start = null, previous = null, !1;
      let pose = sample(view);
      if (start ??= time, !hasYaw) return !1;
      let angle3 = previous ? Math.atan2(Math.sin(pose.yaw - previous.yaw), Math.cos(pose.yaw - previous.yaw)) : 0;
      return (!previous || Math.abs(angle3) > 0.04 || pose.position.distanceTo(previous.position) > 0.04) && (stableSince = time, previous = pose), time - stableSince >= 250 || time - start >= 1500;
    },
    place(view, { miniature = !1, center = [0, 0, 0], rotationOffset = 0 } = {}) {
      let { position, yaw: yaw2 } = sample(view), forward = new THREE2.Vector3(-Math.sin(yaw2), 0, -Math.cos(yaw2));
      if (panel.position.copy(position).addScaledVector(forward, miniature ? 1.25 : 1.5), panel.position.y -= miniature ? 0.64 : 0.18, panel.quaternion.setFromAxisAngle(up2, yaw2), panel.visible = !0, panel.updateMatrixWorld(!0), miniature) {
        world2.quaternion.setFromAxisAngle(up2, yaw2 + rotationOffset);
        let offset = new THREE2.Vector3().fromArray(center).multiply(world2.scale).applyQuaternion(world2.quaternion);
        world2.position.copy(position).addScaledVector(forward, 1.9).sub(offset), world2.position.y -= 0.48, world2.updateMatrixWorld(!0);
      }
    }
  };
}
function alignedRoomPose(candidate, ground) {
  let yaw = candidate.yaw - (ground?.rotation || 0), q2 = new THREE2.Quaternion().setFromAxisAngle(new THREE2.Vector3(0, 1, 0), yaw), local = new THREE2.Vector3(ground?.position[0] || 0, ground ? ground.position[1] + ground.size[1] / 2 : 0, ground?.position[2] || 0).applyQuaternion(q2);
  return { position: new THREE2.Vector3().fromArray(candidate.origin).sub(local).toArray(), yaw };
}
function captureCreationPose(world2, rig2, camera2, alignedMode2) {
  let copy = (o) => ({ position: o.position.toArray(), quaternion: o.quaternion.toArray(), scale: o.scale.toArray() });
  return { world: copy(world2), rig: copy(rig2), camera: copy(camera2), alignedMode: alignedMode2 };
}
function restoreCreationPose(saved, world2, rig2, camera2, { xr = !1 } = {}) {
  let restore2 = (o, p) => {
    o.position.fromArray(p.position), o.quaternion.fromArray(p.quaternion), o.scale.fromArray(p.scale), o.updateMatrixWorld(!0);
  };
  restore2(world2, saved.world), restore2(rig2, saved.rig), xr || restore2(camera2, saved.camera);
}

// src/shared/room-placement.mjs
import { Vector3 as Vector37 } from "three";
var up = new Vector37(0, 1, 0), angle = (n) => Math.atan2(Math.sin(n), Math.cos(n));
function roomPlacementKey(scene2) {
  let f = referenceFloor(scene2);
  return f ? JSON.stringify([scene2.title, f.position, f.size, f.rotation]) : null;
}
function roomCorrection(base, candidate) {
  return { offset: new Vector37(...candidate.origin).sub(new Vector37(...base.origin)).applyAxisAngle(up, -base.yaw).toArray(), yaw: angle(candidate.yaw - base.yaw) };
}
function applyRoomCorrection(base, correction) {
  return correction ? { ...structuredClone(base), origin: new Vector37(...correction.offset).applyAxisAngle(up, base.yaw).add(new Vector37(...base.origin)).toArray(), yaw: angle(base.yaw + correction.yaw) } : structuredClone(base);
}
function createRoomPlacementStore(storage) {
  let key = "vrbuild-room-placement-v1", valid = (c) => c && Array.isArray(c.offset) && c.offset.length === 3 && c.offset.every((n) => Number.isFinite(n) && Math.abs(n) <= 40) && Number.isFinite(c.yaw), read = () => {
    try {
      let value = JSON.parse(storage?.getItem(key) || "{}");
      return value && typeof value == "object" && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  };
  return {
    get(scene2) {
      let value = read()[roomPlacementKey(scene2)];
      return valid(value) ? structuredClone(value) : null;
    },
    save(scene2, value) {
      let id = roomPlacementKey(scene2);
      if (!id || !valid(value)) return !1;
      try {
        let entries = read();
        return delete entries[id], entries[id] = structuredClone(value), storage?.setItem(key, JSON.stringify(Object.fromEntries(Object.entries(entries).slice(-12)))), !!storage;
      } catch {
        return !1;
      }
    },
    clear(scene2) {
      try {
        let entries = read();
        delete entries[roomPlacementKey(scene2)], storage?.setItem(key, JSON.stringify(entries));
      } catch {
      }
    }
  };
}

// src/client/xr/room-alignment.mjs
import * as THREE4 from "three";

// src/shared/room.mjs
var roomSchema = { ...sceneSchema, properties: { ...sceneSchema.properties, objects: { type: "array", items: { ...objectSchema, properties: { ...objectSchema.properties, category: { type: "string", enum: CATEGORY_IDS } }, required: [...objectSchema.required, "category"] } } } }, MAX_ROOM_PHOTOS = 1 / 0;
var ROOM_PHOTO_BYTES = 1024 * 1024, ROOM_INTENT = "Build an editable, categorized room blockout from these photos. Preserve floors, walls, ceiling, doors, windows, and large furniture. Omit small tabletop objects and decoration; prioritize spatial relationships.", CAPTURE_TIPS = [
  "Shot 1: include corners, floor, and large furniture.",
  "Shot 2: move to another position, keeping some walls or furniture from the first view.",
  "Shot 3: cover another corner, doors, and windows. Include wall\u2013floor boundaries.",
  "Shot 4: cover the remaining side. Hold still and avoid shooting into bright windows.",
  "Ready to build. Add more photos if needed."
];
function captureTip(count) {
  return CAPTURE_TIPS[Math.min(count, CAPTURE_TIPS.length - 1)];
}
function roomDimensions(scene2) {
  if (scene2.scanReconstruction) return validateRoomMetrics(scene2.room);
  let floor = scene2.objects.find((o) => o.id === "ground");
  if (!floor || floor.shape !== "box") throw new Error("The room has no flat floor");
  let bottom = floor.position[1] + floor.size[1] / 2, ceiling = scene2.objects.find(isCeiling), walls = scene2.objects.filter((o) => languagePattern("category.wall.caseSensitive").test(`${o.id} ${o.group} ${o.name}`)), height = ceiling ? ceiling.position[1] - ceiling.size[1] / 2 - bottom : Math.max(2.4, ...walls.map((o) => o.position[1] + o.size[1] / 2 - bottom));
  return { width: floor.size[0], depth: floor.size[2], height, source: scene2.room?.source || "estimated" };
}

// src/shared/ui-theme.mjs
var UI_THEME = Object.freeze({
  background: "#C9C3D1",
  panel: "#F1EEF5",
  text: "#302A3B",
  muted: "#70667C",
  control: "#E3DCE9",
  border: "#D3CADF",
  accent: "#76628F",
  onAccent: "#F1EEF5",
  pressed: "#65527D",
  selected: "#D5C8E3",
  error: "#FF4757",
  warning: "#ECCC68"
});
function installUITheme(document2) {
  for (let [name, color] of Object.entries(UI_THEME)) document2.documentElement.style.setProperty("--ui-" + name, color);
}

// src/client/ui/ui-resolution.mjs
import * as THREE3 from "three";
var UI_TEXTURE_SCALE = 2;
function createUICanvas(width, height) {
  let canvas2 = document.createElement("canvas");
  return canvas2.width = Math.round(width * UI_TEXTURE_SCALE), canvas2.height = Math.round(height * UI_TEXTURE_SCALE), canvas2.getContext("2d").scale(UI_TEXTURE_SCALE, UI_TEXTURE_SCALE), canvas2;
}
function createUITexture(canvas2) {
  let texture = new THREE3.CanvasTexture(canvas2);
  return texture.colorSpace = THREE3.SRGBColorSpace, texture.anisotropy = 8, texture.generateMipmaps = !0, texture.minFilter = THREE3.LinearMipmapLinearFilter, texture.magFilter = THREE3.LinearFilter, texture;
}
function createUIFoveation(xr) {
  let requested = null;
  return (visible) => {
    let value = visible ? 0 : 1;
    return requested !== value && (xr.setFoveation?.(value), requested = value), value;
  };
}

// src/client/xr/room-alignment.mjs
function createRoomAlignment(appRuntime) {
  function clearCalibrationMarkers2() {
    for (let child of [...appRuntime.calibrationMarkers.children])
      appRuntime.calibrationMarkers.remove(child), child.geometry?.dispose(), child.material?.map?.dispose(), child.material?.dispose();
    appRuntime.calibrationCursor.visible = !1;
  }
  function beginAlignmentCheck2({ restore: restore2 = !1 } = {}) {
    if (appRuntime.requireSpatialIdle(), !["room-photos", "room-scan", "room-rebuilt"].includes(appRuntime.state?.source)) throw new Error("Load a built room first");
    if (!appRuntime.renderer.xr.isPresenting || appRuntime.xrMode !== "immersive-ar") throw new Error("Confirm alignment in Quest passthrough mode");
    if (!appRuntime.xrViewer.valid) throw new Error("Waiting for headset tracking");
    ["align", "calibrate"].includes(appRuntime.phase) || (appRuntime.alignmentReturn = appRuntime.phase, appRuntime.rememberCreation()), appRuntime.pausePerformance(), appRuntime.roomCamera.stop(), appRuntime.setEditing(!1), appRuntime.selection = [], appRuntime.pendingAlignment = null, appRuntime.measurePoints = [], clearCalibrationMarkers2(), appRuntime.restoreAlignmentOnReady = restore2, appRuntime.alignmentStickReady = !1, appRuntime.rig.position.set(0, 0, 0), appRuntime.rig.rotation.set(0, 0, 0), appRuntime.alignedMode = !1, appRuntime.mode = "overview", appRuntime.controls.enabled = !1, appRuntime.setPhase("align"), updateAlignmentPreview2(), appRuntime.placeXRPanel();
  }
  function previewAlignment2(candidate) {
    if (!candidate) return;
    let wasReady = !!appRuntime.pendingAlignment;
    appRuntime.pendingAlignment = structuredClone(candidate), clearCalibrationMarkers2(), appRuntime.mode = "inhabit";
    let pose = alignedRoomPose(candidate, referenceFloor(appRuntime.state.scene));
    appRuntime.world.position.fromArray(pose.position), appRuntime.world.rotation.set(0, pose.yaw, 0), appRuntime.world.scale.setScalar(1), appRuntime.roomCeilingVisibility(), appRuntime.phase !== "align" ? appRuntime.setPhase("align") : wasReady || appRuntime.syncFlow();
  }
  function updateAlignmentPreview2() {
    if (appRuntime.phase === "align" && !appRuntime.pendingAlignment && appRuntime.xrViewer.valid) {
      let base = appRuntime.roomTracking.candidate();
      if (base) {
        let correction = appRuntime.roomPlacementStore.get(appRuntime.state.scene), candidate = applyRoomCorrection(base, correction);
        previewAlignment2(candidate), appRuntime.restoreAlignmentOnReady && correction && (appRuntime.restoreAlignmentOnReady = !1, appRuntime.alignment = structuredClone(candidate), appRuntime.pendingAlignment = null, enterAlignedRoom2(), appRuntime.toast("Saved room offset restored using current room tracking."));
      }
    }
  }
  function saveRoomCorrection2(candidate) {
    let base = appRuntime.roomTracking.candidate();
    return !!base && appRuntime.roomPlacementStore.save(appRuntime.state.scene, roomCorrection(base, candidate));
  }
  function offsetAlignment2(sources, dt) {
    if (!appRuntime.pendingAlignment) return;
    let pad = sources.find((s) => s.handedness === "left")?.gamepad, x = pad?.axes?.[2] || 0, y = pad?.axes?.[3] || 0;
    if (!pad) {
      appRuntime.alignmentStickReady = !1;
      return;
    }
    let grip = pad.buttons?.[1], vertical = !!(grip && (grip.pressed || grip.value > 0.65));
    if (vertical !== appRuntime.alignmentVertical && (appRuntime.alignmentVertical = vertical, appRuntime.alignmentStickReady = !1), !appRuntime.alignmentStickReady) {
      appRuntime.alignmentStickReady = Math.abs(x) < 0.18 && Math.abs(y) < 0.18;
      return;
    }
    let dead = (v2) => Math.abs(v2) > 0.18 ? v2 : 0;
    if (!dead(x) && !dead(y)) return;
    let forward = appRuntime.currentView().getWorldDirection(new THREE4.Vector3());
    forward.y = 0, forward.normalize();
    let right = new THREE4.Vector3(-forward.z, 0, forward.x), delta = vertical ? new THREE4.Vector3(0, -dead(y), 0) : right.multiplyScalar(dead(x)).addScaledVector(forward, -dead(y));
    delta.multiplyScalar(Math.min(dt, 0.05) * 0.35), appRuntime.pendingAlignment.origin = new THREE4.Vector3(...appRuntime.pendingAlignment.origin).add(delta).toArray(), previewAlignment2(appRuntime.pendingAlignment);
  }
  function cancelAlignment2() {
    if (appRuntime.requireSpatialIdle(), appRuntime.restoreAlignmentOnReady = !1, appRuntime.pendingAlignment = null, clearCalibrationMarkers2(), appRuntime.creationPose && appRuntime.alignmentReturn === "explore") {
      appRuntime.resumeWorld();
      return;
    }
    appRuntime.overview(), appRuntime.setPhase(appRuntime.alignmentReturn === "overview" ? "overview" : "welcome"), appRuntime.placeXRPanel();
  }
  function beginCalibration2() {
    if (appRuntime.requireSpatialIdle(), !appRuntime.renderer.xr.isPresenting || !appRuntime.xrViewer.valid) throw new Error("Enter immersive mode and wait for tracking before measuring");
    appRuntime.restoreAlignmentOnReady = !1, ["align", "calibrate"].includes(appRuntime.phase) || (appRuntime.alignmentReturn = appRuntime.phase, appRuntime.rememberCreation()), appRuntime.pausePerformance(), appRuntime.roomCamera.stop(), appRuntime.setEditing(!1), appRuntime.selection = [], appRuntime.measurePoints = [], appRuntime.pendingAlignment = null, clearCalibrationMarkers2(), appRuntime.rig.position.set(0, 0, 0), appRuntime.rig.rotation.set(0, 0, 0), appRuntime.alignedMode = !1, appRuntime.mode = "overview", appRuntime.setPhase("calibrate"), appRuntime.placeXRPanel(), appRuntime.toast(appRuntime.calibrationHint());
  }
  function addCalibrationPoint2(controller) {
    if (appRuntime.phase !== "calibrate" || appRuntime.pendingAlignment || appRuntime.busy() || controller.userData.inputSource?.handedness !== "right") return;
    if (!appRuntime.xrViewer.valid) throw new Error("Waiting for headset tracking");
    appRuntime.raycaster.setFromXRController(controller);
    let origin = appRuntime.raycaster.ray.origin.toArray(), direction = appRuntime.raycaster.ray.direction.toArray();
    if (appRuntime.measurePoints.length < 3) {
      let p = floorIntersection(origin, direction, appRuntime.roomTracking.candidate()?.origin[1] ?? 0);
      if (!p) throw new Error("Point down at a real floor corner");
      let next = [...appRuntime.measurePoints, p];
      next.length === 3 && calibrationFromCorners(...next, roomDimensions(appRuntime.state.scene).height), appRuntime.measurePoints = next;
      let dot3 = new THREE4.Mesh(new THREE4.SphereGeometry(0.07, 12, 8), new THREE4.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1 }));
      dot3.position.fromArray(p), appRuntime.calibrationMarkers.add(dot3);
      let badge = createUICanvas(128, 128), ctx = badge.getContext("2d");
      ctx.fillStyle = UI_THEME.panel, ctx.beginPath(), ctx.arc(64, 64, 58, 0, Math.PI * 2), ctx.fill(), ctx.fillStyle = UI_THEME.accent, ctx.font = "bold 80px sans-serif", ctx.textAlign = "center", ctx.textBaseline = "middle", ctx.fillText(String(next.length), 64, 67);
      let texture = createUITexture(badge), label = new THREE4.Sprite(new THREE4.SpriteMaterial({ map: texture, depthTest: !1, toneMapped: !1 }));
      label.position.fromArray(p), label.position.y += 0.19, label.scale.setScalar(0.2), label.renderOrder = 16, appRuntime.calibrationMarkers.add(label);
    } else appRuntime.pendingAlignment = calibrationFromCorners(...appRuntime.measurePoints, ceilingHeightAtWall(origin, direction, appRuntime.measurePoints[0], appRuntime.measurePoints[1]));
    appRuntime.syncFlow(), appRuntime.toast(appRuntime.calibrationHint());
  }
  function updateCalibrationCursor2() {
    if (appRuntime.calibrationCursor.visible = !1, appRuntime.phase !== "calibrate" || appRuntime.pendingAlignment || appRuntime.measurePoints.length >= 3) return;
    let right = appRuntime.controllers.find((c) => c.userData.inputSource?.handedness === "right");
    if (!right) return;
    appRuntime.raycaster.setFromXRController(right);
    let p = floorIntersection(appRuntime.raycaster.ray.origin.toArray(), appRuntime.raycaster.ray.direction.toArray(), appRuntime.roomTracking.candidate()?.origin[1] ?? 0);
    p && (appRuntime.calibrationCursor.position.fromArray(p), appRuntime.calibrationCursor.visible = !0);
  }
  function enterAlignedRoom2() {
    if (!appRuntime.alignment || !appRuntime.renderer.xr.isPresenting || !appRuntime.xrViewer.valid) throw new Error("Real-room alignment is required");
    clearCalibrationMarkers2(), appRuntime.rig.position.set(0, 0, 0), appRuntime.rig.rotation.set(0, 0, 0);
    let pose = alignedRoomPose(appRuntime.alignment, referenceFloor(appRuntime.state.scene));
    appRuntime.world.position.fromArray(pose.position), appRuntime.world.rotation.set(0, pose.yaw, 0), appRuntime.world.scale.setScalar(1), appRuntime.spatialEpoch++, appRuntime.mode = "inhabit", appRuntime.alignedMode = !0, appRuntime.controls.enabled = !1, appRuntime.scene.background = null, appRuntime.scene.fog = null, appRuntime.creationPose = null, appRuntime.creationReady(), appRuntime.$("mode-badge").textContent = uiText("Physical movement \xB7 1:1");
  }
  function applyRoomAlignment2(candidate) {
    if (appRuntime.requireSpatialIdle(), !candidate) throw new Error("Floor / ceiling data or corner measurements are incomplete");
    if (!appRuntime.renderer.xr.getSession() || !appRuntime.xrViewer.valid) throw new Error("Wait for headset tracking before applying");
    appRuntime.restoreAlignmentOnReady = !1, appRuntime.alignment = structuredClone(candidate), appRuntime.pendingAlignment = null, enterAlignedRoom2();
    let saved = saveRoomCorrection2(appRuntime.alignment);
    appRuntime.toast(saved ? "Room offset saved. It will be restored when room tracking is available." : "Alignment applied for this session. Room tracking is needed to restore it automatically.");
  }
  function rotateRoom2() {
    if (appRuntime.isMiniature() && (!appRuntime.currentJob || appRuntime.currentJob.status === "ready" && appRuntime.currentJob.kind === "generate") && !appRuntime.saving && !appRuntime.submitting) {
      if (appRuntime.miniatureYaw = (appRuntime.miniatureYaw + Math.PI / 2) % (Math.PI * 2), appRuntime.renderer.xr.isPresenting) appRuntime.placeXRPanel();
      else {
        let center = new THREE4.Vector3(...scanPresentationBounds(appRuntime.previewScene || appRuntime.state?.scene).center), fixed = appRuntime.world.localToWorld(center.clone());
        appRuntime.world.rotation.y = appRuntime.miniatureYaw, appRuntime.world.position.copy(fixed.sub(center.multiply(appRuntime.world.scale).applyQuaternion(appRuntime.world.quaternion))), appRuntime.world.updateMatrixWorld(!0);
      }
      appRuntime.toast("Rotated 90\xB0.");
      return;
    }
    appRuntime.requireSpatialIdle();
    let candidate = appRuntime.phase === "align" ? appRuntime.pendingAlignment : appRuntime.alignment;
    if (!candidate || !appRuntime.alignedMode && appRuntime.phase !== "align") throw new Error("Create an alignment preview first");
    if (candidate.yaw = (candidate.yaw + Math.PI / 2) % (Math.PI * 2), appRuntime.phase === "align") previewAlignment2(candidate);
    else {
      let pose = alignedRoomPose(candidate, referenceFloor(appRuntime.state.scene));
      appRuntime.world.position.fromArray(pose.position), appRuntime.world.rotation.y = pose.yaw, appRuntime.spatialEpoch++, appRuntime.creationPose = null;
    }
    appRuntime.phase !== "align" && saveRoomCorrection2(candidate), appRuntime.toast("Rotated 90\xB0. Check the walls and furniture.");
  }
  async function applyRoomSize2() {
    if (appRuntime.requireSpatialIdle(), isScanScene(appRuntime.state.scene)) throw new Error("Scan dimensions are preserved. Adjust alignment to change position and orientation.");
    appRuntime.saving = !0, appRuntime.syncFlow();
    try {
      appRuntime.acceptState(await appRuntime.api("/api/room/prepare", { revision: appRuntime.state.revision, metrics: { width: Number(appRuntime.$("room-width").value), depth: Number(appRuntime.$("room-depth").value), height: Number(appRuntime.$("room-height").value), source: "manual" } })), appRuntime.invalidateCreation(), appRuntime.overview(), appRuntime.setPhase("welcome"), appRuntime.placeXRPanel(), appRuntime.toast("Dimensions updated. Align the room again before continuing.");
    } finally {
      appRuntime.saving = !1, appRuntime.syncFlow();
    }
  }
  async function requestRoomScan2() {
    appRuntime.requireSpatialIdle();
    let session = appRuntime.renderer.xr.getSession();
    if (!session?.initiateRoomCapture) throw new Error("Room scanning is unavailable here. Use the Quest system settings.");
    await session.initiateRoomCapture(), appRuntime.toast("Waiting for scan data. You can apply the Quest scan later.");
  }
  return { clearCalibrationMarkers: clearCalibrationMarkers2, beginAlignmentCheck: beginAlignmentCheck2, previewAlignment: previewAlignment2, updateAlignmentPreview: updateAlignmentPreview2, saveRoomCorrection: saveRoomCorrection2, offsetAlignment: offsetAlignment2, cancelAlignment: cancelAlignment2, beginCalibration: beginCalibration2, addCalibrationPoint: addCalibrationPoint2, updateCalibrationCursor: updateCalibrationCursor2, enterAlignedRoom: enterAlignedRoom2, applyRoomAlignment: applyRoomAlignment2, rotateRoom: rotateRoom2, applyRoomSize: applyRoomSize2, requestRoomScan: requestRoomScan2 };
}

// src/shared/scene-appearance.mjs
var TRANSPARENCY_LEVELS = Object.freeze([30, 50, 70]), TRANSPARENCY_KEY = "embodi.scene-transparency";
function opacityForTransparency(percent) {
  if (!TRANSPARENCY_LEVELS.includes(percent)) throw Error("Choose 30%, 50% or 70% transparency.");
  return (100 - percent) / 100;
}
function readTransparency(storage) {
  try {
    let value = Number(storage?.getItem(TRANSPARENCY_KEY));
    return TRANSPARENCY_LEVELS.includes(value) ? value : 50;
  } catch {
    return 50;
  }
}
function saveTransparency(storage, percent) {
  opacityForTransparency(percent);
  try {
    storage?.setItem(TRANSPARENCY_KEY, String(percent));
  } catch {
  }
  return percent;
}
function transparencyActions(opacity = 0.5) {
  return TRANSPARENCY_LEVELS.map((percent) => ({ id: "transparency" + percent, label: `${percent}% transparency`, disabled: Math.abs(opacity - opacityForTransparency(percent)) < 1e-6 }));
}

// src/client/ui/scene-presentation.mjs
import * as THREE5 from "three";
function createScenePresentation(appRuntime) {
  function setSceneTransparency2(percent) {
    appRuntime.roomOpacity = opacityForTransparency(percent), saveTransparency(appRuntime.sceneDisplayStorage, percent), updateRoomAppearance2(), appRuntime.syncFlow(), appRuntime.toast(`Scene transparency: ${percent}%`);
  }
  function changeOpacity2(delta) {
    appRuntime.roomOpacity = THREE5.MathUtils.clamp(Math.round((appRuntime.roomOpacity + delta) * 100) / 100, 0.1, 1), appRuntime.$("room-opacity").value = String(appRuntime.roomOpacity * 100), updateRoomAppearance2(), appRuntime.syncFlow();
  }
  function setRoomDisplay2(opacity) {
    appRuntime.roomOpacity = opacity, appRuntime.$("room-opacity").value = String(opacity * 100), updateRoomAppearance2(), appRuntime.syncFlow(), appRuntime.toast(opacity === 1 ? "Solid blockout \xB7 Standard occlusion" : "Translucent overlay \xB7 Virtual walls still occlude objects behind them");
  }
  function updateRoomAppearance2() {
    let transparent = (appRuntime.openSourceMode || !!appRuntime.mrShowcase || appRuntime.roomMode && appRuntime.renderer.xr.isPresenting && appRuntime.xrMode === "immersive-ar") && appRuntime.roomOpacity < 1;
    for (let mesh of appRuntime.meshes.values())
      mesh.material.transparent !== transparent && (mesh.material.needsUpdate = !0), mesh.material.transparent = transparent, mesh.material.opacity = transparent ? appRuntime.roomOpacity : 1, mesh.material.depthWrite = !transparent;
    appRuntime.$("room-opacity").value = String(Math.round((1 - appRuntime.roomOpacity) * 100)), appRuntime.$("room-opacity-value").textContent = `${Math.round((1 - appRuntime.roomOpacity) * 100)}% transparent`, document.querySelectorAll("[data-transparency]").forEach((b) => {
      let active = Math.abs(appRuntime.roomOpacity - opacityForTransparency(Number(b.dataset.transparency))) < 1e-6;
      b.disabled = active, b.setAttribute("aria-pressed", String(active));
    });
  }
  function roomCeilingVisibility2() {
    for (let mesh of appRuntime.meshes.values()) mesh.visible = !(appRuntime.roomMode && appRuntime.mode === "overview" && isCeiling(mesh.userData.definition));
    updateRoomAppearance2();
  }
  function updateObjectLabel2() {
    if (appRuntime.captureUI || !appRuntime.roomMode || appRuntime.mode !== "inhabit" || !appRuntime.editing || appRuntime.director?.snapshot().placing || appRuntime.draftTool.active()) {
      appRuntime.labelSprite && (appRuntime.labelSprite.visible = !1), appRuntime.labelKey && (appRuntime.labelKey = "", appRuntime.syncFlow());
      return;
    }
    let id = appRuntime.hoverIds[0] || appRuntime.selection[0], mesh = appRuntime.meshes.get(id), actor = appRuntime.state.scene.actors?.find((a) => a.id === id);
    if (!mesh && !actor) {
      appRuntime.labelSprite && (appRuntime.labelSprite.visible = !1), appRuntime.labelKey = "";
      return;
    }
    let o = mesh?.userData.definition || actor, info = actor ? { label: "Actor", color: UI_THEME.accent } : categoryInfo(o), text = appRuntime.transformTool.active() ? "Adjusting \xB7 Stick: turn / raise \xB7 Release to save" : `${uiText(info.label)} \xB7 ${appRuntime.uiName(o)}${appRuntime.selection.includes(id) ? appRuntime.openSourceMode ? " \xB7 Choose Transform from the menu" : " \xB7 Hold again to adjust" : ""}`;
    if (!appRuntime.labelSprite) {
      let c = createUICanvas(1024, 128), texture = createUITexture(c);
      appRuntime.labelSprite = new THREE5.Sprite(new THREE5.SpriteMaterial({ map: texture, depthTest: !1, depthWrite: !1 })), appRuntime.labelSprite.scale.set(0.95, 0.119, 1), appRuntime.labelSprite.renderOrder = 50, appRuntime.scene.add(appRuntime.labelSprite);
    }
    if (appRuntime.labelKey !== text) {
      appRuntime.labelKey = text;
      let c = appRuntime.labelSprite.material.map.image, ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 1024, 128), ctx.fillStyle = UI_THEME.panel, ctx.fillRect(0, 0, 1024, 128), ctx.fillStyle = info.color, ctx.fillRect(0, 0, 18, 128), ctx.fillStyle = UI_THEME.text, ctx.font = "48px sans-serif", ctx.textBaseline = "middle", ctx.fillText(uiText(text), 40, 64, 940), appRuntime.labelSprite.material.map.needsUpdate = !0;
    }
    if (actor) {
      let view = appRuntime.director.layer.views.get(id);
      appRuntime.labelSprite.position.copy(view?.bounds.getCenter(new THREE5.Vector3()) || appRuntime.world.localToWorld(new THREE5.Vector3().fromArray(actor.position))), appRuntime.labelSprite.position.y += 1;
    } else
      mesh.getWorldPosition(appRuntime.labelSprite.position), appRuntime.labelSprite.position.y += o.size[1] / 2 + 0.16;
    appRuntime.labelSprite.visible = !0;
  }
  function isMiniature2() {
    return appRuntime.mode === "overview" && ["overview", "preview", "entry", "entering"].includes(appRuntime.phase);
  }
  function updatePresentationVisibility2() {
    appRuntime.world.visible = (!appRuntime.mrShowcase || appRuntime.mrShowcase.state().sceneVisible) && !["welcome", "reference", "building", "calibrate"].includes(appRuntime.phase) && (appRuntime.phase !== "align" || !!appRuntime.pendingAlignment) && (!isMiniature2() || appRuntime.presentationVisible);
  }
  function placeXRPanel2() {
    if (appRuntime.immersiveShowcase()) {
      appRuntime.presentationVisible = !0, appRuntime.xrPanel.visible = !1, updatePresentationVisibility2();
      return;
    }
    if (!appRuntime.renderer.xr.isPresenting || !appRuntime.xrViewer.valid || !appRuntime.panelPlacement || !appRuntime.hadXRFrame) return;
    appRuntime.presentationVisible = !0;
    let floor = referenceFloor(appRuntime.previewScene || appRuntime.state?.scene), definition = appRuntime.previewScene || appRuntime.state?.scene;
    appRuntime.panelPlacement.place(appRuntime.currentView(), { miniature: isMiniature2(), rotationOffset: appRuntime.miniatureYaw, center: scanPresentationBounds(definition).center }), updatePresentationVisibility2(), appRuntime.openSourceMode && appRuntime.phase === "explore" ? (appRuntime.xrPanel.position.add(new THREE5.Vector3(-0.78, -0.08, 0).applyQuaternion(appRuntime.xrPanel.quaternion)), appRuntime.xrPanel.scale.setScalar(0.82), appRuntime.xrPanel.updateMatrixWorld(!0)) : appRuntime.xrPanel.scale.setScalar(1);
  }
  function sceneMenuOpen2() {
    return appRuntime.openSourceMode && appRuntime.phase === "explore" && (appRuntime.renderer.xr.isPresenting ? appRuntime.xrPanel.visible : !!appRuntime.desktopUI && !appRuntime.desktopUI.snapshot().collapsed);
  }
  function toggleMenu2() {
    if (appRuntime.openSourceMode && appRuntime.studio?.getRecordingState() !== "idle") {
      appRuntime.xrUI?.showDialogue();
      return;
    }
    if (!appRuntime.immersiveShowcase()) {
      if (appRuntime.openSourceMode && appRuntime.phase === "explore") {
        if (appRuntime.doorGrab.release(), appRuntime.navigationGate.block(), appRuntime.keys.clear(), appRuntime.pointerStart = null, appRuntime.setHover([]), appRuntime.draftTool.active() ? appRuntime.draftTool.suspend("Menu opened. Unfinished stroke discarded.") : appRuntime.objectInteraction.active() && appRuntime.closeObjectInteraction(), appRuntime.xrUI.dismissDialogue(), !appRuntime.renderer.xr.isPresenting) {
          appRuntime.desktopUI?.toggle();
          return;
        }
        appRuntime.xrViewer.valid && (appRuntime.xrPanel.visible && appRuntime.xrUI.snapshot().page === "global" ? appRuntime.xrPanel.visible = !1 : (appRuntime.hadXRFrame = !0, appRuntime.xrUI.openGlobal(), placeXRPanel2()), updatePresentationVisibility2());
        return;
      }
      if (appRuntime.openSourceMode && !appRuntime.renderer.xr.isPresenting) {
        appRuntime.desktopUI?.toggle();
        return;
      }
      appRuntime.doorGrab.release(), appRuntime.draftTool.active() && appRuntime.draftTool.suspend("Menu opened. Unfinished stroke discarded."), appRuntime.transformTool.active() && appRuntime.cancelTransform(), appRuntime.volume.isActive() && appRuntime.cancelVolume(), appRuntime.renderer.xr.isPresenting && appRuntime.xrViewer.valid && (appRuntime.xrPanel.visible ? (appRuntime.xrPanel.visible = !1, appRuntime.openSourceMode && appRuntime.xrUI.dismissDialogue(), isMiniature2() && (appRuntime.presentationVisible = !1)) : (appRuntime.hadXRFrame = !0, appRuntime.xrUI.hideKeyboard(), appRuntime.openSourceMode && appRuntime.xrUI.showDialogue(), placeXRPanel2(), setXRStatus2(appRuntime.openSourceMode ? "Tools on the left \xB7 Y Hide" : "Menu placed in front of you \xB7 Y to hide")), updatePresentationVisibility2());
    }
  }
  function setXRStatus2(text) {
    appRuntime.captureUI || appRuntime.xrUI?.setStatus(text);
  }
  return { setSceneTransparency: setSceneTransparency2, changeOpacity: changeOpacity2, setRoomDisplay: setRoomDisplay2, updateRoomAppearance: updateRoomAppearance2, roomCeilingVisibility: roomCeilingVisibility2, updateObjectLabel: updateObjectLabel2, isMiniature: isMiniature2, updatePresentationVisibility: updatePresentationVisibility2, placeXRPanel: placeXRPanel2, sceneMenuOpen: sceneMenuOpen2, toggleMenu: toggleMenu2, setXRStatus: setXRStatus2 };
}

// src/shared/entity-label.mjs
var words = entity_labels_default, tokens = new RegExp(Object.keys(words).sort((a, b) => b.length - a.length).join("|"), "g"), han2 = /\p{Script=Han}/u, kinds = { camera: "Camera", light: "Light", floor: "Floor", wall: "Wall", ceiling: "Ceiling", door: "Door", window: "Window", box: "Box", sphere: "Sphere", cylinder: "Cylinder", cone: "Cone" };
function entityLabel(entity) {
  if (!entity) return "";
  let text = String(entity.name || "").trim();
  if (text && !han2.test(text)) return text;
  let translated = text.replace(tokens, (word) => " " + words[word] + " ").replace(/\s+/g, " ").trim();
  if (translated && !han2.test(translated)) return translated;
  let kind = entity.assetId ? "Actor" : kinds[entity.kind] || kinds[entity.role] || { seating: "Seat", table: "Table", storage: "Storage", equipment: "Equipment" }[entity.category] || kinds[entity.shape] || "Object", suffix = String(entity.id || "").replace(/[^a-zA-Z0-9_-]/g, "").split(/[-_]/).slice(-2).join(" ");
  return suffix ? `${kind} ${suffix}` : kind;
}

// src/shared/workflow.mjs
var BUILD = "0.7.8-basic", START_PHASE = "reference";
function roomAlignmentAction(c) {
  return {
    id: "align",
    label: c.xr && c.xrMode === "immersive-ar" ? "Align room" : "Align room \xB7 Quest MR",
    disabled: !c.roomAlignmentAvailable || !c.xr || c.xrMode !== "immersive-ar" || !!(c.editingBusy || c.job || c.saving || c.finishing || c.applying || c.actorPlacing || c.draft?.active || c.production?.monitor || c.production?.playing) || (c.recording ?? "idle") !== "idle" || (c.videoState ?? "idle") !== "idle"
  };
}
var PHASES = { welcome: "Start creating", overview: "Scene overview", align: "Confirm room alignment", reference: "Capture a new room", building: "Build scene", preview: "Review blockout", entering: "Entering the world", entry: "Choose entry point", calibrate: "Manual alignment", explore: "Creating" };
function roomSessionPhase({ phase: phase2, event = "start", job = !1, ar = !0 }) {
  return ["reference", "building", "preview"].includes(phase2) ? phase2 : job ? "overview" : event === "reset" ? "welcome" : event === "end" ? phase2 === "welcome" ? "welcome" : "overview" : ["explore", "align", "calibrate", "entry"].includes(phase2) ? ar ? "align" : "entry" : phase2;
}
function selectedActorActions({ authoring = !1, phase: phase2, actorSelected, actorName, job, finishing: finishing2, saving: saving2, recording = "idle", videoState = "idle", actorPlacing = !1, editingBusy = !1 }) {
  return authoring ? [] : phase2 !== "explore" || !actorSelected || job || finishing2 || saving2 || recording !== "idle" || videoState !== "idle" || actorPlacing ? [] : [{ id: "actors", label: `${actorName || "Current actor"} \xB7 Motion and timing` }, { id: "actorRemove", label: `Remove ${actorName || "Selected actor"}`, disabled: editingBusy }];
}
function stageActions({ authoring = !1, actorReady = !1, phase: phase2, reference, job, entryCount, editing: editing2, recording = "idle", saving: saving2 = !1, demoMode: demoMode2 = !1, roomMode: roomMode2 = !1, roomOpacity: roomOpacity2 = 0.5, captureState = "idle", photoCount = 0, photoReading = !1, xr = !1, calibrationReady = !1, scanReady = !1, videoState = "idle", videoRetry = !1, actorCount = 0, actorMotionCount = actorCount, performanceMode = "editing", performanceCompleted = !1, actorPlacing = !1, hasScene = !1, finishing: finishing2 = !1, scanBased = !1 }) {
  if (finishing2 || saving2) return [{ id: "save", label: finishing2 ? "Saving and exiting\u2026" : "Saving\u2026", disabled: !0 }];
  if (roomMode2) {
    if (videoState === "saving") return [{ id: "record", label: "Saving video\u2026", disabled: !0 }];
    if (videoState === "error" && videoRetry) return [{ id: "record", label: "Retry video save" }, { id: "finish", label: "Save and finish" }];
    if (job === "ready") return [{ id: "apply", label: ["preview", "building"].includes(phase2) ? "Apply and enter" : "Apply changes" }, { id: "discard", label: "Discard preview" }, ...videoState === "recording" ? [{ id: "record", label: "Stop and save recording" }] : []];
    if (job === "running" || phase2 === "building") return [{ id: "cancel", label: "Stop request" }, ...videoState === "recording" ? [{ id: "record", label: "Stop and save recording" }] : []];
    if (recording !== "idle") return [{ id: "voice", label: recording === "recording" ? "Finish and send" : "Processing voice\u2026", disabled: recording !== "recording" }, { id: "cancel", label: "Cancel voice input" }, ...videoState === "recording" ? [{ id: "record", label: "Stop and save recording" }] : []];
    if (phase2 === "welcome") return [...hasScene ? [{ id: "resume", label: "Continue last session" }] : [], { id: "newWorld", label: scanBased ? "Rebuild from current scan" : "Capture a new room" }];
    if (phase2 === "overview") return [{ id: "resume", label: "Back to creating" }, { id: "newWorld", label: scanBased ? "Rebuild from current scan" : "Capture a new room" }, { id: "finish", label: "Finish creating" }];
    if (phase2 === "align") return [{ id: "confirmAlignment", label: calibrationReady ? "Alignment looks right \xB7 Start" : "Waiting for room scan\u2026", disabled: !calibrationReady }, { id: "alignmentOptions", label: "Adjust alignment" }, ...authoring ? [] : [{ id: roomOpacity2 === 1 ? "overlayRoom" : "solidRoom", label: roomOpacity2 === 1 ? "Overlay \xB7 50%" : "Solid blockout \xB7 100%" }], { id: "cancelAlignment", label: "Back" }];
    if (phase2 === "calibrate") return [{ id: "applyCalibration", label: "Review alignment", disabled: !calibrationReady }, { id: "restartCalibration", label: "Mark corners again" }, { id: "cancelCalibration", label: "Back to scan alignment" }];
    if (authoring && phase2 === "explore") return [
      { id: "edit", label: editing2 ? "Finish editing" : "Select and edit", disabled: actorPlacing },
      { id: "actorPlace", label: actorPlacing ? "Cancel actor placement" : "Add actor", disabled: !actorReady && !actorPlacing },
      ...actorCount ? [{ id: "actors", label: "Actors and motions" }] : [],
      ...actorMotionCount ? [{ id: "actorTransport", label: performanceCompleted ? "Replay motions" : performanceMode === "running" ? "Pause motions" : performanceMode === "paused" ? "Resume motions" : "Preview motions" }] : [],
      { id: "record", label: videoState === "recording" ? "Stop and save recording" : "Record virtual view" },
      { id: "save", label: "Save scene" },
      { id: "overview", label: "Scene overview" },
      { id: "display", label: "Display and alignment" }
    ];
    if (phase2 === "explore") return [...videoState === "recording" ? [{ id: "record", label: "Stop and save recording \xB7 B" }] : [], { id: "overview", label: "Scene overview" }, { id: "display", label: "Display and alignment" }, { id: "save", label: "Save scene" }];
  }
  let edit = { id: "edit", label: editing2 ? "Exit edit" : "Edit scene", disabled: actorPlacing || !editing2 && !!job }, transport = { id: "actorTransport", label: performanceCompleted ? "Replay \xB7 Left grip" : performanceMode === "running" ? "Pause \xB7 Left grip" : performanceMode === "paused" ? "Resume \xB7 Left grip" : "Play \xB7 Left grip" };
  return videoState === "recording" ? [
    ...job === "ready" ? [{ id: "apply", label: "Apply changes" }, { id: "discard", label: "Discard preview" }] : [recording !== "idle" ? { id: "voice", label: recording === "recording" ? "Finish and send" : "Processing voice\u2026", disabled: recording !== "recording" } : edit, ...actorCount ? [{ ...transport, disabled: !!job && performanceMode !== "running" }] : []],
    { id: "record", label: "Stop recording \xB7 B" },
    { id: "more", label: "More" }
  ] : videoState === "saving" ? [{ id: "record", label: "Saving video\u2026", disabled: !0 }] : videoState === "error" && videoRetry ? [{ id: "record", label: "Retry video save" }, { id: "more", label: "More" }] : phase2 === "calibrate" ? [{ id: "useScan", label: "Use Quest scan", disabled: !scanReady }, { id: "applyCalibration", label: "Apply corner alignment", disabled: !calibrationReady }, { id: "restartCalibration", label: "Mark corners again" }, { id: "cancelCalibration", label: "Back to overview" }] : phase2 === "entering" ? [{ id: "cancel", label: "Cancel entry" }] : saving2 ? [{ id: "save", label: "Saving\u2026", disabled: !0 }] : job === "ready" ? [{ id: "apply", label: ["preview", "building"].includes(phase2) ? "Apply and create entry points" : "Apply changes" }, { id: "discard", label: "Discard preview" }] : job === "running" || phase2 === "building" ? [{ id: "cancel", label: "Stop request" }] : recording !== "idle" ? [{ id: "voice", label: recording === "recording" ? "Finish and send" : "Processing voice\u2026", disabled: recording !== "recording" }, { id: "cancel", label: "Cancel voice input" }] : phase2 === "reference" && roomMode2 ? [
    { id: "camera", label: captureState === "starting" ? "Cancel camera startup" : captureState === "active" ? "Close camera" : "Open camera", disabled: photoReading },
    { id: "capture", label: photoReading ? "Loading photos\u2026" : "Take photo \xB7 Right trigger", disabled: captureState !== "active" || photoReading },
    { id: "generate", label: scanBased ? `Build from scan${photoCount ? ` \xB7 ${photoCount} references` : ""}` : `Build room${photoCount ? ` \xB7 ${photoCount} photos` : ""}`, disabled: photoCount < 4 || photoReading || captureState === "starting" },
    { id: "more", label: "More" }
  ] : phase2 === "reference" && demoMode2 ? [{ id: "library", label: reference ? "Change image" : "Choose image" }, { id: "demoBuild", label: "Build scene", disabled: !reference }] : phase2 === "reference" ? [{ id: "library", label: reference ? "Change image" : "Choose image" }, { id: "generate", label: "Start building", disabled: !reference }, { id: "resume", label: "Back to existing world" }, { id: "more", label: "More" }] : phase2 === "entry" && roomMode2 && xr ? [{ id: "align", label: "Align real room" }, { id: "visit", label: "Inspect estimated scene", disabled: !entryCount }, { id: "more", label: "More" }] : phase2 === "entry" ? [{ id: "enter", label: "Enter world", disabled: !entryCount }, { id: "nextEntry", label: "Choose another entry", disabled: entryCount < 2 }, { id: "more", label: "More" }] : roomMode2 && phase2 === "explore" ? [edit, actorPlacing ? { id: "actorPlace", label: "Cancel placement \xB7 A" } : actorCount ? actorMotionCount || performanceMode !== "editing" ? transport : { id: "actorAssign", label: "Assign actor motion" } : { id: "actorPlace", label: "Add actor" }, { id: "record", label: "Record camera view \xB7 B" }, { id: "more", label: "More" }] : [{ id: "voice", label: "Voice chat" }, edit, { id: "overview", label: "Show overview" }, { id: "more", label: "More" }];
}
function authoringActorActions(c) {
  return [
    { id: "actorAgent", label: "Generate motion \xB7 Agent", disabled: !c.actorSelected },
    { id: "actorPreview", label: "Preview this actor", disabled: !c.actorSelected },
    { id: "drawFloor", label: "Draw floor curve \xB7 2D" },
    { id: "drawSpace", label: "Draw air curve \xB7 3D" },
    ...c.curveCount ? [{ id: "curveNext", label: "Curve " + c.curveName }, { id: "curveRemove", label: "Remove selected curve" }] : [],
    { id: "objectTransform", label: "Move / turn this actor" },
    { id: "actorClearMotion", label: "Clear this actor motion" },
    { id: "sceneTools", label: "Scene tools" }
  ];
}
function authoringSceneActions(c) {
  return [{ id: "edit", label: c.editing ? "Finish selecting" : "Select actor / object" }, { id: "actorPlace", label: "Add actor", disabled: !c.actorReady }, { id: "drawFloor", label: "Draw floor curve \xB7 2D" }, { id: "drawSpace", label: "Draw air curve \xB7 3D" }, ...c.actorCount ? [{ id: "actorTransport", label: "Play / pause all actors" }] : [], { id: "save", label: "Save scene" }, { id: "record", label: c.videoState === "recording" ? "Stop recording" : "Record virtual view" }, { id: "display", label: "Display and alignment" }];
}
function mainActions(context) {
  if (context.authoring && context.floodPreview) return [{ id: "floodPreview", label: "Replay interaction" }, { id: "apply", label: "Apply interaction" }, { id: "discard", label: "Discard preview" }];
  if (context.authoring && context.generatedPreview) return [{ id: "motionReplay", label: "Replay generated preview" }, { id: "apply", label: "Apply motion" }, { id: "discard", label: "Discard preview" }];
  if (context.authoring && context.phase === "explore" && !context.job && !context.saving && !context.finishing && context.recording === "idle") return context.actorSelected ? authoringActorActions(context) : authoringSceneActions(context);
  let actions = stageActions(context);
  return context.authoring && context.roomMode && context.hasScene && context.roomAlignmentAvailable && ["welcome", "overview", "entry"].includes(context.phase) && !context.job && !context.saving && !context.finishing && (context.recording ?? "idle") === "idle" && (context.videoState ?? "idle") === "idle" && !actions.some((a) => a.id === "align") && actions.splice(1, 0, roomAlignmentAction(context)), context.authoring && ["overview", "preview"].includes(context.phase) && !context.saving && !context.finishing && (!context.job || context.job === "ready") && (context.recording ?? "idle") === "idle" && (context.videoState ?? "idle") === "idle" && actions.push({ id: "rotateRoom", label: "Rotate 90\xB0" }), actions.some((a) => a.id === "record") ? actions : context.videoState === "recording" ? [...actions, { id: "record", label: "Stop and save recording \xB7 B" }] : context.videoRetry ? [...actions, { id: "record", label: "Retry recording save" }] : !context.authoring && context.roomMode && !["starting", "saving"].includes(context.videoState) && context.phase !== "explore" ? [...actions, { id: "record", label: "Start recording \xB7 Up to 3 min", disabled: !!context.editingBusy }] : actions;
}

// src/shared/authoring-ui.mjs
var AUTHORING_PAGES = ["global", "main", "createTools", "createLight", "lightSettings", "drawTools", "curveTools", "actorSettings", "sceneTools", "sceneMore", "roomTools", "sceneTransparency", "doorSettings", "brushSettings", "suggestions", "recordingTools"], item = (id, label, disabled = !1) => ({ id, label, disabled });
function authoringMenu(c, page = "main") {
  if (!c.authoring || c.phase !== "explore" || !AUTHORING_PAGES.includes(page) && page !== "interaction") return null;
  let back = item("authoringBack", "Back"), voice = item("voice", c.actorSelected ? "Describe a basic motion" : c.targetName ? "Describe an edit" : "Describe your idea"), target = c.actorName || c.targetName || (c.objectSelection?.length ? `${c.objectSelection.length} objects selected` : "Current scene"), door = c.objectSelection?.length === 1 && c.door?.id === c.objectSelection[0], regionTarget = c.regionTarget ?? (c.objectSelection?.length === 1 && !c.actorSelected), result = (title, entries, hint = "X Voice \xB7 Y Menu \xB7 A Confirm \xB7 B Cancel") => ({ title, entries, hint });
  if (c.voiceDraft) return result("Review speech \xB7 Not sent", [item("voiceConfirm", "Send \xB7 A"), item("voiceRetry", "Speak again \xB7 X"), item("voiceCancel", "Cancel speech \xB7 B")], "Right stick: pages \xB7 A Send \xB7 X Retry \xB7 B Cancel");
  if (c.recording && c.recording !== "idle") return result(c.recording === "recording" ? "Listening" : "Processing speech", [item("voice", c.recording === "recording" ? "Stop listening" : "Transcribing\u2026", c.recording !== "recording"), item("voiceCancel", "Cancel speech \xB7 B")], "Release X to review \xB7 B Cancel");
  let p = c.production;
  if (p?.transitioning || p?.saving) return result("Saving changes", [item("cinemaSave", "Please wait\u2026", !0)]);
  if (p?.requesting) return result("Camera / Lighting Agent", [item("cinemaCancel", "Cancel request")], "B Cancel");
  if (p?.placing) return result("Choose a placement point", [item("cinemaCancel", "Cancel placement \xB7 B")], p.placement?.visible ? "Place at the ring \xB7 A Create \xB7 B Cancel" : "Point at visible ground \xB7 A Create");
  if (p?.dirty) return result(p.tool === "transform" ? "Transform" : p.tool === "curve" ? "Edit curve" : "Preview changes", [item("cinemaSave", "Save \xB7 A"), item("cinemaCancel", "Revert \xB7 B")], p.tool === "transform" ? `L stick: Move \xB7 L grip + stick: Height
R stick: Rotate \xB7 R grip: Grab` : p.tool === "curve" ? "Right grip: pull control points \xB7 Release, then A Save" : "A Save \xB7 B Discard");
  if (page === "sceneTransparency") return result(`Scene transparency \xB7 ${Math.round((1 - (c.roomOpacity ?? 0.5)) * 100)}%`, [...transparencyActions(c.roomOpacity), back], "70% is the most transparent \xB7 Saved in this browser");
  if (page === "roomTools" && c.roomMode && c.hasScene) {
    let align = roomAlignmentAction(c), blocked = !!(c.editingBusy || c.job || c.saving || c.finishing || c.applying || c.actorPlacing || c.draft?.active || p?.monitor || p?.playing) || (c.videoState ?? "idle") !== "idle";
    return result(
      "Room / Alignment",
      [align, item("sceneTransparency", "Scene transparency"), item("overview", "Scene overview", blocked), back],
      blocked ? "Finish the current operation before adjusting the room." : c.roomAlignmentAvailable ? !c.xr || c.xrMode !== "immersive-ar" ? "Enter Quest MR to align the room with your real space." : "Align room opens a preview, even when a saved offset exists. \xB7 A Confirm \xB7 B Back" : "Build or load a reconstructed room to align it."
    );
  }
  if (p && !c.editing)
    return page === "recordingTools" ? result("Recording", [item("record", c.videoState === "recording" ? "Stop and save" : "Start recording", !c.productionReady && c.videoState !== "recording"), item("videoFiles", "View recordings"), back]) : result(p.monitor ? `Camera monitor \xB7 ${p.cameraName || ""}` : p.previewLabel ? `Rehearse \xB7 ${p.previewLabel}` : "Explore mode", [
      item(p.monitor ? "cinemaNext" : "cinemaPreview", p.monitor ? "Next camera" : "Camera Agent \xB7 View camera"),
      item(p.playing ? "cinemaPause" : "cinemaPlay", p.playing ? "Pause rehearsal \xB7 Left grip" : p.activePreviewIds?.length ? "Resume rehearsal \xB7 Left grip" : "Rehearse selection \xB7 Left grip", !p.canPreview),
      ...p.monitor ? [item("cinemaClose", "Close monitor")] : [item("recordingTools", "Recording and export", !c.productionReady)],
      ...c.script?.agentText || c.script?.userText ? [item("agentReply", "View Agent reply")] : [],
      ...c.roomMode && c.hasScene ? [item("roomTools", "Room / Alignment")] : [],
      item("edit", "Enter edit mode")
    ], p.previewIds?.length ? "Rehearse selection and linked interactions \xB7 Right stick click: edit" : "Right stick click: edit and select a target \xB7 X Voice");
  if (c.saving || c.finishing || c.applying) return result("Saving", [item("save", "Saving\u2026", !0)]);
  if (c.job === "ready") return result("Preview result", [
    item("apply", "Apply changes"),
    item("discard", "Discard preview"),
    ...c.script?.agentText || c.script?.userText ? [item("agentReply", "View Agent reply")] : [],
    ...c.generatedPreview ? [item("motionReplay", "Replay motion")] : c.floodPreview ? [item("floodPreview", "Replay interaction")] : []
  ], "A Apply \xB7 B Discard \xB7 X Voice");
  if (c.job === "running") return result("Agent working", [item("cancel", "Stop request"), ...c.script?.agentText || c.script?.userText ? [item("agentReply", "View Agent reply")] : []], "B Stop \xB7 X Voice");
  if (c.actorPlacing) return result("Place actor", [item("cancelOperation", "Cancel placement")], "Point at ground \xB7 A Place \xB7 B Cancel");
  if (c.draft?.active || c.objectInteraction?.mode === "draft") {
    let regions = c.draft?.kind === "regions", drawing = !!c.draft?.drawing;
    return page === "brushSettings" ? result("Brush settings", [
      item("draftSmooth", "Smoothing: " + (c.draft?.smoothingLabel || "Standard"), drawing),
      ...c.draft?.mode === "space3d" ? [item("brushNear", "Bring tip closer", drawing), item("brushFar", "Move tip farther", drawing)] : [],
      item("draftClear", "Clear draft", drawing),
      back
    ]) : result(regions ? "Draw interaction regions" : c.draft?.mode === "space3d" ? "Spatial path \xB7 3D" : "Ground path \xB7 2D", [
      item("draftApply", regions ? "Finish regions" : "Save curve", drawing || !(regions ? c.draft?.regionCount : c.draft?.pointCount)),
      item("draftUndo", regions ? "Undo last region" : "Undo stroke", !c.draft?.canUndo || drawing),
      ...regions ? [item("regionSurface", c.draft?.forceFloor ? "Draw object sources" : "Draw floor trigger", drawing)] : [],
      ...regions ? [] : [item("brushSettings", "Brush settings")],
      item("draftCancel", "Cancel drawing")
    ], "Right trigger: draw \xB7 Release, then A Save \xB7 B Cancel");
  }
  return p && (page === "global" || page === "main" && !c.objectSelection?.length) ? result("Edit mode", [
    item("createTools", "Create"),
    item("drawTools", "Sketches and paths"),
    ...c.roomMode && c.hasScene ? [item("roomTools", "Room / Alignment")] : [],
    ...c.script?.agentText || c.script?.userText ? [item("agentReply", "View Agent reply")] : [],
    ...c.suggestions?.length ? [item("suggestions", "Agent suggestions")] : [],
    item("cinemaComplete", "Finish setup and explore"),
    item("edit", "Return to explore")
  ], "Right stick: select \xB7 A Confirm \xB7 B / Y Hide menu") : p && page === "createTools" ? result("Create", [item("createLight", "Light"), item("cinemaCamera", "Camera"), item("cinemaBox", "Object"), item("actorPlace", "Actor", !c.actorReady), item("cinemaCreateOther", "Other")], "Choose a category \xB7 B Back \xB7 Edit after placement") : p && page === "createLight" ? result("Light type", [item("cinemaPoint", "Point \xB7 All directions"), item("cinemaSpot", "Spot \xB7 Directional"), back], "Choose a type, then a ground point \xB7 Type stays editable") : p && page === "lightSettings" ? result("Light settings", [item("cinemaLightPoint", "Switch to point", c.selectedLightType === "point"), item("cinemaLightSpot", "Switch to spot", c.selectedLightType === "spot"), item("cinemaOther", "Voice: brightness and color"), back], "Review changes \xB7 A Save \xB7 B Revert") : p?.monitor && c.editing ? result(`Camera monitor \xB7 ${p.cameraName || ""}`, [item("cinemaAdjustCamera", "Adjust this camera"), item("cinemaNext", "Next camera"), item("cinemaClose", "Close monitor")], "B Close \xB7 After saving, say \u201Cpreview camera\u201D") : p && c.objectInteraction && c.selectedLightType && !["drawTools", "curveTools"].includes(page) ? result("Light \xB7 Interaction", [item("lightSettings", "Type and light settings"), item("cinemaBind", "Bind selected curve", !c.curveCount), item("cinemaPlay", "Rehearse this light", !p.canPreview), item("interactionClose", "Back")]) : p && c.objectInteraction && c.selectedCameraId && !["drawTools", "curveTools"].includes(page) ? result("Camera \xB7 Interaction", [item("cinemaPreview", "View this camera"), item("cinemaBind", "Bind selected curve", !c.curveCount), item("cinemaOther", "Voice: camera and movement"), item("interactionClose", "Back")]) : p && c.objectInteraction && page !== "drawTools" && page !== "curveTools" ? result("Interaction", [
    item("voice", "Describe an interaction"),
    item("drawTools", "Draw a path or region"),
    item("cinemaBind", "Bind selected curve", !c.curveCount),
    item("cinemaPlay", "Rehearse selection \xB7 Left grip", !p.canPreview),
    item("interactionClose", "Back")
  ]) : p && page === "main" && c.objectSelection?.length ? result(target, [item("cinemaTransform", "Transform"), item("objectInteraction", "Interaction"), item("cinemaOther", "Other")], "Right stick: select \xB7 A Confirm \xB7 Other starts voice") : page === "suggestions" ? result("Agent suggestions", [
    ...(c.suggestions || []).map((s, i) => item("suggestion:" + i, s.label)),
    back
  ], "Right stick: select \xB7 A Confirm \xB7 B Back") : page === "drawTools" ? result("Spatial sketches", [
    item("drawFloor", "Draw ground path \xB7 2D"),
    item("drawSpace", "Draw spatial path \xB7 3D"),
    ...regionTarget ? [item("regionDraft", "Draw surface sources and trigger region")] : [],
    ...c.curveCount ? [item("curveTools", `Saved curves \xB7 ${c.curveCount}`)] : [],
    back
  ]) : page === "curveTools" ? result("Saved curves", [
    item("curveNext", "Next curve \xB7 " + c.curveName, !c.curveCount),
    ...p ? [item("cinemaCurveEdit", "Pull control points", !c.curveCount), item("cinemaStraight", "Extreme \xB7 Straight endpoints", !c.curveCount), item("cinemaSmooth", "Smooth control points", !c.curveCount)] : [],
    item("curveRemove", "Delete selected curve", !c.curveCount),
    back
  ]) : page === "recordingTools" ? result("Recording and export", [item("record", c.videoState === "recording" ? "Stop and save recording" : c.videoRetry ? "Retry recording save" : "Start recording", ["starting", "saving"].includes(c.videoState)), item("videoFiles", "Saved recordings"), back]) : page === "actorSettings" ? result(target, [
    item("objectTransform", "Move and rotate"),
    item("actors", "Motion assets and entrance"),
    item("actorClearMotion", "Clear motion"),
    item("actorRemove", "Delete actor"),
    item("sceneTools", "Scene tools"),
    back
  ]) : page === "doorSettings" ? result(target, [
    item("doorToggle", c.door?.effect?.open ? "Close door" : "Open door"),
    item("doorHinge", "Switch hinge side"),
    item("doorDirection", "Change opening direction"),
    item("objectTransform", "Move and rotate"),
    item("sceneTools", "Scene tools"),
    back
  ]) : page === "sceneTools" ? result("Scene tools", [
    item("actorPlace", "Add actor", !c.actorReady),
    ...c.actorCount ? [item("actorTransport", p?.playing ? "Pause rehearsal" : "Rehearse selection", p ? !p.canPreview : !c.actorMotionCount)] : [],
    item("save", "Save scene"),
    item("sceneMore", "Recording, display and more"),
    back
  ]) : page === "sceneMore" ? result("Scene settings", [
    item("recordingTools", c.videoState === "recording" ? "Recording \xB7 Stop and save" : "Recording and export"),
    item("display", "Display and alignment"),
    item("overview", "Scene overview"),
    item("authoringHelp", "Controls"),
    item("selectionSettings", "Selection and materials"),
    back
  ]) : c.suggestions?.length ? result("Agent suggestions", [
    ...c.suggestions.map((s, i) => item("suggestion:" + i, s.label)),
    item("dismissSuggestions", "Dismiss suggestions")
  ], "Choose a suggestion to preview \xB7 Right stick: select \xB7 A Confirm") : c.actorSelected ? result(target, [item("actorAgent", "Generate a basic motion"), item("drawTools", "Draw a motion path"), item("actorPreview", "Rehearse this actor"), item("actorSettings", "Actor settings")]) : door ? result(target, [item("voice", "Describe an interaction"), item("regionDraft", "Draw surface sources and trigger region"), ...c.floodAvailable ? [item("floodPreview", "Rehearse interaction")] : [], item("doorSettings", "Door settings")]) : result(target, [
    voice,
    item("drawTools", "Draw a spatial sketch"),
    ...c.objectSelection?.length ? [item("objectTransform", "Move and rotate")] : [item("edit", c.editing ? "Finish selection" : "Select objects")],
    item("sceneTools", "Scene tools")
  ]);
}
function authoringParent(page) {
  return { global: "global", main: "global", createTools: "global", sceneTools: "global", roomTools: "global", sceneTransparency: "roomTools", suggestions: "global", createLight: "createTools", lightSettings: "interaction", curveTools: "drawTools", sceneMore: "sceneTools", recordingTools: "sceneMore" }[page] || "main";
}
function createMenuNavigation() {
  let states = /* @__PURE__ */ new WeakMap();
  return { sample(source, active) {
    let y = source.gamepad?.axes?.[3] ?? 0, old = states.get(source);
    if (!active || source.handedness !== "right")
      return states.set(source, { active: !1, ready: !1 }), 0;
    let neutral = Math.abs(y) < 0.3;
    return old?.active ? neutral ? (old.ready = !0, 0) : !old.ready || Math.abs(y) < 0.65 ? 0 : (old.ready = !1, Math.sign(y)) : (states.set(source, { active: !0, ready: neutral }), 0);
  } };
}
var suggestionScope = (c) => JSON.stringify([
  c.revision,
  c.spatialContext?.spatialKey || c.spatialKey || "",
  [...c.targetIds || c.objectSelection || []].sort(),
  c.curveId || null
]);

// src/shared/session-media.mjs
function createSessionMedia({ mediaDevices = globalThis.navigator?.mediaDevices, Stream = globalThis.MediaStream } = {}) {
  let generation = 0, preparing = !1, sources = /* @__PURE__ */ new Map(), consumers = /* @__PURE__ */ new Set(), live = (kind) => sources.get(kind)?.readyState === "live";
  function release() {
    generation++, preparing = !1;
    for (let track of [...sources.values(), ...consumers]) track.stop();
    sources.clear(), consumers.clear();
  }
  function begin() {
    release(), preparing = !0;
  }
  async function getUserMedia(constraints) {
    let kinds2 = ["video", "audio"].filter((kind) => constraints[kind]), missing = kinds2.filter((kind) => !live(kind) || constraints[kind]?.deviceId?.exact && sources.get(kind).getSettings().deviceId !== constraints[kind].deviceId.exact);
    if (missing.length) {
      if (!preparing) throw new Error("Device access is not ready. Exit XR and use Prepare access before continuing.");
      if (!mediaDevices?.getUserMedia) throw new Error("Device access is unavailable. Open this page in Quest Browser using localhost or HTTPS.");
      let token = generation, stream2 = await mediaDevices.getUserMedia(Object.fromEntries(["video", "audio"].map((kind) => [kind, missing.includes(kind) ? constraints[kind] : !1])));
      if (token !== generation || !preparing)
        throw stream2.getTracks().forEach((track) => track.stop()), new Error("Startup setup was cancelled. Please try again.");
      if (missing.some((kind) => !stream2.getTracks().some((track) => track.kind === kind && track.readyState === "live")))
        throw stream2.getTracks().forEach((track) => track.stop()), new Error("The requested device did not provide a usable stream.");
      for (let track of stream2.getTracks()) {
        if (!missing.includes(track.kind)) {
          track.stop();
          continue;
        }
        sources.get(track.kind)?.stop(), track.enabled = !1, sources.set(track.kind, track);
      }
    }
    for (let track of consumers) track.readyState === "ended" && consumers.delete(track);
    return new Stream(kinds2.map((kind) => {
      let track = sources.get(kind).clone();
      return track.enabled = !0, consumers.add(track), track;
    }));
  }
  return {
    begin,
    release,
    seal() {
      preparing = !1;
    },
    snapshot: () => ({ camera: live("video"), microphone: live("audio"), preparing }),
    mediaDevices: { getUserMedia, enumerateDevices: () => mediaDevices?.enumerateDevices?.() || Promise.resolve([]) }
  };
}

// src/shared/demo-entry.mjs
function createDemoEntry({ delayMs = 3e3 } = {}) {
  let pending = null;
  return {
    get active() {
      return pending !== null;
    },
    start({ scene: scene2, revision, reference, now }) {
      if (pending) throw new Error("Entering. Please wait.");
      if (!reference) throw new Error("Select an image first");
      if (!scene2) throw new Error("Demo world is not loaded. Check the local connection.");
      let entries = findEntryCandidates(scene2);
      if (!entries.length) throw new Error("No clear entry point. Adjust the scene in regular mode first.");
      return pending = { revision, deadline: now + delayMs }, entries;
    },
    tick({ now, revision, tracked = !0 }) {
      if (!pending) return { status: "idle" };
      if (revision !== pending.revision)
        return pending = null, { status: "changed" };
      if (!tracked)
        return pending.deadline = now + delayMs, { status: "tracking", seconds: Math.ceil(delayMs / 1e3) };
      let remaining = pending.deadline - now;
      return remaining <= 0 ? (pending = null, { status: "ready" }) : { status: "countdown", seconds: Math.ceil(remaining / 1e3) };
    },
    cancel() {
      pending = null;
    }
  };
}

// src/client/app.mjs
import * as THREE28 from "three";

// src/client/xr/xr-viewer-pose.mjs
import * as THREE6 from "three";
function createXRViewerPose(rig2) {
  let view = new THREE6.Camera();
  view.name = "tracked-xr-viewer", rig2.add(view);
  let valid = !1;
  return {
    view,
    get valid() {
      return valid;
    },
    update(frame, referenceSpace) {
      let pose = frame && referenceSpace ? frame.getViewerPose(referenceSpace) : null;
      return valid = !!pose, pose ? (view.matrix.fromArray(pose.transform.matrix), view.matrix.decompose(view.position, view.quaternion, view.scale), view.matrixWorldNeedsUpdate = !0, !0) : !1;
    },
    reset() {
      valid = !1, view.matrix.identity(), view.matrix.decompose(view.position, view.quaternion, view.scale), view.matrixWorldNeedsUpdate = !0;
    }
  };
}

// src/client/app.mjs
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// src/shared/hand-frame.mjs
var HAND_SIDES = Object.freeze(["left", "right"]), half = Math.SQRT1_2, HAND_GRIP_BASIS = Object.freeze({ left: Object.freeze([half, 0, half, 0]), right: Object.freeze([half, 0, -half, 0]) }), fittedRotation = (side, degrees) => {
  let [x, y, z, w] = HAND_GRIP_BASIS[side], s = Math.sin(degrees * Math.PI / 360), c = Math.cos(degrees * Math.PI / 360);
  return [c * x + s * w, c * y - s * z, c * z + s * y, c * w - s * x];
}, HANDS_METADATA = Object.freeze({
  version: 1,
  modelId: "whitebox-controller-hands",
  modelVersion: 5,
  space: "content-world",
  units: "meters",
  poseConvention: "palm-after-grip-offset",
  clock: "animation-frame-ms",
  grasp: "controller-fingers",
  calibration: "default-unmeasured",
  appearance: Object.freeze({ color: "#58a6d8" }),
  dimensions: Object.freeze({ palmWidth: 0.078, palmLength: 0.086, palmThickness: 0.03, wristLength: 0.04, fingerRadius: 8e-3 }),
  fixedPose: Object.freeze({ grip: 0.65, trigger: 0.15 }),
  gripToPalm: Object.freeze({
    // WebXR: grip +Y points toward the arm, -Z toward the thumb, and
    // the back of the hand faces -X (left) / +X (right). Model +Y is
    // distal and +Z is palmar. The grip origin is inside the curled fist.
    left: Object.freeze({ positionMeters: Object.freeze([-0.022, 0.012, 0.016]), quaternionXYZW: Object.freeze(fittedRotation("left", 45)) }),
    right: Object.freeze({ positionMeters: Object.freeze([0.022, 0.012, 0.016]), quaternionXYZW: Object.freeze(fittedRotation("right", 45)) })
  }),
  armModel: Object.freeze({
    version: 1,
    solver: "two-bone-pole-1",
    tracking: "head-and-grips-inferred-shoulders-elbows",
    shoulderWidth: 0.38,
    headToShoulderDrop: 0.24,
    headToShoulderBack: 0.07,
    upperArmLength: 0.29,
    forearmLength: 0.26,
    maxShoulderShift: 0.06,
    upperArmRadius: 0.043,
    forearmRadius: 0.033,
    palmToWrist: Object.freeze([0, -0.062, 0]),
    headYawDeadband: 0.96,
    maxTorsoTurnSpeed: 0.65,
    poleSmoothing: 8
  })
}), vector5 = (v2, n) => Array.isArray(v2) && v2.length === n && v2.every(Number.isFinite), keys = (o, allowed) => o && typeof o == "object" && !Array.isArray(o) && Object.keys(o).every((k) => allowed.includes(k)), unit = (n) => Number.isFinite(n) && n >= 0 && n <= 1;
function validHandPose(p, maxPosition = 100) {
  return keys(p, ["positionMeters", "quaternionXYZW"]) && vector5(p.positionMeters, 3) && p.positionMeters.every((n) => Math.abs(n) <= maxPosition) && vector5(p.quaternionXYZW, 4) && Math.abs(Math.hypot(...p.quaternionXYZW) - 1) < 1e-3;
}
function emptyHands(sampleId = 0, frameTimeMs = 0) {
  return { sampleId, frameTimeMs, hands: HAND_SIDES.map((side) => ({ side, tracked: !1, pose: null, grip: 0, trigger: 0, thumb: 0 })) };
}
function validateHandsSample(sample, metadata) {
  if (!keys(sample, ["sampleId", "frameTimeMs", "hands", "arms"]) || !Number.isSafeInteger(sample.sampleId) || sample.sampleId < 0 || !Number.isFinite(sample.frameTimeMs) || sample.frameTimeMs < 0 || !Array.isArray(sample.hands) || sample.hands.length !== 2) throw new Error("Invalid hand sample");
  for (let [i, hand] of sample.hands.entries())
    if (!keys(hand, ["side", "tracked", "pose", "grip", "trigger", "thumb"]) || hand.side !== HAND_SIDES[i] || typeof hand.tracked != "boolean" || !unit(hand.grip) || !unit(hand.trigger) || (hand.thumb !== void 0 || metadata?.modelVersion >= 4) && !unit(hand.thumb) || (hand.tracked ? !validHandPose(hand.pose) : hand.pose !== null)) throw new Error("Invalid hand pose");
  return sample.arms !== void 0 && validateArmsSample(sample, metadata), sample;
}
function validateHandsMetadata(meta) {
  if (!keys(meta, Object.keys(HANDS_METADATA)) || ![1, 2, 3, 4, 5].includes(meta.modelVersion) || ["version", "modelId", "space", "units", "poseConvention", "clock"].some((k) => meta[k] !== HANDS_METADATA[k]) || meta.grasp !== (meta.modelVersion >= 4 ? "controller-fingers" : "fixed-natural") || !["default-unmeasured", "user-adjusted", "device-calibrated"].includes(meta.calibration)) throw new Error("Invalid hand model version");
  if ((meta.appearance !== void 0 || meta.modelVersion >= 4) && (!keys(meta.appearance, ["color"]) || !/^#[\da-f]{6}$/i.test(meta.appearance.color)))
    throw new Error("Invalid hand model colors");
  if (!keys(meta.dimensions, Object.keys(HANDS_METADATA.dimensions)) || Object.keys(HANDS_METADATA.dimensions).some((k) => !Number.isFinite(meta.dimensions[k]) || meta.dimensions[k] < 3e-3 || meta.dimensions[k] > 0.25) || !keys(meta.fixedPose, ["grip", "trigger"]) || !unit(meta.fixedPose.grip) || !unit(meta.fixedPose.trigger) || !keys(meta.gripToPalm, HAND_SIDES) || HAND_SIDES.some((side) => !validHandPose(meta.gripToPalm[side], 0.25))) throw new Error("Invalid hand model configuration");
  if (meta.armModel !== void 0) {
    let a = meta.armModel, defaults = HANDS_METADATA.armModel;
    if (meta.modelVersion < 2 || !keys(a, Object.keys(defaults)) || ["version", "solver", "tracking"].some((k) => a[k] !== defaults[k]) || !vector5(a.palmToWrist, 3) || a.palmToWrist.some((n) => Math.abs(n) > 0.25) || Object.keys(defaults).filter((k) => typeof defaults[k] == "number" && k !== "version").some((k) => !Number.isFinite(a[k]) || a[k] <= 0 || a[k] > (k === "poleSmoothing" ? 30 : k === "headYawDeadband" ? Math.PI : k === "maxTorsoTurnSpeed" ? 3 : 1)) || a.maxShoulderShift > 0.12) throw new Error("Invalid arm model configuration");
  }
  return meta;
}
function emptyArms() {
  return { torsoYawRadians: null, joints: HAND_SIDES.map((side) => ({ side, status: "untracked", shoulder: null, elbow: null, wrist: null, shoulderShiftMeters: 0, reachErrorMeters: 0 })) };
}
function validateArmsSample(sample, metadata) {
  let a = sample.arms, point2 = (p) => vector5(p, 3) && p.every((n) => Math.abs(n) <= 100), distance4 = (p, q2) => Math.hypot(...p.map((n, i) => n - q2[i]));
  if (metadata && !metadata.armModel) throw new Error("Arm model configuration is missing");
  if (!keys(a, ["torsoYawRadians", "joints"]) || !(a.torsoYawRadians === null || Number.isFinite(a.torsoYawRadians) && Math.abs(a.torsoYawRadians) <= Math.PI) || !Array.isArray(a.joints) || a.joints.length !== 2) throw new Error("Invalid arm sample");
  for (let [i, j] of a.joints.entries()) {
    if (!keys(j, ["side", "status", "shoulder", "elbow", "wrist", "shoulderShiftMeters", "reachErrorMeters"]) || j.side !== HAND_SIDES[i] || !["untracked", "solved", "shoulder-adjusted", "forearm-only"].includes(j.status) || !Number.isFinite(j.shoulderShiftMeters) || j.shoulderShiftMeters < 0 || j.shoulderShiftMeters > 0.120001 || !Number.isFinite(j.reachErrorMeters) || j.reachErrorMeters < 0 || j.reachErrorMeters > 200) throw new Error("Invalid arm joint");
    if (j.status === "untracked") {
      if (j.shoulder !== null || j.elbow !== null || j.wrist !== null || j.shoulderShiftMeters !== 0 || j.reachErrorMeters !== 0) throw new Error("Untracked arms must be hidden");
      continue;
    }
    if (!sample.hands[i].tracked || a.torsoYawRadians === null || ![j.shoulder, j.elbow, j.wrist].every(point2)) throw new Error("Invalid arm tracking");
    if (metadata) {
      let m = metadata.armModel, p = sample.hands[i].pose, [x, y, z, w] = p.quaternionXYZW, [vx, vy, vz] = m.palmToWrist, tx = 2 * (y * vz - z * vy), ty = 2 * (z * vx - x * vz), tz = 2 * (x * vy - y * vx), wrist = [vx + w * tx + y * tz - z * ty, vy + w * ty + z * tx - x * tz, vz + w * tz + x * ty - y * tx].map((n, k) => n + p.positionMeters[k]);
      if (distance4(wrist, j.wrist) > 1e-4) throw new Error("Wrist and hand poses do not match");
      if (j.shoulderShiftMeters > m.maxShoulderShift + 1e-5 || Math.abs(distance4(j.elbow, j.wrist) - m.forearmLength) > 1e-4 || j.status !== "forearm-only" && (Math.abs(distance4(j.shoulder, j.elbow) - m.upperArmLength) > 1e-4 || j.reachErrorMeters > 1e-4)) throw new Error("Invalid arm length");
    }
  }
}
function handMetadataForSize(scale = 1, armScale = 1, gripTilt2 = 45, presentationScale = 1) {
  if (!Number.isFinite(scale) || scale < 0.7 || scale > 1.3) throw new Error("Hand size must be between 70% and 130%");
  if (!Number.isFinite(armScale) || armScale < 0.8 || armScale > 1.2) throw new Error("Arm length must be between 80% and 120%");
  if (!Number.isFinite(gripTilt2) || gripTilt2 < 0 || gripTilt2 > 90) throw new Error("Grip tilt must be between 0\xB0 and 90\xB0");
  if (!Number.isFinite(presentationScale) || presentationScale < 0.5 || presentationScale > 1.5) throw new Error("Invalid body display scale");
  scale *= presentationScale, armScale *= presentationScale;
  let m = structuredClone(HANDS_METADATA);
  for (let k of Object.keys(m.dimensions)) m.dimensions[k] *= scale;
  for (let side of HAND_SIDES)
    m.gripToPalm[side].positionMeters = m.gripToPalm[side].positionMeters.map((n) => n * scale), m.gripToPalm[side].quaternionXYZW = fittedRotation(side, gripTilt2);
  return m.armModel.palmToWrist = m.armModel.palmToWrist.map((n) => n * scale), m.armModel.headToShoulderDrop = 0.21, m.armModel.upperArmRadius *= presentationScale, m.armModel.forearmRadius *= presentationScale, m.armModel.upperArmLength *= armScale, m.armModel.forearmLength *= armScale, (scale !== 1 || armScale !== 1 || gripTilt2 !== 45) && (m.calibration = "user-adjusted"), m;
}

// src/client/hand-input.mjs
import * as THREE8 from "three";

// src/client/arm-pose.mjs
import * as THREE7 from "three";
var wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a)), v = (a) => new THREE7.Vector3().fromArray(a);
function createArmSolver(config) {
  let torsoYaw = null, lastTime2 = null, poles = [null, null];
  function reset() {
    torsoYaw = null, lastTime2 = null, poles.fill(null);
  }
  function solve(hands, headMatrix, time) {
    let output = emptyArms();
    if (!headMatrix)
      return reset(), output;
    let head = new THREE7.Vector3().setFromMatrixPosition(headMatrix), forward = new THREE7.Vector3(0, 0, -1).transformDirection(headMatrix);
    if (forward.y = 0, head.toArray().some((n) => !Number.isFinite(n) || Math.abs(n) > 99))
      return reset(), output;
    let dt = lastTime2 === null ? 0 : THREE7.MathUtils.clamp((time - lastTime2) / 1e3, 0, 0.05);
    lastTime2 = time;
    let headYaw = forward.lengthSq() > 0.01 ? Math.atan2(-forward.x, -forward.z) : torsoYaw ?? 0;
    torsoYaw === null && (torsoYaw = headYaw);
    let target = torsoYaw, delta = wrap(headYaw - torsoYaw);
    if (Math.abs(delta) > config.headYawDeadband && (target = wrap(headYaw - Math.sign(delta) * config.headYawDeadband)), hands.every((h) => h.tracked)) {
      let middle = v(hands[0].pose.positionMeters).add(v(hands[1].pose.positionMeters)).multiplyScalar(0.5).sub(head);
      middle.y = 0;
      let handsYaw = Math.atan2(-middle.x, -middle.z);
      middle.length() > 0.2 && Math.abs(wrap(headYaw - handsYaw)) < 0.65 && Math.abs(delta) > 0.3 && (target = handsYaw);
    }
    torsoYaw = wrap(torsoYaw + THREE7.MathUtils.clamp(wrap(target - torsoYaw), -config.maxTorsoTurnSpeed * dt, config.maxTorsoTurnSpeed * dt)), output.torsoYawRadians = torsoYaw;
    let body = new THREE7.Quaternion().setFromAxisAngle(new THREE7.Vector3(0, 1, 0), torsoYaw), right = new THREE7.Vector3(1, 0, 0).applyQuaternion(body), back = new THREE7.Vector3(0, 0, 1).applyQuaternion(body);
    for (let [i, hand] of hands.entries()) {
      if (!hand.tracked) {
        poles[i] = null;
        continue;
      }
      let side = i === 0 ? -1 : 1, shoulder = head.clone().addScaledVector(right, side * config.shoulderWidth / 2).addScaledVector(back, config.headToShoulderBack);
      shoulder.y -= config.headToShoulderDrop;
      let wrist = v(config.palmToWrist).applyQuaternion(new THREE7.Quaternion().fromArray(hand.pose.quaternionXYZW)).add(v(hand.pose.positionMeters)), direction = wrist.clone().sub(shoulder), distance4 = direction.length();
      distance4 < 1e-6 ? direction.copy(back).negate() : direction.divideScalar(distance4);
      let upper = config.upperArmLength, lower = config.forearmLength, min = Math.abs(upper - lower) + 5e-3, max = upper + lower - 5e-3, adjustment = distance4 > max ? Math.min(distance4 - max, config.maxShoulderShift) : distance4 < min ? -Math.min(min - distance4, config.maxShoulderShift) : 0;
      shoulder.addScaledVector(direction, adjustment), distance4 = wrist.distanceTo(shoulder), direction.copy(wrist).sub(shoulder).normalize();
      let unreachable = distance4 > max + 1e-6 || distance4 < min - 1e-6, elbow;
      if (unreachable)
        elbow = wrist.clone().addScaledVector(direction, -lower), poles[i] = null;
      else {
        let crossing = side * wrist.clone().sub(head).dot(right) < 0, desired = right.clone().multiplyScalar(side * 0.7).add(new THREE7.Vector3(0, -0.9, 0)).addScaledVector(back, crossing ? -0.8 : 0.2);
        desired.addScaledVector(direction, -desired.dot(direction)), desired.lengthSq() < 1e-6 && (desired.copy(back), desired.addScaledVector(direction, -desired.dot(direction))), desired.lengthSq() < 1e-6 && (desired.copy(right), desired.addScaledVector(direction, -desired.dot(direction))), desired.normalize();
        let previous = poles[i]?.clone();
        previous && (previous.addScaledVector(direction, -previous.dot(direction)), previous.lengthSq() > 0.01 && (previous.normalize(), desired.copy(previous.lerp(desired, 1 - Math.exp(-config.poleSmoothing * dt)).normalize()))), poles[i] = desired.clone();
        let along = (upper * upper - lower * lower + distance4 * distance4) / (2 * distance4), height = Math.sqrt(Math.max(0, upper * upper - along * along));
        elbow = shoulder.clone().addScaledVector(direction, along).addScaledVector(desired, height);
      }
      output.joints[i] = { side: hand.side, status: unreachable ? "forearm-only" : adjustment ? "shoulder-adjusted" : "solved", shoulder: shoulder.toArray(), elbow: elbow.toArray(), wrist: wrist.toArray(), shoulderShiftMeters: Math.abs(adjustment), reachErrorMeters: unreachable ? Math.max(distance4 - max, min - distance4) : 0 };
    }
    return output;
  }
  return { solve, reset };
}

// src/client/hand-input.mjs
function isRigidHandSpace(matrix) {
  let e = matrix?.elements;
  if (!e || !e.every(Number.isFinite)) return !1;
  let a = new THREE8.Vector3(e[0], e[1], e[2]), b = new THREE8.Vector3(e[4], e[5], e[6]), c = new THREE8.Vector3(e[8], e[9], e[10]);
  return [a, b, c].every((v2) => Math.abs(v2.lengthSq() - 1) < 1e-4) && Math.abs(a.dot(b)) < 1e-4 && Math.abs(a.dot(c)) < 1e-4 && Math.abs(b.dot(c)) < 1e-4 && Math.abs(matrix.determinant() - 1) < 1e-4 && [e[3], e[7], e[11]].every((n) => Math.abs(n) < 1e-6) && Math.abs(e[15] - 1) < 1e-6;
}
function createHandInput(metadata = HANDS_METADATA) {
  validateHandsMetadata(metadata);
  let sequence = 0, current = emptyHands(), fingers = /* @__PURE__ */ new Map(), arms = metadata.armModel ? createArmSolver(metadata.armModel) : null, offsets = new Map(HAND_SIDES.map((side) => {
    let p = metadata.gripToPalm[side];
    return [side, new THREE8.Matrix4().compose(new THREE8.Vector3().fromArray(p.positionMeters), new THREE8.Quaternion().fromArray(p.quaternionXYZW), new THREE8.Vector3(1, 1, 1))];
  })), inverse = new THREE8.Matrix4(), grip = new THREE8.Matrix4(), palm = new THREE8.Matrix4(), head = new THREE8.Matrix4(), position = new THREE8.Vector3(), rotation = new THREE8.Quaternion(), scale = new THREE8.Vector3();
  function next(time) {
    return current = emptyHands(++sequence, Number.isFinite(time) ? Math.max(time, current.frameTimeMs) : current.frameTimeMs), arms && (current.arms = emptyArms()), current;
  }
  function reset(time = current.frameTimeMs) {
    return arms?.reset(), fingers.clear(), next(time);
  }
  function sample({ frame, time, session, referenceSpace, rigMatrix, worldMatrix, headWorldMatrix, enabled = !1 }) {
    if (next(time), !enabled || !frame?.getPose || !referenceSpace || !session || session.visibilityState === "hidden" || !isRigidHandSpace(rigMatrix) || !isRigidHandSpace(worldMatrix))
      return arms?.reset(), fingers.clear(), current;
    inverse.copy(worldMatrix).invert();
    let sources = Array.from(session.inputSources || []).filter((s) => HAND_SIDES.includes(s.handedness) && s.gripSpace && !s.hand && s.targetRayMode === "tracked-pointer");
    for (let hand of current.hands) {
      let matching = sources.filter((s) => s.handedness === hand.side);
      if (matching.length !== 1) continue;
      let pose;
      try {
        pose = frame.getPose(matching[0].gripSpace, referenceSpace);
      } catch {
        continue;
      }
      if (!pose?.transform?.matrix || pose.emulatedPosition === !0 || (grip.fromArray(pose.transform.matrix), !isRigidHandSpace(grip))) continue;
      palm.copy(inverse).multiply(rigMatrix).multiply(grip).multiply(offsets.get(hand.side)), palm.decompose(position, rotation, scale);
      let local = { positionMeters: position.toArray(), quaternionXYZW: rotation.normalize().toArray() };
      if (!validHandPose(local)) continue;
      if (hand.tracked = !0, hand.pose = local, metadata.modelVersion < 4) {
        hand.grip = metadata.fixedPose.grip, hand.trigger = metadata.fixedPose.trigger;
        continue;
      }
      let source = matching[0], target = controllerFingers(source.gamepad), last = fingers.get(hand.side), alpha = last?.source === source ? 1 - Math.exp(-Math.min(0.1, Math.max(0, (current.frameTimeMs - last.time) / 1e3)) / 0.07) : 1;
      for (let key of ["grip", "trigger", "thumb"]) {
        let value = last?.source === source ? last[key] + (target[key] - last[key]) * alpha : target[key];
        hand[key] = Math.abs(value - target[key]) < 1e-3 ? target[key] : value;
      }
      fingers.set(hand.side, { source, time: current.frameTimeMs, grip: hand.grip, trigger: hand.trigger, thumb: hand.thumb });
    }
    for (let hand of current.hands) hand.tracked || fingers.delete(hand.side);
    return arms && (current.arms = arms.solve(current.hands, isRigidHandSpace(headWorldMatrix) ? head.copy(inverse).multiply(headWorldMatrix) : null, current.frameTimeMs)), current;
  }
  return { sample, reset, snapshot: () => structuredClone(current) };
}
function controllerFingers(gamepad) {
  if (gamepad?.mapping !== "xr-standard") return { grip: 0, trigger: 0, thumb: 0 };
  let buttons = Array.from(gamepad.buttons || []), value = (b) => b?.pressed ? 1 : Number.isFinite(b?.value) ? THREE8.MathUtils.clamp(b.value, 0, 1) : 0, analog = (b) => {
    let n = Number.isFinite(b?.value) ? THREE8.MathUtils.clamp(b.value, 0, 1) : value(b);
    return n > 0.03 ? n : b?.pressed ? 1 : 0;
  }, thumbPressed = buttons.slice(2, 6).some((b) => typeof b?.pressed == "boolean" ? b.pressed : value(b) > 0.65);
  return { trigger: analog(buttons[0]), grip: analog(buttons[1]), thumb: thumbPressed ? 1 : 0 };
}

// src/client/hand-view.mjs
import * as THREE10 from "three";
import { RoundedBoxGeometry as RoundedBoxGeometry2 } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries as mergeGeometries3 } from "three/addons/utils/BufferGeometryUtils.js";

// src/client/hand-rig.mjs
import * as THREE9 from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries as mergeGeometries2 } from "three/addons/utils/BufferGeometryUtils.js";
function createFingerHand(side, d, material2, version = 5) {
  let mirror = side === "left" ? -1 : 1, scale = d.palmLength / 0.086, pieces = [], bones = [], fingers = [], root = new THREE9.Bone();
  root.name = "palm", bones.push(root);
  let add = (geometry22, bone, position) => {
    geometry22.translate(...position);
    let g = geometry22.index ? geometry22.toNonIndexed() : geometry22;
    g !== geometry22 && geometry22.dispose();
    let count = g.attributes.position.count, indices = new Uint16Array(count * 4), weights = new Float32Array(count * 4);
    for (let i = 0; i < count; i++)
      indices[i * 4] = bone, weights[i * 4] = 1;
    g.setAttribute("skinIndex", new THREE9.Uint16BufferAttribute(indices, 4)), g.setAttribute("skinWeight", new THREE9.Float32BufferAttribute(weights, 4)), pieces.push(g);
  };
  add(new RoundedBoxGeometry(d.palmWidth, d.palmLength, d.palmThickness, 2, d.palmThickness * 0.35), 0, [0, 0, 0]), add(new RoundedBoxGeometry(d.palmWidth * 0.63, d.wristLength, d.palmThickness * 0.85, 2, d.palmThickness * 0.3), 0, [0, -d.palmLength / 2 - d.wristLength * 0.35, 0]);
  function chain(name, base, lengths, radius) {
    let parent = root, y = base[1], joints = [];
    return lengths.forEach((length2, j) => {
      let bone = new THREE9.Bone();
      bone.name = name + "-" + j, bone.position.fromArray(j ? [0, lengths[j - 1], 0] : base), parent.add(bone), parent = bone;
      let index = bones.length;
      bones.push(bone), joints.push(bone), add(new THREE9.CapsuleGeometry(radius * (j === 2 ? 0.9 : 1), Math.max(1e-3, length2 - radius * 1.1), 3, 7), index, [base[0], y + length2 / 2, base[2]]), y += length2;
    }), joints;
  }
  for (let [i, length2] of [1, 1.08, 1, 0.78].entries()) fingers.push(chain(["index", "middle", "ring", "little"][i], [(1.5 - i) * d.palmWidth * (version >= 5 ? 0.225 : 0.24) * mirror, d.palmLength * 0.39 - (i === 3 ? 6e-3 * scale : 0), 0], [0.032, 0.024, 0.019].map((n) => n * length2 * scale), d.fingerRadius * (i === 3 ? 0.85 : 1)));
  let thumb = chain("thumb", [mirror * d.palmWidth * 0.43, -d.palmLength * 0.18, d.palmThickness * 0.2], [0.031 * scale, 0.024 * scale], d.fingerRadius * 1.1);
  root.updateMatrixWorld(!0);
  let skeleton = new THREE9.Skeleton(bones), geometry2 = mergeGeometries2(pieces);
  pieces.forEach((g) => g.dispose());
  let mesh = new THREE9.SkinnedMesh(geometry2, material2);
  mesh.add(root), mesh.bind(skeleton, new THREE9.Matrix4()), mesh.boundingSphere = new THREE9.Sphere(new THREE9.Vector3(0, 0.025 * scale, 0.015 * scale), 0.16 * scale), mesh.frustumCulled = !1;
  let mix2 = THREE9.MathUtils.lerp, relaxed = [[0.24, 0.28, 0.16], [0.28, 0.32, 0.18], [0.33, 0.37, 0.21], [0.36, 0.42, 0.24]];
  function pose({ trigger = 0, grip = 0, thumb: thumbCurl = 0 } = {}) {
    fingers.forEach((joints, i) => {
      let curl = i === 0 ? trigger : grip, spread = (version >= 5 ? [0.035, 8e-3, -8e-3, -0.04] : [0.095, 0.025, -0.035, -0.12])[i] * mirror;
      joints.forEach((joint, j) => joint.rotation.set(mix2((version >= 5 ? relaxed[i] : [0.08, 0.12, 0.09])[j], [i === 0 ? 0.95 : 1.1, 1.35, 0.88][j], curl), 0, j === 0 ? spread * (1 - curl) : 0));
    }), thumb[0].rotation.set(mix2(version >= 5 ? 0.15 : 0.18, version >= 5 ? 0.7 : 0.75, thumbCurl), 0, mirror * mix2(version >= 5 ? -0.58 : -0.9, version >= 5 ? 0.15 : 0.25, thumbCurl)), thumb[1].rotation.set(mix2(0.12, version >= 5 ? 0.6 : 0.7, thumbCurl), 0, 0);
  }
  function snapshot() {
    return bones.map((b) => b.quaternion.toArray());
  }
  return pose(), { mesh, pose, snapshot };
}

// src/client/hand-view.mjs
function handGeometry(side, dimensions, version) {
  let d = dimensions, mirror = (side === "left" ? -1 : 1) * (version === 1 ? -1 : 1), pieces = [], add = (geometry22, position = [0, 0, 0]) => {
    geometry22.translate(...position);
    let g = geometry22.index ? geometry22.toNonIndexed() : geometry22;
    pieces.push(g), g !== geometry22 && geometry22.dispose();
  };
  add(new RoundedBoxGeometry2(d.palmWidth, d.palmLength, d.palmThickness, 2, d.palmThickness * 0.35)), add(new RoundedBoxGeometry2(d.palmWidth * 0.63, d.wristLength, d.palmThickness * 0.85, 2, d.palmThickness * 0.3), [0, -d.palmLength / 2 - d.wristLength * 0.35, 0]);
  let segment = (a, b, r) => {
    let start = new THREE10.Vector3(...a), end = new THREE10.Vector3(...b), delta = end.clone().sub(start), geometry22 = new THREE10.CapsuleGeometry(r, Math.max(1e-3, delta.length() - r * 1.1), 3, 7);
    geometry22.applyQuaternion(new THREE10.Quaternion().setFromUnitVectors(new THREE10.Vector3(0, 1, 0), delta.normalize())), add(geometry22, start.add(end).multiplyScalar(0.5).toArray());
  };
  for (let [i, length2] of [1, 1.08, 1, 0.78].entries()) {
    let x = (1.5 - i) * d.palmWidth * 0.24 * mirror, y = d.palmLength * 0.39 - (i === 3 ? 6e-3 : 0), r = d.fingerRadius * (i === 3 ? 0.85 : 1), points = version < 3 ? [[x, y, 0], [x, y + d.palmLength * 0.3 * length2, d.palmThickness * 0.4], [x, y + d.palmLength * 0.35 * length2, d.palmThickness * 1.15], [x, y + d.palmLength * 0.17 * length2, d.palmThickness * 1.5]] : (
      // Curl around the handle and return toward the palm. The old fingertips
      // all stayed distal to the knuckles, producing an open claw silhouette.
      i === 0 ? [[x, y, 0], [x, y + 0.022 * length2, d.palmThickness * 0.8], [x, y + 6e-3 * length2, d.palmThickness * 1.65], [x, y - 0.016 * length2, d.palmThickness * 1.4]] : [[x, y, 0], [x, y + 0.012 * length2, d.palmThickness * 0.93], [x, y - 0.014 * length2, d.palmThickness * 1.4], [x, y - 0.038 * length2, d.palmThickness]]
    );
    for (let j = 1; j < points.length; j++) segment(points[j - 1], points[j], r);
  }
  let thumb = version < 3 ? [[mirror * d.palmWidth * 0.4, -d.palmLength * 0.18, d.palmThickness * 0.2], [mirror * d.palmWidth * 0.62, d.palmLength * 0.07, d.palmThickness * 0.7], [mirror * d.palmWidth * 0.35, d.palmLength * 0.25, d.palmThickness * 1.35]] : [[mirror * d.palmWidth * 0.43, -d.palmLength * 0.23, d.palmThickness * 0.25], [mirror * d.palmWidth * 0.68, d.palmLength * 0.06, d.palmThickness * 0.8], [mirror * d.palmWidth * 0.72, d.palmLength * 0.28, d.palmThickness * 1.1]];
  segment(thumb[0], thumb[1], d.fingerRadius * 1.18), segment(thumb[1], thumb[2], d.fingerRadius * 1.08);
  let geometry2 = mergeGeometries3(pieces);
  for (let piece of pieces) piece.dispose();
  return geometry2.computeBoundingSphere(), geometry2;
}
function createHandLayer(parent, metadata = HANDS_METADATA) {
  validateHandsMetadata(metadata);
  let group = new THREE10.Group();
  group.name = "controller-hands", parent.add(group);
  let rigs = [], color = metadata.modelVersion >= 4 ? metadata.appearance.color : "#f2f1eb", meshes3 = HAND_SIDES.map((side) => {
    let material2 = new THREE10.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0 }), rig2 = metadata.modelVersion >= 4 ? createFingerHand(side, metadata.dimensions, material2, metadata.modelVersion) : null;
    rigs.push(rig2);
    let mesh = rig2?.mesh || new THREE10.Mesh(handGeometry(side, metadata.dimensions, metadata.modelVersion), material2);
    return mesh.name = `user-hand-${side}`, mesh.visible = !1, mesh.raycast = () => {
    }, group.add(mesh), mesh;
  }), handMeshes = [...meshes3], armMeshes = metadata.armModel ? HAND_SIDES.map((side) => {
    let a = metadata.armModel;
    return ["upper", "forearm", "elbow"].map((part) => {
      let geometry2 = part === "elbow" ? new THREE10.SphereGeometry(a.forearmRadius, 10, 6) : new THREE10.CylinderGeometry(part === "upper" ? a.upperArmRadius : a.forearmRadius, part === "upper" ? a.forearmRadius : a.forearmRadius * 0.66, 1, 10, 1), mesh = new THREE10.Mesh(geometry2, new THREE10.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0 }));
      return mesh.name = `user-arm-${side}-${part}`, mesh.visible = !1, mesh.raycast = () => {
      }, group.add(mesh), meshes3.push(mesh), mesh;
    });
  }) : [], up2 = new THREE10.Vector3(0, 1, 0), start = new THREE10.Vector3(), end = new THREE10.Vector3(), direction = new THREE10.Vector3();
  function segment(mesh, a, b) {
    start.fromArray(a), end.fromArray(b), direction.copy(start).sub(end), mesh.position.copy(start).add(end).multiplyScalar(0.5), mesh.scale.set(1, direction.length(), 1), mesh.quaternion.setFromUnitVectors(up2, direction.normalize());
  }
  let sampleId = null, disposed = !1;
  function apply(sample) {
    disposed || (sample && validateHandsSample(sample, metadata), sampleId = sample?.sampleId ?? null, handMeshes.forEach((mesh, i) => {
      let hand = sample?.hands[i];
      mesh.visible = hand?.tracked === !0, mesh.visible && (mesh.position.fromArray(hand.pose.positionMeters), mesh.quaternion.fromArray(hand.pose.quaternionXYZW), rigs[i]?.pose(hand));
    }), armMeshes.forEach(([upper, forearm, elbow], i) => {
      let arm = sample?.arms?.joints[i], visible = !!arm && arm.status !== "untracked";
      forearm.visible = elbow.visible = visible, upper.visible = visible && arm.status !== "forearm-only", visible && (segment(forearm, arm.elbow, arm.wrist), elbow.position.fromArray(arm.elbow), upper.visible && segment(upper, arm.shoulder, arm.elbow));
    }), group.updateWorldMatrix(!0, !0));
  }
  let meshSnapshot = (mesh) => ({ visible: mesh.visible && group.visible && parent.visible, worldMatrix: mesh.visible ? mesh.matrixWorld.toArray() : null });
  function snapshot() {
    return group.updateWorldMatrix(!0, !0), { sampleId, hands: handMeshes.map((mesh, i) => ({ side: HAND_SIDES[i], ...meshSnapshot(mesh), ...rigs[i] ? { fingerQuaternions: rigs[i].snapshot() } : {} })), arms: armMeshes.map((list, i) => ({ side: HAND_SIDES[i], segments: list.map(meshSnapshot) })), triangles: meshes3.reduce((n, m) => n + (m.geometry.index?.count ?? m.geometry.attributes.position.count) / 3, 0) };
  }
  function dispose() {
    if (!disposed) {
      disposed = !0, group.removeFromParent();
      for (let mesh of meshes3)
        mesh.geometry.dispose(), mesh.material.dispose(), mesh.skeleton?.dispose();
      group.clear();
    }
  }
  return { group, meshes: meshes3, apply, snapshot, dispose };
}

// src/client/tools/path-guide.mjs
import * as THREE11 from "three";
function createPathGuide(world2) {
  let group = new THREE11.Group();
  world2.add(group);
  let key = "";
  return { sync(path) {
    let next = JSON.stringify(path?.points);
    if (next === key) return;
    key = next;
    for (let o of [...group.children])
      group.remove(o), o.traverse((c) => {
        c.geometry?.dispose(), c.material?.dispose();
      });
    if (!path) return;
    let points = path.points.map((p) => new THREE11.Vector3(p[0], p[1] + 0.035, p[2])), curve = new THREE11.CurvePath();
    for (let i = 1; i < points.length; i++) curve.add(new THREE11.LineCurve3(points[i - 1], points[i]));
    let halo = new THREE11.Mesh(new THREE11.TubeGeometry(curve, Math.max(16, points.length * 2), 0.022, 6, !1), new THREE11.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.panel, depthTest: !1 }));
    halo.renderOrder = 12, group.add(halo);
    let line = new THREE11.Mesh(new THREE11.TubeGeometry(curve, Math.max(16, points.length * 2), 0.012, 6, !1), new THREE11.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1 }));
    line.renderOrder = 13, group.add(line);
    for (let point2 of [points[0], points.at(-1)]) {
      let node = new THREE11.Mesh(new THREE11.SphereGeometry(0.04, 10, 8), new THREE11.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1 }));
      node.position.copy(point2), node.renderOrder = 14, group.add(node);
    }
    let direction = points.at(-1).clone().sub(points.at(-2)).normalize(), arrow2 = new THREE11.ArrowHelper(direction, points.at(-1), 0.35, UI_THEME.accent, 0.14, 0.09);
    arrow2.line.material.toneMapped = arrow2.cone.material.toneMapped = !1, group.add(arrow2);
  }, show(value) {
    group.visible = value;
  } };
}

// src/shared/door-grab.mjs
var wrap2 = (x) => Math.atan2(Math.sin(x), Math.cos(x));
function bearing(p, o, d) {
  let h = (d.hinge === "left" ? -1 : 1) * o.size[0] / 2;
  return Math.atan2(-(p[2] - (o.position[2] - h * Math.sin(o.rotation))), p[0] - (o.position[0] + h * Math.cos(o.rotation)));
}
function createDoorGrab({ onEvent = () => {
}, openingMode = "follow-hand" } = {}) {
  let entries = /* @__PURE__ */ new Map(), owner = null, binding = null, identity = "", fired = !1, armed = !1;
  function release() {
    owner && (onEvent("doorRelease", { doorId: owner.id }), owner = null);
  }
  return {
    sync(scene2, { reset = !1 } = {}) {
      let next = /* @__PURE__ */ new Map();
      for (let d of scene2.behaviors?.doors || []) {
        let object3 = scene2.objects.find((o) => o.id === d.doorId), old = entries.get(d.doorId), compatible = old && JSON.stringify([old.object, old.config]) === JSON.stringify([object3, d]);
        next.set(d.doorId, compatible && !reset ? old : { object: object3, config: d, angle: 0 });
      }
      owner && (!next.has(owner.id) || next.get(owner.id) !== entries.get(owner.id)) && release(), entries = next, binding = scene2.behaviors?.binding || null;
      let key = JSON.stringify(binding);
      if (key !== identity || reset) {
        identity = key, fired = !1, armed = !1, release();
        for (let e of entries.values()) e.angle = 0;
      }
    },
    grab(p) {
      if (owner || !p) return !1;
      let near = [...entries].map(([id, e]) => ({ id, e, d: distanceToDoor(p, { ...e.object, ...doorTransform(e.object, e.config, e.angle / (Math.PI / 2)) }) })).filter((x) => x.d <= x.e.config.reach).sort((a, b) => a.d - b.d)[0];
      return near ? (owner = { id: near.id, bearing: bearing(p, near.e.object, near.e.config), angle: near.e.angle }, onEvent("doorGrab", { doorId: owner.id }), !0) : !1;
    },
    release,
    frame(dt, p, { held = !1, active = !1 } = {}) {
      owner && (!held || !active || !p) && release();
      let transforms = [];
      for (let [id, e] of entries)
        owner?.id === id ? e.angle = openingMode === "hold-to-open" ? Math.min(e.config.maxAngle, e.angle + Math.max(0, Math.min(dt, 0.1)) * e.config.maxAngle / e.config.duration) : Math.max(0, Math.min(e.config.maxAngle, owner.angle + e.config.direction * wrap2(bearing(p, e.object, e.config) - owner.bearing))) : e.angle = Math.max(0, e.angle - Math.max(0, Math.min(dt, 0.1)) * e.config.maxAngle / e.config.duration), transforms.push(doorTransform(e.object, e.config, e.angle / (Math.PI / 2))), binding?.doorId === id && (!armed && !fired && !owner && e.angle < 1e-3 && (armed = !0), active && armed && !fired && e.angle / e.config.maxAngle >= binding.threshold && (fired = !0, armed = !1, onEvent("doorTrigger", { doorId: id, pathId: binding.pathId })));
      return transforms;
    },
    reset() {
      release();
      for (let e of entries.values()) e.angle = 0;
      fired = !1, armed = !1, onEvent("previewReset", {});
    },
    snapshot: () => ({ grabbed: owner?.id || null, armed, fired, doors: [...entries].map(([id, e]) => ({ id, angle: e.angle, closing: owner?.id !== id && e.angle > 0 })) })
  };
}

// src/client/scripted-audio.mjs
var createScriptAudio = () => ({ play: async () => {
}, cancel() {
}, stop() {
}, setEnabled() {
} });

// src/client/xr/room-tracking.mjs
import * as THREE12 from "three";
function createRoomTracking() {
  let planes = [], candidate = null, lastUpdate = -1 / 0, supported = !1;
  return {
    reset() {
      planes = [], candidate = null, lastUpdate = -1 / 0, supported = !1;
    },
    update(frame, referenceSpace, time, aspect = 1) {
      if (!frame || time - lastUpdate < 500) return;
      lastUpdate = time;
      let detected;
      try {
        detected = frame.detectedPlanes, supported = detected !== void 0;
      } catch {
        supported = !1;
      }
      if (planes = [], detected) for (let plane of detected) {
        let pose = frame.getPose(plane.planeSpace, referenceSpace);
        if (!pose) continue;
        let matrix = new THREE12.Matrix4().fromArray(pose.transform.matrix);
        planes.push({ label: plane.semanticLabel || "", orientation: plane.orientation, points: Array.from(plane.polygon, (p) => new THREE12.Vector3(p.x, p.y, p.z).applyMatrix4(matrix).toArray()) });
      }
      candidate = roomFromPlanes(planes, aspect);
    },
    candidate() {
      return candidate ? structuredClone(candidate) : null;
    },
    planes() {
      return structuredClone(planes);
    },
    snapshot() {
      return { supported, count: planes.length, labels: [...new Set(planes.map((p) => p.label || "Unclassified"))], ready: !!candidate, metrics: candidate?.metrics || null };
    }
  };
}

// src/client/xr/room-occlusion.mjs
import * as THREE13 from "three";
function createRoomOcclusion() {
  let depthScene = new THREE13.Scene(), proxies = /* @__PURE__ */ new Map(), materials = /* @__PURE__ */ new Map(), active = !1, visibleCount = 0, visible = (mesh) => {
    for (let node = mesh; node; node = node.parent) if (!node.visible) return !1;
    return !0;
  };
  function material2(side) {
    return materials.has(side) || materials.set(side, new THREE13.MeshBasicMaterial({ side, colorWrite: !1, depthWrite: !0, depthTest: !0 })), materials.get(side);
  }
  function sync(sources) {
    let keep = new Set(sources);
    visibleCount = 0;
    for (let [source, proxy] of proxies) keep.has(source) || (proxy.removeFromParent(), proxies.delete(source));
    for (let source of sources) {
      let proxy = proxies.get(source);
      if (!proxy) {
        let depthMaterial = material2(source.material.side);
        proxy = source.isSkinnedMesh ? new THREE13.SkinnedMesh(source.geometry, depthMaterial) : new THREE13.Mesh(source.geometry, depthMaterial), proxy.matrixAutoUpdate = !1, proxies.set(source, proxy), depthScene.add(proxy);
      }
      proxy.visible = visible(source), proxy.visible && (visibleCount++, proxy.geometry = source.geometry, proxy.material = material2(source.material.side), proxy.matrix.copy(source.matrixWorld), proxy.matrixWorldNeedsUpdate = !0, proxy.frustumCulled = source.isSkinnedMesh ? !1 : source.frustumCulled, source.isSkinnedMesh && (proxy.skeleton = source.skeleton, proxy.bindMode = source.bindMode, proxy.bindMatrix.copy(source.bindMatrix), proxy.bindMatrixInverse.copy(source.bindMatrixInverse), source.boundingSphere && (proxy.boundingSphere = source.boundingSphere)));
    }
  }
  return {
    render(renderer2, scene2, camera2, sources, { enabled = !1 } = {}) {
      if (active = enabled, !enabled) {
        visibleCount = 0, renderer2.render(scene2, camera2);
        return;
      }
      if (scene2.updateMatrixWorld(!0), sync(sources), !visibleCount) {
        active = !1, renderer2.render(scene2, camera2);
        return;
      }
      let autoClear = renderer2.autoClear;
      try {
        renderer2.autoClear = !0, renderer2.render(depthScene, camera2), renderer2.autoClear = !1, renderer2.render(scene2, camera2);
      } finally {
        renderer2.autoClear = autoClear;
      }
    },
    snapshot: () => ({ active, visibleMeshes: visibleCount }),
    dispose() {
      depthScene.clear(), proxies.clear();
      for (let m of materials.values()) m.dispose();
      materials.clear();
    }
  };
}

// src/shared/quest-input.mjs
function createQuestButtons() {
  let held = /* @__PURE__ */ new WeakMap(), buttons = [1, 3, 4, 5];
  return { reset(source) {
    held.delete(source);
  }, sample(source) {
    let pad = source.gamepad;
    if (!pad) return [];
    let previous = held.get(source), next = /* @__PURE__ */ new Map(), events = [];
    for (let index of buttons) {
      let b = pad.buttons[index], was = previous?.get(index) || !1, pressed = !!b && (b.pressed || b.value > (was ? 0.35 : 0.65));
      next.set(index, pressed), previous && was !== pressed && events.push({ hand: source.handedness, index, type: pressed ? "down" : "up" });
    }
    return held.set(source, next), events;
  } };
}
function questButtonAction({ hand, index, type }, { showcase = !1, authoring = !1, phase: phase2, editing: editing2 = !1, placing = !1, selectingVolume = !1, transforming = !1, drafting = !1, demonstrating = !1, blocked = !1, scripted = !1, menuOpen = !1, grabbing = !1, confirmReady = !1, draftReady = !1, voiceState = "idle" } = {}) {
  if (showcase)
    return hand === "left" && index === 4 && type === "up" ? blocked ? null : "showcaseAdvance" : phase2 !== "explore" ? null : hand === "right" && index === 5 && type === "down" ? blocked ? null : "record" : hand === "right" && index === 1 ? type === "up" ? "doorRelease" : blocked ? null : "doorGrab" : null;
  if (authoring && voiceState !== "idle")
    return hand === "right" && index === 5 && type === "down" ? "cancel" : hand === "right" && index === 4 && type === "down" ? voiceState === "reviewing" ? "confirm" : null : hand === "left" && index === 4 ? type === "up" ? "voiceRelease" : voiceState === "reviewing" ? "voicePress" : null : hand === "right" && index === 1 && type === "up" ? "productionRelease" : null;
  if (authoring && hand === "right" && type === "down") {
    if (index === 5) return "cancel";
    if (index === 4)
      return transforming ? "confirm" : selectingVolume || grabbing || demonstrating || blocked && !confirmReady ? null : placing ? "confirm" : menuOpen ? "menuConfirm" : confirmReady ? "confirm" : drafting ? draftReady ? "draftConfirm" : null : "confirm";
  }
  if (authoring && hand === "left" && index === 5 && type === "down") return "menu";
  if (authoring && transforming)
    return hand === "right" && index === 1 ? type === "down" ? "productionGrab" : "productionRelease" : hand === "left" && index === 4 ? type === "down" ? "voicePress" : "voiceRelease" : null;
  if (!authoring && hand === "right" && index === 5 && type === "down") return "record";
  if (hand === "left" && index === 5 && type === "down") return "menu";
  if (!authoring && hand === "right" && index === 4 && type === "down") return "cancel";
  if (hand === "right" && index === 1 && type === "up") return selectingVolume ? "volumeEnd" : "doorRelease";
  if (hand === "left" && index === 4 && type === "up") return demonstrating ? null : "voiceRelease";
  if (demonstrating) return hand === "left" && index === 4 && type === "down" ? "demonstrationToggle" : null;
  if (transforming) return hand === "left" && index === 3 && type === "down" ? "undo" : null;
  if (selectingVolume || placing || grabbing) return null;
  if (authoring && !drafting && !blocked && phase2 === "explore" && hand === "left" && index === 1 && type === "down") return "transport";
  if (authoring && hand === "left" && index === 4 && type === "down" && ["reference", "explore"].includes(phase2)) return "voicePress";
  if (blocked || authoring && menuOpen) return null;
  if (drafting)
    return hand === "left" && index === 3 && type === "down" ? "draftUndo" : hand === "left" && index === 4 && type === "down" ? "voicePress" : null;
  if (hand === "left") {
    if (index === 4 && type === "down") return scripted || phase2 === "explore" ? "voicePress" : null;
    if (index === 3 && type === "down" && phase2 === "explore" && editing2) return "undo";
    if (index === 1 && type === "down" && phase2 === "explore") return "transport";
  }
  if (hand === "right" && phase2 === "explore") {
    if (index === 3 && type === "down") return "edit";
    if (index === 1 && type === "down") return editing2 && !menuOpen ? authoring ? null : "volumeBegin" : !editing2 && !menuOpen ? "doorGrab" : null;
  }
  return null;
}

// src/shared/storyboard.mjs
var STORY_ACTS = [], storyboardEntry = () => [], storyActions = () => [];

// src/client/transform-tool.mjs
import * as THREE14 from "three";
function createTransformTool({ world: world2, getState, spatialKey: spatialKey2, onEvent = () => {
} }) {
  let drag = null;
  function intersection(ray, y) {
    world2.updateMatrixWorld(!0);
    let local = ray.ray.clone().applyMatrix4(world2.matrixWorld.clone().invert());
    if (Math.abs(local.direction.y) < 0.06) return null;
    let p = local.intersectPlane(new THREE14.Plane(new THREE14.Vector3(0, 1, 0), -y), new THREE14.Vector3());
    return p && p.distanceTo(local.origin) < 50 ? p : null;
  }
  function begin(ids, pivot, ray) {
    if (drag) return !1;
    let targets = structuredClone(transformTargets(getState().scene, ids)), point2 = intersection(ray, pivot[1]);
    if (!point2) throw new Error("Point slightly downward, then hold the trigger to adjust again");
    return drag = { revision: getState().revision, key: spatialKey2(), targets, point: point2, translation: [0, 0, 0], yaw: 0, pivot: [...pivot], axisHeld: !1, changed: !1 }, onEvent("transform-begin", { ids: targets.map((o) => o.id), pivot, revision: drag.revision }), !0;
  }
  function update(ray, dt, x = 0, y = 0) {
    if (!drag) return;
    if (drag.revision !== getState().revision || drag.key !== spatialKey2()) {
      cancel("Scene or alignment changed");
      return;
    }
    x = Math.abs(x) > 0.2 ? x : 0, y = Math.abs(y) > 0.2 ? y : 0;
    let point2 = intersection(ray, drag.pivot[1]);
    x || y ? (drag.yaw = wrapYaw(drag.yaw - x * dt * Math.PI / 3), drag.translation[1] = THREE14.MathUtils.clamp(drag.translation[1] - y * dt * 0.4, -20, 20), drag.axisHeld = !0) : point2 && (drag.axisHeld ? (drag.point.copy(point2).sub(new THREE14.Vector3(drag.translation[0], 0, drag.translation[2])), drag.axisHeld = !1) : (drag.translation[0] = point2.x - drag.point.x, drag.translation[2] = point2.z - drag.point.z)), drag.changed = Math.hypot(...drag.translation) > 5e-3 || Math.abs(drag.yaw) > 2e-3;
  }
  let operation = () => drag ? { ids: drag.targets.map((o) => o.id), pivot: [...drag.pivot], translation: [...drag.translation], yaw: drag.yaw } : null;
  function cancel(reason = "Cancelled by user") {
    drag && onEvent("transform-cancel", { reason, operation: operation() }), drag = null;
  }
  return { begin, update, cancel, active: () => !!drag, operation, revision: () => drag?.revision, changed: () => !!drag?.changed, updates: () => drag ? transformUpdates(drag.targets, operation()) : [], finish() {
    let result = drag && { revision: drag.revision, operation: operation(), changed: drag.changed };
    return drag = null, result;
  } };
}
function createNavigationGate() {
  let blocked = !1;
  return { block() {
    blocked = !0;
  }, sample(axes) {
    return blocked && axes.every((v2) => Math.abs(v2) < 0.17) && (blocked = !1), !blocked;
  }, blocked: () => blocked };
}

// src/client/tools/interaction-draft.mjs
import * as THREE16 from "three";

// src/client/tools/draft-tool.mjs
import * as THREE15 from "three";
function createDraftTool({ world: world2, pickGround, smoothing = "off" }) {
  let model = createDraft({ smoothing, validatePath: supportedPath }), group = new THREE15.Group();
  group.visible = !1, world2.add(group);
  let material2 = new THREE15.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1 }), line = new THREE15.Mesh(new THREE15.BufferGeometry(), material2);
  line.renderOrder = 14, group.add(line);
  let halo = new THREE15.Mesh(new THREE15.BufferGeometry(), new THREE15.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.panel, depthTest: !1 }));
  halo.renderOrder = 13, group.add(halo);
  let pending = new THREE15.Line(new THREE15.BufferGeometry(), new THREE15.LineDashedMaterial({ toneMapped: !1, color: UI_THEME.panel, dashSize: 0.035, gapSize: 0.09, depthTest: !1 }));
  pending.renderOrder = 15, group.add(pending);
  let dotMaterial = new THREE15.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1 }), brush = new THREE15.Mesh(new THREE15.RingGeometry(0.04, 0.065, 20), new THREE15.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.panel, side: THREE15.DoubleSide, depthTest: !1 }));
  brush.rotation.x = -Math.PI / 2, brush.renderOrder = 15, group.add(brush);
  let start = new THREE15.Mesh(new THREE15.SphereGeometry(0.065, 10, 8), dotMaterial), end = new THREE15.Mesh(start.geometry, dotMaterial);
  start.renderOrder = end.renderOrder = 15, group.add(start, end);
  let arrow2 = new THREE15.ArrowHelper(new THREE15.Vector3(0, 0, 1), new THREE15.Vector3(), 0.3, UI_THEME.accent, 0.12, 0.09);
  arrow2.line.material.toneMapped = arrow2.cone.material.toneMapped = !1, arrow2.line.material.depthTest = arrow2.cone.material.depthTest = !1, arrow2.line.renderOrder = arrow2.cone.renderOrder = 15, group.add(arrow2);
  let owner = null, version = -1, enabled = !1, mode2 = "floor2d", depth = 0.6, point2 = (ray) => mode2 === "space3d" ? world2.worldToLocal(ray.ray.at(depth, new THREE15.Vector3())).toArray() : pickGround(ray)?.toArray() || null, probe = new THREE15.Raycaster();
  function supportedPath(points) {
    if (mode2 === "space3d") return !0;
    world2.updateMatrixWorld(!0);
    for (let n = 1; n < points.length; n++) {
      let a = new THREE15.Vector3().fromArray(points[n - 1]), b = new THREE15.Vector3().fromArray(points[n]), steps = Math.max(1, Math.ceil(a.distanceTo(b) / 0.04));
      for (let i = 0; i <= steps; i++) {
        let p = a.clone().lerp(b, i / steps), origin = world2.localToWorld(p.clone().add(new THREE15.Vector3(0, 0.2, 0)));
        probe.set(origin, new THREE15.Vector3(0, -1, 0).transformDirection(world2.matrixWorld));
        let ground = pickGround(probe);
        if (!ground || Math.abs(ground.y - p.y) > 0.05) return !1;
      }
    }
    return !0;
  }
  function continuousSurface(next) {
    if (mode2 === "space3d") return next;
    let last = model.lastPoint();
    if (!last || !next) return next;
    let a = new THREE15.Vector3().fromArray(last), b = new THREE15.Vector3().fromArray(next), steps = Math.ceil(a.distanceTo(b) / 0.08);
    for (let i = 1; i < Math.min(steps, 12); i++) {
      let p = a.clone().lerp(b, i / steps), origin = p.clone().add(new THREE15.Vector3(0, 0.2, 0));
      world2.localToWorld(origin), probe.set(origin, new THREE15.Vector3(0, -1, 0).transformDirection(world2.matrixWorld));
      let ground = pickGround(probe);
      if (!ground || Math.abs(ground.y - p.y) > 0.12) return null;
    }
    return next;
  }
  function paint() {
    let next = model.summary();
    if (next.version === version) return;
    version = next.version;
    let data = model.snapshot(), points = (data.stroke || data.points).map((p) => new THREE15.Vector3(p[0], p[1] + (mode2 === "floor2d" ? 0.025 : 0), p[2]));
    line.geometry.dispose(), line.visible = points.length > 1;
    let path = new THREE15.CurvePath();
    for (let i = 1; i < points.length; i++) path.add(new THREE15.LineCurve3(points[i - 1], points[i]));
    if (line.geometry = points.length > 1 ? new THREE15.TubeGeometry(path, Math.max(8, points.length * 2), 0.012, 6, !1) : new THREE15.BufferGeometry(), halo.geometry.dispose(), halo.visible = line.visible, halo.geometry = points.length > 1 ? new THREE15.TubeGeometry(path, Math.max(8, points.length * 2), 0.022, 6, !1) : new THREE15.BufferGeometry(), pending.geometry.dispose(), pending.geometry = new THREE15.BufferGeometry().setFromPoints(points), pending.computeLineDistances(), pending.visible = !!data.stroke && points.length > 1, start.visible = end.visible = points.length > 0, arrow2.visible = points.length > 1, points.length && (start.position.copy(points[0]), end.position.copy(points.at(-1))), points.length > 1) {
      let direction = points.at(-1).clone().sub(points.at(-2));
      direction.y = 0, direction.lengthSq() > 1e-5 ? (arrow2.position.copy(points.at(-1)), arrow2.setDirection(direction.normalize())) : arrow2.visible = !1;
    }
  }
  return {
    open(points = [], options = {}) {
      mode2 = options.mode || "floor2d", depth = options.depth || 0.6, model.setMode(mode2), enabled = !0, group.visible = !0, owner = null, model.load(points), paint();
    },
    close() {
      enabled = !1, group.visible = !1, owner = null, model.reset(), paint();
    },
    depth(delta) {
      owner && owner !== "mouse" || (depth = THREE15.MathUtils.clamp(depth + delta, 0.2, 5));
    },
    cycleSmoothing() {
      let levels = ["off", "standard", "strong", "extreme"], current = model.summary().smoothing;
      model.setSmoothing(levels[(levels.indexOf(current) + 1) % levels.length]), paint();
    },
    active: () => enabled,
    begin(ray, input) {
      return !enabled || owner ? !1 : (model.begin(point2(ray)), owner = input, paint(), !0);
    },
    update(ray, input) {
      if (!enabled) return;
      let p = point2(ray);
      brush.visible = !!p, p && brush.position.set(p[0], p[1] + 0.03, p[2]), owner === input && model.sample(continuousSurface(p)), paint();
    },
    release(input) {
      if (owner !== input) return !1;
      owner = null;
      let result = model.finish();
      return paint(), result;
    },
    suspend(reason) {
      owner = null, model.interrupt(reason), brush.visible = !1, paint();
    },
    clear() {
      model.reset(), paint();
    },
    undo() {
      owner = null, model.undo(), paint();
    },
    summary: () => ({ ...model.summary(), depth, message: mode2 === "space3d" ? model.summary().message.replace("Hold the right trigger to draw on the floor. Release to finish.", "Spatial brush \xB7 Hold right trigger and move your hand \xB7 Y Save menu") : model.summary().message }),
    snapshot: () => ({ ...model.snapshot(), active: enabled, owner: owner === "mouse" ? "mouse" : owner ? "controller" : null })
  };
}

// src/client/tools/interaction-draft.mjs
function createInteractionDraftTool(options) {
  let { world: world2, pickGround, pickObject } = options, path = createDraftTool(options), group = new THREE16.Group();
  world2.add(group), group.visible = !1;
  let scene2, door, side, regions = [], stroke = null, owner = null, enabled = !1, message = "", version = 0, forceFloor = !1, colour = (surface) => surface === "floor" ? 3198395 : 15562137;
  function dispose() {
    for (let child of [...group.children])
      child.geometry?.dispose(), child.material?.dispose(), group.remove(child);
  }
  function outline(points, color, closed = !0) {
    if (!points.length) return;
    let vertices = (closed ? [...points, points[0]] : points).map((p) => new THREE16.Vector3(...p)), line = new THREE16.Line(new THREE16.BufferGeometry().setFromPoints(vertices), new THREE16.LineBasicMaterial({ color, depthTest: !1, toneMapped: !1 }));
    line.renderOrder = 15, group.add(line);
  }
  function paint() {
    if (version++, dispose(), !!enabled) {
      if (isDoor(door)) {
        let frame = regionFrame(scene2, { doorId: door.id, surface: "door-frame", side }), w = door.size[0] / 2 + 0.6, lo = -door.size[1] / 2 - 0.1, hi = door.size[1] / 2 + 0.3;
        outline([[-w, lo], [w, lo], [w, hi], [-w, hi]].map((p) => framePoint(frame, p)), 7571094);
      }
      for (let r of regions) outline(r.points.map((p) => framePoint(regionFrame(scene2, r), p)), colour(r.surface));
      stroke && outline(stroke.points.map((p) => framePoint(stroke.frame, p)), colour(stroke.surface), !1);
    }
  }
  function hit(ray, locked = stroke) {
    world2.updateMatrixWorld(!0);
    let ground = pickGround(ray);
    if (locked?.surface === "floor" || !locked && forceFloor) return ground && (!locked || Math.abs(ground.y - locked.floorY) < 0.05) ? { point: [ground.x, ground.z], surface: "floor", floorY: ground.y, frame: regionFrame(scene2, { surface: "floor", floorY: ground.y }) } : null;
    let objectHit = pickObject?.(ray, door.id);
    if (objectHit && (!locked || locked.surface === "object-surface")) {
      let frameData = locked?.frameData || surfaceFrame(door, objectHit.point, objectHit.normal), frame2 = regionFrame(scene2, { objectId: door.id, surface: "object-surface", frame: frameData });
      return new THREE16.Vector3(...objectHit.normal).dot(new THREE16.Vector3(...frame2.normal)) < 0.25 ? null : { point: surfaceUV(door, frameData, objectHit.point), surface: "object-surface", frameData, frame: frame2 };
    }
    if (locked?.surface === "object-surface") return null;
    if (!isDoor(door)) return !locked && ground ? { point: [ground.x, ground.z], surface: "floor", floorY: ground.y, frame: regionFrame(scene2, { surface: "floor", floorY: ground.y }) } : null;
    let origin = world2.worldToLocal(ray.ray.origin.clone()), direction = ray.ray.direction.clone().transformDirection(new THREE16.Matrix4().copy(world2.matrixWorld).invert()), localRay = new THREE16.Ray(origin, direction), frame = locked?.frame || regionFrame(scene2, { doorId: door.id, surface: "door-frame", side }), plane = new THREE16.Plane().setFromNormalAndCoplanarPoint(new THREE16.Vector3(...frame.normal), new THREE16.Vector3(...frame.origin)), point2 = localRay.intersectPlane(plane, new THREE16.Vector3()), uv = point2 && frameUV(frame, point2.toArray()), doorHit = uv && Math.abs(uv[0]) <= door.size[0] / 2 + 0.6 && uv[1] >= -door.size[1] / 2 - 0.1 && uv[1] <= door.size[1] / 2 + 0.3 ? { point: uv, surface: "door-frame", side, frame } : null;
    return locked || doorHit && (!ground || origin.distanceTo(point2) < origin.distanceTo(ground)) ? doorHit : ground ? { point: [ground.x, ground.z], surface: "floor", floorY: ground.y, frame: regionFrame(scene2, { surface: "floor", floorY: ground.y }) } : null;
  }
  function interrupt(reason) {
    stroke && (stroke = null, owner = null, message = reason || "Stroke cancelled. Completed regions are preserved.", paint());
  }
  return {
    open(points, opts) {
      enabled = !1, group.visible = !1, path.open(points, opts);
    },
    openRegions(definition, doorId, viewer) {
      if (path.close(), scene2 = definition, door = scene2.objects.find((o) => o.id === doorId), !door) throw Error("Select an object first.");
      let normal = [Math.sin(door.rotation), 0, Math.cos(door.rotation)];
      side = viewer.reduce((s, n, i) => s + (n - door.position[i]) * normal[i], 0) >= 0 ? 1 : -1, regions = structuredClone((scene2.regions || []).filter((r) => regionObjectId(r) === doorId)), stroke = null, owner = null, enabled = !0, group.visible = !0, forceFloor = !1, message = "Draw sources on the selected object and a floor dwell region. Close each loop before releasing.", paint();
    },
    active: () => enabled || path.active(),
    close() {
      enabled = !1, group.visible = !1, stroke = null, owner = null, regions = [], dispose(), path.close();
    },
    begin(ray, input) {
      if (!enabled) return path.begin(ray, input);
      if (owner) return !1;
      if (regions.length >= REGION_LIMITS.perDoor)
        return message = "Up to 8 regions per object. Undo a region to draw another.", !1;
      let h = hit(ray);
      return h ? (stroke = { ...h, points: [h.point] }, owner = input, message = h.surface === "floor" ? "Drawing floor trigger\u2026" : "Drawing object source\u2026", paint(), !0) : (message = "Start on the selected object or on the floor.", !1);
    },
    update(ray, input) {
      if (!enabled) return path.update(ray, input);
      if (owner !== input || !stroke) return;
      let h = hit(ray);
      if (!h) {
        interrupt("The stroke left its original surface and was cancelled");
        return;
      }
      let last = stroke.points.at(-1), distance4 = Math.hypot(h.point[0] - last[0], h.point[1] - last[1]);
      if (distance4 > REGION_LIMITS.maxGap) {
        interrupt("Tracking jumped; the stroke was cancelled");
        return;
      }
      if (!(distance4 < REGION_LIMITS.spacing)) {
        if (stroke.points.length >= 1024) {
          interrupt("The stroke is too long. Draw a smaller region.");
          return;
        }
        stroke.points.push(h.point), paint();
      }
    },
    release(input) {
      if (!enabled) return path.release(input);
      if (owner !== input || !stroke) return !1;
      let raw = stroke;
      stroke = null, owner = null;
      try {
        let region = { schema: "vrbuild-region/1", id: "region-" + crypto.randomUUID(), objectId: door.id, ...raw.surface === "door-frame" ? { doorId: door.id } : {}, name: (raw.surface === "floor" ? "Floor trigger " : "Object source ") + (regions.length + 1), surface: raw.surface, points: closeRegionStroke(raw.points, raw.surface), ...raw.surface === "floor" ? { floorY: raw.floorY } : raw.surface === "object-surface" ? { frame: raw.frameData } : { side: raw.side } };
        return validateRegions([...regions, region], scene2), regions.push(region), message = `${regions.length} regions ready. Draw another loop or finish and describe the effect.`, paint(), !0;
      } catch (error) {
        return message = error.message, paint(), !1;
      }
    },
    suspend(reason) {
      enabled ? interrupt(reason) : path.suspend(reason);
    },
    undo() {
      if (!enabled) return path.undo();
      stroke ? interrupt() : (regions.pop(), message = "Last region undone", paint());
    },
    clear() {
      if (!enabled) return path.clear();
      regions = [], stroke = null, owner = null, message = "Regions cleared. Draw new regions.", paint();
    },
    toggleSurface() {
      !enabled || stroke || (forceFloor = !forceFloor, message = forceFloor ? "Next stroke: floor trigger." : "Next stroke: object source, or a separate floor region.", paint());
    },
    depth(delta) {
      enabled || path.depth(delta);
    },
    cycleSmoothing() {
      enabled || path.cycleSmoothing();
    },
    summary: () => enabled ? { kind: "regions", mode: "regions", forceFloor, pointCount: regions.reduce((n, r) => n + r.points.length, 0), regionCount: regions.length, drawing: !!stroke, canUndo: !!stroke || regions.length > 0, length: 0, message, version } : path.summary(),
    snapshot: () => enabled ? { kind: "regions", mode: "regions", regions: structuredClone(regions), objectId: door.id, doorId: isDoor(door) ? door.id : void 0, stroke: stroke ? structuredClone({ ...stroke, frame: void 0 }) : null, active: enabled, owner: owner === "mouse" ? "mouse" : owner ? "controller" : null } : path.snapshot()
  };
}

// src/client/rendering/flood-layer.mjs
import * as THREE17 from "three";

// src/shared/flood-geometry.mjs
function floodOutline(region) {
  let points = region.points, lengths = points.map((p, i) => Math.hypot(...p.map((n, k) => n - points[(i + 1) % points.length][k]))), total = lengths.reduce((s, n) => s + n, 0), budget = 160 - points.length, result = [];
  for (let i = 0; i < points.length; i++) {
    let a = points[i], b = points[(i + 1) % points.length], steps = 1 + Math.min(Math.max(0, Math.ceil(lengths[i] / 0.055) - 1), Math.floor(budget * lengths[i] / total));
    for (let j = 0; j < steps; j++) result.push(a.map((n, k) => n + (b[k] - n) * j / steps));
  }
  return result;
}
function floodVertices(scene2, flood, source, time, sections = 24) {
  let region = scene2.regions.find((r) => r.id === source.regionId), frame = regionFrame(scene2, region), floor = scene2.regions.find((r) => r.id === flood.trigger.regionId).floorY, outline = floodOutline(region), minV = Math.min(...outline.map((p) => p[1])), maxV = Math.max(...outline.map((p) => p[1])), centreU = outline.reduce((n, p) => n + p[0], 0) / outline.length, angle3 = source.angle * Math.PI / 180, c = Math.cos(angle3), s = Math.sin(angle3), direction = [frame.normal[0] * c + frame.normal[2] * s, frame.normal[1], frame.normal[2] * c - frame.normal[0] * s], inlet = outline.map((p) => framePoint(frame, p)), front = Math.min(source.reach, Math.max(0, time) * source.speed * 1.15), positions = new Float32Array((sections + 1) * outline.length * 3);
  for (let i = 0; i <= sections; i++) {
    let t = i / sections, d = t * front, fall = 1.5 * (d / (source.speed + 0.5)) ** 2;
    for (let j = 0; j < outline.length; j++) {
      let p = outline[j], v2 = (p[1] - minV) / (maxV - minV || 1), point2 = [...inlet[j]], blend = Math.min(1, d / 0.25), spread = (p[0] - centreU) * (source.amount * 0.2 * d + 0.09 * Math.sin(d * 9 - time * source.speed * 4 + v2 * 5) * blend), wave = (Math.sin(d * 13 - time * source.speed * 8 + p[0] * 14) * 0.022 + Math.sin(d * 7 + p[0] * 20 - time * 5) * 0.012 + 0.035) * blend * source.amount;
      point2[0] += direction[0] * d + frame.u[0] * spread, point2[2] += direction[2] * d + frame.u[2] * spread, point2[1] = i === 0 ? point2[1] : Math.max(point2[1] + direction[1] * d + frame.u[1] * spread - fall, floor + 0.012 + source.amount * (0.025 + 0.075 * v2) * blend) + wave, positions.set(point2, (i * outline.length + j) * 3);
    }
  }
  return positions;
}

// src/client/rendering/flood-layer.mjs
function createFloodLayer(world2, { getObjectPose = () => null } = {}) {
  let root = new THREE17.Group(), areas = new THREE17.Group(), flows = new THREE17.Group();
  world2.add(root), root.add(areas, flows);
  let sections = 24, scene2, entries = [];
  function dispose(group) {
    for (let child of [...group.children])
      child.geometry?.dispose(), child.material?.dispose(), group.remove(child);
  }
  function triangles(points) {
    return THREE17.ShapeUtils.triangulateShape(points.map((p) => new THREE17.Vector2(...p)), []).flat();
  }
  return {
    dispose() {
      dispose(areas), dispose(flows), world2.remove(root), entries = [];
    },
    sync(definition) {
      scene2 = definition, entries = [], dispose(areas), dispose(flows);
      for (let r of scene2.regions || []) {
        let f = regionFrame(scene2, r), points = r.points.map((p) => framePoint(f, p).map((n, i) => n + f.normal[i] * 0.012)), color = r.surface === "floor" ? 3198395 : 15562137, line = new THREE17.LineLoop(new THREE17.BufferGeometry().setFromPoints(points.map((p) => new THREE17.Vector3(...p))), new THREE17.LineBasicMaterial({ color, toneMapped: !1 }));
        line.userData.regionId = r.id, areas.add(line);
        let geometry2 = new THREE17.BufferGeometry().setAttribute("position", new THREE17.Float32BufferAttribute(points.flat(), 3));
        geometry2.setIndex(triangles(r.points)), geometry2.computeVertexNormals();
        let fill = new THREE17.Mesh(geometry2, new THREE17.MeshBasicMaterial({ color, transparent: !0, opacity: 0.1, side: THREE17.DoubleSide, depthWrite: !1, toneMapped: !1 }));
        fill.userData.regionId = r.id, areas.add(fill);
      }
      for (let flood of scene2.floods || []) for (let source of flood.sources) {
        let region = scene2.regions.find((r) => r.id === source.regionId), outline = floodOutline(region), n = outline.length, indices = [], cap = triangles(outline);
        indices.push(...cap);
        for (let i = 0; i < sections; i++) for (let j = 0; j < n; j++) {
          let a = i * n + j, b = i * n + (j + 1) % n;
          indices.push(a, b, b + n, a, b + n, a + n);
        }
        indices.push(...cap.map((i) => i + sections * n));
        let geometry2 = new THREE17.BufferGeometry().setAttribute("position", new THREE17.BufferAttribute(floodVertices(scene2, flood, source, 0, sections), 3));
        geometry2.setIndex(indices), geometry2.computeVertexNormals();
        let mesh = new THREE17.Mesh(geometry2, new THREE17.MeshStandardMaterial({ color: flood.color, roughness: 0.24, metalness: 0.05, side: THREE17.DoubleSide, transparent: !0, opacity: 0.94, depthWrite: !0 }));
        mesh.visible = !1, mesh.frustumCulled = !1, flows.add(mesh), entries.push({ flood, source, mesh });
      }
    },
    frame(runtime, { showRegions = !0, opacity = 1 } = {}) {
      areas.visible = showRegions;
      let regionPoses = /* @__PURE__ */ new Map();
      for (let r of scene2.regions || []) if (r.surface === "object-surface" && !regionPoses.has(regionObjectId(r))) {
        let pose = getObjectPose(regionObjectId(r));
        pose && regionPoses.set(regionObjectId(r), pose);
      }
      let current = regionPoses.size ? { ...scene2, regionPoses } : scene2;
      for (let line of areas.children.filter((o) => o.userData.regionId)) {
        let region = scene2.regions.find((r) => r.id === line.userData.regionId);
        if (region.surface === "object-surface" && regionPoses.has(regionObjectId(region))) {
          let frame = regionFrame(current, region), positions = line.geometry.getAttribute("position");
          positions.array.set(region.points.flatMap((p) => framePoint(frame, p).map((n, i) => n + frame.normal[i] * 0.012))), positions.needsUpdate = !0, line.geometry.computeBoundingSphere();
        }
        if (region.surface !== "floor") continue;
        let f = scene2.floods?.find((f2) => f2.trigger.regionId === region.id), state2 = runtime.states.find((s) => s.id === f?.id);
        line.material.color.set(state2?.fired ? 14047344 : state2?.inside ? 15248699 : 3198395);
      }
      for (let { flood, source, mesh } of entries) {
        let state2 = runtime.states.find((s) => s.id === flood.id);
        if (mesh.visible = !!(runtime.visible && state2?.fired && state2.time > 0 && state2.time < flood.duration), !mesh.visible) continue;
        let position = mesh.geometry.getAttribute("position");
        position.array.set(floodVertices(current, flood, source, state2.time, sections)), position.needsUpdate = !0, mesh.geometry.computeVertexNormals(), mesh.material.opacity = opacity * 0.94 * Math.min(1, (flood.duration - state2.time) / 0.6);
      }
    },
    snapshot() {
      return entries.map(({ flood, source, mesh }) => (mesh.geometry.computeBoundingBox(), { id: flood.id, regionId: source.regionId, visible: mesh.visible, vertices: mesh.geometry.getAttribute("position").count, bounds: [mesh.geometry.boundingBox.min.toArray(), mesh.geometry.boundingBox.max.toArray()] }));
    }
  };
}

// src/client/tools/volume-selection.mjs
import * as THREE18 from "three";

// src/shared/selection.mjs
var dot2 = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0), sub2 = (a, b) => a.map((x, i) => x - b[i]);
function idsInVolume(scene2, { origin, u, v: v2, n, a, b, depth }) {
  if (!Number.isFinite(depth) || depth <= 0) throw new Error("Invalid selection depth");
  return scene2.objects.filter((object3) => {
    if (object3.id === "ground" && object3.editable !== !0) return !1;
    let p = sub2(object3.position, origin), x = dot2(p, u), y = dot2(p, v2), z = dot2(p, n);
    return x >= Math.min(a[0], b[0]) && x <= Math.max(a[0], b[0]) && y >= Math.min(a[1], b[1]) && y <= Math.max(a[1], b[1]) && Math.abs(z) <= depth / 2;
  }).map((o) => o.id);
}

// src/client/tools/volume-selection.mjs
function createVolumeSelection({ world: world2, getScene, getMeshes, getHit, onCandidates }) {
  let box = null, helper = null, startMarker = null, depth = 4, ids = [], localRay = (ray) => (world2.updateMatrixWorld(!0), ray.clone().applyMatrix4(world2.matrixWorld.clone().invert()));
  function clear() {
    helper && (world2.remove(helper), helper.traverse((o) => {
      o.geometry?.dispose(), o.material?.dispose();
    }), helper = null), startMarker && (world2.remove(startMarker), startMarker.geometry.dispose(), startMarker.material.dispose(), startMarker = null), box = null;
  }
  function paint() {
    let { origin, u, v: v2, n, a, b } = box;
    helper.position.copy(origin).addScaledVector(u, (a[0] + b[0]) / 2).addScaledVector(v2, (a[1] + b[1]) / 2), helper.quaternion.setFromRotationMatrix(new THREE18.Matrix4().makeBasis(u, v2, n));
    let visibleMinimum = 0.025 / world2.scale.x;
    helper.scale.set(Math.max(visibleMinimum, Math.abs(b[0] - a[0])), Math.max(visibleMinimum, Math.abs(b[1] - a[1])), depth), ids = idsInVolume(getScene(), { origin: origin.toArray(), u: u.toArray(), v: v2.toArray(), n: n.toArray(), a, b, depth }), onCandidates(ids);
  }
  function begin(raycaster2) {
    clear();
    let ray = localRay(raycaster2.ray), hit = getHit ? getHit(raycaster2) : raycaster2.intersectObjects(getMeshes().filter((m) => m.userData.definition.id !== "ground"), !1)[0], objects = getScene().objects, hitDefinition = hit?.object?.userData.definition || objects.find((o) => o.id === hit?.id), distances = objects.filter((o) => o.editable === !0 || o.id !== "ground" && o.category !== "structure").map((o) => new THREE18.Vector3().fromArray(o.position).sub(ray.origin).dot(ray.direction)).filter((d) => d > 0).sort((a, b) => a - b), distance4 = hitDefinition ? new THREE18.Vector3().fromArray(hitDefinition.position).sub(ray.origin).dot(ray.direction) : distances[Math.floor(distances.length / 2)] ?? 3 / world2.scale.x, origin = ray.at(Math.max(0.1, distance4), new THREE18.Vector3()), n = ray.direction.clone().negate(), up2 = Math.abs(n.y) > 0.95 ? new THREE18.Vector3(0, 0, 1) : new THREE18.Vector3(0, 1, 0), u = new THREE18.Vector3().crossVectors(up2, n).normalize(), v2 = new THREE18.Vector3().crossVectors(n, u).normalize();
    box = { origin, u, v: v2, n, a: [0, 0], b: [0, 0], plane: new THREE18.Plane().setFromNormalAndCoplanarPoint(n, origin) }, helper = new THREE18.Group();
    let geometry2 = new THREE18.BoxGeometry(1, 1, 1), fill = new THREE18.Mesh(geometry2, new THREE18.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.selected, transparent: !0, opacity: 0.08, depthWrite: !1, side: THREE18.DoubleSide })), edges = new THREE18.LineSegments(new THREE18.EdgesGeometry(geometry2), new THREE18.LineBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1, transparent: !0, opacity: 0.9 }));
    edges.renderOrder = 12, helper.add(fill, edges), world2.add(helper), startMarker = new THREE18.Mesh(new THREE18.SphereGeometry(0.015 / world2.scale.x, 10, 6), new THREE18.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1 })), startMarker.position.copy(origin), startMarker.renderOrder = 13, world2.add(startMarker), paint();
  }
  function update(raycaster2) {
    if (!box) return;
    let point2 = localRay(raycaster2.ray).intersectPlane(box.plane, new THREE18.Vector3());
    if (!point2) return;
    let delta = point2.sub(box.origin);
    box.b = [delta.dot(box.u), delta.dot(box.v)], paint();
  }
  function finish() {
    if (!box) return null;
    let result = Math.abs(box.b[0] - box.a[0]) > 0.08 && Math.abs(box.b[1] - box.a[1]) > 0.08 ? [...ids] : null;
    return clear(), result;
  }
  return { begin, update, finish, cancel: clear, isActive: () => !!box, setDepth(value) {
    return depth = THREE18.MathUtils.clamp(value, 0.5, 30), box && paint(), depth;
  }, getDepth: () => depth };
}

// src/client/ray-feedback.mjs
import * as THREE19 from "three";
function createRayFeedback(parent, controller = null) {
  let group = new THREE19.Group();
  group.name = "interaction-ray-contact", group.visible = !1, parent.add(group);
  let material2 = (color) => new THREE19.MeshBasicMaterial({ toneMapped: !1, color, side: THREE19.DoubleSide, depthTest: !1, depthWrite: !1, transparent: !0, opacity: 0.95 }), rim2 = new THREE19.Mesh(new THREE19.RingGeometry(0.64, 1.14, 32), material2(UI_THEME.panel)), ring2 = new THREE19.Mesh(new THREE19.RingGeometry(0.76, 1, 32), material2(UI_THEME.selected)), dot3 = new THREE19.Mesh(new THREE19.CircleGeometry(0.24, 16), material2(UI_THEME.selected));
  for (let [i, mesh] of [rim2, ring2, dot3].entries())
    mesh.renderOrder = 80 + i, group.add(mesh);
  let laser = controller ? new THREE19.Line(new THREE19.BufferGeometry().setFromPoints([new THREE19.Vector3(), new THREE19.Vector3(0, 0, -1)]), new THREE19.LineBasicMaterial({ toneMapped: !1, color: UI_THEME.selected, transparent: !0, opacity: 0.65, depthWrite: !1 })) : null;
  laser && (laser.visible = !1, controller.add(laser));
  let normal = new THREE19.Vector3(), normalMatrix = new THREE19.Matrix3(), z = new THREE19.Vector3(0, 0, 1), contact = null;
  function hide() {
    group.visible = !1, laser && (laser.visible = !1), contact = null;
  }
  function update(raycaster2, { enabled = !1, hit = null, color = UI_THEME.selected, viewerPosition = raycaster2.ray.origin } = {}) {
    if (hide(), !enabled || (laser && (laser.visible = !0, laser.scale.z = hit?.distance ?? 3, laser.material.color.set(color)), hit && (contact = { id: hit.id ?? hit.object?.userData.definition?.id ?? null, approximate: !!hit.approximate }), !hit?.point || hit.approximate)) return;
    normal.copy(hit.face?.normal || z), hit.face && hit.object ? normal.applyMatrix3(normalMatrix.getNormalMatrix(hit.object.matrixWorld)).normalize() : normal.copy(raycaster2.ray.direction).negate(), normal.dot(raycaster2.ray.direction) > 0 && normal.negate();
    let distance4 = hit.point.distanceTo(viewerPosition), radius = THREE19.MathUtils.clamp(distance4 * 7e-3, 8e-3, 0.045);
    group.position.copy(hit.point).addScaledVector(normal, 15e-4), group.quaternion.setFromUnitVectors(z, normal), group.scale.setScalar(radius), group.visible = !0, ring2.material.color.set(color), dot3.material.color.set(color), contact = { ...contact, point: hit.point.toArray(), normal: normal.toArray(), distance: hit.distance, radius };
  }
  return { update, hide, group, snapshot: () => ({ visible: group.visible, rayVisible: laser?.visible ?? !1, rayLength: laser?.visible ? laser.scale.z : 0, ...contact }), dispose() {
    hide(), group.removeFromParent();
    for (let mesh of [rim2, ring2, dot3])
      mesh.geometry.dispose(), mesh.material.dispose();
    laser && (laser.removeFromParent(), laser.geometry.dispose(), laser.material.dispose());
  } };
}

// src/client/api.mjs
var authoringSession = null;
function setApiSession(session) {
  authoringSession = session;
}
function createApi(fetcher = fetch) {
  return async function(path, body, options = {}) {
    let { timeoutMs = path.startsWith("/api/speech/") ? 9e4 : 2e4, signal, ...requestOptions } = options, controller = new AbortController(), timer = setTimeout(() => controller.abort(new DOMException("Request timed out", "TimeoutError")), timeoutMs), requestSignal = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal;
    try {
      let payload = body && authoringSession && path !== "/api/authoring/session" && path !== "/api/config" ? { ...body, authoringSession: { ...authoringSession } } : body, response = await fetcher(path, { ...body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) } : {}, ...requestOptions, signal: requestSignal }), data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed");
      return data;
    } catch (error) {
      throw controller.signal.aborted && !signal?.aborted ? new Error("Local server timed out. Check the USB connection, then refresh to reopen the saved world.") : error;
    } finally {
      clearTimeout(timer);
    }
  };
}

// src/client/rendering/curve-layer.mjs
import * as THREE20 from "three";
function createCurveLayer(world2) {
  let group = new THREE20.Group();
  world2.add(group);
  let key = "";
  return { sync(curves = [], selected = null) {
    let next = JSON.stringify([curves, selected]);
    if (key !== next) {
      key = next;
      for (let child of [...group.children])
        child.geometry.dispose(), child.material.dispose(), group.remove(child);
      for (let curve of curves) {
        let points = curve.points.map((p) => new THREE20.Vector3(p[0], p[1] + (curve.mode === "floor2d" ? 0.025 : 0), p[2])), path = new THREE20.CurvePath();
        for (let i = 1; i < points.length; i++) path.add(new THREE20.LineCurve3(points[i - 1], points[i]));
        let color = curve.id === selected ? "#ffd166" : curve.mode === "space3d" ? "#b89bff" : "#51dac0", mesh = new THREE20.Mesh(new THREE20.TubeGeometry(path, Math.max(8, points.length * 2), 0.012, 6, !1), new THREE20.MeshBasicMaterial({ color, toneMapped: !1 }));
        group.add(mesh);
        let start = new THREE20.Mesh(new THREE20.SphereGeometry(0.055, 10, 8), new THREE20.MeshBasicMaterial({ color, toneMapped: !1 }));
        start.position.copy(points[0]), group.add(start);
      }
    }
  } };
}

// src/shared/actor-presets.mjs
var MOTION_PRESETS = [], STYLE_LABELS = {}, actorMotionPresets = () => [], nextActorMotionPreset = () => null;
function changeCastStyle() {
  throw Error("This operation is not available in this edition");
}

// src/shared/preset-sequence.mjs
var presetInterrupt = () => null, presetActions = () => [], createPresetSequence = () => ({ snapshot: () => null, cancel() {
}, pause: () => !1, reset() {
}, ownsPerformance: () => !1, active: () => !1, busy: () => !1, blocksPlayback: () => !1, validate: () => !0, confirm: () => null });

// src/shared/capture-ui.mjs
function captureStatus(c) {
  return c.demonstration?.state === "recording" ? "Recording demonstration \xB7 Press X to finish" : c.demonstration?.state === "error" ? c.demonstration.message : c.localPreparing || c.demonstration?.state === "saving" ? "Preparing\u2026" : c.script?.error ? c.script.error : c.videoState === "error" ? c.videoMessage || "Recording not saved. Retry." : c.cameraMessage && c.captureState === "error" ? c.cameraMessage : c.recording === "recording" || c.script?.status === "listening" ? "Listening\u2026" : ["requesting", "transcribing"].includes(c.recording) || ["preparing", "executing"].includes(c.script?.status) ? "Preparing\u2026" : c.performanceMode === "running" ? "Preview" : c.preset?.status === "paused" || c.script?.status === "cancelled" ? "Paused" : ["waiting", "executing"].includes(c.preset?.status) ? "Preparing\u2026" : c.preset?.status === "error" ? c.preset.message : c.preset?.status === "ready" ? "Ready \xB7 Select Preview" : c.preset?.status === "completed" ? "Ready" : c.script?.status === "unconfigured" ? "The agent is unavailable." : c.script?.status === "complete" ? "Complete" : c.phase === "reference" ? `${c.photoCount || 0} photos \xB7 Right trigger to capture` : c.phase === "building" ? "Preparing\u2026" : c.phase === "align" ? c.calibrationReady ? "Confirm scene alignment" : "Waiting for room alignment" : c.scriptedMode || c.rehearsal ? "Hold X to speak, then release" : "Ready";
}
function recordLabel(c) {
  let n = Math.max(0, Math.floor(c.videoSeconds || 0)), time = `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
  return c.videoState === "recording" ? `\u25CF REC ${time}` : ["starting", "saving", "error"].includes(c.videoState) ? c.videoMessage || "Recording not saved" : "";
}
function captureActions(c) {
  if (c.describing) return [{ id: "descriptionSubmit", label: "Submit description" }, { id: "descriptionCancel", label: "Back" }];
  if (c.localPreparing) return [{ id: "scriptCancel", label: "Cancel" }];
  if (["waiting", "executing"].includes(c.preset?.status)) return [{ id: "presetCancel", label: "Cancel" }];
  if (c.script?.busy) return [{ id: "scriptCancel", label: "Cancel" }];
  let stop = c.performanceMode === "running" ? [{ id: "scriptStop", label: "Pause \xB7 Left grip" }] : [];
  return c.phase === "reference" && c.photoReview >= 0 ? [{ id: "photoPrevious", label: "Previous photo", disabled: c.photoReview === 0 }, { id: "photoNext", label: "Next photo", disabled: c.photoReview >= c.photoCount - 1 }, { id: "photoDelete", label: "Remove this photo" }, { id: "photoReviewClose", label: "Back to capture" }] : c.phase === "reference" ? [{ id: "camera", label: c.captureState === "active" ? "Close camera view" : "Take photos", disabled: c.photoReading }, { id: c.photoCount ? "photoReview" : "sourceImages", label: c.photoCount ? "Review / remove photos" : "Use images", disabled: c.photoReading }, { id: "capture", label: "Take photo", disabled: c.captureState !== "active" || c.photoReading }, { id: "generate", label: "Build", disabled: c.photoCount < 4 || c.photoReading }] : c.objectInteraction ? [...stop, ...interactionActions(c).filter((x) => x.id !== "record").map((x) => ({ ...x, label: { interactionDraft: "Draft", interactionVoice: "Voice", interactionDemonstration: "Multimodal", interactionClose: "Back", draftApply: "Done \xB7 Prepare path", draftClear: "Clear", draftUndo: "Undo", draftCancel: "Exit Draft" }[x.id] || x.label }))] : c.phase === "explore" && ["ready", "paused"].includes(c.preset?.status) ? [{ id: "presetConfirm", label: "Preview \xB7 Left grip" }, { id: "pathReset", label: "Reset" }, { id: "interactionDescribe", label: "Something else\u2026" }] : c.phase === "explore" && c.door && c.path && c.objectSelection?.length === 1 && c.objectSelection[0] === c.door.id ? [...stop, { id: "bindDoor", label: "Start group when door opens" }, { id: "objectInteraction", label: "Interaction" }, { id: "objectTransform", label: "Transform" }] : c.phase === "explore" && c.objectSelection?.length ? [...stop, ...objectActions(c).map((x) => ({ ...x, label: x.id === "objectInteraction" ? "Interaction" : "Transform" })), { id: "interactionDescribe", label: "Something else\u2026" }] : c.phase === "explore" && c.path ? [...stop, { id: "presetConfirm", label: "Preview \xB7 Left grip" }, { id: "pathReset", label: "Reset" }, { id: "save", label: "Save" }] : [...stop, ...mainActions(c).filter((x) => !["voice", "send", "more", "display", "record", "actorTransport", "actorStart", "actors"].includes(x.id))];
}
function captureQuestion(c) {
  return c.describing ? "Describe it \xB7 What would you like to change?" : c.phase === "reference" ? c.photoReview >= 0 ? `Photo ${c.photoReview + 1} / ${c.photoCount} \xB7 Keep this shot?` : "Let\u2019s build your scene" : c.objectInteraction?.mode === "draft" ? "Which path should this group follow?" : c.objectInteraction?.mode === "demonstration" ? c.demonstration?.state === "recording" ? "Show the interaction. Press X when finished." : "Press X to start, then press X again to finish." : c.objectInteraction ? "How would you like to describe the interaction?" : c.preset?.status === "ready" || c.preset?.status === "paused" ? "Ready. Press the left grip to preview." : c.phase === "explore" && c.objectSelection?.length ? `What would you like to change about ${c.targetName || "these objects"}?` : c.phase === "explore" && c.path ? "Preview, reset, or save?" : "";
}

// src/shared/take-limits.mjs
var TAKE_LIMITS = Object.freeze({ seconds: 180, fps: 30, width: 1280, height: 720, videoBytes: 100663296, totalBytes: 201326592, packetBytes: 16777216, headerBytes: 8388608, chunks: 2048, samples: 12e3, events: 12e3 });
function takePacket(blob, segment) {
  let json = new TextEncoder().encode(JSON.stringify(segment));
  if (json.length > TAKE_LIMITS.headerBytes) throw new Error("Recording timeline segment is too large");
  let prefix = new Uint8Array(4);
  new DataView(prefix.buffer).setUint32(0, json.length);
  let packet = new Blob([prefix, json, blob], { type: "application/octet-stream" });
  if (packet.size > TAKE_LIMITS.packetBytes) throw new Error("Recording segment is too large. Recording has stopped.");
  return packet;
}

// src/client/rendering/virtual-video.mjs
import * as THREE23 from "three";

// src/client/rendering/actor-view.mjs
import * as THREE21 from "three";
function numbers(a, length2, name) {
  if (!Array.isArray(a) || a.length !== length2 || a.some((x) => !Number.isFinite(x))) throw new Error(`Invalid actor asset: ${name}`);
}
function validateActorAsset(template, motion) {
  let count = template.format === "vrbuild-wooden-template/1" && motion.format === "vrbuild-hymotion-native/1" ? 52 : template.format === "vrbuild-humanoid24-template/1" && motion.format === "vrbuild-humanoid24/1" ? 24 : 0;
  if (!count || motion.jointCount !== count || template.coordinateSystem !== "right-handed-y-up" || motion.coordinateSystem !== "right-handed-y-up") throw new Error("Unsupported actor skeleton");
  let n = template.vertices?.length / 3;
  if (!Number.isInteger(n) || n < 1 || n > 1e5) throw new Error("Invalid mesh vertex count");
  if (numbers(template.vertices, n * 3, "vertices"), numbers(template.joints, count * 3, "joints"), numbers(template.parents, count, "parents"), numbers(template.skinIndices, n * 4, "skin indices"), numbers(template.skinWeights, n * 4, "skin weights"), !Array.isArray(template.faces) || template.faces.length % 3 || template.faces.some((i) => !Number.isInteger(i) || i < 0 || i >= n) || template.parents[0] !== -1 || template.parents.some((p, i) => i && (!Number.isInteger(p) || p < 0 || p >= i)) || template.skinIndices.some((i) => !Number.isInteger(i) || i < 0 || i >= count) || template.skinWeights.some((w) => w < 0)) throw new Error("Invalid mesh topology");
  if (!Number.isInteger(motion.frames) || motion.frames < 1 || motion.frames > 3600 || !Number.isFinite(motion.fps) || motion.fps < 1 || motion.fps > 240) throw new Error("Invalid motion timing");
  if (numbers(motion.quaternions, motion.frames * count * 4, "quaternions"), numbers(motion.translations, motion.frames * 3, "translations"), numbers(motion.normalization?.origin, 3, "normalization"), !Number.isFinite(motion.normalization.yaw)) throw new Error("Invalid normalized actor orientation");
  for (let i = 0; i < motion.quaternions.length; i += 4)
    if (Math.abs(Math.hypot(...motion.quaternions.slice(i, i + 4)) - 1) > 1e-4) throw new Error("Motion quaternions are not normalized");
  return { template, motion };
}
var SkinnedActorView = class extends THREE21.Group {
  constructor({ template, motion }, { validate = !0 } = {}) {
    super(), validate && validateActorAsset(template, motion), this.motion = motion;
    let geometry2 = new THREE21.BufferGeometry();
    geometry2.setAttribute("position", new THREE21.Float32BufferAttribute(template.vertices, 3)), geometry2.setIndex(template.faces), geometry2.computeVertexNormals(), geometry2.setAttribute("skinIndex", new THREE21.Uint16BufferAttribute(template.skinIndices, 4)), geometry2.setAttribute("skinWeight", new THREE21.Float32BufferAttribute(template.skinWeights, 4));
    let material2 = new THREE21.MeshStandardMaterial({ color: "#e7e9e5", roughness: 0.85, metalness: 0 });
    this.mesh = new THREE21.SkinnedMesh(geometry2, material2), this.mesh.frustumCulled = !1, this.mesh.boundingSphere = new THREE21.Sphere(), this.worldToMesh = new THREE21.Matrix4(), this.bones = template.parents.map(() => new THREE21.Bone()), this.bones.forEach((bone, i) => {
      bone.name = template.jointNames?.[i] || String(i), bone.position.fromArray(template.joints, i * 3);
      let parent = template.parents[i];
      parent >= 0 && (bone.position.sub(new THREE21.Vector3().fromArray(template.joints, parent * 3)), this.bones[parent].add(bone));
    }), this.mesh.add(this.bones[0]), this.skeleton = new THREE21.Skeleton(this.bones), this.mesh.bind(this.skeleton);
    let floor = 1 / 0;
    for (let i = 1; i < template.vertices.length; i += 3) floor = Math.min(floor, template.vertices[i]);
    this.restOrigin = new THREE21.Vector3(template.joints[0], floor, template.joints[2]), this.normalization = new THREE21.Group(), this.normalization.rotation.y = motion.normalization.yaw, this.offset = new THREE21.Group(), this.offset.position.fromArray(motion.normalization.origin).negate(), this.normalization.add(this.offset), this.offset.add(this.mesh), this.add(this.normalization), this.qa = new THREE21.Quaternion(), this.qb = new THREE21.Quaternion(), this.bounds = new THREE21.Box3(), this.helper = new THREE21.Box3Helper(this.bounds, UI_THEME.accent), this.helper.material.toneMapped = !1, this.helper.visible = !1;
  }
  seek(seconds, motionOffset = [0, 0, 0], inPlace = !1) {
    if (!Number.isFinite(seconds)) throw new Error("Motion time must be finite");
    this.normalization.position.fromArray(motionOffset), this.normalization.rotation.y = this.motion.normalization.yaw, this.offset.position.fromArray(this.motion.normalization.origin).negate();
    let m = this.motion, t = THREE21.MathUtils.clamp(seconds, 0, (m.frames - 1) / m.fps) * m.fps, a = Math.floor(t), b = Math.min(a + 1, m.frames - 1), alpha = t - a;
    for (let i = 0; i < m.jointCount; i++)
      this.qa.fromArray(m.quaternions, (a * m.jointCount + i) * 4), this.qb.fromArray(m.quaternions, (b * m.jointCount + i) * 4), this.bones[i].quaternion.slerpQuaternions(this.qa, this.qb, alpha);
    for (let axis = 0; axis < 3; axis++) this.mesh.position.setComponent(axis, THREE21.MathUtils.lerp(m.translations[a * 3 + axis], m.translations[b * 3 + axis], alpha));
    inPlace && (this.mesh.position.x = m.translations[0], this.mesh.position.z = m.translations[2]), this.updateWorldMatrix(!0, !1), this.updateMatrixWorld(!0), this.skeleton.update();
  }
  restPose() {
    for (let bone of this.bones) bone.quaternion.identity();
    this.mesh.position.set(0, 0, 0), this.normalization.position.set(0, 0, 0), this.normalization.rotation.y = 0, this.offset.position.copy(this.restOrigin).negate(), this.updateWorldMatrix(!0, !1), this.updateMatrixWorld(!0), this.skeleton.update();
  }
  apply(frame, { opacity = 1, selected = !1 } = {}) {
    if (this.position.fromArray(frame.position), this.rotation.y = frame.yaw, this.visible = frame.visible, frame.pose === "generated" && frame.motionPlan) {
      this.restPose();
      let sample = sampleMotion(frame.motionPlan, frame.clipTime), euler = new THREE21.Euler();
      for (let i = 0; i < 24 && i < this.bones.length; i++) {
        let a = sample.a.joints.find((j) => j.joint === JOINTS[i])?.rotation || [0, 0, 0], b = sample.b.joints.find((j) => j.joint === JOINTS[i])?.rotation || [0, 0, 0];
        this.qa.setFromEuler(euler.set(...a.map(THREE21.MathUtils.degToRad))), this.qb.setFromEuler(euler.set(...b.map(THREE21.MathUtils.degToRad))), this.bones[i].quaternion.slerpQuaternions(this.qa, this.qb, sample.alpha);
      }
      this.mesh.position.fromArray(sample.root), sample.position && this.position.fromArray(sample.position), sample.yaw !== null && (this.rotation.y = sample.yaw), this.updateWorldMatrix(!0, !1), this.updateMatrixWorld(!0), this.skeleton.update();
    } else frame.pose === "rest" || frame.preview ? this.restPose() : this.seek(frame.clipTime, frame.motionOffset, frame.inPlace);
    let material2 = this.mesh.material;
    material2.color.set(frame.color), material2.emissive.set("#000000"), material2.emissiveIntensity = 0.25, material2.opacity = opacity, material2.transparent = opacity < 1, material2.depthWrite = opacity >= 1, this.bounds.makeEmpty();
    let p = new THREE21.Vector3();
    for (let bone of this.bones) this.bounds.expandByPoint(bone.getWorldPosition(p));
    this.bounds.expandByScalar(0.12), this.bounds.getBoundingSphere(this.mesh.boundingSphere), this.mesh.boundingSphere.applyMatrix4(this.worldToMesh.copy(this.mesh.matrixWorld).invert()), this.helper.visible = selected && this.visible, this.helper.updateMatrixWorld(!0);
  }
  dispose() {
    this.helper.removeFromParent(), this.helper.geometry.dispose(), this.helper.material.dispose(), this.mesh.geometry.dispose(), this.mesh.material.dispose(), this.skeleton.dispose(), this.removeFromParent();
  }
};
function createActorLayer(parent, assets) {
  let views = /* @__PURE__ */ new Map(), frames = [];
  function apply(next, { opacity = 1, selected = null, clean = !1 } = {}) {
    frames = next;
    let ids = new Set(next.map((f) => f.id));
    for (let [id, v2] of views) ids.has(id) || (v2.dispose(), views.delete(id));
    for (let frame of next) {
      let asset = assets.get(frame.assetId);
      if (!asset) continue;
      let view = views.get(frame.id);
      if (view && view.userData.assetId !== frame.assetId) {
        let previous = assets.get(view.userData.assetId);
        previous?.template === asset.template || previous?.templateHash && previous.templateHash === asset.templateHash ? (view.motion = asset.motion, view.userData.assetId = frame.assetId) : (view.dispose(), views.delete(frame.id), view = null);
      }
      view || (view = new SkinnedActorView(asset, { validate: !1 }), view.userData.assetId = frame.assetId, views.set(frame.id, view), parent.add(view), parent.parent?.add(view.helper)), view.apply({ ...frame, visible: frame.visible && !(clean && frame.preview) }, { opacity, selected: Array.isArray(selected) ? selected.includes(frame.id) : selected === frame.id });
    }
  }
  let point2 = new THREE21.Vector3(), nearPoint = new THREE21.Vector3();
  function pick(raycaster2, { maxDistance = 1 / 0 } = {}) {
    let best = null, limit = Math.min(maxDistance, raycaster2.far);
    raycaster2.ray.at(raycaster2.near, nearPoint);
    for (let [id, view] of views) {
      if (!view.visible) continue;
      if (view.bounds.containsPoint(nearPoint)) point2.copy(nearPoint);
      else if (!raycaster2.ray.intersectBox(view.bounds, point2)) continue;
      let distance4 = point2.distanceTo(raycaster2.ray.origin);
      distance4 >= raycaster2.near && distance4 <= limit && (limit = distance4, best = { id, distance: distance4, approximate: !0 });
    }
    return best;
  }
  return { apply, views, pick, dispose() {
    for (let v2 of views.values()) v2.dispose();
    views.clear();
  }, snapshot: () => frames.map((f) => ({ id: f.id, visible: f.visible, preview: f.preview, pose: f.pose, clipTime: f.clipTime, position: [...f.position], yaw: f.yaw })) };
}
async function loadActorAssets(fetcher = fetch) {
  let response = await fetcher("/api/actor-assets");
  if (!response.ok) throw new Error("Actor asset directory is unavailable");
  let catalog = await response.json(), templates = /* @__PURE__ */ new Map(), json = async (entry, file) => {
    let r = await fetcher(`/actor-assets/${entry.id}/${file}.json`);
    if (!r.ok) throw new Error(`Could not load motion: ${entry.name}`);
    return r.json();
  }, entries = await Promise.all(catalog.map(async (entry) => {
    let key = /^[a-f0-9]{64}$/.test(entry.templateHash) ? entry.templateHash : entry.id;
    templates.has(key) || templates.set(key, json(entry, "template"));
    let [template, motion] = await Promise.all([templates.get(key), json(entry, "motion")]);
    return validateActorAsset(template, motion), [entry.id, { ...entry, ...MOTION_PRESETS.find((p) => p.id === entry.id), template, motion }];
  }));
  return new Map(entries);
}

// src/client/rendering/cinema-layer.mjs
import * as THREE22 from "three";
function createCinemaLayer(world2) {
  let root = new THREE22.Group();
  world2.add(root);
  let key = "", definition = { objects: [], curves: [] }, cameras = /* @__PURE__ */ new Map(), lights = /* @__PURE__ */ new Map();
  function clear() {
    for (let entry of lights.values())
      entry.light.dispose?.();
    root.clear(), cameras.clear(), lights.clear();
  }
  return {
    cameras,
    lights,
    root,
    sync(scene2) {
      let next = JSON.stringify(scene2);
      if (next !== key) {
        key = next, definition = scene2, clear();
        for (let o of scene2.objects) {
          if (isCamera(o)) {
            let camera2 = new THREE22.PerspectiveCamera(o.camera.fov, o.camera.aspect, 0.02, 200);
            root.add(camera2), cameras.set(o.id, camera2);
          }
          if (isLight(o)) {
            let p = o.light, light = p.type === "spot" ? new THREE22.SpotLight(p.color, p.intensity, p.range, p.angle * Math.PI / 180, 0.35) : new THREE22.PointLight(p.color, p.intensity, p.range);
            root.add(light), light.target && root.add(light.target), lights.set(o.id, { light });
          }
        }
      }
    },
    frame(time = 0, targets = [], overrides = [], activeIds = null, triggerClocks = {}) {
      let changes = new Map(overrides.map((p) => [p.id, p])), frames = [], active = activeIds === null ? null : new Set(activeIds);
      for (let o of definition.objects) {
        let localTime = o.track?.trigger ? triggerClocks[o.id] ?? null : time, animate = time !== null && localTime !== null && (!active || active.has(o.id)), f = { ...rigFrame(animate ? o : { ...o, track: null }, definition.curves || [], animate ? localTime : 0, animate ? targets : [...definition.objects, ...definition.actors || []]), ...changes.get(o.id) };
        frames.push(f);
        let camera2 = cameras.get(o.id);
        camera2 && (camera2.position.fromArray(f.position), camera2.quaternion.fromArray(f.quaternion || objectQuaternion(o)), camera2.updateMatrixWorld(!0));
        let light = lights.get(o.id)?.light;
        light && (light.position.fromArray(f.position), light.intensity = f.intensity ?? o.light.intensity, light.target && light.target.position.set(0, 0, -1).applyQuaternion(new THREE22.Quaternion(...f.quaternion)).add(light.position));
      }
      return root.updateMatrixWorld(!0), frames;
    },
    dispose() {
      clear(), world2.remove(root);
    }
  };
}

// src/client/rendering/virtual-video.mjs
function createVirtualScene(definition, matrix = new THREE23.Matrix4()) {
  let scene2 = new THREE23.Scene();
  scene2.background = new THREE23.Color(UI_THEME.background);
  let world2 = new THREE23.Group();
  world2.matrixAutoUpdate = !1, world2.matrix.copy(matrix), scene2.add(world2), scene2.userData.definitionObjects = definition.objects, scene2.userData.contentWorld = world2, scene2.userData.objectMeshes = /* @__PURE__ */ new Map(), scene2.userData.baseTransforms = definition.objects.filter((o) => !isRig(o)).map((o) => ({ id: o.id, position: [...o.position], rotation: o.rotation, quaternion: objectQuaternion(o) })), scene2.add(new THREE23.HemisphereLight("#ffffff", "#dce2ef", 2));
  let sun = new THREE23.DirectionalLight("#ffffff", 0.9);
  sun.position.set(-10, 20, 12), scene2.add(sun);
  let rim2 = new THREE23.DirectionalLight("#ffffff", 0.4);
  rim2.position.set(15, 8, -15), scene2.add(rim2);
  for (let o of definition.objects) {
    if (isRig(o)) continue;
    let mesh = new THREE23.Mesh(objectGeometry(o), new THREE23.MeshStandardMaterial({ color: blockoutColor(o, definition), roughness: o.roughness, metalness: o.metalness, opacity: 1, transparent: !1 }));
    mesh.name = o.id, mesh.position.fromArray(o.position), mesh.scale.fromArray(o.size), mesh.quaternion.fromArray(objectQuaternion(o)), world2.add(mesh), scene2.userData.objectMeshes.set(o.id, mesh);
  }
  if (definition.objects.some((o) => isRig(o) || o.track) && (scene2.userData.cinema = createCinemaLayer(world2), scene2.userData.cinema.sync(definition), scene2.userData.cinema.frame(null)), definition.floods?.length && (scene2.userData.flood = createFloodLayer(world2, { getObjectPose: (id) => {
    let mesh = scene2.userData.objectMeshes.get(id);
    return mesh ? { position: mesh.position.toArray(), quaternion: mesh.quaternion.toArray() } : null;
  } }), scene2.userData.flood.sync(definition), scene2.userData.flood.frame({ states: [] }, { showRegions: !1 })), definition.objects.some((o) => o.kind === "light")) for (let light of scene2.children.filter((o) => o.isLight)) light.intensity *= 0.18;
  return applyRecordedTransforms(scene2, (definition.doorEffects || []).map((d) => doorTransform(definition.objects.find((o) => o.id === d.objectId), d))), scene2;
}
function applyRecordedTransforms(scene2, updates) {
  let overrides = new Map(updates.map((o) => [o.id, o]));
  for (let base of scene2.userData.baseTransforms) {
    let o = overrides.get(base.id) || base, mesh = scene2.userData.objectMeshes.get(base.id);
    mesh && (mesh.position.fromArray(o.position), o.quaternion ? mesh.quaternion.fromArray(o.quaternion) : mesh.rotation.set(0, o.rotation || 0, 0));
  }
}
function createVirtualRecorder({ onChange = () => {
}, upload, sink = null, now = () => performance.now(), assets = /* @__PURE__ */ new Map(), includeActorPreviews = () => !1, contentFactory = null, Renderer = THREE23.WebGLRenderer, Recorder = globalThis.MediaRecorder, makeCanvas = () => document.createElement("canvas") }) {
  let status = "idle", message = "B: start / stop camera recording", renderer2, scene2, camera2, stream2, recorder, chunks = [], bytes = 0, startTime = 0, endTime = 0, lastFrame = -1 / 0, frames = 0, result = null, stopPromise = null, resolveStop, rejectStop, stopTimer, generation = 0, pendingUpload = null, limitTimer, pumpTimer, stopReason = "user", storageError = null, content = null, actors = null, hands = null, timeline = null, definitionKey = null, recordPreviews = !1, handMetadata2 = HANDS_METADATA, emit = () => onChange(snapshot()), snapshot = () => ({ status, message: status === "saving" && sink ? sink.snapshot().stage === "finalizing" ? "Processing and verifying video\u2026" : "Uploading recorded chunks\u2026" : status === "recording" && sink?.snapshot().lastError ? "Recording \xB7 Chunks stored in browser; upload will retry" : message, takeId: sink?.snapshot().takeId, storage: sink?.snapshot(), maxSeconds: TAKE_LIMITS.seconds, stopReason, seconds: status === "recording" ? Math.floor((now() - startTime) / 1e3) : 0, frames, result, canRetry: !!pendingUpload || !!sink?.snapshot().takeId && status === "error", hands: hands?.snapshot() || null });
  async function uploadPending() {
    try {
      return result = await upload(pendingUpload.blob, pendingUpload.metadata, pendingUpload.timeline), pendingUpload = null, status = "idle", message = "Reference video saved \xB7 Virtual scene only", emit(), result;
    } catch (error) {
      throw status = "error", message = `Video retained in this page. Retry saving: ${error.message}`, emit(), error;
    }
  }
  async function retry() {
    if (!pendingUpload && !sink || status === "saving") return result;
    if (status = "saving", message = "Retrying video save\u2026", emit(), sink)
      try {
        return result = await sink.retry(), status = "idle", message = "Reference video saved", emit(), result;
      } catch (error) {
        throw status = "error", message = "Recording chunks retained. Retry: " + error.message, emit(), error;
      }
    return uploadPending();
  }
  async function recover() {
    return sink && await sink.recover() ? (status = "error", message = "Unfinished recording found. Retry saving the recorded portion.", emit(), !0) : !1;
  }
  function cleanup() {
    clearTimeout(limitTimer), clearInterval(pumpTimer), stream2?.getTracks().forEach((t) => t.stop()), stream2 = null, content?.dispose(), content = null, actors?.dispose(), actors = null, hands?.dispose(), hands = null, scene2?.traverse((o) => {
      o.geometry?.dispose(), o.material?.dispose();
    }), scene2 = null, renderer2?.dispose(), renderer2 = null, camera2 = null, recorder = null, clearTimeout(stopTimer);
  }
  function fail(error) {
    generation++;
    let active = recorder;
    if (cleanup(), active?.state === "recording") try {
      active.stop();
    } catch {
    }
    status = "error", message = error.message || "Recording failed", emit(), rejectStop?.(error), resolveStop = rejectStop = null, stopPromise = null;
  }
  function start(definition, matrix, initialView, initialActors = [], initialTransforms = [], initialHands, metadata = HANDS_METADATA, presentation = {}) {
    if (["starting", "recording", "saving"].includes(status)) throw new Error("Recording or saving in progress");
    if (pendingUpload) throw new Error("Previous video is unsaved. Retry saving it first.");
    if (validateHandsMetadata(metadata), handMetadata2 = structuredClone(metadata), initialHands && validateHandsSample(initialHands, handMetadata2), !Recorder) throw new Error("Video recording is unavailable in this browser");
    let mime = ["video/webm;codecs=vp8", "video/webm;codecs=vp9", "video/mp4"].find((type) => Recorder.isTypeSupported(type));
    if (!mime) throw new Error("No compatible video encoder");
    let token = ++generation;
    try {
      let canvas2 = makeCanvas();
      if (renderer2 = new Renderer({ canvas: canvas2, antialias: !0, alpha: !1, preserveDrawingBuffer: !0 }), renderer2.setPixelRatio(1), renderer2.setSize(1280, 720, !1), renderer2.outputColorSpace = THREE23.SRGBColorSpace, renderer2.toneMapping = THREE23.ACESFilmicToneMapping, renderer2.toneMappingExposure = 1.25, scene2 = createVirtualScene(definition, matrix), scene2.userData.contentWorld.visible = presentation.visible !== !1, camera2 = new THREE23.PerspectiveCamera(65, 16 / 9, 0.02, 200), actors = createActorLayer(scene2.userData.contentWorld, assets), definitionKey = JSON.stringify(definition), hands = initialHands ? createHandLayer(scene2.userData.contentWorld, handMetadata2) : null, hands?.apply(initialHands), recordPreviews = includeActorPreviews(), actors.apply(initialActors, { clean: !recordPreviews }), content = contentFactory?.(scene2.userData.contentWorld, actors.views), content?.apply(presentation.showcase), initialTransforms.length && applyRecordedTransforms(scene2, initialTransforms), timeline = { schema: "vrbuild-take/1", actorPreviews: recordPreviews ? "include" : "exclude", initialScene: structuredClone(definition), sceneMatrix: matrix.toArray(), assets: [...assets.values()].map(({ template, motion, ...meta }) => meta), events: [], samples: [], frameMapping: "render samples with monotonic times; encoded frames may be resampled" }, initialHands && (timeline.handsMetadata = structuredClone(handMetadata2), timeline.initialHands = structuredClone(initialHands), sink && (timeline.initialHands.sampleId = 0, timeline.initialHands.frameTimeMs = 0)), initialView && (initialView.isPerspectiveCamera && (camera2.fov = initialView.fov, camera2.aspect = initialView.aspect, camera2.updateProjectionMatrix()), initialView.getWorldPosition(camera2.position), initialView.getWorldQuaternion(camera2.quaternion), camera2.updateMatrixWorld(!0), renderer2.render(scene2, camera2)), !canvas2.captureStream) throw new Error("Canvas recording is unavailable in this browser");
      stream2 = canvas2.captureStream(30), recorder = new Recorder(stream2, { mimeType: mime, videoBitsPerSecond: 3e6 }), chunks = [], bytes = 0, frames = 0, lastFrame = -1 / 0, result = null, stopPromise = null, storageError = null, stopReason = "user";
      let segment = () => ({ time: Math.min(TAKE_LIMITS.seconds, Math.max(0, ((endTime || now()) - startTime) / 1e3)), samples: timeline.samples.splice(0), events: timeline.events.splice(0) });
      recorder.ondataavailable = (event2) => {
        if (!(token !== generation || !event2.data.size)) {
          if (bytes += event2.data.size, sink)
            try {
              sink.append(event2.data, segment()).catch((error) => {
                storageError = error, stop("storage-error").catch(() => {
                });
              });
            } catch (error) {
              storageError = error, stop("storage-error").catch(() => {
              });
            }
          else chunks.push(event2.data);
          bytes > TAKE_LIMITS.videoBytes && status === "recording" && stop("storage-error").catch(() => {
          });
        }
      }, recorder.onerror = (event2) => {
        token === generation && fail(event2.error || new Error("Video encoding failed"));
      }, recorder.onstop = async () => {
        if (token !== generation) return;
        clearTimeout(stopTimer);
        let duration = Math.min(TAKE_LIMITS.seconds, ((endTime || now()) - startTime) / 1e3), blob = sink ? null : new Blob(chunks, { type: mime.split(";")[0] });
        chunks = [], cleanup();
        try {
          if (!bytes || !frames)
            throw await sink?.discardEmpty(), new Error("No valid frames recorded. Start a new recording.");
          if (storageError) throw storageError;
          sink ? (await sink.append(new Blob([]), segment()), message = "Uploading and processing recording\u2026", emit(), result = await sink.finish({ duration, frames, reason: stopReason }), status = "idle", message = "Reference video saved \xB7 Virtual scene only", emit()) : (pendingUpload = { blob, metadata: { duration, width: 1280, height: 720, frames }, timeline }, result = await uploadPending()), resolveStop?.(result);
        } catch (error) {
          status = "error", message = "Recording is not fully saved. Retry the retained chunks: " + error.message, emit(), rejectStop?.(error);
        } finally {
          resolveStop = rejectStop = null, stopPromise = null;
        }
      };
      let activate = () => {
        recorder.start(1e3), startTime = now(), endTime = 0, status = "recording", message = "Recording \xB7 Maximum 3 minutes \xB7 B to stop", limitTimer = setTimeout(() => stop("limit").catch(() => {
        }), TAKE_LIMITS.seconds * 1e3), pumpTimer = sink ? setInterval(() => sink.flush().catch(() => {
        }), 3e3) : null, emit();
      };
      if (sink)
        return status = "starting", message = "Preparing local recording storage\u2026", emit(), sink.begin(structuredClone(timeline), mime.split(";")[0]).then(activate).catch((error) => {
          throw cleanup(), status = "error", message = error.message, emit(), error;
        });
      activate();
    } catch (error) {
      throw cleanup(), status = "error", message = error.message, emit(), error;
    }
  }
  function stop(reason = "user") {
    if (stopPromise) return stopPromise;
    if (status !== "recording") return Promise.resolve(result);
    stopReason = reason, clearTimeout(limitTimer), clearInterval(pumpTimer), endTime = now(), status = "saving", message = "Saving reference video\u2026", emit(), stopPromise = new Promise((resolve, reject) => {
      resolveStop = resolve, rejectStop = reject;
    });
    let pending = stopPromise;
    stopTimer = setTimeout(() => fail(new Error("Video encoder did not finish in time")), 15e3);
    try {
      recorder.stop();
    } catch (error) {
      fail(error);
    }
    return pending;
  }
  function syncDefinition(definition, matrix) {
    if (status !== "recording") return;
    matrix && (scene2.userData.contentWorld.matrix.copy(matrix), scene2.userData.contentWorld.matrixWorldNeedsUpdate = !0);
    let key = JSON.stringify(definition);
    if (key === definitionKey) return;
    definitionKey = key;
    let world2 = scene2.userData.contentWorld;
    for (let child of [...world2.children]) child.isMesh && (world2.remove(child), child.geometry.dispose(), child.material.dispose());
    scene2.userData.cinema?.dispose(), scene2.userData.flood?.dispose();
    let fresh = createVirtualScene(definition, matrix);
    fresh.userData.cinema?.dispose(), fresh.userData.flood?.dispose();
    for (let child of [...fresh.userData.contentWorld.children]) world2.add(child);
    for (let key2 of ["objectMeshes", "baseTransforms", "definitionObjects"]) scene2.userData[key2] = fresh.userData[key2];
    scene2.userData.cinema = null, scene2.userData.flood = null, definition.objects.some((o) => isRig(o) || o.track) && (scene2.userData.cinema = createCinemaLayer(world2), scene2.userData.cinema.sync(definition)), definition.floods?.length && (scene2.userData.flood = createFloodLayer(world2, { getObjectPose: (id) => {
      let mesh = scene2.userData.objectMeshes.get(id);
      return mesh ? { position: mesh.position.toArray(), quaternion: mesh.quaternion.toArray() } : null;
    } }), scene2.userData.flood.sync(definition)), timeline.events.push({ time: Math.min(TAKE_LIMITS.seconds, (now() - startTime) / 1e3), type: "scene-update", scene: structuredClone(definition) });
  }
  function event(type, detail) {
    status === "recording" && timeline.events.push({ time: Math.min(TAKE_LIMITS.seconds, (now() - startTime) / 1e3), type, detail: structuredClone(detail) });
  }
  function frame(time, view, actorFrames = [], objectTransforms = [], handSample2, presentation = {}) {
    if (status !== "recording") return;
    if (now() - startTime >= TAKE_LIMITS.seconds * 1e3) {
      stop("limit").catch(() => {
      });
      return;
    }
    if (time - lastFrame < 1e3 / 30) return;
    let world2 = scene2.userData.contentWorld;
    presentation.matrix && (world2.matrix.copy(presentation.matrix), world2.matrixWorldNeedsUpdate = !0), world2.visible = presentation.visible !== !1, handSample2 && !hands && (hands = createHandLayer(scene2.userData.contentWorld, handMetadata2)), hands?.apply(handSample2), handSample2 && !timeline.handsMetadata && (timeline.handsMetadata = structuredClone(handMetadata2)), lastFrame = Number.isFinite(lastFrame) ? time - (time - lastFrame) % (1e3 / 30) : time, view.getWorldPosition(camera2.position), view.getWorldQuaternion(camera2.quaternion), camera2.updateMatrixWorld(!0), actors?.apply(actorFrames, { clean: !recordPreviews }), applyRecordedTransforms(scene2, objectTransforms), content?.apply(presentation.showcase), view.isPerspectiveCamera && (camera2.fov = view.fov, camera2.aspect = view.aspect, camera2.updateProjectionMatrix()), scene2.userData.cinema?.frame(presentation.productionTime || 0, [...scene2.userData.definitionObjects || [], ...actorFrames], [], presentation.previewObjectIds ?? null, presentation.triggerClocks || {}), scene2.userData.flood?.frame(presentation.floodState || { states: [] }, { showRegions: !1 }), renderer2.render(scene2, camera2), frames++, timeline.samples.push({ time: (now() - startTime) / 1e3, ...presentation.matrix ? { sceneMatrix: presentation.matrix.toArray(), phase: presentation.phase, worldVisible: world2.visible } : {}, position: camera2.position.toArray(), quaternion: camera2.quaternion.toArray(), projection: camera2.projectionMatrix.toArray(), ...presentation.productionTime !== void 0 ? { productionTime: presentation.productionTime, ...presentation.previewObjectIds ? { previewObjectIds: [...presentation.previewObjectIds], triggerClocks: structuredClone(presentation.triggerClocks || {}) } : {}, cameraId: presentation.cameraId || null, floodState: structuredClone(presentation.floodState || { states: [] }) } : {}, ...presentation.showcase ? { showcase: structuredClone(presentation.showcase), props: content?.snapshot?.() || [] } : {}, actors: actorFrames.map((f) => ({ ...f, visible: f.visible && (!f.preview || recordPreviews) })), objectTransforms: structuredClone(objectTransforms), ...handSample2 ? { hands: { ...structuredClone(handSample2), ...sink ? { sampleId: frames, frameTimeMs: now() - startTime } : {} } } : {} });
  }
  return { start, stop, retry, recover, frame, snapshot, syncDefinition, event };
}

// src/shared/xr-reference-space.mjs
function roomXRFeatures({ ar, planeRequired = !1, preferUnbounded = !0 }) {
  return { requiredFeatures: ["local-floor", ...ar && planeRequired ? ["plane-detection"] : []], optionalFeatures: [...ar && preferUnbounded ? ["unbounded"] : [], ...ar && !planeRequired ? ["plane-detection"] : []] };
}
async function chooseRoomReferenceSpace(session, { preferUnbounded = !0 } = {}) {
  let fallbackReason = null;
  if (preferUnbounded)
    try {
      return { type: "unbounded", space: await session.requestReferenceSpace("unbounded"), fallbackReason: null };
    } catch (error) {
      if (!["NotSupportedError", "SecurityError"].includes(error.name)) throw error;
      fallbackReason = error.name + ": " + error.message;
    }
  return { type: "local-floor", space: await session.requestReferenceSpace("local-floor"), fallbackReason };
}
function compensatedReferenceSpace(event) {
  let inverse = event?.transform?.inverse;
  return !inverse?.matrix || inverse.matrix.length !== 16 || !Array.from(inverse.matrix).every(Number.isFinite) || typeof event.referenceSpace?.getOffsetReferenceSpace != "function" ? null : event.referenceSpace.getOffsetReferenceSpace(inverse);
}

// src/shared/scan-reconstruction.mjs
var SCAN_REBUILD_INTENT = "Rebuild an editable blockout using the scan for dimensions and door positions. Refine the room outline, merge overlapping floors and duplicate walls, and remove closures at connections. Photos help identify furniture.";

// src/shared/agent-result.mjs
function applyAgentResult(scene2, result, ids) {
  if (result?.type === "flood") return applyFlood(scene2, result, ids);
  if (result?.type === "motion") return applyActorMotion(scene2, result);
  if (result?.type === "patch") return applyPatch(scene2, result.patch, ids);
  if (result?.type === "transform") return applyTransform(scene2, result.transform);
  throw Error("This Agent reply has no applicable scene changes");
}

// src/shared/cast-layout.mjs
var CAST_OFFSETS = Object.freeze([[0, 0, 0], [-0.2, 0, -1.1], [0.55, 0, -0.2], [-0.5, 0, -3.1], [0.1, 0, -1.8]].map(Object.freeze));
function facingViewer(position, viewer) {
  if (![position, viewer].every((p) => Array.isArray(p) && p.length === 3 && p.every((n) => Number.isFinite(n) && Math.abs(n) <= 100))) throw new Error("Point at a valid floor");
  let x = viewer[0] - position[0], z = viewer[2] - position[2];
  if (Math.hypot(x, z) < 0.1) throw new Error("That point is too close. Aim at the floor ahead of you.");
  return Math.atan2(x, z);
}

// src/client/rendering/director.mjs
import * as THREE24 from "three";
function createDirector({ authoring = !1, world: world2, assets, getState, getPhase, spatialKey: spatialKey2, viewPosition, pickGround, occlusionDistance = () => 1 / 0, api: api2, acceptState: acceptState2, notify, canEdit, canPlay = () => !0, deferNewMotion = () => !1, onSelect = () => {
}, recordEvent = () => {
}, mapFrames = (f) => f, pathCompleted = () => null }) {
  let performance2 = createPerformance(), layer = createActorLayer(world2, assets), cursor = new THREE24.Mesh(new THREE24.RingGeometry(0.18, 0.25, 32), new THREE24.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, side: THREE24.DoubleSide, depthTest: !1 }));
  cursor.rotation.x = -Math.PI / 2, cursor.visible = !1, cursor.renderOrder = 15, world2.add(cursor);
  let facingArrow = new THREE24.ArrowHelper(new THREE24.Vector3(0, 0, 1), new THREE24.Vector3(), 0.65, UI_THEME.accent, 0.18, 0.12);
  facingArrow.line.material.toneMapped = facingArrow.cone.material.toneMapped = !1, facingArrow.visible = !1, facingArrow.line.material.depthTest = facingArrow.cone.material.depthTest = !1, world2.add(facingArrow);
  let lockedTarget = null, selected = null, placing = !1, placementDelay = 0, target = null, pending = !1, frames = [], message = "Enter the room, then point at the floor to place an actor.", emit = (text, status = !0) => {
    message = text, notify(text, { status });
  }, selectedActor = () => getState()?.scene.actors?.find((a) => a.id === selected);
  function requireEdit() {
    if (getPhase() !== "explore") throw new Error("Enter the room first");
    if (pending || !canEdit()) throw new Error("Finish the current request or preview first");
  }
  function requirePlacement() {
    if (requireEdit(), (getState().scene.actors || []).length >= 5) throw new Error(`${5} actors already placed. Remove one before adding another.`);
  }
  function validTarget(anchor2) {
    if (!anchor2 || anchor2.spatialKey !== spatialKey2()) throw new Error("Point at the floor. Select a new location after alignment changes.");
    return anchor2;
  }
  async function persist(command2) {
    requireEdit(), pending = !0;
    try {
      let next = await api2("/api/actors", { revision: getState().revision, command: command2 });
      return acceptState2(next), recordEvent("actor-edit", { command: command2, revision: next.revision }), next;
    } finally {
      pending = !1;
    }
  }
  async function create(anchor2, delay = 0) {
    requirePlacement();
    let point2 = validTarget(anchor2), actors = getState().scene.actors || [], preset = nextActorMotionPreset(actors, assets, getState().scene.actorStyle || "zombie"), asset = authoring && [...assets.values()].find((a) => a.defaultActor) || preset || [...assets.values()].find((a) => a.preferred) || assets.values().next().value;
    if (!asset) throw new Error("The default character asset has not loaded yet");
    let delta = new THREE24.Vector3().fromArray(point2.viewer).sub(new THREE24.Vector3().fromArray(point2.position)), actor = { id: "actor-" + crypto.randomUUID(), castSlot: nextCastSlot(actors), assetId: asset.id, motionId: deferNewMotion() || asset.bodyOnly ? null : preset?.id || null, name: `Actor ${nextCastSlot(actors)}`, position: [...point2.position], yaw: Math.atan2(delta.x, delta.z), color: "#e7e9e5", trigger: "start", delay };
    return await persist({ type: "create", actor }), selected = actor.id, onSelect(selected), placing = !1, cursor.visible = facingArrow.visible = !1, emit(authoring ? "Mannequin placed. Select it and describe a basic motion; no motion import is needed." : actor.motionId ? `T-Pose actor placed \xB7 ${preset.name} assigned. Use the left grip to play or select another motion.` : "Mannequin placed. Select it to request a generated motion."), message;
  }
  function select(id) {
    selected = id, onSelect(id);
    let actor = selectedActor();
    actor && emit(authoring ? `${actor.name} selected. Describe a basic motion to the Agent, or draw a curve to guide this actor.` : `${actor.name} selected: ${assets.get(actorMotionId(actor))?.name || "No motion assigned"}. Choose a motion, move the actor, ask it to face you, or adjust its entrance delay. A style request changes the whole cast.`);
  }
  function updateRay(raycaster2) {
    let point2 = pickGround(raycaster2);
    if (target = lockedTarget ? structuredClone(lockedTarget) : point2 ? { position: point2.toArray(), viewer: viewPosition().toArray(), spatialKey: spatialKey2() } : null, cursor.visible = !!target && (authoring ? placing : placing || !!lockedTarget || deferNewMotion() && !getState().scene.actors?.length && canEdit()), facingArrow.visible = cursor.visible, target) {
      cursor.position.fromArray(target.position).add(new THREE24.Vector3(0, 0.015, 0));
      try {
        let yaw = facingViewer(target.position, target.viewer);
        facingArrow.position.copy(cursor.position), facingArrow.setDirection(new THREE24.Vector3(Math.sin(yaw), 0, Math.cos(yaw)));
      } catch {
        cursor.visible = facingArrow.visible = !1;
      }
    }
  }
  function beginPlacement(delay = 0) {
    return requirePlacement(), placing = !0, placementDelay = delay, target = null, cursor.visible = facingArrow.visible = !1, emit(authoring ? "Point at the ground to place the actor \xB7 A Create \xB7 B Cancel" : "Point at the floor and press the right trigger to place an actor."), message;
  }
  async function confirmPlacement(raycaster2) {
    if (!placing) return !1;
    if (updateRay(raycaster2), !target) throw Error("Point at visible ground before confirming placement");
    return create(structuredClone(target), placementDelay);
  }
  function interceptRay(raycaster2) {
    if (getPhase() !== "explore") return !1;
    if (placing)
      return authoring ? (updateRay(raycaster2), emit("A Create actor \xB7 B Cancel", !1)) : confirmPlacement(raycaster2).catch((e) => emit(e.message, !1)), !0;
    let hit = layer.pick(raycaster2);
    return hit && hit.distance <= occlusionDistance(raycaster2) ? (select(hit.id), !0) : !1;
  }
  function playable(actorIds) {
    if (requireEdit(), !canPlay()) throw new Error("Wait until ready, then say Preview or select the Preview button.");
    let all = getState().scene.actors || [], actors = actorIds ? all.filter((a) => actorIds.includes(a.id)) : all;
    if (actorIds && actors.length !== new Set(actorIds).size) throw new Error("The door-triggered cast has changed");
    if (!actors.length) throw new Error("Place actors first");
    if (!actors.some((a) => a.motionPlan || actorMotionId(a))) throw new Error("Select an actor and assign a motion first");
    if (actors.some((a) => !assets.has(a.assetId) || actorMotionId(a) && !assets.has(actorMotionId(a)))) throw new Error("Actor motions are not loaded. Playback is unavailable.");
    return actors;
  }
  function start({ actorIds } = {}) {
    playable(actorIds), placing = !1, cursor.visible = !1, performance2.start(actorIds), recordEvent("performance-start", { ...performance2.snapshot(), ...actorIds ? { actorIds: [...actorIds] } : {} }), emit("Playing \xB7 Left grip or Stop to pause \xB7 Unassigned actors remain in T-Pose");
  }
  function arm(actorIds, { cue = "door" } = {}) {
    playable(actorIds), placing = !1, cursor.visible = !1, performance2.arm(actorIds), recordEvent("performance-armed", { ...performance2.snapshot(), actorIds: [...actorIds] }), emit(cue === "preview" ? "Actors are ready at the first frame. Press the left grip to preview." : "Actors are ready at the first frame. Open the door to start them together.");
  }
  function stop() {
    performance2.stop(), recordEvent("performance-stop", performance2.snapshot()), emit("Motion stopped. You can still move, speak, and edit.");
  }
  function resume() {
    if (requireEdit(), !canPlay()) throw new Error("Confirm Preview first.");
    performance2.resume(), recordEvent("performance-resume", performance2.snapshot()), emit("Playing \xB7 Left grip to pause");
  }
  function toggleTransport() {
    let s = performance2.snapshot(), done = pathCompleted(s) ?? performance2.completed(assets);
    if (s.mode === "running" && !done) {
      stop();
      return;
    }
    if (placing) throw new Error(authoring ? "Press A to place the actor or B to cancel placement" : "Place with the right trigger, or press A to cancel");
    s.mode === "paused" && !done ? resume() : start();
  }
  function edit() {
    performance2.edit(), recordEvent("performance-edit", performance2.snapshot()), emit("Back to T-Pose layout. Assigned motions are kept and restart on the next playback.");
  }
  async function change(changes, id = selected) {
    let actor = getState().scene.actors?.find((a) => a.id === id);
    if (!actor) throw new Error("Select an actor first");
    await persist({ type: "update", id: actor.id, changes });
  }
  async function assignMotion(motionId, id = selected) {
    let actor = getState().scene.actors?.find((a) => a.id === id);
    if (!actor) throw new Error("Select an actor first");
    let asset = motionId && assets.get(motionId);
    if (motionId && !asset) throw new Error("This motion has not been imported");
    if (asset?.bodyOnly) throw new Error("This is the default character asset. Describe a basic motion to the Agent.");
    await change({ motionId }, id);
    let nextRun = performance2.snapshot().mode !== "editing";
    return emit((asset ? `Assigned \u201C${asset.name}\u201D to ${actor.name}.` : `Cleared the motion for ${actor.name}.`) + (nextRun ? "Takes effect on the next playback. Current timing is unchanged." : asset ? "Holding T-Pose. Use the left grip to play." : "Holding T-Pose.")), message;
  }
  function assignPreferredMotion(id = selected) {
    let motions = [...assets.values()].filter((a) => !a.bodyOnly), preferred = motions.find((a) => a.preferred) || motions[0];
    if (!preferred) throw new Error("No motion assets imported");
    return assignMotion(preferred.id, id);
  }
  function nextMotion(id = selected) {
    let actor = getState().scene.actors?.find((a) => a.id === id);
    if (!actor) throw new Error("Select an actor first");
    let style = actorMotionPresets(assets).find((p) => p.id === actorMotionId(actor))?.style || getState().scene.actorStyle || "zombie", presets = actorMotionPresets(assets, style);
    if (!presets.length) return assignPreferredMotion(id);
    let index = presets.findIndex((p) => p.id === actorMotionId(actor));
    return assignMotion(presets[(index + 1) % presets.length].id, id);
  }
  async function setStyle(style, { playback = "play", context = {} } = {}) {
    if (requireEdit(), playback === "play" && !canPlay()) throw new Error("Confirm Preview or prepare the motions again.");
    let initial = getState(), space = spatialKey2();
    if (context.revision !== void 0 && context.revision !== initial.revision || context.spatialContext?.spatialKey && context.spatialContext.spatialKey !== space) throw new Error("Scene or alignment changed since you spoke. Submit the style request again.");
    changeCastStyle(initial.scene, style, [...assets.keys()]);
    let previous = performance2.snapshot(), offsets = {};
    for (let actor of initial.scene.actors) {
      let view = layer.views.get(actor.id);
      if (view?.visible && previous.mode !== "editing") {
        let root = view.worldToLocal(view.bones[0].getWorldPosition(new THREE24.Vector3()));
        offsets[actor.id] = [root.x, 0, root.z];
      }
    }
    performance2.stop(), pending = !0;
    try {
      let next = await api2("/api/actor-style", { revision: initial.revision, style });
      return acceptState2(next), performance2.sync(next.scene.actors), placing = !1, cursor.visible = !1, spatialKey2() !== space || getPhase() !== "explore" ? (performance2.edit(), emit("Motion style saved. Alignment changed; return to creating before playing."), message) : (previous.mode === "running" && performance2.resume(), performance2.switchMotions(offsets, playback), recordEvent("actor-style-switch", { style, playback, offsets, ...performance2.snapshot(), actors: next.scene.actors.map((a) => ({ id: a.id, slot: a.castSlot, motionId: actorMotionId(a) })) }), emit(`Changed ${next.scene.actors.length} actors to ${STYLE_LABELS[style]} motions. ${playback === "assign" ? "Takes effect on the next playback." : playback === "preserve" && previous.mode !== "running" ? "Paused / layout state retained. Left grip to play." : "Playing from the start. Left grip to pause."}`), message);
    } catch (error) {
      throw previous.mode === "running" && getPhase() === "explore" && spatialKey2() === space && performance2.resume(), error;
    } finally {
      pending = !1;
    }
  }
  async function command(text, context = {}) {
    let intent = parseDirectorCommand(text);
    if (!intent) return null;
    if (intent.type === "style") return setStyle(intent.style, { context });
    if (intent.type === "create") return authoring ? beginPlacement(intent.delay) : create(context.actorTarget, intent.delay);
    if (intent.type === "start")
      return start(), message;
    if (intent.type === "stop")
      return stop(), message;
    if (intent.type === "resume")
      return resume(), message;
    if (intent.type === "edit")
      return edit(), message;
    if (intent.type === "unavailable") return "Choose an available motion from the asset list. Additional imported motions are required for unsupported actions.";
    if (intent.type === "motion") {
      if (!context.actorId) throw new Error("Select an actor first");
      if (intent.number) {
        let preset = actorMotionPresets(assets, getState().scene.actorStyle || "zombie").find((p) => p.number === intent.number);
        if (!preset) throw new Error(`Motion ${intent.number} has not loaded`);
        return assignMotion(preset.id, context.actorId);
      }
      return assignPreferredMotion(context.actorId);
    }
    if (intent.type === "clearMotion") return assignMotion(null, context.actorId);
    if (intent.type === "save")
      return await api2("/api/save-scene", { revision: getState().revision }).then(acceptState2), emit("Scene, actor positions, and entry timing saved."), message;
    if (intent.type === "delay")
      return await change({ delay: intent.delay }, context.actorId), emit(`Will appear ${intent.delay} seconds after the next playback starts.`), message;
    if (intent.type === "move")
      return await change({ position: [...validTarget(context.actorTarget).position] }, context.actorId), emit("Actor moved to the selected point. Motion timing is unchanged."), message;
    if (intent.type === "face") {
      let actor = getState().scene.actors?.find((a) => a.id === context.actorId);
      if (!actor) throw new Error("Select an actor first");
      let p = context.actorViewer || viewPosition().toArray();
      return await change({ yaw: Math.atan2(p[0] - actor.position[0], p[2] - actor.position[2]) }, actor.id), emit("Actor now faces your current position."), message;
    }
    if (intent.type === "remove") {
      if (!context.actorId) throw new Error("Select an actor first");
      let name = getState().scene.actors?.find((a) => a.id === context.actorId)?.name || "Actor";
      return await persist({ type: "remove", id: context.actorId }), selected = null, emit(`${name} removed and saved \xB7 Left stick click to undo`), message;
    }
    return null;
  }
  return {
    lockPlacement(anchor2) {
      validTarget(anchor2), lockedTarget = structuredClone(anchor2);
    },
    unlockPlacement() {
      lockedTarget = null, cursor.visible = facingArrow.visible = !1;
    },
    command,
    setStyle,
    start,
    arm,
    stop,
    resume,
    toggleTransport,
    edit,
    select,
    change,
    assignMotion,
    assignPreferredMotion,
    nextMotion,
    updateRay,
    interceptRay,
    beginPlacement,
    confirmPlacement,
    cancelPlacement() {
      placing = !1, target = null, cursor.visible = facingArrow.visible = !1;
    },
    togglePlacement() {
      placing ? (placing = !1, target = null, cursor.visible = facingArrow.visible = !1, emit("Placement closed. Click the right stick to toggle editing.")) : beginPlacement();
    },
    clearTarget() {
      target = null, cursor.visible = facingArrow.visible = !1;
    },
    captureContext() {
      return { actorTarget: target ? structuredClone(target) : null, actorViewer: viewPosition().toArray(), actorId: selected };
    },
    previewGenerated(id) {
      performance2.start([id]);
    },
    freeze(ids) {
      performance2.arm(ids);
    },
    sync(scene2) {
      performance2.sync(scene2.actors || []), selected && !scene2.actors?.some((a) => a.id === selected) && (selected = null);
    },
    frame(dt, opacity, { showSelection = !0, selectedIds = null, overrides = [] } = {}) {
      performance2.advance(dt);
      let changes = new Map(overrides.map((o) => [o.id, o]));
      return frames = mapFrames(performance2.frames(assets), performance2.snapshot()).map((f) => changes.has(f.id) ? { ...f, ...changes.get(f.id) } : f), layer.apply(frames, { opacity, selected: showSelection ? selectedIds || selected : null }), frames;
    },
    snapshot() {
      return { placementPreview: { visible: cursor.visible, arrowVisible: facingArrow.visible, locked: !!lockedTarget, target: target ? structuredClone(target) : null }, style: getState()?.scene.actorStyle || "zombie", ...performance2.snapshot(), completed: pathCompleted(performance2.snapshot()) ?? performance2.completed(assets), selected, placing, pending, message, actors: frames.map((f) => ({ id: f.id, assetId: f.assetId, motionId: f.motionId, pose: f.pose, castSlot: f.castSlot, motionOffset: f.motionOffset, position: f.position, yaw: f.yaw, delay: f.delay, clipTime: f.clipTime, visible: f.visible, preview: f.preview })), assetCount: assets.size };
    },
    frames: () => frames,
    layer
  };
}

// src/shared/group-path.mjs
var turn = (p, y) => [Math.cos(y) * p[0] + Math.sin(y) * p[2], p[1], -Math.sin(y) * p[0] + Math.cos(y) * p[2]], angle2 = (a) => Math.atan2(Math.sin(a), Math.cos(a));
function at(points, d) {
  for (let i = 1; i < points.length; i++) {
    let a = points[i - 1], b = points[i], length2 = Math.hypot(b[0] - a[0], b[2] - a[2]);
    if (d <= length2 || i === points.length - 1) {
      let t = Math.min(1, Math.max(0, d / Math.max(length2, 1e-5)));
      return a.map((v2, j) => v2 + (b[j] - v2) * t);
    }
    d -= length2;
  }
  return points[0];
}
function groupPathPose(path, time) {
  let distance4 = Math.min(path.length, Math.max(0, time) * path.speed), p = at(path.points, distance4), a = at(path.points, Math.max(0, distance4 - 0.25)), b = at(path.points, Math.min(path.length, distance4 + 0.25)), target = Math.atan2(b[0] - a[0], b[2] - a[2]), blend = Math.min(1, distance4 / 0.5), yaw = path.initialYaw + angle2(target - path.initialYaw) * blend;
  return { position: p, yaw, complete: distance4 >= path.length };
}
function pathFrames(path, frames, time, assets) {
  let pose = groupPathPose(path, time), byId = new Map(path.offsets.map((o) => [o.id, o])), elapsed = Math.min(time, path.length / path.speed);
  return frames.map((f) => {
    let offset = byId.get(f.id);
    if (!offset) return f;
    let duration = assets.get(actorMotionId(f))?.duration || 1;
    return { ...f, position: turn(offset.position, pose.yaw).map((v2, i) => v2 + pose.position[i]), yaw: pose.yaw + offset.yaw, pose: "motion", preview: !1, visible: !0, clipTime: elapsed % duration, inPlace: !0, motionOffset: [0, 0, 0] };
  });
}

// src/shared/voice-review.mjs
function validateVoiceContext(captured, current) {
  let equal = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
  for (let key of ["revision", "phase", "productionEpoch", "productionMode", "targetIds", "ids", "curveId"]) if (!equal(captured[key], current[key])) throw Error("Scene, mode or target changed. B Cancel this transcript, then X Speak again.");
  if (!equal(captured.spatialContext?.spatialKey, current.spatialContext?.spatialKey)) throw Error("Alignment changed. Cancel this transcript and speak again.");
}
function voicePages(text, size = 100) {
  let chars = Array.from(text);
  return Array.from({ length: Math.max(1, Math.ceil(chars.length / size)) }, (_, i) => chars.slice(i * size, (i + 1) * size).join(""));
}

// src/shared/speech-endpoint.mjs
function createSpeechEndpoint({ silenceMs = 1200, noSpeechMs = 8e3, minSpeechMs = 220, threshold = 0.018 } = {}) {
  let start = null, last = null, voiced = 0, previous = null, done = !1;
  return { sample(now, rms) {
    if (done) return null;
    start ??= now;
    let dt = previous === null ? 0 : Math.min(100, Math.max(0, now - previous));
    return previous = now, rms >= threshold && (voiced += dt, last = now), voiced >= minSpeechMs && last !== null && now - last >= silenceMs ? (done = !0, "send") : now - start >= noSpeechMs && voiced < minSpeechMs ? (done = !0, "cancel") : null;
  } };
}

// src/client/rendering/studio.mjs
var $ = (id) => document.getElementById(id), blobData = (blob) => new Promise((resolve, reject) => {
  let reader = new FileReader();
  reader.onload = () => resolve(reader.result), reader.onerror = reject, reader.readAsDataURL(blob);
});
function createStudio({ api: api2, getContext, requestJob, handleText = async () => null, canInterrupt = () => !1, onVoiceCapture = () => {
}, onVoiceFinish = () => {
}, onReference, onReadout, onLibrary = () => {
}, notify, getScripted = () => null, scriptedMode: scriptedMode2 = !1, voiceOnly = !1, mediaDevices = globalThis.navigator?.mediaDevices }) {
  let conversationId = sessionStorage.getItem("vrbuild-conversation") || crypto.randomUUID();
  sessionStorage.setItem("vrbuild-conversation", conversationId);
  let config = null, recorder = null, stream2 = null, recordTimer = null, recordState = "idle", stopRequested = !1, audioPlayer = null, voiceGeneration = 0, pendingVoice = null, reviewPage = 0, messages = [], library = [], selectionSerial = 0, recordGeneration = 0, transcriptController = null, sendSerial = 0, activeSend = null, speech = { status: "idle" }, audioUrl = null, pendingSpeechFinish = null, safe = (fn) => async () => {
    try {
      await fn();
    } catch (error) {
      notify(error.message);
    }
  };
  function draft(value) {
    $("edit-prompt").value = value, $("voice-transcript") && value && ($("voice-transcript").textContent = "You: " + value), onReadout({ draft: value });
  }
  function renderConversation(entry) {
    messages = entry.messages || [], $("chat-messages").replaceChildren();
    for (let message of messages.slice(-12)) {
      let bubble = document.createElement("div");
      bubble.className = "chat-bubble " + message.role;
      let label = document.createElement("small");
      label.textContent = message.role === "user" ? "You" : "Agent";
      let text = document.createElement("div");
      text.textContent = message.content, bubble.append(label, text), $("chat-messages").append(bubble);
    }
    $("chat-messages").scrollTop = $("chat-messages").scrollHeight, $("preferences").textContent = uiText(entry.preferences?.length ? "Saved preferences: " + entry.preferences.join("; ") : "");
    let last = messages.at(-1), userIndex = messages.findLastIndex((m) => m.role === "user"), reply = messages.slice(userIndex + 1).findLast((m) => m.role === "assistant");
    last && onReadout({ message: last.content, role: last.role, dialogue: { userText: userIndex >= 0 ? messages[userIndex].content : "", agentText: reply?.content || "" } });
  }
  async function say(text) {
    if (scriptedMode2) return;
    cancelSpeech();
    let generation = ++voiceGeneration, report = (status) => {
      generation === voiceGeneration && (speech = { status, text }, onReadout({ speech }));
    };
    if (!config || config.voice.provider === "off" || recordState !== "idle") {
      report("skipped");
      return;
    }
    report("loading");
    let controller = new AbortController(), resolveCompletion, settled = !1, completion = new Promise((resolve) => resolveCompletion = resolve), finish = (status) => {
      settled || (settled = !0, clearTimeout(timer), status !== "completed" && controller.abort(), report(status), pendingSpeechFinish === finish && (pendingSpeechFinish = null), resolveCompletion(status));
    }, timer = setTimeout(() => {
      finish("failed"), globalThis.speechSynthesis?.cancel(), audioPlayer?.pause(), notify("Speech timed out. The text reply is still available.");
    }, 15e3);
    pendingSpeechFinish = finish;
    try {
      if (config.voice.provider === "browser") {
        if (!globalThis.speechSynthesis)
          return finish("unavailable"), completion;
        let utterance = new SpeechSynthesisUtterance(text), language = /\p{Script=Han}/u.test(text) ? "zh" : "en";
        utterance.lang = config.voice.language?.startsWith(language) ? config.voice.language : language === "zh" ? "zh-CN" : "en-US";
        let voice = speechSynthesis.getVoices().find((v2) => v2.lang.toLowerCase().startsWith(utterance.lang.toLowerCase().split("-")[0]));
        voice && (utterance.voice = voice), utterance.onstart = () => report("speaking"), utterance.onend = () => finish("completed"), utterance.onerror = () => finish("failed"), speechSynthesis.speak(utterance);
      } else {
        let response = await fetch("/api/speech/speak", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text.slice(0, 1900) }), signal: controller.signal });
        if (!response.ok) throw new Error((await response.json()).error);
        let blob = await response.blob();
        if (generation !== voiceGeneration || recordState !== "idle")
          return finish("cancelled"), completion;
        let url = URL.createObjectURL(blob);
        audioUrl = url, audioPlayer = new Audio(url), audioPlayer.onended = () => {
          URL.revokeObjectURL(url), finish("completed");
        }, audioPlayer.onerror = () => finish("failed"), await audioPlayer.play(), report("speaking");
      }
    } catch (error) {
      generation === voiceGeneration && !settled && notify("Text reply retained. Speech did not finish: " + error.message), finish("failed");
    }
    return completion;
  }
  function cancelSpeech() {
    pendingSpeechFinish?.("cancelled"), voiceGeneration++, globalThis.speechSynthesis?.cancel(), audioPlayer?.pause(), audioUrl && (URL.revokeObjectURL(audioUrl), audioUrl = null), ["loading", "speaking"].includes(speech.status) && (speech = { ...speech, status: "cancelled" }, onReadout({ speech }));
  }
  async function confirmedSelection() {
    if (scriptedMode2) return;
    let serial = ++selectionSerial, context = getContext();
    if (!context.ids.length) return;
    let entry = await api2("/api/conversation/select", { conversationId, ...context });
    serial === selectionSerial && renderConversation(entry);
  }
  async function sendText(value = $("edit-prompt").value, capturedContext = getContext()) {
    if (scriptedMode2) {
      if (languagePattern("studio.cancel").test(value.trim())) {
        getScripted()?.cancel();
        return;
      }
      throw new Error("Hold X to speak, then release");
    }
    if (!value.trim()) throw new Error("Enter or speak your request first");
    if (activeSend !== null && !canInterrupt(value)) throw new Error("Processing the previous request. Please wait or say Stop.");
    selectionSerial++;
    let serial = ++sendSerial;
    activeSend = serial;
    let replies = [], published = !1, publish = (reply, { speak = !0 } = {}) => {
      if (serial === sendSerial)
        return /\p{Script=Han}/u.test(value) || (reply = uiText(reply)), published || (messages.push({ role: "user", content: value }), published = !0), replies.push(reply), messages.push({ role: "assistant", content: reply }), draft(""), renderConversation({ messages }), speak ? say(reply) : void 0;
    };
    voiceOnly && onReadout({ message: value, role: "user" });
    try {
      let reply = await handleText(value, capturedContext, { publish });
      if (reply !== null) {
        if (serial !== sendSerial || reply === void 0) return;
        if (typeof reply == "string" && publish(reply, { speak: replies.length === 0 }), activeSend === serial && (activeSend = null), replies.length) try {
          let entry = await api2("/api/director-dialogue", { conversationId, text: value, reply: replies.join(`
`) });
          serial === sendSerial && renderConversation(entry);
        } catch {
          notify("Text reply retained. Conversation history could not be saved.");
        }
        return;
      }
      if (getContext().busy) throw new Error("Finish the current request, voice input, or preview first");
      draft(""), onReadout({ message: value, role: "user" }), await requestJob("chat", value, conversationId, capturedContext);
    } catch (error) {
      throw serial === sendSerial && draft(value), error;
    } finally {
      activeSend === serial && (activeSend = null);
    }
  }
  function voiceDraft() {
    if (recordState !== "reviewing" || !pendingVoice) return null;
    let pages = voicePages(pendingVoice.text);
    return { text: pendingVoice.text, targetLabel: pendingVoice.context.targetLabel || "Current scene", page: reviewPage, pages: pages.length, pageText: pages[reviewPage], targetIds: pendingVoice.context.targetIds || [] };
  }
  function paintRecording() {
    let label = recordState === "recording" ? "\u25A0 Stop listening" : recordState === "reviewing" ? "\u25CF Speak again" : recordState === "transcribing" ? "Transcribing\u2026" : recordState === "requesting" ? "Waiting for microphone\u2026" : "\u25CF Start speaking";
    for (let id of ["voice-input", "voice-talk"]) $(id) && ($(id).textContent = uiText(label), $(id).disabled = ["requesting", "transcribing"].includes(recordState));
    $("voice-status") && ($("voice-status").textContent = uiText(recordState === "reviewing" ? "Review, then A / Enter Send \xB7 X Retry \xB7 B / Esc Cancel" : recordState === "idle" ? "Click to speak \xB7 Quest: hold X, release to review" : recordState === "recording" ? automatic ? "Listening \xB7 Review after speaking \xB7 B Cancel" : "Listening \xB7 Click to stop or release X" : "Processing voice\u2026")), onReadout({ recording: recordState, autoVoice: automatic, voiceDraft: voiceDraft() });
  }
  function pageVoice(step) {
    voiceDraft() && (reviewPage = Math.max(0, Math.min(voicePages(pendingVoice.text).length - 1, reviewPage + step)), paintRecording());
  }
  async function confirmVoice() {
    if (recordState !== "reviewing" || !pendingVoice) return;
    let entry = pendingVoice;
    if (validateVoiceContext(entry.context, getContext()), pendingVoice = null, recordState = "idle", reviewPage = 0, paintRecording(), entry.destination === "image")
      return $("image-generation-prompt").value = entry.text, requestJob("image", entry.text, conversationId, entry.context);
    if (entry.destination === "blueprint") {
      $("blueprint-prompt").value = entry.text, draft(""), onReadout({ message: entry.text, role: "user" }), notify("Requirements saved. Click Build after adding your photos.");
      return;
    }
    return sendText(entry.text, entry.context);
  }
  let autoContext = null, autoTimer = null, automatic = !1;
  function stopAuto() {
    clearInterval(autoTimer), autoTimer = null, autoContext?.close().catch(() => {
    }), autoContext = null;
  }
  async function startVoice({ destination = "agent", auto = !1 } = {}) {
    if (scriptedMode2) {
      getScripted()?.press();
      return;
    }
    if (!["idle", "reviewing"].includes(recordState)) return;
    let previous = pendingVoice, capturedContext = structuredClone(previous?.context || getContext());
    if (previous && (validateVoiceContext(capturedContext, getContext()), destination = previous.destination), destination === "agent" && voiceOnly && capturedContext.phase === "reference" && (destination = "blueprint"), destination === "agent" ? capturedContext.voiceBusy ?? capturedContext.busy : capturedContext.busy) throw new Error("Finish the current request, selection, or preview first");
    if (!mediaDevices?.getUserMedia || !globalThis.MediaRecorder) throw new Error("This browser cannot record audio. Open the local page in a browser with microphone support.");
    automatic = auto, onVoiceCapture(capturedContext);
    let generation = ++recordGeneration;
    stopRequested = !1, recordState = "requesting", paintRecording(), cancelSpeech();
    try {
      if (config = await api2("/api/config"), generation !== recordGeneration) return;
      if (config.speech.provider === "openai" && !config.speech.hasKey) throw new Error("Add your OpenAI API key under Speech transcription in API settings");
      if (!config.speech.model?.trim()) throw new Error("Open API settings and enter a speech transcription model first");
      if (stopRequested) {
        recordState = "idle", paintRecording(), onVoiceFinish();
        return;
      }
      let activeStream = await mediaDevices.getUserMedia({ audio: { echoCancellation: !0, noiseSuppression: !0 } });
      if (generation !== recordGeneration || stopRequested) {
        activeStream.getTracks().forEach((t) => t.stop()), generation === recordGeneration && (recordState = "idle", paintRecording(), onVoiceFinish());
        return;
      }
      stream2 = activeStream;
      let mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((t) => MediaRecorder.isTypeSupported(t)), activeRecorder = new MediaRecorder(activeStream, mime ? { mimeType: mime } : {}), recordChunks = [];
      if (recorder = activeRecorder, activeRecorder.ondataavailable = (event) => {
        event.data.size && recordChunks.push(event.data);
      }, activeRecorder.onerror = () => {
        generation === recordGeneration && (cancelVoice(), previous && voiceOnly && (pendingVoice = previous, recordState = "reviewing", draft(previous.text), paintRecording()), notify("Audio recording failed. Check microphone permission."));
      }, activeRecorder.onstop = async () => {
        if (stopAuto(), activeStream.getTracks().forEach((t) => t.stop()), generation !== recordGeneration) return;
        clearTimeout(recordTimer), stream2 = null, recordState = "transcribing", paintRecording();
        let controller = new AbortController();
        transcriptController = controller;
        try {
          let blob = new Blob(recordChunks, { type: activeRecorder.mimeType || "audio/webm" }), data = await blobData(blob), result = await api2("/api/speech/transcribe", { audio: data.split(",")[1], mime: blob.type }, { signal: controller.signal });
          if (generation !== recordGeneration) return;
          if (!result.text?.trim()) throw Error("No speech recognized. Please speak again.");
          if (draft(result.text), voiceOnly) {
            pendingVoice = { text: result.text, context: capturedContext, destination }, reviewPage = 0, recordState = "reviewing", paintRecording(), notify("Review transcript \xB7 A Send \xB7 X Retry \xB7 B Cancel");
            return;
          }
          recordState = "idle", paintRecording(), destination === "image" ? ($("image-generation-prompt").value = result.text, await requestJob("image", result.text, conversationId, capturedContext)) : destination === "blueprint" ? ($("blueprint-prompt").value = result.text, onReadout({ message: result.text, role: "user" }), notify("Requirements saved. Click Build after adding your photos.")) : await sendText(result.text, capturedContext);
        } catch (error) {
          generation === recordGeneration && notify(error.message);
        } finally {
          generation === recordGeneration && (onVoiceFinish(), recordState = pendingVoice ? "reviewing" : "idle", paintRecording(), recorder = null, transcriptController = null);
        }
      }, activeRecorder.start(), recordState = "recording", paintRecording(), recordTimer = setTimeout(stopVoice, 3e4), auto) {
        let Audio2 = globalThis.AudioContext || globalThis.webkitAudioContext;
        if (!Audio2) throw Error("Automatic speech detection is unavailable in this browser.");
        if (autoContext = new Audio2(), await autoContext.resume(), generation !== recordGeneration) {
          stopAuto();
          return;
        }
        let analyser = autoContext.createAnalyser();
        analyser.fftSize = 1024, autoContext.createMediaStreamSource(activeStream).connect(analyser);
        let buffer = new Float32Array(analyser.fftSize), endpoint = createSpeechEndpoint();
        autoTimer = setInterval(() => {
          if (generation !== recordGeneration) return stopAuto();
          analyser.getFloatTimeDomainData(buffer);
          let rms = Math.sqrt(buffer.reduce((sum, v2) => sum + v2 * v2, 0) / buffer.length), decision = endpoint.sample(performance.now(), rms);
          decision === "send" && stopVoice(), decision === "cancel" && (cancelVoice(), notify("No speech detected. Choose Other to try again."));
        }, 40), notify(voiceOnly ? "Listening \xB7 Review after speaking \xB7 B Cancel" : "Listening \xB7 Sends after speaking \xB7 B Cancel");
      }
    } catch (error) {
      if (generation !== recordGeneration) return;
      throw cancelVoice(), previous && voiceOnly && (pendingVoice = previous, recordState = "reviewing", draft(previous.text), paintRecording()), new Error("Voice input unavailable: " + error.message);
    }
  }
  function stopVoice() {
    if (scriptedMode2) return getScripted()?.release();
    stopRequested = !0, recorder?.state === "recording" && recorder.stop();
  }
  function cancelVoice() {
    stopAuto(), scriptedMode2 && getScripted()?.cancel(), onVoiceFinish(), recordGeneration++, stopRequested = !0, clearTimeout(recordTimer), transcriptController?.abort(), transcriptController = null, recorder?.state === "recording" && recorder.stop(), recorder = null, stream2?.getTracks().forEach((t) => t.stop()), stream2 = null, pendingVoice = null, reviewPage = 0, recordState = "idle", voiceOnly && draft(""), paintRecording(), cancelSpeech();
  }
  let roleLabels = { speech: "Speech transcription", voice: "Spoken replies", analysis: "Conversation and preferences", construction: "3D scene construction", images: "Image generation" }, choices = { speech: [["openai", "OpenAI (default)"], ["openai-compatible", "Other compatible API"]], voice: [["browser", "Browser speech"], ["openai", "OpenAI"], ["openai-compatible", "Other compatible API"], ["off", "Off"]], analysis: [["codex", "Local Codex"], ["openai-compatible", "OpenAI-compatible API"]], construction: [["codex", "Local Codex"], ["openai-compatible", "OpenAI-compatible API"]], images: [["disabled", "Disabled"], ["openai-compatible", "OpenAI Images-compatible API"]] };
  function renderConfig() {
    $("provider-fields").replaceChildren();
    for (let [role, label] of Object.entries(roleLabels)) {
      let fieldset = document.createElement("fieldset");
      fieldset.dataset.role = role;
      let legend = document.createElement("legend");
      legend.textContent = uiText(label), fieldset.append(legend);
      let select = document.createElement("select");
      select.name = "provider", select.setAttribute("aria-label", uiText(label + " protocol"));
      for (let [value, name] of choices[role]) {
        let option = document.createElement("option");
        option.value = value, option.textContent = uiText(name), select.append(option);
      }
      select.value = config[role].provider, fieldset.append(select);
      for (let [key, placeholder] of [["baseUrl", "API Base URL"], ["model", "Model name"], ...role === "voice" ? [["voice", "Voice ID, e.g. alloy"]] : [], ...["speech", "voice"].includes(role) ? [["language", "Language, e.g. en-US"]] : [], ["apiKey", config[role].hasKey ? "Key saved; leave blank to keep it" : "API Key"]]) {
        let input = document.createElement("input");
        input.name = key, input.type = key === "apiKey" ? "password" : "text", input.placeholder = uiText(placeholder), input.setAttribute("aria-label", uiText(label + " " + key)), input.autocomplete = "off", input.value = key === "apiKey" ? "" : config[role][key] || "", fieldset.append(input);
      }
      let clearLabel = document.createElement("label"), clear = document.createElement("input");
      if (clear.type = "checkbox", clear.name = "clearKey", clearLabel.append(clear, document.createTextNode(uiText("Clear saved key"))), fieldset.append(clearLabel), $("provider-fields").append(fieldset), ["speech", "voice"].includes(role)) {
        let hint = document.createElement("p");
        hint.className = "muted", fieldset.append(hint);
        let input = (name) => fieldset.querySelector(`[name="${name}"]`), updateHint2 = () => {
          let official = select.value === "openai", remote = official || select.value === "openai-compatible", changed = select.value !== config[role].provider || input("baseUrl").value.trim().replace(/\/+$/, "") !== config[role].baseUrl;
          input("baseUrl").readOnly = official, input("baseUrl").placeholder = "API Base URL or full audio endpoint", input("language").placeholder = role === "speech" ? "Language: auto, en, zh (blank = auto)" : "Browser language, e.g. en-US", input("apiKey").placeholder = changed ? official ? "OpenAI API Key" : "Key for this service (if required)" : config[role].hasKey ? "Key saved; leave blank to keep it" : official ? "OpenAI API Key" : "API Key (if required)", hint.textContent = role === "speech" ? official ? "Uses OpenAI audio transcription. Enter your API key and choose a transcription model." : "Uses /audio/transcriptions. Enter your service URL and model ID; a key is optional for services without authentication." : remote ? "AI-generated voice. Uses /audio/speech with your model and voice ID." : "Browser speech needs no API key. Off disables spoken replies.", changed && (hint.textContent += " Changing the service clears its previously saved key.");
          for (let name of ["baseUrl", "model", "voice", "apiKey"]) input(name) && (input(name).disabled = role === "voice" && !remote);
        };
        select.onchange = () => {
          let custom = select.value === "openai-compatible";
          input("baseUrl").value = custom ? "" : "https://api.openai.com/v1", input("model").value = custom ? "" : role === "speech" ? "gpt-4o-mini-transcribe" : "gpt-4o-mini-tts", role === "voice" && (input("voice").value = custom ? "" : "alloy"), input("language").value = role === "speech" ? "auto" : "zh-CN", input("apiKey").value = "", updateHint2();
        }, input("baseUrl").addEventListener("input", updateHint2), updateHint2();
      }
    }
  }
  async function saveSettings() {
    let update = {};
    for (let fieldset of $("provider-fields").children) {
      let fields = {};
      for (let input of fieldset.querySelectorAll("input,select")) fields[input.name] = input.type === "checkbox" ? input.checked : input.value;
      update[fieldset.dataset.role] = fields;
    }
    config = await api2("/api/config", update), renderConfig(), $("settings-dialog").close(), notify("API settings saved locally");
  }
  async function refreshLibrary() {
    library = await api2("/api/library"), $("image-library").replaceChildren();
    for (let item2 of library) {
      let card = document.createElement("button");
      card.className = "image-card", card.dataset.id = item2.id;
      let image = document.createElement("img");
      image.src = item2.url, image.alt = uiText(item2.title);
      let title = document.createElement("span");
      title.textContent = uiText(item2.title);
      let tag = document.createElement("small");
      tag.textContent = uiText(item2.kind === "preset" ? "Preset reference" : "Generated image"), card.append(image, title, tag), card.onclick = () => chooseReference(item2.id), $("image-library").append(card);
    }
    return onLibrary(library), library;
  }
  function chooseReference(id) {
    let item2 = library.find((i) => i.id === id);
    item2 && (onReference(item2), document.querySelectorAll(".image-card").forEach((card) => card.classList.toggle("selected", card.dataset.id === id)), $("image-preview").src = item2.url, $("image-preview").hidden = !1, $("image-name").textContent = uiText("Selected: " + item2.title), notify("Reference selected: " + item2.title));
  }
  $("settings-open").onclick = safe(async () => {
    config = await api2("/api/config"), renderConfig(), $("settings-dialog").showModal();
  }), $("settings-close").onclick = () => $("settings-dialog").close(), $("settings-save").onclick = safe(saveSettings), $("voice-input").onclick = safe(() => recordState === "recording" ? stopVoice() : startVoice()), $("ask-codex").onclick = safe(() => sendText()), $("edit-prompt").oninput = () => onReadout({ draft: $("edit-prompt").value }), $("voice-talk") && ($("voice-talk").onclick = $("voice-input").onclick), $("image-voice") && ($("image-voice").onclick = safe(() => recordState === "recording" ? stopVoice() : startVoice({ destination: "image" }))), $("conversation-toggle") && ($("conversation-toggle").onclick = () => {
    let open = !$("text-input").open;
    $("text-input").open = open, $("conversation-toggle").setAttribute("aria-expanded", String(open));
  }), $("generate-image").onclick = safe(() => requestJob("image", $("image-generation-prompt").value, conversationId)), addEventListener("pagehide", cancelVoice);
  async function initialize({ loadLibrary = !0 } = {}) {
    if (scriptedMode2) {
      loadLibrary && await refreshLibrary();
      return;
    }
    config = await api2("/api/config"), renderConfig(), loadLibrary && await refreshLibrary(), renderConversation(await api2("/api/conversation?id=" + conversationId));
  }
  return { initialize, conversationId, confirmedSelection, renderConversation, refreshLibrary, chooseReference, say, startVoice, stopVoice, cancelVoice, confirmVoice, pageVoice, getVoiceDraft: voiceDraft, getSpeechState: () => ({ ...speech, automatic: automatic && recordState !== "idle" }), getRecordingState: () => recordState, getDraft: () => $("edit-prompt").value, setDraft: draft, sendText };
}

// src/client/demonstration.mjs
var createDemonstration = () => ({ snapshot: () => ({ state: "idle" }), stop: async () => {
}, cancel() {
}, dispose() {
} });

// src/client/ui/authoring-desktop.mjs
function createAuthoringDesktop({ run, onToggle }) {
  let $3 = (id) => document.getElementById(id), context = null, page = "main", history2 = [], detail = "", target = "", replyKey = "", replyOpen = !1;
  function buttons(element, entries) {
    element.replaceChildren();
    for (let entry of entries) {
      let button = document.createElement("button");
      button.textContent = entry.label, button.dataset.action = entry.id, button.disabled = !!entry.disabled, button.onclick = () => run(entry.id), element.append(button);
    }
  }
  function collapse(value = !0) {
    document.body.classList.toggle("tools-collapsed", value), $3("scene-tools-toggle").textContent = value ? "Tools \xB7 Y" : "Close \xB7 Y", $3("scene-tools-toggle").setAttribute("aria-expanded", String(!value)), context && paint();
  }
  function navigate(id) {
    if (context?.phase !== "explore") return !1;
    if (AUTHORING_PAGES.includes(id))
      return page !== id && history2.push(page), page = id, detail = "", collapse(!1), !0;
    if (id === "authoringBack")
      return detail || (page = history2.pop() || authoringParent(page)), detail = "", paint(), !0;
    if (id === "agentReply")
      return collapse(), replyOpen = !0, paint(), !0;
    let details = { actors: "actors", display: "display", alignmentOptions: "display", authoringHelp: "help", selectionSettings: "selection", videoFiles: "recordings" };
    return details[id] ? (detail = details[id], collapse(!1), !0) : !1;
  }
  function back(submenuOnly = !1) {
    return document.body.classList.contains("tools-collapsed") || submenuOnly && !detail && page === "global" ? !1 : (detail || page !== "global" ? navigate("authoringBack") : collapse(), !0);
  }
  function openGlobal() {
    page = "global", history2 = [], detail = "", collapse(!1);
  }
  function openSelection() {
    page = "main", history2 = [], detail = "", collapse(!1);
  }
  function toggle() {
    context?.phase === "explore" && (document.body.classList.contains("tools-collapsed") || page !== "global" || detail) ? openGlobal() : collapse(!document.body.classList.contains("tools-collapsed"));
  }
  function paint() {
    let c = context, model = authoringMenu(c, page), collapsed = document.body.classList.contains("tools-collapsed");
    document.body.dataset.authoringDetail = detail, model && ($3("workflow-title").textContent = detail ? { actors: "Motion assets and entrance", display: "Display and alignment", help: "Controls", selection: "Selection and materials", recordings: "Saved recordings" }[detail] : model.title, $3("workflow-help").textContent = c.objectInteraction?.mode === "draft" ? uiText(c.draft?.message || model.hint) : model.hint, buttons($3("workflow-actions"), detail ? [{ id: "authoringBack", label: "Back" }] : model.entries), $3("actor-tools").hidden = detail !== "actors", $3("actor-tools").open = detail === "actors", $3("display-settings").hidden = detail !== "display", $3("display-settings").open = detail === "display", $3("more-options").hidden = detail !== "help", $3("more-options").open = detail === "help", $3("selection-tools").hidden = detail !== "selection", $3("selection-tools").open = detail === "selection", $3("object-interaction-panel").hidden = !0, $3("authoring-scene-tools").hidden = !0);
    let review = c.voiceDraft, reply = c.recording === "idle" && c.script?.agentText || "", spoken = c.script?.userText || "";
    reply !== replyKey && (replyKey = reply, replyOpen = !!reply), $3("agent-conversation").classList.toggle("has-reply", replyOpen && !!reply), $3("agent-conversation").classList.toggle("agent-active", !!c.job || c.recording !== "idle"), $3("latest-reply").textContent = reply, $3("voice-transcript").textContent = review ? "Not sent: " + review.text : !reply && spoken && c.recording !== "idle" ? "You: " + spoken : "", $3("reply-toggle").hidden = !reply, $3("reply-toggle").textContent = replyOpen ? "Hide reply" : "View reply", $3("reply-toggle").setAttribute("aria-expanded", String(replyOpen)), $3("voice-talk").hidden = !!review;
    let pending = c.job === "ready" && c.recording === "idle";
    $3("agent-preview-actions").hidden = !(review || pending && collapsed), buttons($3("agent-preview-actions"), review ? [{ id: "voiceConfirm", label: "Send \xB7 Enter" }, { id: "voiceRetry", label: "Speak again \xB7 X" }, { id: "voiceCancel", label: "Cancel \xB7 Esc" }] : pending ? [{ id: "apply", label: "Apply \xB7 Enter", disabled: c.applying }, { id: "discard", label: "Discard \xB7 Esc", disabled: c.applying }] : []), $3("agent-suggestions").hidden = !c.suggestions?.length || !collapsed || !!c.job || c.recording !== "idle", buttons($3("agent-suggestions"), (c.suggestions || []).map((s, i) => ({ id: "suggestion:" + i, label: s.label }))), $3("agent-suggestion-hint").hidden = !c.suggestions?.length || !collapsed, $3("agent-stage").textContent = review ? "Review speech \xB7 Target: " + review.targetLabel : c.job === "running" ? "Agent working \xB7 " + (c.agentStage || "Routing task") : pending ? "Preview ready \xB7 Confirm to apply" : c.actorName || c.targetName ? `Target: ${c.actorName || c.targetName}` : c.objectSelection?.length ? `${c.objectSelection.length} objects selected` : "Select an object or describe your idea", $3("authoring-task-hint").hidden = !c.objectInteraction && !c.actorPlacing && !c.production?.dirty, $3("authoring-task-hint").textContent = review ? "Review speech: Enter Send \xB7 X Retry \xB7 Esc Cancel" : c.production?.placing || c.actorPlacing ? "Point at ground \xB7 Enter Create \xB7 Esc Cancel" : c.production?.dirty ? c.production.tool === "transform" ? "WASD Move \xB7 Shift + W/S Height \xB7 Arrows Rotate \xB7 Enter Save \xB7 Esc Revert" : "Preview changes \xB7 Enter Save \xB7 Esc Revert" : c.objectInteraction?.mode === "draft" ? uiText(c.draft?.message || "Drawing") + " \xB7 Enter Save \xB7 Esc Cancel" : "";
  }
  return $3("scene-tools-toggle").onclick = () => onToggle ? onToggle() : toggle(), $3("reply-toggle").onclick = () => {
    replyOpen = !replyOpen, paint();
  }, {
    navigate,
    back,
    collapse,
    toggle,
    openGlobal,
    openSelection,
    snapshot: () => ({ page, detail, collapsed: document.body.classList.contains("tools-collapsed") }),
    update(c) {
      let nextTarget = JSON.stringify([c.phase, c.objectSelection, c.job, c.revision]);
      target !== nextTarget && (target = nextTarget, (c.phase !== context?.phase || !(page === "global" || history2.includes("global"))) && (page = "main", history2 = [], detail = ""));
      let startedTool = c.actorPlacing && !context?.actorPlacing || c.objectInteraction?.mode === "draft" && context?.objectInteraction?.mode !== "draft";
      context = c, startedTool ? collapse() : paint();
    }
  };
}

// src/client/xr/xr-studio.mjs
import * as THREE25 from "three";
function textPlane(text, width, height, button = !1, fontSize, primary = !1, disabled = !1) {
  let logicalWidth = Math.round(width * 1200), logicalHeight = Math.round(height * 1200), canvas2 = createUICanvas(logicalWidth, logicalHeight), ctx = canvas2.getContext("2d"), texture = createUITexture(canvas2), mesh = new THREE25.Mesh(new THREE25.PlaneGeometry(width, height), new THREE25.MeshBasicMaterial({ toneMapped: !1, map: texture, transparent: !0, depthTest: !1, side: THREE25.DoubleSide }));
  return mesh.renderOrder = 20, mesh.userData.paint = (label) => {
    label = mesh.userData.userContent ? String(label ?? "") : uiText(label);
    let paintKey = label + "|" + (mesh.userData.tone || "normal") + "|" + !!mesh.userData.hovered;
    if (mesh.userData.paintKey === paintKey) return;
    mesh.userData.paintKey = paintKey, mesh.userData.label = label;
    let size = fontSize ?? (button ? 34 : 30), lines = [], lineHeight, max, wrap3 = () => {
      ctx.font = `${button ? "500" : "400"} ${size}px -apple-system, BlinkMacSystemFont, sans-serif`, lineHeight = size * 1.18, max = Math.max(1, Math.floor((logicalHeight - 16) / lineHeight)), lines = [];
      for (let paragraph of String(label).split(`
`)) {
        let line = "";
        for (let word of paragraph.split(/\s+/)) {
          let next = line ? line + " " + word : word;
          for (line && ctx.measureText(next).width > logicalWidth - 26 ? (lines.push(line), line = word) : line = next; ctx.measureText(line).width > logicalWidth - 26 && line.length > 1; ) {
            let end = line.length - 1;
            for (; end > 1 && ctx.measureText(line.slice(0, end)).width > logicalWidth - 26; ) end--;
            lines.push(line.slice(0, end)), line = line.slice(end);
          }
        }
        lines.push(line);
      }
    };
    for (wrap3(); lines.length > max && size > (button ? 22 : 18) && !fontSize; )
      size -= 2, wrap3();
    ctx.clearRect(0, 0, logicalWidth, logicalHeight), ctx.fillStyle = button && !mesh.userData.panel ? disabled ? UI_THEME.control : primary ? mesh.userData.hovered ? UI_THEME.pressed : UI_THEME.accent : mesh.userData.hovered ? UI_THEME.selected : UI_THEME.control : UI_THEME.panel, ctx.beginPath(), ctx.roundRect(0, 0, logicalWidth, logicalHeight, 7), ctx.fill(), mesh.userData.focused && (ctx.strokeStyle = UI_THEME.accent, ctx.lineWidth = 4, ctx.stroke()), mesh.userData.tone === "error" && (ctx.strokeStyle = UI_THEME.error, ctx.lineWidth = 4, ctx.stroke()), ctx.fillStyle = disabled ? UI_THEME.muted : primary ? UI_THEME.onAccent : UI_THEME.text, ctx.textAlign = "center", ctx.textBaseline = "middle", mesh.userData.truncated = lines.length > max, mesh.userData.lines = lines.slice(0, max);
    let visible = lines.slice(0, max);
    lines.length > max && (visible[max - 1] = visible[max - 1].slice(0, -2) + "\u2026"), visible.forEach((line, i) => {
      let y = logicalHeight / 2 + (i - (visible.length - 1) / 2) * lineHeight;
      if (line.startsWith("\u25CF")) {
        let x = (logicalWidth - ctx.measureText(line).width) / 2;
        ctx.textAlign = "left", ctx.fillStyle = UI_THEME.error, ctx.fillText("\u25CF", x, y), ctx.fillStyle = UI_THEME.text, ctx.fillText(line.slice(1), x + ctx.measureText("\u25CF").width, y), ctx.textAlign = "center";
      } else ctx.fillText(line, logicalWidth / 2, y);
    }), texture.needsUpdate = !0;
  }, mesh.userData.setHovered = (value) => {
    disabled || mesh.userData.hovered === value || (mesh.userData.hovered = value, mesh.userData.paint(mesh.userData.label));
  }, mesh.userData.paint(text), mesh;
}
function createXRStudio({ actions, getDraft, setDraft }) {
  let group = new THREE25.Group(), menu = new THREE25.Group(), gallery = new THREE25.Group();
  group.visible = !1, group.add(menu, gallery);
  let blocker = new THREE25.Mesh(new THREE25.PlaneGeometry(1, 1), new THREE25.MeshBasicMaterial({ toneMapped: !1, transparent: !0, opacity: 0, depthWrite: !1, colorWrite: !1, side: THREE25.DoubleSide }));
  group.add(blocker);
  let context = { phase: START_PHASE }, page = "main", library = [], reference = null, libraryPage = 0, menuButtons = [], galleryButtons = [], lastContext = "", messageText = "Hold X to speak to the agent.", imageVersion = 0, focusedKey = null, history2 = [], roomLive = !1, roomPhoto = null, liveTexture = null, roomPhotoTexture = null, roomPhotoVersion = 0, addButton = (parent, list, label, x, y, width, fn, disabled = !1, primary = !1) => {
    let mesh = textPlane(label, width, 0.085, !0, void 0, primary, disabled);
    return mesh.position.set(x, y, 5e-3), mesh.userData.disabled = disabled, mesh.userData.action = disabled ? () => {
    } : fn, parent.add(mesh), list.push(mesh), mesh;
  }, header = textPlane("", 0.7, 0.085);
  header.position.y = 0.32, group.add(header);
  let message = textPlane(messageText, 0.7, 0.12);
  message.position.y = 0.19, group.add(message);
  let draft = textPlane("", 0.7, 0.075);
  draft.position.y = 0.085, group.add(draft);
  let photo = new THREE25.Mesh(new THREE25.PlaneGeometry(0.62, 0.29), new THREE25.MeshBasicMaterial({ toneMapped: !1, color: "#ffffff", depthTest: !1 }));
  photo.position.set(0, 0.2, 2e-3), photo.renderOrder = 21, photo.visible = !1, group.add(photo);
  let countdown = textPlane("", 0.22, 0.22, !1, 150);
  countdown.position.set(0, 0.2, 3e-3), countdown.visible = !1, group.add(countdown);
  let status = textPlane("", 0.7, 0.065, !1, 21);
  status.position.y = -0.38, group.add(status);
  let disposeChildren = (parent) => {
    for (let child of [...parent.children])
      parent.remove(child), child.geometry?.dispose(), child.material?.map?.dispose(), child.material?.dispose();
  };
  function show(next, { remember = !1 } = {}) {
    context.authoring && (remember && page !== next ? history2.push(page) : remember || (history2 = [])), page = next, focusedKey = null, rebuild();
  }
  function back() {
    return context.authoring ? page === "interaction" || page === "global" ? !1 : (page = history2.pop() || authoringParent(page), focusedKey = null, rebuild(), !0) : page !== "main" ? (show(page === "storyAct" ? "storyboard" : "main"), !0) : !1;
  }
  function command(id) {
    if (id.startsWith("cinema")) {
      actions.cinema?.(id);
      return;
    }
    if (context.authoring) {
      if (AUTHORING_PAGES.includes(id)) {
        show(id, { remember: !0 });
        return;
      }
      if (id === "authoringBack") {
        back();
        return;
      }
      if (id === "agentReply") {
        group.visible = !1, showDialogue();
        return;
      }
      if (id.startsWith("suggestion:")) {
        group.visible = !1, actions.suggestion?.(Number(id.slice(11)));
        return;
      }
      if (id === "authoringHelp") {
        show("help");
        return;
      }
      if (id === "videoFiles") {
        actions.videoFiles?.();
        return;
      }
      if (id === "selectionSettings") {
        actions.edit?.(), group.visible = !1;
        return;
      }
    }
    if (["drawFloor", "drawSpace", "regionDraft"].includes(id)) {
      actions[id]?.(), show("interaction");
      return;
    }
    if (["actorAgent", "voice"].includes(id)) {
      group.visible = !1, actions[id]?.();
      return;
    }
    if (id === "objectInteraction") {
      actions[id]?.(), show("interaction");
      return;
    }
    if (["interactionClose", "draftCancel", "objectTransform", "interactionVoice"].includes(id)) {
      actions[id]?.(), show("main");
      return;
    }
    if (/^storyAct[1-4]$/.test(id)) {
      actions[id]?.(), show("storyAct");
      return;
    }
    if (["more", "library", "actors", "display", "bodySize", "alignmentOptions", "help", "actorMore", "advanced", "storyboard", "doors", "sceneTools"].includes(id)) {
      id === "storyboard" && actions.storyRefresh?.(), show(id);
      return;
    }
    if (id === "back") {
      show(page === "storyAct" ? "storyboard" : "main");
      return;
    }
    actions[id]?.(), ["camera", "switchCamera", "actorPlace", "resume", "overview"].includes(id) && show("main");
  }
  function rebuild() {
    status.userData.tone = context.script?.error || context.videoState === "error" || context.captureState === "error" || context.demonstration?.state === "error" ? "error" : "normal", disposeChildren(menu), menuButtons = [], gallery.visible = page === "library";
    let compact = authoringMenu(context, page);
    if (compact) {
      gallery.visible = photo.visible = countdown.visible = draft.visible = !1, header.visible = !0, header.scale.set(0.84, 1, 1), header.position.y = 0.17, header.userData.paint(compact.title), message.visible = !1, compact.entries.forEach((entry, i) => {
        let b = addButton(menu, menuButtons, entry.label, 0, 0.055 - i * 0.092, 0.58, () => command(entry.id), entry.disabled);
        b.userData.actionId = entry.id, entry.id.startsWith("suggestion:") && (b.userData.userContent = !0, b.userData.paint(entry.label)), entry.id.startsWith("suggestion:") && (b.userData.userContent = !0, b.userData.paint(entry.label));
      }), status.visible = !0, status.scale.set(0.84, 1.3, 1), status.position.y = 0.055 - compact.entries.length * 0.092 - 0.03, status.userData.paint(page === "main" && !context.job && context.recording === "idle" ? `Right stick: select \xB7 A Confirm \xB7 B Back
X Voice \xB7 Y Global menu` : compact.hint), focusButtons();
      return;
    }
    if (header.scale.set(1, 1, 1), status.scale.set(1, 1, 1), context.captureUI) {
      gallery.visible = !1, countdown.visible = !1, draft.visible = !!context.describing, draft.userData.paint(getDraft()), draft.position.y = 0.32;
      let capture2 = context.phase === "reference";
      photo.visible = capture2 && (roomLive || !!roomPhoto) && context.captureState !== "error", header.visible = !0, header.position.y = photo.visible ? 0.405 : 0.2;
      let selected = context.objectSelection?.length || 0;
      header.userData.paint(captureQuestion(context) || PHASES[context.phase]), message.visible = !1;
      let entries2 = captureActions(context);
      page === "alignmentOptions" && (entries2 = [{ id: "refreshAlignment", label: "Read scan again" }, { id: "manualAlignment", label: "Mark corners manually" }, { id: "rotateRoom", label: "Rotate 90\xB0", disabled: !context.calibrationReady }, { id: "back", label: "Back" }]);
      let top2 = photo.visible ? -0.07 : 0.08;
      entries2.forEach((entry, i) => addButton(menu, menuButtons, entry.label, 0, top2 - i * 0.095, 0.62, () => command(entry.id), entry.disabled, i === 0 && !entry.disabled)), status.visible = !0, status.position.y = top2 - entries2.length * 0.095 - 0.01, status.userData.paint(context.phase === "calibrate" ? context.calibrationHint : captureStatus(context));
      let bottom2 = status.position.y - 0.07;
      blocker.scale.set(0.72, 0.48 - bottom2, 1), blocker.position.set(0, (0.48 + bottom2) / 2, -5e-3);
      return;
    }
    let main = page === "main", mini = main && ["overview", "preview", "entry", "entering"].includes(context.phase), capture = main && context.phase === "reference";
    photo.visible = capture && (context.roomMode ? (roomLive || !!roomPhoto) && context.captureState !== "error" : !!reference), countdown.visible = main && context.phase === "entering", countdown.userData.paint(context.demoTracking ? "\u2026" : String(context.demoSeconds ?? 3)), header.visible = !mini, header.position.y = capture ? 0.405 : 0.32;
    let act = context.storyboard?.acts.find((a) => a.id === context.storyActId);
    if (header.userData.paint(main ? context.roomMode && capture ? "Capture room" : PHASES[context.phase] : { storyboard: "Part 1 \xB7 Four-act archive", storyAct: act?.name || "Act archive", doors: "Blockout door \xB7 Opening settings", more: "Capture options", library: "Choose reference", sceneTools: "Scene tools \xB7 " + BUILD, actors: "Current actor", actorMore: "Actor options", display: "Display and alignment", bodySize: "Hand and arm size", alignmentOptions: "Adjust alignment", advanced: "Other actions", help: "Controller help" }[page]), message.visible = !mini && !photo.visible && !countdown.visible && page !== "library", message.position.y = capture ? 0.24 : 0.19, draft.visible = capture, main) {
      let words2 = { welcome: context.hasScene ? "Continue the saved layout or start with a new room." : "Capture a real space and build an editable blockout.", reference: context.scanBased ? "Build an editable blockout from the scan and reference photos." : context.cameraMessage || "Open the camera and capture at least four views.", building: context.scanBased ? "Resolving overlaps and connections into separate objects\u2026" : `Building a rough scene from ${context.photoCount || 0} photos\u2026`, preview: "Review the layout, then apply it to enter.", align: context.calibrationReady ? `L stick: Offset \xB7 L grip + stick: Height
Adjust alignment \u2192 Rotate 90\xB0 \xB7 A Save` : "Waiting for a room scan. Use manual corner alignment if needed.", calibrate: context.calibrationHint, explore: context.actorPlacing ? "Point at the floor \xB7 Right trigger to place \xB7 A to cancel" : context.videoState === "recording" ? `Recording \xB7 ${context.videoSeconds} s` : context.latestReply || context.objectInfo || messageText };
      message.userData.paint(words2[context.phase] || "Enter the world to start creating."), draft.userData.paint(capture ? context.roomMode ? context.captureTip : reference?.title || "Choose a reference image" : getDraft());
    } else page === "actors" ? message.userData.paint(`${context.actorName || "Select an actor"} \xB7 Appears after ${context.actorDelay || 0} s
${context.actorMessage || ""}`) : page === "actorMore" ? message.userData.paint(`Group style: ${context.actorStyle === "cute" ? "Playful" : "Zombie"}
Changing style restarts playback \xB7 Left grip to pause`) : page === "display" ? message.userData.paint(`Scene transparency: ${Math.round((1 - (context.roomOpacity ?? 0.5)) * 100)}%
${context.alignedMode ? "Physical movement 1:1" : "Align the room to film through physical movement"}`) : page === "alignmentOptions" ? message.userData.paint(`L stick: Offset \xB7 L grip + stick: Height
Rotate 90\xB0 to match the walls \xB7 A Save`) : page === "bodySize" ? message.userData.paint(`Hands ${Math.round((context.handSize || 1) * 100)}% \xB7 Arms ${Math.round((context.armSize || 1) * 100)}%
Grip tilt ${context.gripTilt ?? 45}\xB0 \xB7 Saved in this browser`) : page === "advanced" ? message.userData.paint("Voice, controls and exit XR.") : page === "help" ? message.userData.paint(`A: cancel / back \xB7 Left grip: preview / pause
B: record \xB7 Hold X: speak \xB7 Y: menu`) : page === "more" ? message.userData.paint("Photo list lasts for this session. Resume creating to return to your scene.") : page === "storyboard" ? message.userData.paint(`Act 1 stays locked. Later acts save independently.
Choose an act to save or load.`) : page === "storyAct" ? message.userData.paint(`${act?.saved ? `${act.actors} actors \xB7 Archive version ${act.versions}` : "This act has not been saved"}
${act?.hint || ""}`) : page === "doors" && message.userData.paint(context.door?.cast ? `${context.door.cast.actorIds.length} actors armed \xB7 Door trigger
Exit edit mode, hide the menu with Y, then touch the door.` : `${context.door?.name || "Select a door"} \xB7 Use door controls to preview
Configure the five-actor cast from here.`);
    page === "interaction" && (header.userData.paint(context.objectInteraction?.mode === "draft" ? "Draft \xB7 Ground sketch" : "Interaction \xB7 Set behavior"), message.userData.paint(context.objectInteraction?.mode === "draft" ? `${context.draft?.message || ""}
${context.objectInteraction.ids.length} targets \xB7 ${(context.draft?.length || 0).toFixed(2)} m \xB7 Not applied` : `Targets locked
Choose how to describe the interaction`));
    let spatialBusy = context.job || context.saving || context.finishing || ["recording", "saving"].includes(context.videoState), entries = page === "interaction" ? interactionActions(context) : main ? mainActions(context) : page === "storyboard" ? [
      ...STORY_ACTS.map((a, i) => ({ id: `storyAct${i + 1}`, label: a.name + (context.storyboard?.acts.find((x) => x.id === a.id)?.saved ? " \xB7 Saved" : " \xB7 Not yet created") })),
      { id: "back", label: "Back to creating" }
    ] : page === "storyAct" ? [
      ...storyActions(context),
      { id: "back", label: "Back to acts" }
    ] : page === "doors" ? [
      { id: "doorToggle", label: context.door?.effect?.open ? "Close blockout door" : "Open blockout door", disabled: !context.door || context.editingBusy || context.phase !== "explore" },
      { id: "doorHinge", label: `Hinge: ${context.door?.effect?.hinge === "right" ? "Right" : "Left"}`, disabled: !context.door || context.editingBusy || context.phase !== "explore" },
      { id: "doorDirection", label: "Change opening direction", disabled: !context.door || context.editingBusy || context.phase !== "explore" },
      { id: context.door?.cast ? "doorCastReset" : "doorCastConfigure", label: context.door?.cast ? "Close and reset" : "Set up five-actor performance", disabled: !context.door || !!spatialBusy || context.editingBusy || context.phase !== "explore" },
      { id: "back", label: "Back to creating" }
    ] : page === "display" ? [
      ...transparencyActions(context.roomOpacity),
      { id: "align", label: "Check alignment again", disabled: !!spatialBusy },
      { id: "bodySize", label: "Hand and arm size" },
      { id: "advanced", label: "Other actions" },
      { id: "back", label: "Back" }
    ] : page === "bodySize" ? [
      { id: "handSmaller", label: "Hands \u22125%", disabled: !!spatialBusy || context.handSize <= 0.7 },
      { id: "handLarger", label: "Hands +5%", disabled: !!spatialBusy || context.handSize >= 1.3 },
      { id: "armShorter", label: "Arms \u22125%", disabled: !!spatialBusy || context.armSize <= 0.8 },
      { id: "armLonger", label: "Arms +5%", disabled: !!spatialBusy || context.armSize >= 1.2 },
      { id: "gripTiltDown", label: "Grip tilt \u221210\xB0", disabled: !!spatialBusy || context.gripTilt <= 0 },
      { id: "gripTiltUp", label: "Grip tilt +10\xB0", disabled: !!spatialBusy || context.gripTilt >= 90 },
      { id: "bodyReset", label: "Reset hand fit", disabled: !!spatialBusy },
      { id: "back", label: "Back" }
    ] : page === "alignmentOptions" ? [
      { id: "rotateRoom", label: "Rotate 90\xB0", disabled: !context.calibrationReady },
      { id: "refreshAlignment", label: "Read scan again" },
      { id: "manualAlignment", label: "Mark corners manually" },
      { id: "back", label: "Back to alignment preview" }
    ] : page === "advanced" ? [
      { id: "voice", label: "Voice chat \xB7 X", disabled: context.phase !== "explore" },
      { id: "help", label: "Controller help" },
      { id: "roomScan", label: "System room scan", disabled: !!spatialBusy },
      { id: "end", label: "Exit immersive mode", disabled: !!spatialBusy },
      { id: "back", label: "Back" }
    ] : page === "help" ? [
      { id: "voice", label: "Voice chat \xB7 X", disabled: context.phase !== "explore" },
      { id: "back", label: "Back" }
    ] : page === "actors" ? [
      { id: "actorAssign", label: "Next motion", disabled: !context.actorSelected || !!context.job },
      { id: "actorDelayDown", label: "0.5 s earlier", disabled: !context.actorSelected || !!context.job },
      { id: "actorDelayUp", label: "0.5 s later", disabled: !context.actorSelected || !!context.job },
      { id: "actorMore", label: "More actor controls" },
      { id: "back", label: "Back" }
    ] : page === "actorMore" ? [
      { id: "cuteStyle", label: "Group \u2192 Playful motions", disabled: !context.actorCount || !!context.job },
      { id: "zombieStyle", label: "Group \u2192 Zombie motions", disabled: !context.actorCount || !!context.job },
      { id: "actorStart", label: "Replay from start", disabled: !context.actorCount || !!context.job },
      { id: "actorEdit", label: "Reset to T-Pose", disabled: !context.actorCount || !!context.job },
      { id: "actorClearMotion", label: "Clear motion", disabled: !context.actorSelected || !!context.job },
      { id: "back", label: "Back" }
    ] : page === "more" ? [
      { id: "removePhoto", label: "Undo last photo", disabled: !context.photoCount || context.photoReading },
      { id: "switchCamera", label: "Switch environment camera", disabled: context.cameraDevices < 2 || context.captureState === "starting" },
      { id: "resume", label: "Back to saved scene", disabled: !context.hasScene },
      { id: "back", label: "Back to capture" }
    ] : [{ id: "previous", label: "Previous page", disabled: libraryPage === 0 }, { id: "next", label: "Next page", disabled: (libraryPage + 1) * 3 >= library.length }, { id: "back", label: "Back" }];
    if (!context.roomMode && page === "more" && (entries = [{ id: "save", label: "Save scene" }, { id: "voice", label: "Voice chat \xB7 X", disabled: context.phase !== "explore" }, { id: "newWorld", label: context.demoMode ? "Replay demo" : "Build a world from images" }, { id: "resume", label: "Continue saved scene" }, { id: "end", label: "End immersive session" }, { id: "back", label: "Back" }]), main && !context.roomMode && context.phase === "reference" && header.userData.paint("Choose reference"), main) {
      let preset = presetActions(context);
      preset.length ? (entries = [...preset, ...objectActions(context)], message.userData.paint(context.preset.message)) : entries.push(...objectActions(context), ...storyboardEntry(context), ...selectedActorActions(context), ...doorMenuEntry(context));
    }
    context.authoring && page === "actors" && (entries = [{ id: "actorAssign", label: "Next motion asset", disabled: !context.actorSelected }, { id: "actorDelayDown", label: "0.5 s earlier", disabled: !context.actorSelected }, { id: "actorDelayUp", label: "0.5 s later", disabled: !context.actorSelected }, { id: "authoringBack", label: "Back" }]), context.authoring && page === "sceneTools" && (entries = [...authoringSceneActions(context), { id: "actors", label: context.actorName || "Actor menu", disabled: !context.actorSelected }]), context.authoring && page === "interaction" && context.objectInteraction?.mode === "draft" && (header.userData.paint(context.draft?.kind === "regions" ? "Door interaction \xB7 Closed regions" : context.draft?.mode === "space3d" ? "3D \xB7 Spatial curve" : "2D \xB7 Ground curve"), message.userData.paint((context.draft?.kind === "regions" || context.draft?.smoothingFallback ? context.draft.message : context.draft?.mode === "space3d" ? "Tip distance " + context.draft.depth.toFixed(1) + " m \xB7 Move your right hand to draw" : "Point at ground to draw") + `
Y Hide menu to draw / Show menu to save`)), context.authoring && (entries = entries.filter((e) => !["cuteStyle", "zombieStyle", "doorCastConfigure", "doorCastReset"].includes(e.id)));
    let single = main && !mini && !capture && entries.length <= 4, top = mini ? 0 : capture ? -0.11 : 0.045;
    entries.forEach((entry, i) => addButton(menu, menuButtons, entry.label, single ? 0 : i % 2 * 0.365 - 0.1825, top - (single ? i : Math.floor(i / 2)) * 0.1, single ? 0.7 : 0.34, () => entry.id === "previous" ? buildGallery(--libraryPage) : entry.id === "next" ? buildGallery(++libraryPage) : command(entry.id), entry.disabled, i === 0 && page === "main" && !entry.disabled)), status.position.y = top - (single ? entries.length : Math.ceil(entries.length / 2)) * 0.1 - 0.012, status.visible = !mini;
    let bottom = Math.min(-0.1, status.position.y - 0.085);
    blocker.scale.set(0.78, 0.45 - bottom, 1), blocker.position.set(0, (0.45 + bottom) / 2, -5e-3), status.userData.paint(page === "help" ? `Right stick click: edit \xB7 Select, then hold trigger to move
While dragging, stick turns / raises \xB7 Left stick: undo \xB7 Right grip: box-select` : context.videoState === "saving" ? context.videoMessage : capture ? `${context.photoCount || 0} photos \xB7 Minimum 4 \xB7 Right trigger to capture` : context.authoring ? "X Voice \xB7 Y Hide / Show menu" : "Y: hide \xB7 Press again to place the menu in front of you"), page === "help" ? (status.scale.y = 2.1, status.position.y -= 0.03) : status.scale.y = 1, context.authoring && (page === "help" && message.userData.paint(`A Confirm \xB7 B Cancel / Back
X Voice \xB7 Y Menu \xB7 Left grip: play / pause`), focusButtons());
  }
  function focusButtons() {
    let enabled = menuButtons.filter((b) => !b.userData.disabled), key = (b) => b.userData.actionId || b.userData.label;
    enabled.some((b) => key(b) === focusedKey) || (focusedKey = enabled[0] ? key(enabled[0]) : null);
    for (let b of menuButtons)
      b.userData.focused = key(b) === focusedKey, b.userData.paint(b.userData.label);
  }
  function moveFocus(step) {
    if (!group.visible || !context.authoring) return;
    let enabled = menuButtons.filter((b) => !b.userData.disabled), key = (b) => b.userData.actionId || b.userData.label;
    if (!enabled.length) return;
    let index = enabled.findIndex((b) => key(b) === focusedKey);
    focusedKey = key(enabled[(Math.max(0, index) + step + enabled.length) % enabled.length]), focusButtons();
  }
  function confirmFocused() {
    if (!group.visible || !context.authoring) return;
    menuButtons.find((b2) => !b2.userData.disabled && (b2.userData.actionId || b2.userData.label) === focusedKey)?.userData.action();
  }
  function setRoomCamera(video, active, lastPhoto) {
    roomLive = active, active && !liveTexture && (liveTexture = new THREE25.VideoTexture(video), liveTexture.colorSpace = THREE25.SRGBColorSpace);
    let changed = roomPhoto?.id !== lastPhoto?.id;
    if (roomPhoto = lastPhoto || null, changed) {
      let version = ++roomPhotoVersion;
      roomPhotoTexture?.dispose(), roomPhotoTexture = null, lastPhoto && new THREE25.TextureLoader().load(lastPhoto.image, (texture) => {
        if (version !== roomPhotoVersion) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE25.SRGBColorSpace, roomPhotoTexture = texture, roomLive || (photo.material.map = texture, photo.material.needsUpdate = !0);
      });
    }
    photo.material.map = active ? liveTexture : roomPhotoTexture, photo.material.needsUpdate = !0;
    let width = active ? video.videoWidth : lastPhoto?.width, height = active ? video.videoHeight : lastPhoto?.height, aspect = width && height ? width / height : 4 / 3, h = Math.min(0.29, 0.62 / aspect);
    photo.scale.set(h * aspect / 0.62, h / 0.29, 1), rebuild();
  }
  function buildGallery(index = 0) {
    libraryPage = index, disposeChildren(gallery), galleryButtons = [];
    for (let [i, item2] of library.slice(index * 3, index * 3 + 3).entries()) {
      let x = (i - 1) * 0.23, choose = () => {
        actions.reference(item2.id), show("main");
      };
      addButton(gallery, galleryButtons, item2.title, x, 0.035, 0.215, choose);
      let frame = new THREE25.Mesh(new THREE25.PlaneGeometry(0.226, 0.171), new THREE25.MeshBasicMaterial({ toneMapped: !1, color: reference?.id === item2.id ? UI_THEME.accent : UI_THEME.border, depthTest: !1 }));
      frame.position.set(x, 0.185, 3e-3), frame.renderOrder = 20, frame.userData.referenceId = item2.id, gallery.add(frame);
      let card = new THREE25.Mesh(new THREE25.PlaneGeometry(0.215, 0.16), new THREE25.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.control, depthTest: !1 }));
      card.position.set(x, 0.185, 5e-3), card.renderOrder = 21, card.userData.action = choose, gallery.add(card), galleryButtons.push(card), new THREE25.TextureLoader().load(item2.url, (texture) => {
        if (!card.parent) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE25.SRGBColorSpace, card.material.map = texture, card.material.color.set("#ffffff"), card.material.needsUpdate = !0;
      });
    }
    rebuild();
  }
  let visible = (o) => {
    for (let p = o; p; p = p.parent) if (!p.visible) return !1;
    return !0;
  }, notice = new THREE25.Group();
  notice.position.set(0, -0.27, -0.9), notice.visible = !1;
  let noticeButtons = [], noticeText = addButton(notice, noticeButtons, "", 0, 0, 0.72, () => {
    (context.videoState === "recording" || context.videoRetry) && actions.record?.();
  });
  noticeText.userData.panel = !0, noticeText.scale.setScalar(0.72);
  let noticeUntil = 0, noticeMessage = "", dialogue = new THREE25.Group();
  dialogue.position.set(0, -0.3, -1.15), dialogue.visible = !1;
  let dialogueText = textPlane("", 0.72, 0.15, !1, 25);
  dialogueText.userData.userContent = !0, dialogue.add(dialogueText);
  let dialogueStatus = textPlane("", 0.72, 0.055, !1, 22);
  dialogueStatus.position.y = -0.11, dialogue.add(dialogueStatus);
  let dialogueButtons = [], cancelButton = addButton(dialogue, dialogueButtons, "Cancel", 0, -0.19, 0.22, () => context.demonstration?.state === "recording" ? actions.demonstrationStop?.() : context.script?.busy || context.localPreparing ? actions.scriptCancel?.() : actions.scriptStop?.()), dialogueDismissed = !1, replyUntil = 0, lastSpoken = "", lastReply = "", lastRecording = "idle", lastJob = null, lastRequesting = !1;
  function rememberDialogue() {
    lastSpoken = context.script?.userText || "", lastReply = context.script?.agentText || "", lastRecording = context.recording, lastJob = context.job, lastRequesting = !!context.production?.requesting;
  }
  function dismissDialogue() {
    if (context.voiceDraft) return !1;
    let wasVisible = dialogue.visible;
    return dialogueDismissed = !0, dialogue.visible = !1, noticeUntil = 0, rememberDialogue(), wasVisible;
  }
  function showDialogue() {
    dialogueDismissed = !1, replyUntil = performance.now() + 5e3;
  }
  let applyButton = addButton(dialogue, dialogueButtons, "Apply", -0.24, -0.19, 0.22, () => actions.apply?.()), discardButton = addButton(dialogue, dialogueButtons, "Discard", 0, -0.19, 0.22, () => actions.discard?.()), hideButton = addButton(dialogue, dialogueButtons, "Hide dialogue", 0.24, -0.19, 0.22, dismissDialogue);
  function updateCapture(xr) {
    if (context.authoring) {
      let reviewing = context.voiceDraft;
      if (context.recording && context.recording !== "idle") {
        dialogue.position.set(0, 0, -1.45), dialogue.scale.setScalar(0.78), dialogue.visible = !!xr, dialogueDismissed = !1;
        for (let child of dialogue.children) child.material && (child.material.opacity = 1);
        dialogueText.visible = !0, dialogueText.userData.paint(reviewing ? `Not sent \xB7 ${(reviewing.targetLabel || "Current scene").slice(0, 16)} \xB7 ${reviewing.page + 1}/${reviewing.pages}
${reviewing.pageText}` : context.recording === "recording" ? "Listening\u2026" : "Transcribing\u2026"), dialogueStatus.userData.paint(reviewing ? "A Send \xB7 X Retry \xB7 B Cancel" + (reviewing.pages > 1 ? " \xB7 Right stick: pages" : "") : context.autoVoice ? "Review after speaking \xB7 B Cancel" : "Release X to review \xB7 B Cancel"), cancelButton.visible = !1, applyButton.visible = discardButton.visible = !!reviewing, hideButton.visible = !0, applyButton.userData.paint("A Send"), applyButton.userData.action = () => actions.voiceConfirm?.(), discardButton.userData.paint("X Retry"), discardButton.userData.action = () => actions.voiceRetry?.(), hideButton.userData.paint("B Cancel"), hideButton.userData.action = () => actions.voiceCancel?.(), rememberDialogue();
        return;
      }
      applyButton.userData.paint("Apply"), applyButton.userData.action = () => actions.apply?.(), discardButton.userData.paint("Discard"), discardButton.userData.action = () => actions.discard?.(), hideButton.userData.paint("Hide dialogue"), hideButton.userData.action = dismissDialogue;
      let userText = context.script?.userText || "", reply = context.script?.agentText || "";
      (userText && userText !== lastSpoken || reply && reply !== lastReply || context.recording === "recording" && lastRecording !== "recording" || context.job === "ready" && lastJob !== "ready" || context.production?.requesting && !lastRequesting) && showDialogue(), rememberDialogue(), (context.actorPlacing || context.draft?.active || context.objectInteraction?.mode === "draft" || context.production?.placing || ["transform", "curve"].includes(context.production?.tool)) && (dialogueDismissed = !0);
      let spoken = context.script?.agentText || context.script?.userText && "You: " + context.script.userText || "";
      dialogue.position.set(0, 0, -1.45), dialogue.scale.setScalar(0.78);
      let remaining = replyUntil - performance.now();
      dialogue.visible = !!xr && !dialogueDismissed && remaining > 0;
      for (let child of dialogue.children) child.material && (child.material.opacity = Math.min(1, Math.max(0, remaining / 400)));
      dialogueText.visible = !0, dialogueText.userData.paint(spoken || "Hold X to speak, release to review"), dialogueStatus.userData.paint(context.recording === "recording" ? context.autoVoice ? "Listening \xB7 Review after speaking \xB7 B Cancel" : "Listening \xB7 Release X to review" : context.recording === "transcribing" ? "Transcribing" : context.recording === "requesting" ? "Waiting for microphone" : context.job === "ready" ? "A Apply \xB7 B Discard \xB7 X Voice" : context.job === "running" ? "Agent working \xB7 " + (context.agentStage || "Routing task") : context.suggestions?.length ? "Y \u2192 Agent suggestions" : "X Voice \xB7 Y \u2192 View Agent reply"), cancelButton.visible = context.job === "running", cancelButton.userData.action = () => actions.cancel?.(), cancelButton.userData.paint("Stop"), applyButton.visible = discardButton.visible = context.job === "ready" && !group.visible, hideButton.visible = !0, cancelButton.visible = context.job === "running" && !group.visible;
      return;
    }
    applyButton.visible = discardButton.visible = hideButton.visible = !1;
    let active = ["recording", "saving", "error"].includes(context.demonstration?.state) || context.localPreparing || !!context.script?.userText || !!context.script?.error || context.script?.busy || context.script?.status === "unconfigured";
    dialogue.visible = !!xr && !!context.captureUI && active && !group.visible, dialogueText.userData.paint([context.script?.userText && "You: " + context.script.userText, context.script?.agentText && "Agent: " + context.script.agentText].filter(Boolean).join(`
`)), dialogueText.visible = !!context.script?.userText, dialogueStatus.userData.tone = status.userData.tone, dialogueStatus.userData.paint(captureStatus(context)), cancelButton.visible = context.demonstration?.state === "recording" || !!context.localPreparing || !!context.script?.busy || context.performanceMode === "running", cancelButton.userData.paint(context.demonstration?.state === "recording" ? "Stop demonstration" : context.script?.busy || context.localPreparing ? "Cancel" : "Stop"), context.captureUI && group.visible && (message.visible = !!context.script?.userText, message.position.set(0, header.position.y + 0.14, 0), message.userData.paint([context.script?.userText, context.script?.agentText].filter(Boolean).join(`
`)));
  }
  return rebuild(), { group, notice, dialogue, dismissDialogue, showDialogue, moveFocus, confirmFocused, back, openGlobal() {
    show("global");
  }, openSelection() {
    show("main");
  }, setHovered(objects) {
    let hits = new Set(objects);
    for (let button of [...menuButtons, ...galleryButtons, ...noticeButtons, ...dialogueButtons]) button.userData.setHovered?.(hits.has(button));
  }, blocks: (raycaster2) => !context.authoring && !context.suppressUI && visible(blocker) && raycaster2.intersectObject(blocker, !1).length > 0, snapshot: () => ({ page, focused: focusedKey, buttons: menuButtons.map((b) => b.userData.label), noticeVisible: notice.visible, dialogueVisible: dialogue.visible, dialogueDismissed, voiceReview: context.voiceDraft || null, dialogueTruncated: dialogueText.userData.truncated, dialoguePosition: dialogue.position.toArray(), noticePosition: notice.position.toArray(), captureUI: !!context.captureUI, status: status.userData.label, dialogue: dialogueText.userData.label }), updateNotice(xr) {
    if (context.suppressUI) {
      group.visible = notice.visible = dialogue.visible = !1;
      return;
    }
    updateCapture(xr);
    let persistent = ["recording", "saving"].includes(context.videoState) || context.videoRetry;
    notice.visible = !!xr && (persistent || !group.visible && performance.now() < noticeUntil), context.authoring ? notice.position.set(0, dialogue.visible ? -0.25 : 0, -1.45) : notice.position.set(0, context.captureUI ? 0.36 : group.visible ? 0.38 : -0.27, -0.9), noticeText.userData.tone = context.videoState === "error" ? "error" : "normal", notice.visible && noticeText.userData.paint(context.captureUI && persistent ? recordLabel(context) : persistent ? context.videoState === "recording" ? context.authoring ? `\u25CF ${context.videoSeconds} s \xB7 Click to stop recording` : `\u25CF ${context.videoSeconds} s \xB7 B / click to stop recording` : context.videoState === "saving" ? context.videoMessage || "Saving recording\u2026" : "Video unsaved \xB7 B / click to retry" : noticeMessage);
  }, setRoomCamera, hit(raycaster2) {
    return context.suppressUI ? null : raycaster2.intersectObjects([...menuButtons, ...galleryButtons, ...noticeButtons.filter(() => context.videoState === "recording" || context.videoRetry), ...dialogueButtons].filter(visible), !1)[0];
  }, setStatus: (text) => {
    status.userData.paint(text), noticeMessage = text, noticeUntil = performance.now() + 4500;
  }, setContext(next) {
    let key = JSON.stringify(next);
    if (key === lastContext) return;
    let old = context;
    if (lastContext = key, context = next, next.suppressUI) {
      group.visible = notice.visible = dialogue.visible = !1;
      return;
    }
    let globalContext = next.authoring && (page === "global" || history2.includes("global"));
    (old.phase !== next.phase || !globalContext && (old.job !== next.job || next.authoring && JSON.stringify(old.objectSelection) !== JSON.stringify(next.objectSelection)) || page === "actors" && !next.actorSelected || page === "interaction" && !next.objectInteraction) && (page = "main", history2 = []), next.authoring && !globalContext && next.actorSelected && next.actorSelected !== old.actorSelected && !next.job && !next.objectInteraction && (page = "main", history2 = []), next.authoring && next.objectInteraction?.mode === "draft" && page !== "brushSettings" && (page = "interaction"), rebuild();
  }, setLibrary(items) {
    library = items, buildGallery();
  }, setReference(item2) {
    reference = item2;
    for (let child of gallery.children) child.userData.referenceId && child.material.color.set(child.userData.referenceId === item2?.id ? UI_THEME.accent : UI_THEME.border);
    let version = ++imageVersion;
    item2?.url && new THREE25.TextureLoader().load(item2.url, (texture) => {
      if (version !== imageVersion) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE25.SRGBColorSpace, photo.material.map?.dispose(), photo.material.map = texture, photo.material.needsUpdate = !0;
    }), rebuild();
  }, openLibrary() {
    buildGallery(), show("library");
  }, readout(update) {
    context.captureUI || (update.message !== void 0 && (messageText = (update.role === "user" ? "You: " : "Agent: ") + update.message, context.phase === "explore" && message.userData.paint(messageText)), update.draft !== void 0 && context.phase !== "reference" && draft.userData.paint("Draft: " + update.draft), update.recording !== void 0 && status.userData.paint({ idle: context.editing ? "Edit \xB7 Right grip: box-select \xB7 Right stick click: exit" : "Explore \xB7 Right stick click: edit \xB7 Hold X: speak", requesting: "Waiting for microphone\u2026", recording: update.autoVoice ? "Listening \xB7 Review after speaking \xB7 B Cancel" : "Listening\u2026 Release X to review", transcribing: "Transcribing\u2026" }[update.recording]));
  }, hideKeyboard() {
    show(context.objectInteraction ? "interaction" : "main");
  } };
}

// src/client/take-store.mjs
function createIndexedTakeStore(indexed = globalThis.indexedDB) {
  let opening;
  function database() {
    return opening ??= new Promise((resolve, reject) => {
      if (!indexed) {
        reject(Error("Persistent recording storage is unavailable"));
        return;
      }
      let r = indexed.open("vrbuild-takes-v1", 1);
      r.onupgradeneeded = () => {
        r.result.createObjectStore("takes", { keyPath: "id" }), r.result.createObjectStore("chunks", { keyPath: "key" });
      }, r.onsuccess = () => resolve(r.result), r.onerror = () => reject(r.error);
    });
  }
  async function read(store, key, all = !1) {
    let db = await database();
    return new Promise((resolve, reject) => {
      let tx = db.transaction(store), r = all ? tx.objectStore(store).getAll() : tx.objectStore(store).get(key);
      r.onsuccess = () => resolve(r.result), r.onerror = () => reject(r.error);
    });
  }
  return {
    get: (id) => read("takes", id),
    list: () => read("takes", null, !0),
    packet: (id, seq) => read("chunks", `${id}:${seq}`),
    async change(id, fn) {
      let db = await database();
      return new Promise((resolve, reject) => {
        let tx = db.transaction(["takes", "chunks"], "readwrite"), takes = tx.objectStore("takes"), chunks = tx.objectStore("chunks"), r = takes.get(id), result, error;
        r.onsuccess = () => {
          try {
            result = fn(r.result), result.remove ? takes.delete(id) : takes.put(result.manifest), result.put && chunks.put({ ...result.put, key: `${id}:${result.put.seq}` }), result.deleteSeq !== void 0 && chunks.delete(`${id}:${result.deleteSeq}`);
          } catch (e) {
            error = e, tx.abort();
          }
        }, tx.oncomplete = () => resolve(result?.manifest), tx.onabort = tx.onerror = () => reject(error || tx.error || Error("Local recording save failed"));
      });
    }
  };
}
function createTakeUpload({ store = createIndexedTakeStore(), fetcher = fetch, onChange = () => {
} } = {}) {
  let stage = "idle", id = null, persist = Promise.resolve(), network = null, lastError = null, result = null, pendingBytes = 0, writingBytes = 0, snapshot = () => ({ takeId: id, lastError, pendingBytes, stage }), emit = () => onChange(snapshot());
  async function request(url, body, method = "POST", timeout = 2e4) {
    let response = await fetcher(url, { method, headers: { "Content-Type": body instanceof Blob ? "application/octet-stream" : "application/json" }, body: body instanceof Blob ? body : JSON.stringify(body), signal: AbortSignal.timeout(timeout) }), data = await response.json();
    if (!response.ok) throw Error(data.error || "Recording upload failed");
    return data;
  }
  function flush() {
    return network || (stage = "uploading", network = (async () => {
      if (await persist, !id) return;
      let m = await store.get(id);
      if (m) {
        for (m.created || (await request("/api/takes", { id, mime: m.mime, initial: m.initial }), await store.change(id, (current) => ({ manifest: { ...current, created: !0 } }))); m = await store.get(id), !(m.ackSeq + 1 >= m.nextSeq); ) {
          let seq = m.ackSeq + 1, packet = await store.packet(id, seq);
          if (!packet) throw Error("A local recording chunk is missing");
          let digest = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", await packet.blob.arrayBuffer())), (n) => n.toString(16).padStart(2, "0")).join(""), ack = await request(`/api/takes/${id}/chunks/${seq}`, packet.blob, "PUT");
          if (ack.seq !== seq || ack.nextSeq <= seq || ack.sha256 !== digest) throw Error("Recording server did not acknowledge a chunk");
          await store.change(id, (current) => ({ manifest: { ...current, ackSeq: seq }, deleteSeq: seq })), pendingBytes = Math.max(0, pendingBytes - packet.blob.size), emit();
        }
        lastError = null, emit();
      }
    })().catch((error) => {
      throw lastError = error.message, emit(), error;
    }).finally(() => {
      network = null;
    }), network);
  }
  let kick = () => {
    flush().catch(() => {
    });
  };
  async function recover() {
    let unfinished = (await store.list()).filter((m) => m.status !== "saved").sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    for (let m of unfinished) {
      if (!m.nextSeq) {
        await store.change(m.id, () => ({ remove: !0 }));
        continue;
      }
      return id = m.id, pendingBytes = 0, lastError = "An unfinished recording is available. Retry saving the recorded portion.", emit(), !0;
    }
    return !1;
  }
  async function begin(initial, mime) {
    if (id) throw Error("The previous recording is not saved. Retry it first.");
    if ((await store.list()).some((m) => m.status !== "saved" && m.nextSeq)) throw Error("An unsaved recording is stored in this browser. Recover it first.");
    let nextId = crypto.randomUUID();
    return await store.change(nextId, () => ({ manifest: { id: nextId, mime, initial, createdAt: (/* @__PURE__ */ new Date()).toISOString(), created: !1, nextSeq: 0, ackSeq: -1, bytes: 0, videoBytes: 0, frames: 0, lastTime: 0, status: "recording" } })), id = nextId, persist = Promise.resolve(), lastError = null, result = null, pendingBytes = 0, kick(), id;
  }
  function append(blob, segment) {
    let packet = takePacket(blob, segment);
    if (writingBytes + packet.size > TAKE_LIMITS.packetBytes * 2) throw Error("Local storage is too slow. Recording stopped.");
    pendingBytes += packet.size, writingBytes += packet.size;
    let operation = persist.then(() => store.change(id, (m) => {
      if (!m || m.status !== "recording") throw Error("Take ended");
      if (m.nextSeq >= TAKE_LIMITS.chunks || m.bytes + packet.size > TAKE_LIMITS.totalBytes || m.videoBytes + blob.size > TAKE_LIMITS.videoBytes) throw Error("Local recording storage limit reached");
      return { manifest: { ...m, nextSeq: m.nextSeq + 1, bytes: m.bytes + packet.size, videoBytes: m.videoBytes + blob.size, frames: m.frames + segment.samples.length, lastTime: segment.time }, put: { seq: m.nextSeq, blob: packet } };
    }));
    return persist = operation, operation.then(() => {
      writingBytes -= packet.size, kick();
    }, () => {
      writingBytes -= packet.size;
    }), operation;
  }
  async function finalize() {
    for (await persist; ; ) {
      await flush();
      let m2 = await store.get(id);
      if (m2.ackSeq === m2.nextSeq - 1) break;
    }
    let m = await store.get(id);
    if (!m.end) throw Error("Take is still running");
    return stage = "finalizing", emit(), result = await request(`/api/takes/${id}/finalize`, m.end, "POST", 2e5), await store.change(id, (current) => ({ manifest: { ...current, status: "saved", result, initial: null } })), id = null, lastError = null, stage = "saved", emit(), result;
  }
  async function finish(metadata) {
    return await persist, await store.change(id, (m) => ({ manifest: { ...m, status: "ended", end: { ...metadata, lastSeq: m.nextSeq - 1 } } })), finalize();
  }
  async function retry() {
    if (!id && !await recover()) return result;
    let m = await store.get(id);
    if (!m.end) {
      if (!m.frames || !m.lastTime) throw Error("No recoverable frames in the recorded portion");
      persist = Promise.resolve(), await store.change(id, (current) => ({ manifest: { ...current, status: "ended", end: { lastSeq: current.nextSeq - 1, duration: Math.min(TAKE_LIMITS.seconds, current.lastTime), frames: current.frames, reason: "interrupted" } } }));
    }
    return finalize();
  }
  async function discardEmpty() {
    if (!id) return;
    await network?.catch(() => {
    });
    let m = await store.get(id);
    if (!(!m || m.frames)) {
      for (let seq = m.ackSeq + 1; seq < m.nextSeq; seq++) await store.change(id, (current) => ({ manifest: current, deleteSeq: seq }));
      await store.change(id, () => ({ remove: !0 })), id = null, persist = Promise.resolve();
    }
  }
  return { begin, append, finish, retry, recover, flush, snapshot, discardEmpty };
}

// src/client/showcase/content.mjs
var noop = () => null;
var createShowcaseContent = noop;

// src/client/xr/room-camera.mjs
var isAvatar = (label) => languagePattern("camera.selfieDevice").test(label || ""), isEnvironment = (label) => languagePattern("camera.environmentDevice").test(label || "");
function cameraError(error) {
  return error.name === "NotAllowedError" || error.name === "SecurityError" ? "Camera permission denied. Exit immersive mode, allow camera access, then reopen it." : error.name === "NotFoundError" || error.name === "OverconstrainedError" ? "No environment camera found. Check Quest Browser camera permissions, or upload room photos." : error.name === "NotReadableError" ? "Camera is busy or unavailable. Close other camera apps and retry." : error.message || "Could not open the camera. Try again.";
}
function createRoomCamera({ video, onChange = () => {
}, mediaDevices = globalThis.navigator?.mediaDevices, makeCanvas = () => document.createElement("canvas"), isQuest = /Quest|OculusBrowser/i.test(globalThis.navigator?.userAgent || ""), readyTimeout = 1e4 }) {
  let state2 = "idle", message = "Take at least four photos of your surroundings.", stream2 = null, devices = [], photos = [], generation = 0, reading = !1, snapshot = () => ({ state: state2, message, count: photos.length, canCapture: state2 === "active" && !reading && photos.length < MAX_ROOM_PHOTOS, reading, devices: [...devices], deviceId: stream2?.getVideoTracks()[0]?.getSettings?.().deviceId || "", label: stream2?.getVideoTracks()[0]?.label || "", width: video.videoWidth || 0, height: video.videoHeight || 0, tip: captureTip(photos.length) }), emit = () => onChange(snapshot());
  function stop(note = "Camera closed. Photos remain in this session.") {
    generation++;
    let old = stream2;
    stream2 = null, old?.getTracks().forEach((t) => t.stop()), video.pause(), video.srcObject = null, state2 = "idle", message = note, emit();
  }
  async function enumerate() {
    try {
      devices = (await mediaDevices.enumerateDevices()).filter((d) => d.kind === "videoinput" && !isAvatar(d.label)).map((d) => ({ deviceId: d.deviceId, label: d.label || "Camera" }));
    } catch {
      devices = [];
    }
  }
  async function start(deviceId = "") {
    if (state2 === "starting") return;
    stop();
    let token = ++generation;
    state2 = "starting", message = "Waiting for camera permission and video\u2026", emit();
    let acquired = null;
    try {
      if (!mediaDevices?.getUserMedia) throw new Error("Camera access is unavailable. Open the localhost page in Quest Browser.");
      let base = { width: { ideal: 1280 }, height: { ideal: 960 }, frameRate: { ideal: 30, max: 30 } };
      try {
        acquired = await mediaDevices.getUserMedia({ audio: !1, video: { ...base, ...deviceId ? { deviceId: { exact: deviceId } } : { facingMode: { exact: "environment" } } } });
      } catch (error) {
        if (token !== generation) return;
        if (deviceId || !["OverconstrainedError", "NotFoundError"].includes(error.name)) throw error;
        if (await enumerate(), token !== generation) return;
        let candidate = devices.find((d) => isEnvironment(d.label));
        acquired = await mediaDevices.getUserMedia({ audio: !1, video: { ...base, ...candidate ? { deviceId: { exact: candidate.deviceId } } : {} } });
      }
      if (token !== generation) {
        acquired.getTracks().forEach((t) => t.stop());
        return;
      }
      let track = acquired.getVideoTracks()[0];
      if (!track || isAvatar(track.label) || isQuest && track.getSettings?.().facingMode === "user" && !isEnvironment(track.label)) throw new Error("Only a selfie camera is available. Check headset camera permissions for the room view.");
      stream2 = acquired, video.srcObject = acquired, video.muted = !0, video.playsInline = !0, await video.play();
      let deadline = Date.now() + readyTimeout;
      for (; token === generation && (!video.videoWidth || video.readyState < 2); ) {
        if (Date.now() > deadline) throw new Error("Camera connected, but no video is available. Close it and try again.");
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      if (token !== generation) {
        acquired.getTracks().forEach((t) => t.stop());
        return;
      }
      if (await enumerate(), token !== generation) {
        acquired.getTracks().forEach((t) => t.stop());
        return;
      }
      track.addEventListener?.("ended", () => {
        token === generation && stop("Camera disconnected. Photos retained; you can reopen the camera.");
      }, { once: !0 }), state2 = "active", message = "Environment camera ready \xB7 Aim with the headset \xB7 Right trigger to capture", emit();
    } catch (error) {
      if (acquired?.getTracks().forEach((t) => t.stop()), token !== generation) return;
      throw stream2 = null, video.pause(), video.srcObject = null, state2 = "error", message = cameraError(error), emit(), new Error(message);
    }
  }
  function addFrame(source, width, height, label) {
    if (!width || !height) throw new Error("Video is not ready. Wait before taking a photo.");
    let canvas2 = makeCanvas(), ratio = Math.min(1, 1280 / Math.max(width, height));
    canvas2.width = Math.round(width * ratio), canvas2.height = Math.round(height * ratio), canvas2.getContext("2d").drawImage(source, 0, 0, canvas2.width, canvas2.height);
    let image = canvas2.toDataURL("image/jpeg", 0.82);
    if (image.length > Math.ceil(ROOM_PHOTO_BYTES / 3) * 4) throw new Error("Photo too large. Try another shot.");
    let photo = { id: crypto.randomUUID(), image, width: canvas2.width, height: canvas2.height, capturedAt: (/* @__PURE__ */ new Date()).toISOString(), label };
    return photos.push(photo), message = `Photo ${photos.length} saved. ${captureTip(photos.length)}`, emit(), photo;
  }
  function capture() {
    if (state2 !== "active" || reading) throw new Error("Open the camera and wait for video before capturing");
    return addFrame(video, video.videoWidth, video.videoHeight, "Camera capture");
  }
  async function addFiles(files) {
    if (!reading) {
      reading = !0, emit();
      try {
        for (let file of files) {
          if (!["image/jpeg", "image/png"].includes(file.type) || file.size > 20 * 1024 * 1024) throw new Error("Choose a JPEG or PNG no larger than 20 MB");
          let bitmap = await createImageBitmap(file);
          try {
            addFrame(bitmap, bitmap.width, bitmap.height, "Uploaded photo");
          } finally {
            bitmap.close();
          }
        }
      } finally {
        reading = !1, emit();
      }
    }
  }
  function removeLast() {
    if (reading) throw new Error("Loading photos");
    photos.pop(), message = photos.length ? `${photos.length} photos retained. ${captureTip(photos.length)}` : "Photos cleared. Ready for new shots.", emit();
  }
  return { start, stop, capture, addFiles, removeLast, snapshot, stream: () => stream2, markSaved(id, ref) {
    let p = photos.find((p2) => p2.id === id);
    p && (p.reference = ref, p.image = ref.url, emit());
  }, remove(id) {
    photos = photos.filter((p) => p.id !== id), emit();
  }, getPhotos: () => photos.map((p) => ({ ...p })) };
}

// src/client/ui/startup-access.mjs
function createStartupAccess({ dialog, media, camera: camera2, scriptedMode: scriptedMode2, getXR = () => navigator.xr, onEnter }) {
  let $3 = (id) => dialog.querySelector("#" + id), ready = !1, busy2 = !1, xrMode2 = null, epoch = 0, valid = () => ready && media.snapshot().camera && (scriptedMode2 || media.snapshot().microphone);
  function show() {
    ready = valid(), $3("access-camera").textContent = ready ? "Camera \xB7 Ready for photos and demonstrations" : "Camera \xB7 Photos and demonstrations", scriptedMode2 || ($3("access-microphone").textContent = ready ? "Microphone \xB7 Ready for voice input" : "Microphone \xB7 Voice input"), $3("access-prepare").hidden = ready, $3("access-enter").hidden = !ready, $3("access-message").textContent = ready ? "Devices are ready. Enter Quest to allow spatial access before creating." : "Allow device access here before you start creating.", dialog.open || dialog.showModal();
  }
  function reset() {
    epoch++, ready = !1, busy2 = !1, camera2.stop(), media.release(), $3("access-prepare").disabled = !1, $3("access-enter").disabled = !1, show();
  }
  async function prepare() {
    if (busy2) return;
    busy2 = !0;
    let token = ++epoch;
    ready = !1, $3("access-prepare").disabled = !0, $3("access-message").textContent = "Allow camera access in the browser prompt\u2026", media.begin();
    try {
      if (await camera2.start(), token !== epoch) return;
      if (camera2.snapshot().state !== "active") throw new Error("Camera setup was interrupted. Please try again.");
      camera2.stop(), $3("access-camera").textContent = "Camera \xB7 Ready for photos and demonstrations", scriptedMode2 || ($3("access-message").textContent = "Allow microphone access in the browser prompt\u2026", (await media.mediaDevices.getUserMedia({ audio: { echoCancellation: !0, noiseSuppression: !0 } })).getTracks().forEach((track) => track.stop()), $3("access-microphone").textContent = "Microphone \xB7 Ready for voice input");
      let xr = getXR();
      if (!xr) throw new Error("WebXR is unavailable. Open this page in Quest Browser.");
      if (xrMode2 = await xr.isSessionSupported("immersive-ar") ? "immersive-ar" : null, !xrMode2) throw new Error("Mixed reality is unavailable. Open this page in Quest Browser with headset tracking enabled.");
      if (token !== epoch) return;
      media.seal(), ready = !0, show(), $3("access-enter").focus();
    } catch (error) {
      if (token !== epoch) return;
      camera2.stop(), media.release(), $3("access-camera").textContent = "Camera \xB7 Setup required", $3("access-message").textContent = uiText(error.message), $3("access-prepare").textContent = "Retry setup";
    } finally {
      token === epoch && (busy2 = !1, $3("access-prepare").disabled = !1);
    }
  }
  return dialog.addEventListener("cancel", (event) => event.preventDefault()), $3("access-microphone").hidden = scriptedMode2, $3("access-microphone").textContent = "Microphone \xB7 Voice input", $3("access-prepare").onclick = prepare, $3("access-enter").onclick = () => {
    if (!busy2) {
      if (!valid()) {
        ready = !1, show();
        return;
      }
      busy2 = !0, $3("access-enter").disabled = !0, $3("access-message").textContent = "Allow spatial access in Quest to enter your scene\u2026", Promise.resolve(onEnter(xrMode2)).then((entered) => {
        entered ? dialog.close() : $3("access-message").textContent = "Could not enter Quest. Allow spatial access and try Enter Quest again.";
      }).finally(() => {
        busy2 = !1, $3("access-enter").disabled = !1;
      });
    }
  }, { show, reset, ready: valid, snapshot: () => ({ ...media.snapshot(), ready: valid(), open: dialog.open }), dispose() {
    epoch++, camera2.stop(), media.release();
  } };
}

// src/client/showcase/mr-performance.mjs
var noop2 = () => null, createMRPerformance = noop2;

// src/client/rendering/production-studio.mjs
import * as THREE27 from "three";

// src/client/rendering/trigger-region-layer.mjs
import * as THREE26 from "three";
function createTriggerRegionLayer(world2) {
  let root = new THREE26.Group();
  world2.add(root);
  let key = "", outlines2 = /* @__PURE__ */ new Map();
  return {
    frame(scene2, { editing: editing2 = !1, states = [] } = {}) {
      let regions = scene2.triggerRegions || [], next = JSON.stringify(regions);
      if (next !== key) {
        key = next;
        for (let m of outlines2.values())
          m.traverse((o) => {
            o.geometry?.dispose(), o.material?.dispose();
          });
        root.clear(), outlines2.clear();
        for (let r of regions) {
          let m = new THREE26.LineLoop(new THREE26.BufferGeometry().setFromPoints(r.points.map(([x, z]) => new THREE26.Vector3(x, r.floorY + 0.018, z))), new THREE26.LineBasicMaterial({ color: 10127071, toneMapped: !1 })), shape = new THREE26.Shape(r.points.map(([x, z]) => new THREE26.Vector2(x, z))), fill = new THREE26.Mesh(new THREE26.ShapeGeometry(shape), new THREE26.MeshBasicMaterial({ color: 10127071, transparent: !0, opacity: 0.12, side: THREE26.DoubleSide, depthWrite: !1, toneMapped: !1 }));
          fill.rotation.x = Math.PI / 2, fill.position.y = r.floorY + 0.012, m.add(fill), root.add(m), outlines2.set(r.id, m);
        }
      }
      for (let [id, m] of outlines2) {
        let related = states.filter((s) => s.regionId === id);
        m.visible = editing2 || related.length > 0, m.material.color.set(related.some((s) => s.fired) ? 6473113 : related.some((s) => s.inside) ? 16764784 : 10127071);
        for (let child of m.children) child.material.color.copy(m.material.color);
      }
    }
  };
}

// src/shared/production-intent.mjs
function productionSpecialist(text, { scene: scene2, ids = [] }) {
  let selected = scene2.objects.filter((o) => ids.includes(o.id));
  if (languagePattern("specialist.flow").test(text) || scene2.floods?.some((f) => ids.includes(f.objectId || f.doorId)) && languagePattern("specialist.flowAdjustment").test(text)) return null;
  let path = languagePattern("specialist.path").test(text);
  return languagePattern("specialist.camera").test(text) ? "camera" : selected.some((o) => o.kind === "light") || languagePattern("specialist.lighting").test(text) ? "lighting" : selected.some((o) => o.kind === "camera") || languagePattern("specialist.camera").test(text) ? "camera" : selected.some((o) => o.track) && languagePattern("specialist.trigger").test(text) || selected.length && (path || selected.some((o) => o.track) && languagePattern("specialist.motionAdjustment").test(text)) ? "object-motion" : languagePattern("specialist.objectEdit").test(text) ? "camera" : null;
}

// src/shared/preview-scope.mjs
function previewScope(scene2, ids = []) {
  let entities = [...scene2.objects || [], ...scene2.actors || []], byId = new Map(entities.map((o) => [o.id, o])), owners = [...new Set(ids)], missingIds = owners.filter((id) => !byId.has(id)), targets = new Set(owners.filter((id) => byId.has(id))), cast = scene2.doorPerformance, path = scene2.behaviors?.path, binding = scene2.behaviors?.binding;
  if (cast?.enabled && targets.has(cast.doorId))
    for (let id of cast.actorIds) byId.has(id) && targets.add(id);
  if (binding && path?.id === binding.pathId && targets.has(binding.doorId))
    for (let id of path.actorIds) byId.has(id) && targets.add(id);
  let targetIds = [...targets], objectIds = (scene2.objects || []).filter((o) => targets.has(o.id)).map((o) => o.id), actorIds = (scene2.actors || []).filter((a) => targets.has(a.id) && (a.motionPlan || actorMotionId(a))).map((a) => a.id), floodIds = (scene2.floods || []).filter((f) => targets.has(f.objectId || f.doorId)).map((f) => f.id), playable = !missingIds.length && (actorIds.length > 0 || floodIds.length > 0 || (scene2.objects || []).some((o) => targets.has(o.id) && o.track));
  return { ownerIds: owners, targetIds, objectIds, actorIds, floodIds, missingIds, playable, label: targetIds.map((id) => entityLabel(byId.get(id)) || id).join(", ") };
}
function isolatePreviewActors(scene2, frames, scope) {
  if (!scope) return frames;
  let active = new Set(scope.actorIds), saved = new Map((scene2.actors || []).map((a) => [a.id, a]));
  return frames.map((f) => {
    let a = saved.get(f.id);
    return active.has(f.id) || !a ? f : { ...f, ...a, position: [...a.position], assetId: a.assetId, motionId: null, motionPlan: null, motionOffset: [0, 0, 0], pose: "rest", clipTime: 0, preview: !1, visible: !0 };
  });
}

// src/shared/monitor-pose.mjs
import { Vector3 as Vector326, Quaternion as Quaternion11, Euler as Euler3 } from "three";
function uprightMonitorPose(position, quaternion, previousYaw = 0) {
  let forward = new Vector326(0, 0, -1).applyQuaternion(new Quaternion11(...quaternion)), yaw = Math.hypot(forward.x, forward.z) > 1e-4 ? Math.atan2(-forward.x, -forward.z) : previousYaw, q2 = new Quaternion11().setFromEuler(new Euler3(0, yaw, 0));
  return { position: new Vector326(...position).add(new Vector326(0, -0.2, -1.45).applyQuaternion(q2)).toArray(), quaternion: q2.toArray(), yaw };
}

// src/shared/camera-view-intent.mjs
function cameraViewIntent(text) {
  let words2 = String(text).trim().replace(languagePattern("punctuation.camera-view-intent.1"), "").toLowerCase();
  if (languagePattern("camera.summon").test(words2)) return "preview";
  let command = words2.replace(languagePattern("camera.summonPrefix"), "").replace(languagePattern("camera.politePrefix"), "");
  return languagePattern("camera.recenter").test(command) ? "recenter" : languagePattern("camera.preview").test(command) || languagePattern("camera.framingQuestion").test(command) ? "preview" : languagePattern("camera.next").test(command) ? "next" : languagePattern("camera.previous").test(command) ? "previous" : languagePattern("camera.close").test(command) ? "close" : null;
}

// src/client/rendering/production-studio.mjs
function createProductionStudio({ world: world2, scene: scene2, renderer: renderer2, api: api2, getState, getSelection, getView, getSpatialKey, getMeshes, pickGround = () => null, canCreate = () => !0, canMonitor = () => !0, assets, onState, onPreview, onChange, onSelect = () => {
}, onPlay, notice, hideMenu, pauseScene, transport }) {
  let editing2 = !1, session = null, transitioning = !1, editor = null, pending = null, saving2 = !1, request = null, monitor = null, selectedCamera = null, playing = !1, time = 0, lastMonitor = 0, definitionKey = "", speed = 0.5, neutral = !1, triggerRuntime = createTrackTriggerRuntime(), triggerKey = "", triggerStatusKey = "", regionLayer = createTriggerRegionLayer(world2), rig2 = createCinemaLayer(world2), guides = new THREE27.Group();
  world2.add(guides);
  let hasPlayed = !1, focusIds = [], activeScope = null, modeTransition = null, previewRevision = null, vec2 = (p) => new THREE27.Vector3(...p), quat = (q2) => new THREE27.Quaternion(...q2), state2 = () => getState(), definition = () => pending?.scene || state2().scene, changed = () => onChange(), focus = () => previewScope(state2().scene, editing2 ? getSelection() : focusIds), requestPlay = (options) => onPlay ? onPlay(options) : play(options);
  function clearGuides() {
    for (let o of [...guides.children])
      o.geometry?.dispose(), o.material?.dispose(), guides.remove(o);
  }
  function dirty() {
    return !!editor || !!pending;
  }
  function requireEdit() {
    if (!editing2 || session?.mode !== "edit" || transitioning) throw Error("Enter edit mode first.");
    closeMonitor();
  }
  function transformable() {
    return editor?.type === "poses";
  }
  function savedCameras() {
    return state2().scene.objects.filter(isCamera);
  }
  function closeMonitor() {
    monitor && (scene2.remove(monitor.screen), monitor.screen.geometry.dispose(), monitor.screen.material.dispose(), monitor.target.dispose(), monitor.actors.dispose(), monitor.content.userData.cinema?.dispose(), monitor.flood?.dispose(), monitor.content.traverse((o) => {
      o.geometry?.dispose(), o.material?.dispose();
    }), monitor = null, changed());
  }
  async function syncMode(next) {
    transitioning = !0, changed();
    try {
      session = await api2("/api/authoring/session", { ...session ? { id: session.id, epoch: session.epoch } : {}, mode: next }), setApiSession(session);
    } catch (error) {
      throw session = null, setApiSession(null), notice("Mode sync failed. Refresh and retry: " + error.message), error;
    } finally {
      transitioning = !1, changed();
    }
  }
  function cancel() {
    if (saving2) {
      notice("Saving. Undo will be available when finished.");
      return;
    }
    let hadPreview = !!pending;
    request && api2("/api/cinema/cancel", {}).catch(() => {
    }), request?.abort(), request = null, editor = null, pending = null, clearGuides(), hadPreview && onPreview(null), neutral = !1, changed();
  }
  function selectCamera(id) {
    let list = savedCameras();
    if (!list.length) throw Error("Create and save a virtual camera first.");
    let selected = editing2 ? list.find((c) => getSelection().includes(c.id)) : null, target = id ? list.find((c) => c.id === id) : selected || list.find((c) => c.id === selectedCamera) || list[0];
    if (!target) throw Error("Select a saved scene camera.");
    return selectedCamera = target.id, target;
  }
  function openMonitor(id) {
    if (!session || !["edit", "explore"].includes(session.mode) || dirty() || transitioning || saving2 || !canMonitor()) throw Error("A Save or B Cancel the current edit before viewing a saved camera.");
    let camera2 = selectCamera(id);
    closeMonitor(), world2.updateMatrixWorld(!0);
    let content = createVirtualScene(state2().scene, world2.matrixWorld), actors = createActorLayer(content.userData.contentWorld, assets), flood = content.userData.flood, target = new THREE27.WebGLRenderTarget(768, 432), screen = new THREE27.Mesh(new THREE27.PlaneGeometry(1.08, 0.6075), new THREE27.MeshBasicMaterial({ map: target.texture, toneMapped: !1, side: THREE27.DoubleSide, depthTest: !1, depthWrite: !1 }));
    screen.renderOrder = 18, scene2.add(screen), monitor = { content, actors, flood, target, screen, revision: state2().revision, key: getSpatialKey() }, recenterMonitor(), hideMenu(), notice(`${entityLabel(camera2)} \xB7 A Recenter \xB7 B Close \xB7 Save camera edits before reopening`), changed();
  }
  function recenterMonitor() {
    if (!monitor) return !1;
    let view = getView(), pose = uprightMonitorPose(view.getWorldPosition(new THREE27.Vector3()).toArray(), view.getWorldQuaternion(new THREE27.Quaternion()).toArray(), monitor.yaw || 0);
    return monitor.screen.position.fromArray(pose.position), monitor.screen.quaternion.fromArray(pose.quaternion), monitor.yaw = pose.yaw, monitor.screen.updateMatrixWorld(!0), changed(), !0;
  }
  function adjustCamera() {
    let id = selectedCamera;
    if (requireEdit(), !id) throw Error("Select a saved camera first.");
    onSelect(id), startPoses();
  }
  function cameraStep(delta) {
    let list = savedCameras();
    if (!list.length) return openMonitor();
    let index = list.findIndex((c) => c.id === selectedCamera);
    selectedCamera = list[(index + delta + list.length) % list.length].id, monitor ? (notice("Current camera: " + entityLabel(list.find((c) => c.id === selectedCamera))), changed()) : openMonitor(selectedCamera);
  }
  function startPoses() {
    if (requireEdit(), dirty() || saving2 || request) throw Error("Save or cancel the current operation first.");
    let targets = [...state2().scene.objects, ...state2().scene.actors || []].filter((o) => getSelection().includes(o.id));
    if (!targets.length) throw Error("Select an object first.");
    if (targets.some((o) => o.editable !== !0 && (o.id === "ground" || o.category === "structure" || /^(wall|ceiling)(_|-|$)/.test(o.id)))) throw Error("Reference structure is locked.");
    pauseScene(), playing = !1;
    let poses = targets.map((o) => ({ id: o.id, position: [...o.position], quaternion: objectQuaternion(o) })), forward = getView().getWorldDirection(new THREE27.Vector3()).transformDirection(world2.matrixWorld.clone().invert());
    forward.y = 0, forward.normalize(), editor = { type: "poses", poses, revision: state2().revision, key: getSpatialKey(), forward, grab: null }, neutral = !1, hideMenu(), changed(), notice("Transform: L stick Move \xB7 L grip + stick Height \xB7 R stick Rotate \xB7 R grip Grab \xB7 A Save \xB7 B Revert");
  }
  function drawControls() {
    if (clearGuides(), editor?.type !== "curve") return;
    let points = curvePoints(editor.controls, !0), path = new THREE27.CurvePath();
    for (let i = 1; i < points.length; i++) path.add(new THREE27.LineCurve3(vec2(points[i - 1]), vec2(points[i])));
    let line = new THREE27.Mesh(new THREE27.TubeGeometry(path, Math.min(256, points.length * 2), 0.022, 6, !1), new THREE27.MeshBasicMaterial({ color: "#ad95ff", toneMapped: !1 }));
    line.userData.curveSegment = !0, guides.add(line), editor.controls.forEach((p, index) => {
      let m = new THREE27.Mesh(new THREE27.SphereGeometry(0.065, 12, 8), new THREE27.MeshBasicMaterial({ color: editor.grab?.index === index ? "#ffffff" : "#ffcf70", depthTest: !1, toneMapped: !1 }));
      m.position.fromArray(p), m.userData.controlIndex = index, m.renderOrder = 10, guides.add(m);
    });
  }
  function editCurve(id) {
    if (requireEdit(), dirty()) throw Error("Save or cancel the current operation first.");
    let c = state2().scene.curves?.find((c2) => c2.id === id);
    if (!c) throw Error("Save and select a curve first.");
    editor = { type: "curve", id, controls: editableControls(c), revision: state2().revision, key: getSpatialKey(), grab: null }, drawControls(), hideMenu(), changed(), notice("Grip and pull control points \xB7 A Save smoothed curve \xB7 B Cancel");
  }
  function localHand(controller) {
    return world2.updateMatrixWorld(!0), controller.updateMatrixWorld(!0), world2.matrixWorld.clone().invert().multiply(controller.matrixWorld);
  }
  function grab(controller, ray) {
    if (!editor || editor.type === "placement" || editor.grab || saving2) return !1;
    let hand = localHand(controller);
    if (editor.type === "poses") editor.grab = { controller, start: hand.clone().invert(), poses: structuredClone(editor.poses) };
    else {
      let hit = ray.intersectObjects(guides.children, !1)[0];
      if (!hit) return !1;
      let index = hit.object.userData.controlIndex;
      if (index === void 0) {
        if (editor.controls.length >= 64) throw Error("Up to 64 control points.");
        let point2 = world2.worldToLocal(hit.point.clone()), best = 1 / 0;
        index = 1;
        for (let i = 1; i < editor.controls.length; i++) {
          let near = new THREE27.Line3(vec2(editor.controls[i - 1]), vec2(editor.controls[i])).closestPointToPoint(point2, !0, new THREE27.Vector3()).distanceToSquared(point2);
          near < best && (best = near, index = i);
        }
        editor.controls.splice(index, 0, point2.toArray());
      }
      editor.grab = { controller, index, start: hand.clone().invert(), point: vec2(editor.controls[index]) }, drawControls();
    }
    return neutral = !1, changed(), !0;
  }
  function release() {
    editor?.grab && (editor.grab = null, neutral = !1, changed());
  }
  function input(sources, dt) {
    if (!editor || saving2) return;
    if (dt = Math.min(dt, 0.05), editor.revision !== state2().revision || editor.key !== getSpatialKey()) {
      cancel(), notice("Scene or alignment changed. Edits reverted.");
      return;
    }
    if (editor.grab) {
      let g = editor.grab;
      if (!g.controller.visible) {
        cancel(), notice("Tracking interrupted. Edits cancelled.");
        return;
      }
      let delta2 = localHand(g.controller).multiply(g.start), alpha = 1 - Math.exp(-20 * dt);
      if (editor.type === "poses") for (let i = 0; i < editor.poses.length; i++) {
        let base = g.poses[i], matrix = delta2.clone().multiply(new THREE27.Matrix4().compose(vec2(base.position), quat(base.quaternion), new THREE27.Vector3(1, 1, 1))), p = new THREE27.Vector3(), q22 = new THREE27.Quaternion();
        matrix.decompose(p, q22, new THREE27.Vector3()), editor.poses[i].position = vec2(editor.poses[i].position).lerp(p, alpha).toArray().map((v2) => THREE27.MathUtils.clamp(v2, -99, 99)), editor.poses[i].quaternion = quat(editor.poses[i].quaternion).slerp(q22, alpha).toArray();
      }
      else {
        let previousY = editor.controls[g.index][1];
        editor.controls[g.index] = g.point.clone().applyMatrix4(delta2).toArray().map((v2) => THREE27.MathUtils.clamp(v2, -99, 99)), state2().scene.curves.find((c) => c.id === editor.id)?.mode === "floor2d" && (editor.controls[g.index][1] = previousY), drawControls();
      }
      return;
    }
    if (editor.type !== "poses") return;
    let pad = (hand) => sources.find((s) => s.handedness === hand)?.gamepad?.axes || [], left = pad("left"), right = pad("right"), axes = [left[2] || 0, left[3] || 0, right[2] || 0, right[3] || 0], grip = sources.find((s) => s.handedness === "left")?.gamepad?.buttons?.[1], vertical = !!(grip && (grip.pressed || grip.value > 0.65));
    if (editor.vertical !== vertical && (editor.vertical = vertical, neutral = !1), !neutral) {
      neutral = axes.every((v2) => Math.abs(v2) < 0.18);
      return;
    }
    let [x, y, rx, ry] = axes.map((v2) => Math.abs(v2) > 0.18 ? v2 : 0);
    if (!x && !y && !rx && !ry) return;
    let forward = editor.forward, side = new THREE27.Vector3(-forward.z, 0, forward.x), delta = vertical ? new THREE27.Vector3(0, -y * speed * dt, 0) : side.multiplyScalar(x).addScaledVector(forward, -y).multiplyScalar(speed * dt), q2 = new THREE27.Quaternion().setFromEuler(new THREE27.Euler(-ry * dt * 0.8, -rx * dt * 0.8, 0, "YXZ"));
    for (let p of editor.poses)
      p.position = vec2(p.position).add(delta).toArray().map((v2) => THREE27.MathUtils.clamp(v2, -99, 99)), p.quaternion = q2.clone().multiply(quat(p.quaternion)).normalize().toArray();
  }
  function beginPlacement(command) {
    if (requireEdit(), dirty() || saving2 || request || !canCreate()) throw Error("Save or cancel the current operation first.");
    applyCinema(state2().scene, groundCreateCommand(command, [0, 0, 0])), pauseScene(), clearGuides();
    let cursor = new THREE27.Mesh(new THREE27.RingGeometry(0.18, 0.25, 48), new THREE27.MeshBasicMaterial({ color: "#b79bea", side: THREE27.DoubleSide, toneMapped: !1 }));
    cursor.rotation.x = -Math.PI / 2, cursor.visible = !1, guides.add(cursor), editor = { type: "placement", command: structuredClone(command), point: null, cursor, revision: state2().revision, key: getSpatialKey() }, hideMenu(), changed(), notice("Point at ground with your right hand \xB7 A Create \xB7 B Cancel");
  }
  function updatePlacement(ray) {
    if (editor?.type !== "placement" || saving2) return;
    if (editor.revision !== state2().revision || editor.key !== getSpatialKey()) {
      cancel(), notice("Scene or alignment changed. Placement cancelled.");
      return;
    }
    let hit = ray && pickGround(ray), point2 = hit?.toArray?.() || hit || null, valid = !!point2;
    try {
      valid && groundCreateCommand(editor.command, point2);
    } catch {
      valid = !1;
    }
    let wasValid = !!editor.point;
    editor.point = valid ? [...point2] : null, editor.cursor.visible = valid, valid && editor.cursor.position.fromArray(point2).add(new THREE27.Vector3(0, 0.015, 0)), wasValid !== valid && changed();
  }
  function preview(command) {
    if (requireEdit(), dirty()) throw Error("Save or cancel the current operation first.");
    if (command.op === "create") return beginPlacement(command);
    pending = { command, scene: applyCinema(state2().scene, command), revision: state2().revision, key: getSpatialKey() }, onPreview(pending.scene), changed();
  }
  async function save() {
    if (requireEdit(), saving2) return;
    if (editor?.grab) throw Error("Release the grip before saving.");
    if (editor && (editor.key !== getSpatialKey() || editor.revision !== state2().revision))
      throw cancel(), Error("Scene or alignment changed. Choose a new point or restart editing.");
    let command = editor?.type === "placement" ? groundCreateCommand(editor.command, editor.point) : editor?.type === "poses" ? { op: "poses", poses: editor.poses } : editor?.type === "curve" ? { op: "curve", id: editor.id, controls: editor.controls, smooth: !0 } : pending?.command;
    if (!command) return;
    let revision = editor?.revision ?? pending.revision;
    if (revision !== state2().revision) throw Error("Scene changed. Cancel and restart editing.");
    saving2 = !0, changed();
    try {
      let next = await api2("/api/cinema/commit", { revision, command });
      editor = null, pending = null, clearGuides(), onPreview(null), onState(next), notice(command.op === "create" ? "Created at your point \xB7 Use Transform to adjust position and height." : "Saved \xB7 Left grip or Interaction \u2192 Rehearse selection.");
    } finally {
      saving2 = !1, changed();
    }
    command.op === "create" && onSelect(command.id);
  }
  function play({ restart = !1, ids } = {}) {
    if (editing2 || session?.mode !== "explore" || transitioning || dirty() || saving2) throw Error("Save edits, click the right stick to explore, then use left grip to rehearse.");
    let next = previewScope(state2().scene, ids ?? focusIds);
    if (!next.ownerIds.length || next.missingIds.length) throw Error("Enter edit mode and select an object to rehearse.");
    if (!next.playable) throw Error("Bind a curve or save an interaction for this object first.");
    let same = activeScope && JSON.stringify(activeScope) === JSON.stringify(next) && previewRevision === state2().revision;
    if (playing && !restart && same) return;
    let first = !hasPlayed || restart || !same;
    try {
      transport(first ? "start" : "resume", next);
    } catch (error) {
      throw activeScope = null, hasPlayed = !1, playing = !1, time = 0, pauseScene(), changed(), error;
    }
    first ? (time = 0, triggerRuntime.sync(state2().scene), triggerKey = JSON.stringify(state2().scene), triggerRuntime.start(next.objectIds)) : triggerRuntime.resume(), focusIds = [...next.ownerIds], activeScope = next, previewRevision = state2().revision, hasPlayed = !0, playing = !0, hideMenu(), notice(`Rehearsing: ${next.label} \xB7 Left grip Pause / Resume \xB7 Right stick click Edit`), changed();
  }
  function pause() {
    playing = !1, triggerRuntime.pause(), transport("pause", activeScope), changed();
  }
  async function handleText(text, context) {
    let viewAction = cameraViewIntent(text);
    if (viewAction === "recenter")
      return monitor ? (recenterMonitor(), "Monitor recentered upright. Camera pose and playback are preserved.") : "Ask Camera Agent to open the monitor first.";
    if (viewAction === "close")
      return closeMonitor(), "Camera monitor closed.";
    if (viewAction) {
      if (context?.revision !== void 0 && context.revision !== state2().revision) throw Error("Scene changed while speaking. Select the camera again.");
      if (dirty() || saving2 || transitioning || request) return "A Save or B Cancel the current edit before viewing a camera.";
      if (viewAction === "preview") {
        let ids = context?.targetIds || getSelection(), camera2 = state2().scene.objects.find((o) => isCamera(o) && ids.includes(o.id));
        openMonitor(camera2?.id);
      } else cameraStep(viewAction === "next" ? 1 : -1);
      return `Viewing saved camera ${entityLabel(savedCameras().find((c) => c.id === selectedCamera))}. B Close; editing closes the monitor.`;
    }
    if (editor?.type === "poses") {
      if (languagePattern("transform.faster").test(text))
        return speed = Math.min(4, speed * 2), `Movement speed is now ${speed} m/s.`;
      if (languagePattern("transform.slower").test(text))
        return speed = Math.max(0.025, speed / 2), `Movement speed is now ${speed} m/s.`;
      if (languagePattern("transform.verticalRequest").test(text)) {
        let metres = languagePattern("transform.meters").test(text) && !languagePattern("transform.centimeters").test(text), amount = Number(text.match(/\d+(?:\.\d+)?/)?.[0] || 20) * (metres ? 1 : 0.01) * (languagePattern("transform.lower").test(text) ? -1 : 1);
        for (let p of editor.poses) p.position[1] = THREE27.MathUtils.clamp(p.position[1] + amount, -99, 99);
        return "Height preview adjusted. A Save, B Revert.";
      }
      return "A Save or B Cancel this edit. You can also say faster, slower, or raise by 20 centimetres.";
    }
    if (dirty()) return "A Save or B Cancel the current preview first.";
    let words2 = text.trim().replace(languagePattern("punctuation.production-studio.1"), "");
    if (languagePattern("preview.stop").test(words2))
      return pause(), "Rehearsal paused. Left grip to resume.";
    if (languagePattern("preview.play").test(words2))
      return await requestPlay({ restart: languagePattern("preview.restart").test(words2) }), `Rehearsing ${activeScope?.label || focus().label}. Left grip to pause / resume.`;
    let targetIds = editing2 ? context?.targetIds || getSelection() : focusIds, specialist = productionSpecialist(text, { scene: state2().scene, ids: targetIds });
    if (editing2 && !specialist) return null;
    if (request || transitioning) throw Error("The previous request is still processing.");
    let captured = session && { ...session };
    if (context?.revision !== void 0 && context.revision !== state2().revision) throw Error("Scene changed while speaking. Please retry.");
    if (context?.productionEpoch && context.productionEpoch !== captured?.epoch) throw Error("Mode changed while speaking. Please retry.");
    request = new AbortController();
    let controller = request;
    changed();
    try {
      let result = await api2("/api/cinema/agent", { prompt: text, revision: state2().revision, ids: targetIds, curveId: context?.curveId || null, specialist: specialist || "camera" }, { signal: controller.signal, timeoutMs: 125e3 });
      if (controller.signal.aborted || session?.epoch !== captured?.epoch) return null;
      if (result.action === "edit") {
        if (result.command.op === "create")
          return request = null, beginPlacement(result.command), "Placement ready. Point at ground with your right hand. A Create, B Cancel.";
        preview(result.command);
      } else result.action === "editCurve" ? editCurve(result.id) : result.action === "preview" ? openMonitor(result.id) : result.action === "next" ? cameraStep(1) : result.action === "previous" ? cameraStep(-1) : result.action === "close" ? closeMonitor() : result.action === "play" ? (request = null, changed(), await requestPlay(result.id ? { ids: [result.id] } : {})) : result.action === "pause" && pause();
      return result.reply || "Done.";
    } finally {
      request === controller && (request = null), changed();
    }
  }
  function frame(dt, actors = [], transforms = [], flood = { states: [] }, tracking = {}) {
    let d = definition(), next = JSON.stringify(d);
    next !== definitionKey && (definitionKey = next, rig2.sync(d)), activeScope && previewRevision !== state2().revision && (activeScope = null, hasPlayed = !1, playing = !1, time = 0, pauseScene(), notice("Scene updated. Select an object again to rehearse."), changed()), !editing2 && playing && (time += Math.min(dt, 0.1));
    let targets = [...d.objects, ...(d.actors || []).map((o) => ({ ...o, position: actors.find((a) => a.id === o.id)?.position || o.position }))], savedKey = JSON.stringify(state2().scene);
    savedKey !== triggerKey && (triggerKey = savedKey, triggerRuntime.sync(state2().scene));
    let triggerState = triggerRuntime.tick({ ...tracking, active: !!tracking.active && !editing2 && playing });
    regionLayer.frame(d, { editing: editing2, states: triggerState.states });
    let statusKey = triggerState.states.map((s) => s.id + ":" + (s.fired ? "fired" : s.inside ? Math.floor(s.dwell) : "waiting")).join("|");
    if (statusKey !== triggerStatusKey) {
      triggerStatusKey = statusKey;
      let s = triggerState.states[0];
      s && notice(s.fired ? "Region condition met. Starting this object's movement." : s.inside ? `Dwell in region: ${s.dwell.toFixed(1)} / ${s.seconds} s` : `Enter the floor region \xB7 Dwell continuously for ${s.seconds} s`);
    }
    let activeIds = activeScope?.objectIds || [], frames = rig2.frame(editing2 ? null : time, targets, [...transforms, ...editor?.type === "poses" ? editor.poses : []], activeIds, triggerState.clocks);
    for (let p of frames) {
      let mesh = getMeshes().get(p.id);
      if (mesh) {
        if (isRig(mesh.userData.definition) && (mesh.visible = editing2, !mesh.userData.cinemaGuide)) {
          let arrow2 = new THREE27.ArrowHelper(new THREE27.Vector3(0, 0, -1), new THREE27.Vector3(), 2.5, isCamera(mesh.userData.definition) ? 5554943 : 16767874, 0.6, 0.3);
          mesh.add(arrow2), mesh.userData.cinemaGuide = arrow2;
        }
        (editor?.poses?.some((o) => o.id === p.id) || mesh.userData.definition.track) && (mesh.position.fromArray(p.position), mesh.quaternion.fromArray(p.quaternion));
      }
    }
    if (monitor) {
      if (dirty() || !canMonitor() || monitor.revision !== state2().revision || monitor.key !== getSpatialKey())
        return closeMonitor(), frames;
      let now = performance.now();
      if (now - lastMonitor > 1e3 / 24) {
        lastMonitor = now;
        let w = monitor.content.userData.contentWorld;
        w.matrix.copy(world2.matrixWorld), w.matrixWorldNeedsUpdate = !0, monitor.actors.apply(actors, { clean: !1 }), applyRecordedTransforms(monitor.content, [...transforms, ...frames.filter((p) => d.objects.find((o) => o.id === p.id)?.track)]), monitor.flood?.frame(flood, { showRegions: !1 });
        let cameraLayer = monitor.content.userData.cinema;
        cameraLayer?.frame(editing2 ? null : time, targets, [], activeIds, triggerState.clocks);
        let camera2 = cameraLayer?.cameras.get(selectedCamera);
        if (camera2) {
          monitor.content.updateMatrixWorld(!0);
          let previous = renderer2.getRenderTarget(), xr = renderer2.xr.enabled;
          try {
            renderer2.xr.enabled = !1, renderer2.setRenderTarget(monitor.target), renderer2.render(monitor.content, camera2);
          } finally {
            renderer2.setRenderTarget(previous), renderer2.xr.enabled = xr;
          }
        }
      }
    }
    return frames;
  }
  return {
    initialize: () => modeTransition = syncMode("edit"),
    ready: () => modeTransition,
    setEditing(value, scope = value ? "edit" : "explore") {
      return transitioning ? !1 : session?.mode === scope && editing2 === value ? !0 : dirty() || saving2 || request ? (notice("Save or cancel the current operation first."), !1) : (!value && scope === "explore" && (focusIds = [...getSelection()]), editing2 = value, closeMonitor(), triggerRuntime.stop(), playing = !1, hasPlayed = !1, activeScope = null, time = 0, pauseScene(), neutral = !1, modeTransition = syncMode(scope), modeTransition.catch(() => {
      }), !0);
    },
    cancel,
    save,
    startPoses,
    editCurve,
    grab,
    release,
    input,
    frame,
    handleText,
    preview,
    openMonitor,
    closeMonitor,
    recenterMonitor,
    adjustCamera,
    cameraStep,
    updatePlacement,
    create(kind) {
      beginPlacement({ op: "create", id: "rig-" + crypto.randomUUID(), kind });
    },
    async complete() {
      if (requireEdit(), dirty()) throw Error("Save the current tool edits first.");
      saving2 = !0, changed();
      try {
        onState(await api2("/api/cinema/commit", { revision: state2().revision, command: { op: "complete" } })), notice("Setup complete. Explore, rehearse and record.");
      } finally {
        saving2 = !1, changed();
      }
    },
    play,
    pause,
    stopClock() {
      playing = !1, triggerRuntime.stop();
    },
    isolateActors: (frames) => isolatePreviewActors(state2().scene, frames, activeScope || { actorIds: frames.filter((f) => !f.preview).map((f) => f.id) }),
    allowsInteraction: (ids) => !activeScope || playing && ids.every((id) => activeScope.targetIds.includes(id)),
    cameraView: () => !editing2 && selectedCamera ? rig2.cameras.get(selectedCamera) : null,
    livePoses: () => editor?.type === "poses" ? editor.poses.map((p) => ({ ...p, yaw: new THREE27.Euler().setFromQuaternion(quat(p.quaternion), "YXZ").y })) : [],
    state: () => ({ editing: editing2, epoch: session?.epoch, tool: editor?.type === "poses" ? "transform" : editor?.type || null, vertical: !!editor?.vertical, placing: editor?.type === "placement", placement: editor?.type === "placement" ? { kind: editor.command.kind, point: editor.point ? [...editor.point] : null, visible: editor.cursor.visible } : null, dirty: dirty(), saving: saving2, requesting: !!request, transitioning, monitor: !!monitor, monitorPose: monitor ? { position: monitor.screen.position.toArray(), quaternion: monitor.screen.quaternion.toArray() } : null, triggers: triggerRuntime.snapshot(), selectedCamera, cameraName: entityLabel(savedCameras().find((c) => c.id === selectedCamera)), playing, time, speed, previewIds: focus().targetIds, previewLabel: focus().label, canPreview: !!focus().playable, activePreviewIds: activeScope?.targetIds || [], previewObjectIds: activeScope?.objectIds || [] }),
    busy: () => dirty() || saving2 || !!request || transitioning || !session,
    manipulating: () => !!editor && editor.type !== "placement"
  };
}

// src/client/app.mjs
var clientContext = {
  get $() {
    return $2;
  },
  get acceptState() {
    return acceptState;
  },
  get action() {
    return action;
  },
  get actorViewPosition() {
    return actorViewPosition;
  },
  get alignedMode() {
    return alignedMode;
  },
  set alignedMode(value) {
    alignedMode = value;
  },
  get alignment() {
    return alignment;
  },
  set alignment(value) {
    alignment = value;
  },
  get alignmentReturn() {
    return alignmentReturn;
  },
  set alignmentReturn(value) {
    alignmentReturn = value;
  },
  get alignmentStickReady() {
    return alignmentStickReady;
  },
  set alignmentStickReady(value) {
    alignmentStickReady = value;
  },
  get alignmentVertical() {
    return alignmentVertical;
  },
  set alignmentVertical(value) {
    alignmentVertical = value;
  },
  get api() {
    return api;
  },
  get busy() {
    return busy;
  },
  get calibrationCursor() {
    return calibrationCursor;
  },
  get calibrationHint() {
    return calibrationHint;
  },
  get calibrationMarkers() {
    return calibrationMarkers;
  },
  get camera() {
    return camera;
  },
  get cancelTransform() {
    return cancelTransform;
  },
  get cancelVolume() {
    return cancelVolume;
  },
  get captureUI() {
    return captureUI;
  },
  get closeObjectInteraction() {
    return closeObjectInteraction;
  },
  get controllers() {
    return controllers;
  },
  get controls() {
    return controls;
  },
  get creationPose() {
    return creationPose;
  },
  set creationPose(value) {
    creationPose = value;
  },
  get creationReady() {
    return creationReady;
  },
  get currentJob() {
    return currentJob;
  },
  set currentJob(value) {
    currentJob = value;
  },
  get currentView() {
    return currentView;
  },
  get curveLayer() {
    return curveLayer;
  },
  get desktopUI() {
    return desktopUI;
  },
  set desktopUI(value) {
    desktopUI = value;
  },
  get director() {
    return director;
  },
  set director(value) {
    director = value;
  },
  get doorGrab() {
    return doorGrab;
  },
  get draftInputBlocked() {
    return draftInputBlocked;
  },
  set draftInputBlocked(value) {
    draftInputBlocked = value;
  },
  get draftTool() {
    return draftTool;
  },
  get editing() {
    return editing;
  },
  set editing(value) {
    editing = value;
  },
  get finishing() {
    return finishing;
  },
  set finishing(value) {
    finishing = value;
  },
  get floodRuntime() {
    return floodRuntime;
  },
  get flowAction() {
    return flowAction;
  },
  get hadXRFrame() {
    return hadXRFrame;
  },
  set hadXRFrame(value) {
    hadXRFrame = value;
  },
  get hoverIds() {
    return hoverIds;
  },
  set hoverIds(value) {
    hoverIds = value;
  },
  get immersiveShowcase() {
    return immersiveShowcase;
  },
  get invalidateCreation() {
    return invalidateCreation;
  },
  get isMiniature() {
    return isMiniature;
  },
  get keys() {
    return keys2;
  },
  get labelKey() {
    return labelKey;
  },
  set labelKey(value) {
    labelKey = value;
  },
  get labelSprite() {
    return labelSprite;
  },
  set labelSprite(value) {
    labelSprite = value;
  },
  get measurePoints() {
    return measurePoints;
  },
  set measurePoints(value) {
    measurePoints = value;
  },
  get meshes() {
    return meshes2;
  },
  set meshes(value) {
    meshes2 = value;
  },
  get miniatureYaw() {
    return miniatureYaw;
  },
  set miniatureYaw(value) {
    miniatureYaw = value;
  },
  get mode() {
    return mode;
  },
  set mode(value) {
    mode = value;
  },
  get mrShowcase() {
    return mrShowcase;
  },
  set mrShowcase(value) {
    mrShowcase = value;
  },
  get navigationGate() {
    return navigationGate;
  },
  get objectInteraction() {
    return objectInteraction;
  },
  get openObjectInteraction() {
    return openObjectInteraction;
  },
  get openSourceMode() {
    return openSourceMode;
  },
  get overview() {
    return overview;
  },
  get panelPlacement() {
    return panelPlacement;
  },
  set panelPlacement(value) {
    panelPlacement = value;
  },
  get pausePerformance() {
    return pausePerformance;
  },
  get pendingAlignment() {
    return pendingAlignment;
  },
  set pendingAlignment(value) {
    pendingAlignment = value;
  },
  get phase() {
    return phase;
  },
  set phase(value) {
    phase = value;
  },
  get placeXRPanel() {
    return placeXRPanel;
  },
  get pointer() {
    return pointer;
  },
  get pointerInside() {
    return pointerInside;
  },
  set pointerInside(value) {
    pointerInside = value;
  },
  get pointerStart() {
    return pointerStart;
  },
  set pointerStart(value) {
    pointerStart = value;
  },
  get presentationVisible() {
    return presentationVisible;
  },
  set presentationVisible(value) {
    presentationVisible = value;
  },
  get presetSequence() {
    return presetSequence;
  },
  set presetSequence(value) {
    presetSequence = value;
  },
  get previewScene() {
    return previewScene;
  },
  set previewScene(value) {
    previewScene = value;
  },
  get production() {
    return production;
  },
  set production(value) {
    production = value;
  },
  get raycaster() {
    return raycaster;
  },
  get rememberCreation() {
    return rememberCreation;
  },
  get renderer() {
    return renderer;
  },
  get requireSpatialIdle() {
    return requireSpatialIdle;
  },
  get restoreAlignmentOnReady() {
    return restoreAlignmentOnReady;
  },
  set restoreAlignmentOnReady(value) {
    restoreAlignmentOnReady = value;
  },
  get resumeWorld() {
    return resumeWorld;
  },
  get rig() {
    return rig;
  },
  get roomCamera() {
    return roomCamera;
  },
  set roomCamera(value) {
    roomCamera = value;
  },
  get roomCeilingVisibility() {
    return roomCeilingVisibility;
  },
  get roomMode() {
    return roomMode;
  },
  get roomOpacity() {
    return roomOpacity;
  },
  set roomOpacity(value) {
    roomOpacity = value;
  },
  get roomPlacementStore() {
    return roomPlacementStore;
  },
  get roomTracking() {
    return roomTracking;
  },
  get saving() {
    return saving;
  },
  set saving(value) {
    saving = value;
  },
  get scene() {
    return scene;
  },
  get sceneDisplayStorage() {
    return sceneDisplayStorage;
  },
  set sceneDisplayStorage(value) {
    sceneDisplayStorage = value;
  },
  get scriptDemo() {
    return scriptDemo;
  },
  set scriptDemo(value) {
    scriptDemo = value;
  },
  get selectedCurveId() {
    return selectedCurveId;
  },
  set selectedCurveId(value) {
    selectedCurveId = value;
  },
  get selection() {
    return selection;
  },
  set selection(value) {
    selection = value;
  },
  get setEditing() {
    return setEditing;
  },
  get setHover() {
    return setHover;
  },
  get setPhase() {
    return setPhase;
  },
  get spatialEpoch() {
    return spatialEpoch;
  },
  set spatialEpoch(value) {
    spatialEpoch = value;
  },
  get spatialKey() {
    return spatialKey;
  },
  get startObjectPreview() {
    return startObjectPreview;
  },
  get state() {
    return state;
  },
  set state(value) {
    state = value;
  },
  get studio() {
    return studio;
  },
  set studio(value) {
    studio = value;
  },
  get submitting() {
    return submitting;
  },
  set submitting(value) {
    submitting = value;
  },
  get syncFlow() {
    return syncFlow;
  },
  get toast() {
    return toast;
  },
  get transformPending() {
    return transformPending;
  },
  set transformPending(value) {
    transformPending = value;
  },
  get transformTool() {
    return transformTool;
  },
  get triggerHeld() {
    return triggerHeld;
  },
  get uiName() {
    return uiName;
  },
  get updateHint() {
    return updateHint;
  },
  get updatePresentationVisibility() {
    return updatePresentationVisibility;
  },
  get updateSelection() {
    return updateSelection;
  },
  get videoStartPending() {
    return videoStartPending;
  },
  set videoStartPending(value) {
    videoStartPending = value;
  },
  get virtualRecorder() {
    return virtualRecorder;
  },
  set virtualRecorder(value) {
    virtualRecorder = value;
  },
  get volume() {
    return volume;
  },
  get world() {
    return world;
  },
  get xrMode() {
    return xrMode;
  },
  set xrMode(value) {
    xrMode = value;
  },
  get xrPanel() {
    return xrPanel;
  },
  set xrPanel(value) {
    xrPanel = value;
  },
  get xrUI() {
    return xrUI;
  },
  set xrUI(value) {
    xrUI = value;
  },
  get xrViewer() {
    return xrViewer;
  }
}, { beginCurve, saveCurve, beginRegionDraft, previewFlood, nextCurve, removeCurve, beginObjectDraft, paintObjectInteraction, updateDraftDrawing, canRecordDraft } = createDrawingActions(clientContext), { clearCalibrationMarkers, beginAlignmentCheck, previewAlignment, updateAlignmentPreview, saveRoomCorrection, offsetAlignment, cancelAlignment, beginCalibration, addCalibrationPoint, updateCalibrationCursor, enterAlignedRoom, applyRoomAlignment, rotateRoom, applyRoomSize, requestRoomScan } = createRoomAlignment(clientContext), { setSceneTransparency, changeOpacity, setRoomDisplay, updateRoomAppearance, roomCeilingVisibility, updateObjectLabel, isMiniature, updatePresentationVisibility, placeXRPanel, sceneMenuOpen, toggleMenu, setXRStatus } = createScenePresentation(clientContext);
installUITheme(document);
function uiName(entity) {
  return openSourceMode ? entityLabel(entity) : entity?.name || "";
}
var sceneDisplayStorage;
try {
  sceneDisplayStorage = globalThis.localStorage;
} catch {
}
var production = null, $2 = (id) => document.getElementById(id), canvas = $2("world"), params = new URLSearchParams(location.search), roomMode = !0, openSourceMode = !0, desktopUI = null, agentSuggestions = null, menuNavigation = createMenuNavigation(), showcaseMode = !1, quietShowcase = showcaseMode && params.get("ui") !== "developer", mrShowcase = null, showcaseEntryPending = !1, immersiveShowcase = () => quietShowcase && renderer.xr.isPresenting;
document.body.classList.toggle("showcase-clean", quietShowcase);
var scriptedMode = !1, captureUI = showcaseMode || params.get("ui") === "capture" || scriptedMode && params.get("ui") !== "developer", startupRequired = roomMode && (/Quest|OculusBrowser/i.test(navigator.userAgent) || params.get("setup") === "1"), xrReference = { requested: "local-floor", active: null, fallbackReason: null }, sessionMedia = startupRequired ? createSessionMedia() : null, startupAccess = null;
document.body.classList.toggle("capture-ui", captureUI);
document.body.classList.toggle("open-source", openSourceMode);
openSourceMode && (document.title = "EmboDi \xB7 Open Source", document.body.append($2("agent-conversation")), $2("scene-tools-toggle").hidden = !1, $2("scene-tools-toggle").onclick = () => {
  let collapsed = document.body.classList.toggle("tools-collapsed");
  $2("scene-tools-toggle").textContent = uiText(collapsed ? "Scene tools" : "Hide tools"), $2("scene-tools-toggle").setAttribute("aria-expanded", String(!collapsed));
}, document.querySelector(".version").textContent = "EmboDi \xB7 OPEN SOURCE \xB7 " + BUILD, $2("actor-tools").lastElementChild.textContent = "Select an actor and describe a basic motion to the Agent (e.g. raise the right hand). Draw and save 2D floor or 3D air curves, then ask the actor to follow the highlighted curve. Imported motions are optional. Generated motions are procedural, without foot IK or collision avoidance. X speaks, Y opens the menu, Ctrl/Cmd+Z undoes.", $2("more-options").querySelector("p").textContent = uiText("Quest: A Confirm, B Cancel / Back, X Voice, Y Menu. Right stick selects menu options. In Transform: left stick moves, left grip + stick adjusts height, right stick rotates, right grip grabs. Left grip rehearses outside Transform. Desktop: V Edit, X Voice, Y Tools, WASD Move, Shift + W/S Height, arrows Rotate, Enter Confirm, Esc Cancel, Space Rehearse, Ctrl/Cmd+Z Undo. Recording is available after setup."), $2("door-tools").lastElementChild.textContent = uiText("Select a door \u2192 Interaction \u2192 Draw regions: mark door sources and a floor trigger, then describe the flow and dwell condition by voice. Door hinge and opening direction are editable."));
var demoMode = !openSourceMode && !roomMode && params.get("demo") === "1", demoEntry = createDemoEntry();
$2("demo-mode-link").hidden = roomMode;
$2("demo-mode-link").href = demoMode ? "/?legacy=1" : "/?legacy=1&demo=1";
$2("demo-mode-link").textContent = uiText(demoMode ? "Legacy standard mode" : "Legacy recording demo");
document.body.classList.toggle("room-mode", roomMode);
$2("new-world").textContent = uiText(roomMode ? "Back to room capture" : "Build a world from images");
$2("reset").hidden = roomMode;
$2("restore-checkpoint").hidden = roomMode;
$2("demo-mode-label").hidden = !demoMode;
$2("blueprint-options").hidden = demoMode;
demoMode && ($2("new-world").textContent = uiText("Replay demo"));
var renderer = new THREE28.WebGLRenderer({ canvas, antialias: !0, alpha: !0 });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.xr.enabled = !0;
renderer.xr.setReferenceSpaceType("local-floor");
var updateUIFoveation = createUIFoveation(renderer.xr);
renderer.outputColorSpace = THREE28.SRGBColorSpace;
renderer.toneMapping = THREE28.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
var scene = new THREE28.Scene();
scene.background = new THREE28.Color(UI_THEME.background);
var camera = new THREE28.PerspectiveCamera(48, innerWidth / innerHeight, 0.02, 300), rig = new THREE28.Group();
rig.add(camera);
scene.add(rig);
var xrViewer = createXRViewerPose(rig), currentView = () => renderer.xr.isPresenting ? xrViewer.view : camera, controls = new OrbitControls(camera, canvas);
controls.enableDamping = !0;
controls.minDistance = 0.8;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI * 0.48;
var world = new THREE28.Group();
scene.add(world);
var handSize = 1, armSize = 1, gripTilt = 45;
try {
  let saved = JSON.parse(localStorage.getItem("vrbuild-body-size-v1"));
  saved && Number.isFinite(saved.handSize) && Number.isFinite(saved.armSize) && (handMetadataForSize(saved.handSize, saved.armSize, saved.gripTilt ?? 45), handSize = saved.handSize, armSize = saved.armSize, gripTilt = saved.gripTilt ?? 45);
} catch {
}
var handMetadata = handMetadataForSize(handSize, armSize, gripTilt, 1.1), handInput = createHandInput(handMetadata), handLayer = createHandLayer(world, handMetadata), handSample = handInput.snapshot(), videoStartPending = null;
function resetHands() {
  doorGrab?.release(), handSample = handInput.reset(), handLayer.apply(handSample), videoStartPending = null;
}
function resizeHands(handDelta = 0, armDelta = 0, reset = !1, tiltDelta = 0) {
  if (videoStartPending || ["recording", "saving"].includes(virtualRecorder.snapshot().status)) throw new Error("Save the recording before adjusting hand or arm size");
  handSize = reset ? 1 : THREE28.MathUtils.clamp(Math.round((handSize + handDelta) * 100) / 100, 0.7, 1.3), armSize = reset ? 1 : THREE28.MathUtils.clamp(Math.round((armSize + armDelta) * 100) / 100, 0.8, 1.2), gripTilt = reset ? 45 : THREE28.MathUtils.clamp(gripTilt + tiltDelta, 0, 90), handMetadata = handMetadataForSize(handSize, armSize, gripTilt, 1.1), handLayer.dispose(), handInput = createHandInput(handMetadata), handLayer = createHandLayer(world, handMetadata), handSample = handInput.snapshot();
  try {
    localStorage.setItem("vrbuild-body-size-v1", JSON.stringify({ handSize, armSize, gripTilt }));
  } catch {
  }
  $2("hand-size-value").textContent = uiText(`Hands ${Math.round(handSize * 100)}% \xB7 Arms ${Math.round(armSize * 100)}% \xB7 Grip tilt ${gripTilt}\xB0`), syncFlow();
}
scene.add(new THREE28.HemisphereLight(roomMode ? "#ffffff" : "#dde8ff", roomMode ? "#dce2ef" : "#586d55", roomMode ? 2 : 2.8));
var sunlight = new THREE28.DirectionalLight(roomMode ? "#ffffff" : "#ffe4b5", roomMode ? 0.9 : 3.3);
sunlight.position.set(-10, 20, 12);
scene.add(sunlight);
var rim = new THREE28.DirectionalLight(roomMode ? "#ffffff" : "#83b3e4", roomMode ? 0.4 : 1.6);
rim.position.set(15, 8, -15);
scene.add(rim);
var marker = new THREE28.Group();
world.add(marker);
var entryMarkers = new THREE28.Group();
world.add(entryMarkers);
var ring = new THREE28.Mesh(new THREE28.RingGeometry(0.6, 0.85, 40), new THREE28.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, side: THREE28.DoubleSide, depthTest: !1, transparent: !0, opacity: 0.9 }));
ring.rotation.x = -Math.PI / 2;
ring.renderOrder = 10;
marker.add(ring);
var arrow = new THREE28.ArrowHelper(new THREE28.Vector3(0, 0, -1), new THREE28.Vector3(0, 0.03, 0), 2, UI_THEME.accent, 0.45, 0.3);
arrow.line.material.toneMapped = arrow.cone.material.toneMapped = !1;
marker.add(arrow);
var meshes2 = /* @__PURE__ */ new Map(), outlines = [], state = null, renderedDefinition = null, selection = [], mode = "overview", tool = "object", anchor = new THREE28.Vector3(0, 0, 8), heading = 0, currentJob = null, previewScene = null, uploadedImage = null, referenceId = null, xrMode = null, toastTimer, desktopYaw = 0, desktopPitch = 0, submitting = !1, saving = !1, presetSequence, presetPermit = !1, scriptDemo = null, scriptPermit = !1, scriptLoadError = "", demonstrationControlPending = !1, demonstrationCancelled = !1, photoReview = -1, describing = !1, descriptionText = "", demonstration = null, pathKey = "", bindingKey = "", localPreparation = null, photoUploads = /* @__PURE__ */ new Map(), pathGuide = createPathGuide(world), doorGrab = createDoorGrab({ openingMode: showcaseMode ? "hold-to-open" : "follow-hand", onEvent: (type, detail) => {
  virtualRecorder?.event(type, type === "previewReset" ? { ...detail, pathId: state?.scene.behaviors?.path?.id } : detail), !showcaseMode && type === "doorTrigger" && state?.scene.behaviors?.path && presetOperation(() => director.start({ actorIds: state.scene.behaviors.path.actorIds }));
} }), scriptAudio = createScriptAudio(), captureDialogue = { userText: "", agentText: "" }, studio, xrUI, xrPanel, panelPlacement, director, editing = !1, hoverIds = [], hoverOutlines = [], volumeController = null, actorAssets = /* @__PURE__ */ new Map(), actorOptionsKey = "", actorMotionOptionsKey = "", actorMotionValueKey = "", spatialEpoch = 0, inputTrace = [];
function traceInput(type, detail = {}) {
  inputTrace.push({ time: performance.now(), type, ...detail }), inputTrace.length > 30 && inputTrace.shift();
}
var roomCamera, photoSignature = "", enteringXR = !1, roomTracking = createRoomTracking(), roomOcclusion = createRoomOcclusion(), calibrationMarkers = new THREE28.Group();
scene.add(calibrationMarkers);
var alignment = null, alignedMode = !1, measurePoints = [], pendingAlignment = null, roomOpacity = opacityForTransparency(readTransparency(sceneDisplayStorage)), virtualRecorder, labelSprite, labelKey = "", videoSignature = "", roomPlacementStore = createRoomPlacementStore((() => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
})()), restoreAlignmentOnReady = !1, alignmentStickReady = !1, alignmentVertical = !1, miniatureYaw = 0, calibrationCursor = new THREE28.Mesh(new THREE28.SphereGeometry(0.045, 12, 8), new THREE28.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1 }));
calibrationCursor.visible = !1;
scene.add(calibrationCursor);
var phase = roomMode || demoMode ? "reference" : "entry", entryCandidates = [], chosenEntry = 0, flowSignature = "", selectedReference = null, demoSeconds = 3, demoTracking = !1, frameCount = 0, lastTime = 0, snapReady = !0, hadXRFrame = !1, presentationVisible = !0, creationPose = null, finishing = !1, previewSummoned = !1, latestReply = "", alignmentReturn = "welcome", raycaster = new THREE28.Raycaster(), pointer = new THREE28.Vector2(), keys2 = /* @__PURE__ */ new Set(), pointerInside = !1, questButtons = createQuestButtons(), transformOwner = null, transformPending = null, syncingSelection = !1, storyboardState = { enabled: !1, acts: STORY_ACTS.map((a) => ({ ...a, saved: !1 })) }, storyActId = "act-1", doorResetPending = !1, doorPlayer = createDoorPlayer(), doorPerformance = createDoorPerformanceCue(), navigationGate = createNavigationGate(), actorArrows = /* @__PURE__ */ new Map(), objectInteraction = createInteractionSession(), draftTool = createInteractionDraftTool({ world, pickGround: actorGround, pickObject: (ray, id) => {
  let hit = visibleGeometryHit(ray);
  if (hit?.object.userData.definition?.id !== id) return null;
  let normal = hit.face.normal.clone().applyMatrix3(new THREE28.Matrix3().getNormalMatrix(hit.object.matrixWorld)).transformDirection(new THREE28.Matrix4().copy(world.matrixWorld).invert());
  return { point: world.worldToLocal(hit.point.clone()).toArray(), normal: normal.toArray() };
}, smoothing: openSourceMode ? "standard" : "off" }), floodRuntime = createFloodRuntime(), floodLayer = createFloodLayer(world, { getObjectPose: (id) => {
  let mesh = meshes2.get(id);
  return mesh ? { position: mesh.position.toArray(), quaternion: mesh.quaternion.toArray() } : null;
} }), floodStatus = document.createElement("output");
floodStatus.id = "flood-status";
floodStatus.hidden = !0;
floodStatus.style.cssText = "position:fixed;top:84px;left:50%;transform:translateX(-50%);padding:8px 14px;border-radius:12px;background:#f6f3f0df;color:#413647;font-size:14px;pointer-events:none;z-index:10";
document.body.append(floodStatus);
var draftInputBlocked = /* @__PURE__ */ new Set(), triggerHeld = /* @__PURE__ */ new Set(), transformTool = createTransformTool({ world, getState: () => state, spatialKey, onEvent: (type, detail) => virtualRecorder?.event(type, detail) }), volume = createVolumeSelection({ world, getScene: volumeScene, getMeshes: () => [...meshes2.values()], getHit: (ray) => {
  let hit = sceneHit(ray);
  return hit?.object?.userData.definition.category === "structure" && hit.object.userData.definition.editable !== !0 ? null : hit;
}, onCandidates: (ids) => setHover(expandSelection(state.scene, ids)) }), controllers = [renderer.xr.getController(0), renderer.xr.getController(1)], controllerGrips = [renderer.xr.getControllerGrip(0), renderer.xr.getControllerGrip(1)];
controllerGrips.forEach((c) => rig.add(c));
var rayFeedback = controllers.map((c) => createRayFeedback(scene, c)), pointerFeedback = createRayFeedback(scene);
for (let c of controllers)
  rig.add(c), c.addEventListener("connected", (event) => {
    c.userData.inputSource = event.data;
  }), c.addEventListener("disconnected", () => {
    resetHands(), draftTool.suspend("Controller disconnected. Unfinished stroke discarded."), draftInputBlocked.delete(c), triggerHeld.delete(c), c.userData.inputSource && questButtons.reset(c.userData.inputSource), volumeController === c && cancelVolume(), transformOwner === c && cancelTransform("Controller disconnected"), production?.cancel(), studio?.cancelVoice(), delete c.userData.inputSource;
  }), c.addEventListener("selectstart", () => {
    if (immersiveShowcase() || openSourceMode && triggerHeld.has(c) || (triggerHeld.add(c), volume.isActive())) return;
    raycaster.setFromXRController(c);
    let hit = xrUI?.hit(raycaster);
    if (hit) {
      traceInput("xr-button", { label: hit.object.userData.label }), hit.object.userData.action();
      return;
    }
    if (!sceneMenuOpen() && !xrUI?.blocks(raycaster) && c.userData.inputSource?.handedness === "right" && !(shortcutBlocked() || demonstrationMode())) {
      if (draftTool.active()) {
        if (xrPanel.visible) return;
        draftInputBlocked.has(c) || action(() => draftTool.begin(raycaster, c))();
        return;
      }
      if (phase === "calibrate") {
        action(() => addCalibrationPoint(c))();
        return;
      }
      if (roomMode && phase === "reference") {
        action(takeRoomPhoto)();
        return;
      }
      action(() => pressSelection(c))();
    }
  }), c.addEventListener("selectend", () => {
    if (triggerHeld.delete(c), draftInputBlocked.delete(c), draftTool.active()) {
      draftTool.release(c), syncFlow();
      return;
    }
    transformOwner === c && action(finishTransform)();
  });
function toast(message) {
  $2("toast").textContent = uiText(message), $2("toast").dataset.tone = /failed|failure|error|invalid|not saved|not enough disk/i.test(uiText(message)) ? "error" : "normal", $2("toast").classList.add("visible"), clearTimeout(toastTimer), toastTimer = setTimeout(() => $2("toast").classList.remove("visible"), 4500), captureUI ? xrUI?.setStatus(message) : setXRStatus(message);
}
var api = createApi();
function action(fn) {
  return async () => {
    try {
      await fn();
    } catch (error) {
      traceInput("action-error", { message: error.message }), toast(error.message);
    }
  };
}
function videoBusy() {
  return ["recording", "saving"].includes(virtualRecorder?.snapshot().status);
}
function shortcutBlocked() {
  return !!localPreparation || demonstrationControlPending || ["recording", "saving"].includes(demonstration?.snapshot().state) || !!scriptDemo?.snapshot().busy || !!presetSequence?.busy() || !!videoStartPending || !!transformPending || demoEntry.active || !!currentJob || submitting || saving || finishing || director?.snapshot().pending || roomCamera?.snapshot().reading || ["starting", "saving"].includes(virtualRecorder?.snapshot().status) || studio?.getRecordingState() !== "idle";
}
function busy() {
  return !!production?.busy() || demonstrationControlPending || !!localPreparation || !!demonstration && ["recording", "saving"].includes(demonstration.snapshot().state) || !scriptPermit && !!scriptDemo?.snapshot().busy || !!presetSequence?.busy() || draftTool.active() || !!videoStartPending || transformTool.active() || !!transformPending || demoEntry.active || !!currentJob || submitting || saving || finishing || director?.snapshot().pending || volume.isActive() || roomCamera?.snapshot().reading || ["starting", "saving"].includes(virtualRecorder?.snapshot().status) || studio && studio.getRecordingState() !== "idle";
}
function requireSpatialIdle() {
  if (["starting", "saving"].includes(virtualRecorder?.snapshot().status)) throw new Error("Wait for recording storage to finish preparing or saving");
  if (busy()) throw new Error("Finish the current request or preview first");
}
function spatialKey() {
  world.updateMatrixWorld(!0);
  let floor = referenceFloor(previewScene || state?.scene);
  return `${spatialEpoch}:${world.matrixWorld.elements.map((n) => n.toFixed(6)).join(",")}:${JSON.stringify(floor && [floor.position, floor.size, floor.rotation])}`;
}
function actorViewPosition() {
  return world.worldToLocal(currentView().getWorldPosition(new THREE28.Vector3()));
}
function visibleGeometryHit(ray) {
  return ray.intersectObjects([...meshes2.values()].filter((m) => m.visible), !1)[0];
}
function sceneHit(ray) {
  world.updateMatrixWorld(!0);
  let geometry2 = visibleGeometryHit(ray), actor = director?.layer.pick(ray, { maxDistance: geometry2?.distance ?? 1 / 0 });
  return actor && actor.distance < (geometry2?.distance ?? 1 / 0) ? { ...actor, kind: "actor" } : geometry2 ? { ...geometry2, kind: "object" } : null;
}
var selectedCurveId = null, curveLayer = createCurveLayer(world);
function actorGround(ray) {
  world.updateMatrixWorld(!0);
  let hit = visibleGeometryHit(ray);
  return isFloor(hit?.object.userData.definition) && hit.face?.normal.y > 0.5 ? world.worldToLocal(hit.point.clone()) : null;
}
function openObjectInteraction() {
  if (openSourceMode && !editing) throw Error("Enter edit mode first.");
  if (phase !== "explore" || busy() || director.snapshot().placing) throw new Error("Finish the current action before setting up an interaction");
  let ids = selection.filter((id) => allEntities(state.scene).some((o) => o.id === id));
  objectInteraction.open({ ids, revision: state.revision, spatialKey: spatialKey() }), pausePerformance(), syncFlow();
}
function closeObjectInteraction(message) {
  let active = objectInteraction.active();
  objectInteraction.close(), draftTool.close(), draftInputBlocked.clear(), active && (navigationGate.block(), keys2.clear(), pointerStart = null, flowSignature = "", updateHint(), updateSelection(), syncFlow(), typeof message == "string" && toast(message));
}
function beginObjectTransform() {
  if (openSourceMode) return production.startPoses();
  if (busy() || !selection.length) throw new Error("Select an object and finish the current action first");
  closeObjectInteraction(), pausePerformance(), setEditing(!0), renderer.xr.isPresenting && (xrPanel.visible = !1, updatePresentationVisibility()), toast("Transform: hold the right trigger to drag \xB7 Right stick to turn or raise");
}
function beginObjectVoice() {
  if (!objectInteraction.active()) throw new Error("Select an object first");
  closeObjectInteraction(), toast("Hold X to describe the interaction. Release to submit.");
}
function pausePerformance() {
  production?.stopClock(), floodRuntime.stop(), mrShowcase?.pause(), director?.snapshot().mode === "running" && director.stop();
}
function updateActorTarget() {
  let clear = () => {
    director?.clearTarget(), production?.updatePlacement(null);
  };
  if (phase !== "explore" || !world.visible || !(editing || director?.snapshot().placing || storyboardState.enabled && !state.scene.actors?.length)) {
    clear();
    return;
  }
  if (renderer.xr.isPresenting) {
    let right = controllers.find((c) => c.userData.inputSource?.handedness === "right");
    if (!right?.visible || !xrViewer.valid || renderer.xr.getSession()?.visibilityState !== "visible") {
      clear();
      return;
    }
    if (raycaster.setFromXRController(right), xrUI?.hit(raycaster)) {
      clear();
      return;
    }
  } else {
    if (!pointerInside || document.hidden) {
      clear();
      return;
    }
    raycaster.setFromCamera(pointer, camera);
  }
  director?.updateRay(raycaster), production?.updatePlacement(raycaster);
}
function dialogueContext() {
  updateActorTarget();
  let forward = currentView().getWorldDirection(new THREE28.Vector3());
  world.updateMatrixWorld(!0), forward.transformDirection(world.matrixWorld.clone().invert()), forward.y = 0, forward.normalize();
  let target = director.captureContext(), point2 = target.actorTarget?.position || null;
  return { targetLabel: selection.map((id) => uiName([...state.scene.objects, ...state.scene.actors || []].find((o) => o.id === id)) || id).join(", ") || "Current scene", productionEpoch: production?.state().epoch, productionMode: editing ? "edit" : "explore", curveId: selectedCurveId, draftContext: draftTool.active() ? draftTool.snapshot() : null, presetActorIds: (state.scene.actors || []).map((a) => a.id), presetRequestId: presetSequence?.snapshot()?.id, phase, ids: selection.filter((id) => meshes2.has(id)), targetIds: [...selection], spatialContext: { viewer: actorViewPosition().toArray(), forward: forward.toArray(), point: point2, pivot: selectionPivot(), spatialKey: spatialKey() }, anchor: anchor.toArray(), revision: state.revision, busy: busy(), voiceBusy: !!production?.state().transitioning || !!production?.state().saving || !!production?.state().requesting || phase !== "explore" || submitting || saving || volume.isActive() || transformTool.active() || !!transformPending || virtualRecorder?.snapshot().status === "saving", ...target };
}
function actorCenter(id) {
  let view = director?.layer.views.get(id);
  return view?.visible ? world.worldToLocal(view.bones[0].getWorldPosition(new THREE28.Vector3())) : null;
}
function volumeScene() {
  return { ...state.scene, objects: [...state.scene.objects, ...(state.scene.actors || []).flatMap((a) => {
    let p = actorCenter(a.id);
    return p ? [{ ...a, position: p.toArray() }] : [];
  })] };
}
function selectionPivot() {
  let bounds = new THREE28.Box3(), p = new THREE28.Vector3();
  world.updateMatrixWorld(!0);
  for (let id of selection) {
    let a = state?.scene.actors?.find((a2) => a2.id === id);
    if (a)
      p.copy(actorCenter(id) || new THREE28.Vector3().fromArray(a.position)), p.y = a.position[1], bounds.expandByPoint(p);
    else {
      let mesh = meshes2.get(id);
      if (mesh) {
        let size = mesh.scale;
        for (let x of [-0.5, 0.5]) for (let z of [-0.5, 0.5])
          p.set(x * size.x, -size.y / 2, z * size.z).applyEuler(mesh.rotation).add(mesh.position), bounds.expandByPoint(p);
      }
    }
  }
  return bounds.isEmpty() ? [0, 0, 0] : (bounds.getCenter(p), p.y = bounds.min.y, p.toArray());
}
function requirePausedTargets(ids = selection) {
  if (ids.some((id) => state.scene.actors?.some((a) => a.id === id)) && director.snapshot().mode === "running" && !director.snapshot().completed) throw new Error("Pause with the left grip before moving or turning actors");
}
function pressSelection(owner) {
  if (openSourceMode) {
    if (sceneMenuOpen() || !editing || production?.busy() || studio.getRecordingState() !== "idle") return;
    selectFromRay();
    return;
  }
  if (!draftTool.active()) {
    if (phase === "explore" && editing && !director.snapshot().placing && !busy()) {
      let hit = sceneHit(raycaster), id = hit?.kind === "actor" ? hit.id : hit?.object?.userData.definition.id;
      if (id && selection.includes(id)) {
        requirePausedTargets(), transformTool.begin(selection, selectionPivot(), raycaster), transformOwner = owner, navigationGate.block(), controls.enabled = !1, setHover([]), toast("Drag to move \xB7 Right stick to turn or raise \xB7 Release trigger to save \xB7 Left stick click to cancel");
        return;
      }
    }
    selectFromRay();
  }
}
function cancelTransform(reason = "Adjustment cancelled") {
  transformTool.active() && (transformTool.cancel(reason), transformOwner = null, navigationGate.block(), applyLiveTransforms([]), toast(reason));
}
async function finishTransform() {
  if (!transformTool.active()) return;
  let updates = transformTool.updates(), result = transformTool.finish();
  if (transformOwner = null, navigationGate.block(), !result.changed) {
    applyLiveTransforms([]), virtualRecorder?.event("transform-cancel", { reason: "Position and orientation unchanged" });
    return;
  }
  transformPending = { ...result, updates }, syncFlow();
  try {
    let next = await api("/api/transform", result);
    acceptState(next), virtualRecorder?.event("transform-commit", { ...result, revision: next.revision }), toast("Position and orientation saved \xB7 Left stick click to undo");
  } catch (error) {
    virtualRecorder?.event("transform-cancel", { reason: error.message }), toast(`Save feedback error: ${error.message}`);
  } finally {
    transformPending = null, applyLiveTransforms([]), syncFlow();
  }
}
function liveTransforms() {
  return transformTool.active() ? transformTool.updates() : transformPending?.updates || [];
}
function applyLiveTransforms(updates) {
  let changes = new Map(updates.map((o) => [o.id, o]));
  for (let [id, mesh] of meshes2) {
    let o = changes.get(id) || mesh.userData.definition;
    mesh.position.fromArray(o.position), o.quaternion ? mesh.quaternion.fromArray(o.quaternion) : mesh.rotation.set(0, o.rotation, 0);
  }
  for (let outline of [...outlines, ...hoverOutlines]) {
    let mesh = meshes2.get(outline.userData.id);
    mesh && (outline.position.copy(mesh.position), outline.rotation.copy(mesh.rotation));
  }
}
function updateActorArrows() {
  let selected = new Set(editing && !draftTool.active() ? selection : []);
  for (let [id, arrow2] of actorArrows) director.layer.views.has(id) || (world.remove(arrow2), arrow2.dispose(), actorArrows.delete(id));
  for (let [id, view] of director.layer.views) {
    let arrow2 = actorArrows.get(id);
    !arrow2 && selected.has(id) && (arrow2 = new THREE28.ArrowHelper(new THREE28.Vector3(0, 0, 1), new THREE28.Vector3(), 0.65, UI_THEME.accent, 0.18, 0.12), arrow2.line.material.depthTest = !1, arrow2.cone.material.depthTest = !1, arrow2.line.material.toneMapped = arrow2.cone.material.toneMapped = !1, arrow2.renderOrder = 12, world.add(arrow2), actorArrows.set(id, arrow2)), arrow2 && (arrow2.visible = selected.has(id) && view.visible && !director.snapshot().placing, arrow2.visible && (arrow2.position.copy(actorCenter(id)), arrow2.position.y = view.position.y + 0.03, arrow2.setDirection(new THREE28.Vector3(Math.sin(view.rotation.y), 0, Math.cos(view.rotation.y)))));
  }
}
function paintActorControls() {
  let d = director?.snapshot(), actors = state?.scene.actors || [], key = JSON.stringify(actors), assigned = actors.filter((a) => a.motionPlan || actorMotionId(a)).length;
  if ($2("actor-status").textContent = uiText(d ? `${{ editing: openSourceMode ? "Actor pose preview" : "T-Pose layout", running: d.completed ? "Performance finished" : "Playing", paused: "Motion paused" }[d.mode]} \xB7 Actor ${actors.length}/${openSourceMode ? 5 : 5} \xB7 ${assigned} with motions${openSourceMode ? "" : ` \xB7 ${state?.scene.actorStyle === "cute" ? "Cute" : "Zombie"}`}
${d.message}` : "Loading actor mesh\u2026"), key !== actorOptionsKey) {
    actorOptionsKey = key;
    let select = $2("actor-select");
    select.replaceChildren();
    let empty = document.createElement("option");
    empty.value = "", empty.textContent = uiText("Select an actor"), select.append(empty);
    for (let a of actors) {
      let option = document.createElement("option");
      option.value = a.id, option.textContent = uiName(a), select.append(option);
    }
  }
  openSourceMode && ($2("actor-transport").hidden = !0, $2("actor-edit").hidden = !0, $2("actor-place").hidden = !0), $2("actor-select").disabled = draftTool.active(), $2("actor-select").value = d?.selected || "", $2("actor-place").textContent = uiText(d?.placing ? "Cancel placement \xB7 P" : "Place T-Pose actor \xB7 P"), $2("actor-transport").textContent = uiText(d?.completed ? "Replay \xB7 Space" : d?.mode === "running" ? "Pause \xB7 Space" : d?.mode === "paused" ? "Resume \xB7 Space" : "Play \xB7 Space");
  let selected = actors.find((a) => a.id === d?.selected);
  document.activeElement !== $2("actor-delay") && ($2("actor-delay").value = String(selected?.delay ?? 0));
  let preferred = [...actorAssets.values()].find((a) => a.preferred), presets = actorMotionPresets(actorAssets), motions = !openSourceMode && presets.length ? presets : [...actorAssets.values()].filter((a) => !a.bodyOnly && (!preferred || a.kind === preferred.kind)), motionOptionsKey = motions.map((a) => a.id).join("|");
  if (actorMotionOptionsKey !== motionOptionsKey) {
    actorMotionOptionsKey = motionOptionsKey;
    let select = $2("actor-motion");
    select.replaceChildren();
    let empty = document.createElement("option");
    empty.value = "", empty.textContent = uiText("No motion \xB7 T-Pose"), select.append(empty);
    for (let a of motions) {
      let option = document.createElement("option");
      option.value = a.id, option.textContent = uiText(`${a.name} \xB7 ${a.duration} s`), select.append(option);
    }
  }
  let motionValueKey = JSON.stringify([selected?.id, selected && actorMotionId(selected)]);
  motionValueKey !== actorMotionValueKey && (actorMotionValueKey = motionValueKey, $2("actor-motion").value = selected && actorMotionId(selected) || ""), openSourceMode && $2("actor-motion").options[0] && ($2("actor-motion").options[0].textContent = uiText(selected?.motionPlan ? "Agent \xB7 " + selected.motionPlan.name : "Default actor \xB7 No motion assigned")), $2("actor-focus").hidden = !openSourceMode || renderer.xr.isPresenting, $2("actor-focus").disabled = !selected || !!busy(), $2("actor-place").disabled = phase !== "explore" || !actorAssets.size || !!busy() || !d?.placing && actors.length >= (openSourceMode ? 5 : 5), $2("actor-start").disabled = !(openSourceMode ? selected : actors.length) || !!busy(), $2("actor-transport").disabled = !actors.length || draftTool.active(), $2("actor-motion").disabled = !selected || !!busy(), $2("actor-motion-save").disabled = !selected || !!busy();
  for (let style of ["cute", "zombie"]) $2("actor-style-" + style).disabled = phase !== "explore" || !actors.length || actors.length > 5 || !!busy() || !!d?.pending;
  $2("actor-edit").disabled = !actors.length || !!busy(), $2("actor-delay-save").disabled = !selected || !!busy(), $2("actor-remove").disabled = !selected || !!busy();
}
function focusSelectedActor() {
  if (requireSpatialIdle(), renderer.xr.isPresenting) return;
  let actor = state.scene.actors?.find((a) => a.id === director.snapshot().selected);
  if (!actor) return;
  let target = actor.motionPlan?.trajectory && director.layer.views.get(actor.id) ? director.layer.views.get(actor.id).position.clone() : new THREE28.Vector3(...actor.position), candidates = [];
  for (let radius of [1.8, 1.2, 2.4]) for (let offset of [0, 0.6, -0.6, 1.2, -1.2, Math.PI]) {
    let yaw = actor.yaw + offset, p = [target.x + Math.sin(yaw) * radius, target.y + 0.01, target.z + Math.cos(yaw) * radius];
    entryIsClear(state.scene, p, { radius: 0.2, height: 1.7 }) && candidates.push(p);
  }
  if (!candidates.length) throw new Error("No clear viewpoint near this actor. Move closer using W/A/S/D.");
  controls.enabled = !1, world.updateWorldMatrix(!0, !1), rig.updateWorldMatrix(!0, !1);
  let position = world.localToWorld(new THREE28.Vector3(...candidates[0]).add(new THREE28.Vector3(0, 1.45, 0)));
  camera.position.copy(rig.worldToLocal(position)), camera.lookAt(world.localToWorld(target.add(new THREE28.Vector3(0, 1, 0)))), desktopYaw = camera.rotation.y, desktopPitch = camera.rotation.x, rememberCreation();
}
function presetContext(captured) {
  return { phase: captured?.phase ?? phase, revision: captured?.revision ?? state?.revision, space: captured?.spatialContext?.spatialKey ?? spatialKey(), ids: captured?.presetActorIds ?? (state?.scene.actors || []).map((a) => a.id), selection: captured?.targetIds ?? [...selection], requestId: captured ? captured.presetRequestId : presetSequence?.snapshot()?.id };
}
function presetOperation(fn) {
  presetPermit = !0;
  try {
    return fn();
  } finally {
    presetPermit = !1;
  }
}
async function presetText(text, context, publish) {
  return null;
}
async function directorText(text, context, { publish = () => {
} } = {}) {
  if (openSourceMode && languagePattern("authoring.hideReply").test(text))
    return xrUI?.dismissDialogue(), "Dialogue hidden. Use Y to view it again.";
  if (openSourceMode && production) {
    if (context.productionEpoch && context.productionEpoch !== production.state().epoch) throw Error("Mode changed. Please repeat your request.");
    if (production.state().dirty && languagePattern("authoring.confirmChanges").test(text))
      return await production.save(), "Edits saved.";
    if (production.state().dirty && languagePattern("authoring.cancelChanges").test(text))
      return production.cancel(), "Edits reverted.";
    let answer = await production.handleText(text, context);
    if (answer !== null) return answer;
  }
  if (openSourceMode) {
    let words22 = text.trim().replace(languagePattern("punctuation.app.1"), "");
    if (currentJob?.status === "ready" && languagePattern("authoring.applyPreview").test(words22))
      return await applyJob(), "Changes applied.";
    if (currentJob?.status === "ready" && languagePattern("authoring.discardPreview").test(words22))
      return discardJob(), "Preview discarded.";
    if (languagePattern("authoring.stopOperation").test(words22))
      return currentJob?.status === "running" && await cancelJob(), pausePerformance(), "Stopped.";
    if (languagePattern("authoring.rehearseEffect").test(words22))
      return previewFlood(), "Rehearsal started. Enter the floor region and dwell to trigger it.";
    if (currentJob) throw Error("Apply or discard the current result first.");
    if (draftTool.active() && draftTool.snapshot().kind === "regions") {
      if (languagePattern("authoring.clearRegions").test(words22))
        return draftTool.clear(), syncFlow(), "Draft cleared. Draw the regions again.";
      if (languagePattern("authoring.undoRegion").test(words22))
        return draftTool.undo(), syncFlow(), "Last region removed.";
      if (languagePattern("authoring.cancelSketch").test(words22))
        return closeObjectInteraction(), "Drawing cancelled.";
      if (context.revision !== state.revision || context.spatialContext?.spatialKey !== spatialKey()) throw Error("Scene changed after speaking. Please request again.");
      if (JSON.stringify(draftTool.snapshot().regions) !== JSON.stringify(context.draftContext?.regions)) throw Error("Sketch changed after speaking. Please describe again.");
      if (await saveCurve(), context = { ...context, revision: state.revision, draftContext: null }, languagePattern("authoring.saveSketch").test(words22)) return "Regions saved. Describe the flow and dwell trigger.";
    }
    if (draftTool.active()) throw Error("Save the current curve, then describe the motion.");
    if (languagePattern("door.openSuffix").test(words22) || languagePattern("door.openPrefix").test(words22)) return doorCommand("open", context.ids, context);
    if (languagePattern("door.closeSuffix").test(words22) || languagePattern("door.closePrefix").test(words22)) return doorCommand("close", context.ids, context);
    let command = parseDirectorCommand(text);
    if (command && !["unavailable", "create"].includes(command.type) && !isTransformRequest(text)) {
      let local = await director.command(text, context);
      if (local !== null) return local;
    }
    if (command?.type === "create" && !languagePattern("authoring.motionRequest").test(text)) {
      if (!editing) throw Error("Enter edit mode to create objects.");
      let reply2 = await director.command(text, context);
      return xrPanel.visible = !1, desktopUI?.collapse(), updatePresentationVisibility(), syncFlow(), reply2;
    }
    isTransformRequest(text) && context.targetIds?.length && requirePausedTargets(context.targetIds), pausePerformance(), studio.setDraft(""), await startJob("agent", text, studio.conversationId, context);
    return;
  }
  let presetReply = await presetText(text, context, publish);
  if (presetReply !== null) return presetReply;
  if (draftTool.active()) throw new Error("The draft has not been applied. Review it or exit Draft before continuing.");
  let words2 = text.trim().replace(languagePattern("punctuation.app.2"), "");
  if (languagePattern("legacy.prepareDoorCast").test(words2)) return doorPerformanceCommand("configure");
  if (languagePattern("legacy.resetDoorPerformance").test(words2)) return doorPerformanceCommand("reset");
  if (state.scene.doorPerformance && languagePattern("legacy.openDoor").test(words2)) return doorCommand("open", [state.scene.doorPerformance.doorId]);
  if (languagePattern("door.openSuffix").test(words2) || languagePattern("door.openPrefix").test(words2)) return doorCommand("open", context.ids, context);
  if (languagePattern("door.closeSuffix").test(words2) || languagePattern("door.closePrefix").test(words2)) return doorCommand("close", context.ids, context);
  if (languagePattern("legacy.stopPerformance").test(words2) && doorPlayer.pause(), languagePattern("legacy.resumePerformance").test(words2) && doorPlayer.resume(), currentJob?.status === "ready" && languagePattern("legacy.confirmPreview").test(text.trim()))
    return await applyJob(), "Changes applied.";
  if (currentJob?.status === "ready" && languagePattern("legacy.discardPreview").test(text.trim()))
    return discardJob(), "Preview discarded.";
  if (isTransformRequest(text) && context.targetIds?.length)
    return requirePausedTargets(context.targetIds), null;
  let reply = await director.command(text, context);
  return reply === null && context.actorId && languagePattern("legacy.actorRequest").test(text) ? 'Actor commands include "move here", "face me", "appear after two seconds", and "use the second motion". A style request changes the whole cast. Other motions require an imported clip.' : reply;
}
async function initializeScript() {
  return null;
}
async function persistPhoto(photo) {
  if (photo.reference) return photo.reference;
  if (photoUploads.has(photo.id)) return photoUploads.get(photo.id);
  let pending = api("/api/capture/photos", { image: photo.image, capturedAt: photo.capturedAt }).then((ref) => (roomCamera.markSaved(photo.id, ref), ref)).finally(() => photoUploads.delete(photo.id));
  return photoUploads.set(photo.id, pending), pending;
}
async function persistPhotos() {
  for (let p of roomCamera.getPhotos()) await persistPhoto(p);
}
async function scriptedRebuild() {
  return null;
}
function describeInteraction() {
  if (busy()) throw Error("Finish the current action first");
  describing = !0, descriptionText = "", $2("capture-description").value = "", syncFlow(), renderer.xr.isPresenting ? placeXRPanel() : $2("capture-description").focus();
}
async function submitDescription() {
  let text = descriptionText.trim();
  if (!text) throw Error("Enter a description first");
  let context = dialogueContext();
  describing = !1, syncFlow();
  let message = await presetText(text, context, () => {
  }) ?? "This preset does not support that request. Available tools include door demonstrations, actor motions, formation paths and door bindings.";
  toast(message), virtualRecorder.event("dialogue", { inputOrigin: "text", userText: text, agentText: message });
}
function openDemonstration() {
  return null;
}
function demonstrationMode() {
  return !1;
}
async function toggleDemonstration() {
  return null;
}
async function startDemonstration(inputOrigin = "click") {
  return null;
}
async function stopDemonstration() {
  return null;
}
async function retryDemonstration() {
  return null;
}
async function installDemonstratedDoor() {
  return null;
}
async function preparePath(context, publish, options = {}) {
  return null;
}
async function prepareBinding(context, publish, options = {}) {
  return null;
}
function resetPath() {
  return null;
}
async function confirmCurrentPreview() {
  return null;
}
async function startObjectPreview(options = {}) {
  if (phase !== "explore" || production.busy() || currentJob || submitting || saving || director.snapshot().placing || draftTool.active() || volume.isActive()) throw Error("Save or cancel the current edit before rehearsing.");
  if (!options.ids && !production.state().canPreview) throw Error(production.state().previewIds.length ? "This object has no saved motion or interaction." : "Enter edit mode and select an object to rehearse.");
  if (editing && (closeObjectInteraction(), setEditing(!1), editing))
    throw Error("Finish the current operation before rehearsing.");
  return await production.ready(), production.play(options);
}
async function togglePreview() {
  if (currentJob?.status === "ready" || busy() || demonstrationMode() || director.snapshot().placing) return;
  if (openSourceMode && production) return production.state().playing ? production.pause() : startObjectPreview();
  let d = director.snapshot(), preset = presetSequence.snapshot();
  if (d.mode === "running" && !d.completed) {
    presetSequence.pause(), pausePerformance(), syncFlow();
    return;
  }
  return ["ready", "paused"].includes(preset?.status) || state.scene.behaviors?.path ? confirmCurrentPreview() : director.toggleTransport();
}
async function cancelCurrentOperation() {
  if (openSourceMode && studio.getRecordingState() !== "idle") {
    studio.cancelVoice();
    return;
  }
  if (openSourceMode && production) {
    let p = production.state();
    if (p.monitor) {
      production.closeMonitor();
      return;
    }
    if (p.dirty || p.requesting) {
      production.cancel(), studio.cancelVoice();
      return;
    }
  }
  if (!currentJob?.applying) {
    if (demoEntry.active) {
      cancelDemo();
      return;
    }
    if (doorGrab.snapshot().grabbed) {
      doorGrab.release();
      return;
    }
    if (demonstrationMode()) {
      demonstrationCancelled = !0, localPreparation?.abort(), closeObjectInteraction(), demonstration.snapshot().state === "recording" && await demonstration.stop(), syncFlow();
      return;
    }
    if (transformTool.active()) {
      cancelTransform();
      return;
    }
    if (volume.isActive()) {
      cancelVolume();
      return;
    }
    if (director.snapshot().placing) {
      director.cancelPlacement(), syncFlow();
      return;
    }
    if (localPreparation || scriptDemo?.snapshot().busy || presetSequence?.busy()) {
      localPreparation?.abort(), scriptDemo?.cancel(), presetSequence?.cancel(), studio.cancelVoice(), pausePerformance(), syncFlow();
      return;
    }
    if (studio.getRecordingState() !== "idle") {
      studio.cancelVoice();
      return;
    }
    if (currentJob)
      return currentJob.status === "running" ? cancelJob() : discardJob();
    if (describing) {
      describing = !1, syncFlow();
      return;
    }
    if (objectInteraction.active()) {
      if (openSourceMode && !draftTool.active() && sceneMenuOpen()) {
        let ui = renderer.xr.isPresenting ? xrUI : desktopUI;
        if (!["main", "global", "interaction"].includes(ui.snapshot().page) && ui.back()) return;
      }
      closeObjectInteraction(), openSourceMode && (renderer.xr.isPresenting ? xrUI.openSelection() : desktopUI?.openSelection());
      return;
    }
    if (photoReview >= 0) {
      reviewPhoto(-1);
      return;
    }
    if (!(transformPending || saving || finishing || director.snapshot().pending)) {
      if (["ready", "paused", "previewing"].includes(presetSequence.snapshot()?.status)) {
        presetSequence.cancel(), pausePerformance(), syncFlow();
        return;
      }
      if (["align", "calibrate"].includes(phase)) {
        cancelAlignment();
        return;
      }
      if (openSourceMode && phase === "explore") {
        if (sceneMenuOpen()) {
          renderer.xr.isPresenting ? (xrUI.back() || (xrPanel.visible = !1), xrUI.dismissDialogue(), updatePresentationVisibility()) : desktopUI.back(), pointerStart = null, setHover([]), navigationGate.block();
          return;
        }
        if (xrUI?.dismissDialogue()) return;
        editing && toggleMenu();
        return;
      }
      if (!(openSourceMode && !renderer.xr.isPresenting && desktopUI?.back()) && !(xrPanel.visible && xrUI?.back?.()) && !(openSourceMode && xrUI?.dismissDialogue())) {
        if (openSourceMode && agentSuggestions) {
          agentSuggestions = null, syncFlow();
          return;
        }
        if (xrPanel.visible) {
          toggleMenu();
          return;
        }
        if (selection.length) {
          selection = [], updateSelection(), syncFlow();
          return;
        }
        editing && setEditing(!1);
      }
    }
  }
}
function calibrationHint() {
  return pendingAlignment ? "Alignment ready. After applying it, physical movement drives the virtual camera at 1:1 scale." : ["Use the Quest scan, or point at floor corner A with the right trigger.", "Choose floor corner B along the same wall.", "From B, choose corner C along the adjacent wall.", "Point at the ceiling edge above wall A\u2013B and press the right trigger to measure height."][measurePoints.length];
}
function formatMetrics(m) {
  return m ? `${m.width.toFixed(2)} \xD7 ${m.depth.toFixed(2)} \xD7 ${m.height.toFixed(2)} m` : "Room dimensions unavailable";
}
async function changeActorDelay(delta) {
  let actor = state.scene.actors?.find((a) => a.id === director.snapshot().selected);
  if (!actor) throw new Error("Select an actor first");
  await director.change({ delay: THREE28.MathUtils.clamp((actor.delay || 0) + delta, 0, 60) }), syncFlow();
}
function selectedDoorContext() {
  let selected = selection.length === 1 && state?.scene.objects.find((o2) => o2.id === selection[0]), o = isDoor(selected) ? selected : state?.scene.objects.find((o2) => o2.id === state.scene.doorPerformance?.doorId);
  return isDoor(o) ? { id: o.id, name: uiName(o), effect: state.scene.doorEffects?.find((d) => d.objectId === o.id) || null, cast: state.scene.doorPerformance?.doorId === o.id ? state.scene.doorPerformance : null } : null;
}
function flowContext() {
  let capture = roomCamera?.snapshot(), scan = roomTracking.snapshot(), video = virtualRecorder?.snapshot(), selectedObject = selection.length === 1 ? state?.scene.objects.find((o) => o.id === selection[0]) : null;
  return { regionTarget: isRegionObject(selectedObject), selectedLightType: selectedObject?.light?.type, selectedCameraId: selectedObject?.kind === "camera" ? selectedObject.id : null, voiceDraft: studio?.getVoiceDraft(), autoVoice: studio?.getSpeechState().automatic, production: production ? { ...production.state(), time: void 0, triggers: void 0, monitorPose: void 0, placement: production.state().placement ? { kind: production.state().placement.kind, visible: production.state().placement.visible } : null } : void 0, productionReady: !!state?.scene.productionReady, revision: state?.revision, applying: !!currentJob?.applying, suggestions: agentSuggestions?.options || [], floodPreview: currentJob?.result?.type === "flood" && currentJob?.status === "ready", floodAvailable: !!(previewScene || state?.scene)?.floods?.some((f) => regionObjectId(f) === selection[0]), authoring: openSourceMode, generatedPreview: (currentJob?.kind === "actor" || currentJob?.result?.type === "motion") && currentJob?.status === "ready", agentStage: currentJob?.stage, agentTrace: currentJob?.agentTrace || [], curveCount: state?.scene.curves?.length || 0, curveName: state?.scene.curves?.find((c) => c.id === selectedCurveId) ? `${state.scene.curves.findIndex((c) => c.id === selectedCurveId) + 1} \xB7 ${state.scene.curves.find((c) => c.id === selectedCurveId).mode}` : "None", suppressUI: immersiveShowcase(), rehearsal: params.get("script") === "rehearsal", photoReview, describing, targetName: selection.length === 1 ? uiName(state?.scene.objects?.find((o) => o.id === selection[0]) || state?.scene.actors?.find((a) => a.id === selection[0])) : null, captureUI, scriptedMode, script: mrShowcase ? { status: "ready", userText: "Part 2", agentText: mrShowcase.hint() } : scriptDemo?.snapshot() || { ...captureDialogue, status: scriptedMode ? "unconfigured" : "off", error: scriptLoadError }, preset: presetSequence?.snapshot(), objectSelection: [...selection], objectInteraction: objectInteraction.snapshot(), draft: draftTool.summary(), demonstration: demonstration?.snapshot(), localPreparing: !!localPreparation, path: state?.scene.behaviors?.path, doorGrab: doorGrab.snapshot(), phase, handSize, armSize, gripTilt, storyboard: storyboardState, storyActId, door: selectedDoorContext(), hasScene: (openSourceMode ? !!state?.scene : ["room-photos", "room-rebuilt"].includes(state?.source)) && !isRawScanScene(state?.scene), scanBased: isScanScene(state?.scene), finishing, editingBusy: busy(), roomOpacity, latestReply, actorStyle: state?.scene.actorStyle || "zombie", actorName: uiName(state?.scene.actors?.find((a) => a.id === director?.snapshot().selected)), actorDelay: state?.scene.actors?.find((a) => a.id === director?.snapshot().selected)?.delay, reference: roomMode ? !!capture?.count : !!(referenceId || uploadedImage), job: submitting ? "running" : currentJob?.status, entryCount: entryCandidates.length, editing, recording: studio?.getRecordingState() || "idle", saving, savedAt: state?.savedAt, saveMode: state?.saveMode, preview: !!previewScene, demoMode, demoSeconds, demoTracking, roomMode, captureState: capture?.state || "idle", photoCount: capture?.count || 0, photoReading: !!capture?.reading, cameraMessage: capture?.message, captureTip: capture?.tip, cameraDevices: capture?.devices.length || 0, xr: renderer.xr.isPresenting, xrMode, roomAlignmentAvailable: roomMode && ["room-photos", "room-scan", "room-rebuilt"].includes(state?.source), alignedMode, calibrationReady: !!pendingAlignment, calibrationHint: calibrationHint(), calibrationMetrics: formatMetrics(pendingAlignment?.metrics), scanReady: scan.ready, planeCount: scan.count, planeInfo: scan.ready ? formatMetrics(scan.metrics) : "Waiting for floor and ceiling data", videoState: video?.status || "idle", videoRetry: !!video?.canRetry, videoMessage: video?.message, videoSeconds: video?.seconds || 0, roomInfo: state?.scene.room ? formatMetrics(state.scene.room) : "", objectInfo: labelKey, actorCount: state?.scene.actors?.length || 0, actorMotionCount: state?.scene.actors?.filter((a) => a.motionPlan || actorMotionId(a)).length || 0, actorReady: actorAssets.size > 0 && ((state?.scene.actors?.length || 0) < (openSourceMode ? 5 : 5) || director?.snapshot().placing), performanceMode: director?.snapshot().mode, performanceCompleted: director?.snapshot().completed, actorPlacing: director?.snapshot().placing, actorSelected: director?.snapshot().selected, actorMessage: director?.snapshot().message };
}
function syncFlow() {
  $2("mr-showcase-controls") && ($2("mr-showcase-controls").hidden = renderer.xr.isPresenting || phase !== "explore"), agentSuggestions && agentSuggestions.scope !== suggestionScope({ revision: state?.revision, spatialKey: spatialKey(), targetIds: selection, curveId: selectedCurveId }) && (agentSuggestions = null);
  let context = flowContext(), signature = JSON.stringify(context);
  if (signature === flowSignature) return;
  if (flowSignature = signature, openSourceMode) {
    document.body.dataset.phase !== phase && (document.body.classList.toggle("tools-collapsed", phase === "explore"), $2("scene-tools-toggle").textContent = uiText(phase === "explore" ? "Scene tools" : "Hide tools"), $2("scene-tools-toggle").setAttribute("aria-expanded", String(phase !== "explore")));
    let names = { director: "Director Agent", interaction: "Interaction Agent", motion: "Motion Agent", sketch: "Sketch Agent", recommendation: "Recommendation Agent", "scene-construction": "Scene Agent" };
    $2("agent-stage").textContent = uiText(currentJob?.status === "running" ? `${names[currentJob.stage] || "Director Agent"} \xB7 Processing` : currentJob?.status === "ready" ? "Preview ready \xB7 A Apply \xB7 B Discard" : context.targetName ? `Selection: ${context.targetName}` : "Select an object or describe your idea");
  }
  let saveLabel = previewScene ? "Preview not saved" : state?.savedAt ? `${state.saveMode === "manual" ? "Saved" : "Autosaved"} \xB7 ${new Date(state.savedAt).toLocaleTimeString("zh-CN", { hour12: !1 })}` : "Not saved";
  $2("save-status").textContent = uiText(saveLabel), $2("save-scene").disabled = !!busy(), $2("enter-xr").disabled = !state || demoEntry.active || finishing, $2("demo-countdown").textContent = uiText(demoTracking ? "\u2026" : String(demoSeconds)), document.body.dataset.phase = phase, updatePresentationVisibility(), entryMarkers.visible = phase === "entry", $2("workflow-title").textContent = uiText(demoMode && phase === "explore" ? "03 / Explore and create" : PHASES[phase]), $2("workflow-help").textContent = uiText({ reference: demoMode ? "Choose an image and build. Enter the prepared world after a 3-second countdown." : "Choose a reference image, then start building.", building: "Building a rough scene from the image.", preview: "Review the layout, then apply it to create entry points.", entering: demoTracking ? "Waiting for headset tracking. The countdown will restart when tracking returns." : "Entry point ready. Entering shortly.", entry: entryCandidates.length ? `Saved world loaded. ${entryCandidates.length} entry points available.` : "No suitable entry point found. Rebuild or adjust the floor.", explore: "Explore and create. Select an object to describe a change." }[phase]), phase === "reference" ? ($2("scene-title").textContent = uiText("Step into a world from an image."), $2("provenance").textContent = uiText("Build a rough scene, choose an entry point, then keep creating inside."), $2("object-count").textContent = uiText("")) : phase === "building" ? ($2("scene-title").textContent = uiText("Building your world\u2026"), $2("provenance").textContent = uiText(selectedReference?.title ? "Reference: " + selectedReference.title : "Build from the selected image"), $2("object-count").textContent = uiText("")) : state && ($2("scene-title").textContent = uiText((previewScene || state.scene).title), $2("provenance").textContent = uiText(previewScene ? "Scene preview \xB7 Apply to create entry points" : state.source === "sample" ? "Saved procedural example" : "Generated from a reference \xB7 Unseen areas are inferred"), $2("object-count").textContent = uiText((previewScene || state.scene).objects.length + " OBJECTS")), demoMode && phase === "reference" && ($2("provenance").textContent = uiText("Recording demo \xB7 The image introduces the workflow; the saved world is loaded.")), phase === "entering" && ($2("scene-title").textContent = uiText(demoTracking ? "Waiting for headset tracking\u2026" : `Entering the world in ${demoSeconds} seconds.`), $2("provenance").textContent = uiText("Prepared scene demo \xB7 Automatic entry"));
  for (let section of document.querySelectorAll("[data-phase]")) section !== document.body && (section.hidden = section.dataset.phase !== phase);
  if ($2("capture-section").hidden = !roomMode || phase !== "reference", $2("reference-section").hidden = roomMode || phase !== "reference", roomMode && (phase === "reference" && ($2("workflow-title").textContent = uiText("01 / Capture the room"), $2("workflow-help").textContent = uiText("Move between shots and hold still at capture. Photos guide reconstruction."), $2("scene-title").textContent = uiText(state?.source === "room-draft" ? state.scene.title : `Start with the room
around you.`), $2("provenance").textContent = uiText(state?.capturePlan?.closeUnscanned ? "Independent scene \xB7 Scan-constrained layout \xB7 Unscanned ends are closed with virtual walls" : "Capture a real room \xB7 Build a blockout \xB7 Edit from inside"), $2("save-status").textContent = uiText(context.hasScene ? "Continue your saved world from More" : "New scene ready \xB7 Waiting for photos")), phase === "reference" && context.scanBased && ($2("workflow-title").textContent = uiText("01 / Scan to editable blockout"), $2("workflow-help").textContent = uiText("Rebuild separate objects from the scan, resolving overlaps and connections."), $2("scene-title").textContent = uiText("Build an editable scene from the scan."), $2("provenance").textContent = uiText("Scan-constrained layout and scale \xB7 Photos guide object classification"), $2("save-status").textContent = uiText("Review the new build before replacing the current scene")), phase === "building" && ($2("workflow-title").textContent = uiText("02 / Build the room"), $2("workflow-help").textContent = uiText("Combining views to build room structure and large furniture."), $2("provenance").textContent = uiText(`${context.photoCount} room photos \xB7 Small tabletop details excluded`)), phase === "building" && context.scanBased && ($2("workflow-help").textContent = uiText("Resolving scan contours and connections into editable objects."), $2("provenance").textContent = uiText(context.photoCount ? `${context.photoCount} reference photos \xB7 Furniture classification only` : "Build scene objects from the scan")), phase === "entry" && ($2("workflow-help").textContent = uiText(entryCandidates.length ? "Choose an open spot to enter the room." : "No clear entry point found. Return to capture and rebuild.")), phase === "entry" && renderer.xr.isPresenting && ($2("workflow-help").textContent = uiText("Align with the real room to film through physical movement, or inspect the estimated scene first.")), phase === "calibrate" && ($2("workflow-help").textContent = uiText(calibrationHint()), $2("calibration-guide").textContent = uiText(calibrationHint()), $2("calibration-measurement").textContent = uiText(pendingAlignment ? formatMetrics(pendingAlignment.metrics) : `${measurePoints.length} floor corners marked`)), !["reference", "building", "preview"].includes(phase) && state?.source === "room-photos" && ($2("provenance").textContent = uiText("Generated from room photos \xB7 Dimensions and unseen geometry are estimates")), state?.scene.room && phase !== "reference" && ($2("provenance").textContent = uiText(`${state.scene.room.source === "estimated" ? "Estimated dimensions" : "Room dimensions calibrated"} \xB7 Check furniture placement against the room${alignedMode ? " \xB7 Physical movement 1:1" : ""}`))), roomMode) {
    (previewScene || state?.scene)?.scanReconstruction && phase !== "reference" ? $2("provenance").textContent = uiText("Editable scan blockout \xB7 Separate objects \xB7 Door locations preserved") : (previewScene || state?.scene)?.scanStructure && phase !== "reference" && ($2("provenance").textContent = uiText("Quest scan surfaces \xB7 Doors are static snapshots \xB7 Check cross-area connections"));
    let hints = { welcome: context.hasScene ? "Continue your saved layout and confirm real-room alignment when needed." : "Start with room photos and build a blockout you can enter.", overview: "Inspect the whole layout. Your position and alignment are kept when you return.", align: pendingAlignment ? "Left stick: offset \xB7 Left grip + stick: height \xB7 Rotate 90\xB0 to match walls \xB7 A saves alignment." : "Reading the Quest scan. If unavailable, use Adjust alignment to mark corners manually.", preview: "Review the layout, then apply it to enter. The current scene remains until you apply.", explore: context.actorPlacing ? "Point at the floor and press the right trigger to place an actor \xB7 A to cancel" : "Right stick click: edit \xB7 X: speak \xB7 B: record \xB7 Y: menu" };
    hints[phase] && ($2("workflow-help").textContent = uiText(draftTool.active() ? "Draft \xB7 Draw a path, then review, redraw, or undo." : hints[phase])), phase === "welcome" && ($2("scene-title").textContent = uiText("Continue creating."), $2("provenance").textContent = uiText(context.hasScene ? state.scene.title : "Start with a real space")), phase === "preview" && ($2("provenance").textContent = uiText(previewScene?.scanReconstruction ? "Editable blockout \xB7 Apply, then click the right stick to edit" : previewScene?.scanFurnishing ? "Scan-based furnishing \xB7 Existing walls and doors preserved" : previewScene?.scanStructure ? "Quest scan surfaces \xB7 Check cross-area connections" : "Scene preview \xB7 Apply to enter")), $2("entry-section").hidden = !0, $2("more-options").hidden = ["welcome", "reference", "building", "preview"].includes(phase), $2("actor-tools").hidden = openSourceMode ? phase !== "explore" : !context.actorSelected && !context.actorPlacing, $2("selection-tools").hidden = !editing;
  }
  openSourceMode && state?.example && !["reference", "building", "preview"].includes(phase) && ($2("provenance").textContent = "Local workspace \xB7 Agent motion \xB7 2D floor / 3D air curves"), openSourceMode && phase === "explore" && !renderer.xr.isPresenting && ($2("workflow-help").textContent = uiText(selectedDoorContext() ? "Door interaction: draw sources and a floor region, then describe the flow and trigger. WASD Move; right mouse drag Turn." : "Select actors for motion or doors for region interactions. WASD Move; right mouse drag Turn.")), $2("room-tools").hidden = !roomMode || ["welcome", "reference", "building", "preview"].includes(phase);
  let scan = roomTracking.snapshot();
  $2("room-metrics").textContent = uiText(state?.scene.room ? `${formatMetrics(state.scene.room)} \xB7 ${state.scene.room.source === "estimated" ? "Not calibrated" : "Room dimensions recorded"}` : ""), $2("plane-status").textContent = uiText(renderer.xr.isPresenting ? `Quest planes: ${scan.count} \xB7 ${context.planeInfo}` : "Room scans are available in Quest immersive mode."), $2("record-video").disabled = ["starting", "saving"].includes(context.videoState) || busy() && !canRecordDraft() && context.videoState !== "recording" && !context.videoRetry, $2("record-video").textContent = uiText(openSourceMode ? context.videoState === "recording" ? "Stop and save recording" : "Record virtual view" : context.videoState === "recording" ? "Stop and save \xB7 B" : "Record virtual view \xB7 B"), $2("video-status").textContent = uiText(`${context.videoMessage || "Enter the room to record"}${context.videoState === "recording" ? ` \xB7 ${context.videoSeconds} s` : ""}`);
  for (let id of ["align-room", "rotate-room", "apply-room-size", "show-room-overview"]) $2(id).disabled = !!busy();
  if ($2("rotate-room").disabled = !isMiniature() && !alignedMode && !(phase === "align" && pendingAlignment) || !!busy() && !(isMiniature() && currentJob?.status === "ready" && currentJob?.kind === "generate") || saving || submitting || videoBusy(), $2("room-scan").disabled = !renderer.xr.isPresenting || !!busy() || videoBusy(), presetActions(context).length && ($2("workflow-help").textContent = uiText(context.preset.message)), $2("authoring-scene-tools").hidden = !openSourceMode || phase !== "explore", openSourceMode && phase === "explore") {
    $2("authoring-scene-actions").replaceChildren();
    for (let item2 of authoringSceneActions(context)) {
      let b = document.createElement("button");
      b.textContent = item2.label, b.disabled = !!item2.disabled || !!busy(), b.onclick = action(() => flowAction(item2.id)), $2("authoring-scene-actions").append(b);
    }
    context.actorSelected && !context.job && ($2("workflow-title").textContent = "ACTOR / " + context.actorName, $2("workflow-help").textContent = uiText("Selected actor \xB7 Agent motion \xB7 Curve " + context.curveName));
  }
  $2("workflow-actions").replaceChildren();
  for (let item2 of (captureUI ? captureActions(context) : draftTool.active() ? [] : presetActions(context).length ? [...presetActions(context), ...objectActions(context)] : [...mainActions(context), ...objectActions(context), ...storyboardEntry(context), ...selectedActorActions(context), ...doorMenuEntry(context)]).flatMap((item22) => item22.id === "more" ? roomMode && context.hasScene ? [{ id: "resume", label: "Back to creating" }] : [] : [item22])) {
    let button = document.createElement("button");
    button.textContent = uiText(item2.label), button.dataset.action = item2.id, button.disabled = !!item2.disabled, button.onclick = action(() => flowAction(item2.id)), $2("workflow-actions").append(button);
  }
  paintObjectInteraction(context), $2("latest-reply").textContent = uiText(latestReply || "Hold X to speak, release to review."), captureUI && ($2("capture-dialogue").hidden = !1, $2("capture-user").textContent = uiText(context.script.userText ? "You: " + context.script.userText : ""), $2("capture-agent").textContent = uiText(context.script.agentText ? "Agent: " + context.script.agentText : ""), $2("capture-state").textContent = uiText(captureStatus(context)), $2("capture-rec").textContent = uiText(recordLabel(context).replace(/^●\s*/, "")), $2("capture-rec").dataset.recording = String(context.videoState === "recording"), $2("capture-rec").dataset.tone = context.videoState === "error" ? "error" : "normal", $2("capture-state").dataset.tone = context.script.error || context.videoState === "error" || context.captureState === "error" ? "error" : "normal", $2("capture-rec").hidden = !recordLabel(context), $2("capture-stop").hidden = !context.script.busy && context.performanceMode !== "running", $2("capture-stop").textContent = uiText(context.script.busy ? "Cancel" : "Stop"), $2("capture-target").textContent = uiText(captureQuestion(context)), $2("capture-description").hidden = !describing), paintActorControls(), paintStoryControls(context), openSourceMode && desktopUI?.update(context), xrUI?.setContext({ ...context, saveLabel }), placeMarker();
}
function setPhase(next) {
  if (next !== phase && (describing = !1, photoReview = -1), next !== phase && objectInteraction.active() && closeObjectInteraction("Stage changed. Draft closed."), roomMode && next !== phase && ($2("display-settings").hidden = !0, $2("display-settings").open = !1), roomMode && next !== "reference" && params.has("capture")) {
    params.delete("capture");
    let url = new URL(location.href);
    url.searchParams.delete("capture"), history.replaceState(history.state, "", url);
  }
  next !== phase && (traceInput("phase", { from: phase, to: next, revision: state?.revision }), virtualRecorder?.event("phase", { from: phase, to: next, revision: state?.revision })), phase = next, next !== "explore" && resetHands(), flowSignature = "", syncFlow(), updateHint();
}
async function chooseSuggestion(index) {
  let entry = agentSuggestions;
  if (!entry || !Number.isInteger(index) || !entry.options[index]) throw Error("Suggestions expired. Request new suggestions.");
  if (entry.scope !== suggestionScope(dialogueContext()))
    throw agentSuggestions = null, syncFlow(), Error("Target or scene changed. Request new suggestions.");
  if (busy()) throw Error("Finish the current operation first.");
  let prompt = entry.options[index].prompt;
  return agentSuggestions = null, startJob("agent", prompt, studio.conversationId, entry.context);
}
async function confirmAuthoring(controller = null) {
  if (openSourceMode && studio.getVoiceDraft()) return studio.confirmVoice();
  if (!(studio.getRecordingState() !== "idle" || saving || finishing)) {
    if (openSourceMode && production?.state().dirty)
      return production.state().placing && updateActorTarget(), production.save();
    if (currentJob?.status === "ready") return applyJob();
    if (draftTool.active())
      return draftTool.snapshot().stroke ? void 0 : saveCurve();
    if (renderer.xr.isPresenting && xrPanel.visible && !director.snapshot().placing) return xrUI.confirmFocused();
    if (!busy()) {
      if (director.snapshot().placing) {
        if (renderer.xr.isPresenting) {
          let right = controller || controllers.find((c) => c.userData.inputSource?.handedness === "right");
          if (!xrViewer.valid || !right?.visible || renderer.xr.getSession()?.visibilityState !== "visible") {
            director.clearTarget();
            return;
          }
          raycaster.setFromXRController(right);
        } else {
          if (!pointerInside) return;
          raycaster.setFromCamera(pointer, camera);
        }
        return director.confirmPlacement(raycaster);
      }
      if (openSourceMode && production?.state().monitor && !sceneMenuOpen()) return production.recenterMonitor();
      if (renderer.xr.isPresenting) return toggleMenu();
      if (agentSuggestions?.options.length) {
        $2("agent-suggestions").querySelector("button")?.focus();
        return;
      }
      desktopUI?.collapse(!1);
    }
  }
}
async function cinemaAction(id) {
  if (id === "cinemaTransform") return production.startPoses();
  if (id === "cinemaOther") {
    if (!editing) throw Error("Enter edit mode first.");
    return closeObjectInteraction(), xrPanel.visible = !1, desktopUI?.collapse(), studio.startVoice({ auto: !0 });
  }
  if (id === "cinemaSave") return confirmAuthoring();
  if (id === "cinemaCancel") return production.cancel();
  if (id === "cinemaPreview") return production.openMonitor();
  if (id === "cinemaAdjustCamera") return production.adjustCamera();
  if (id === "cinemaLightPoint" || id === "cinemaLightSpot") {
    if (selection.length !== 1) throw Error("Select a light first.");
    return production.preview({ op: "update", id: selection[0], values: { lightType: id === "cinemaLightPoint" ? "point" : "spot" } });
  }
  if (id === "cinemaCreateOther") {
    if (!editing) throw Error("Enter edit mode first.");
    return closeObjectInteraction(), confirmSelection([]), xrPanel.visible = !1, desktopUI?.collapse(), studio.startVoice({ auto: !0 });
  }
  if (id === "cinemaNext") return production.cameraStep(1);
  if (id === "cinemaClose") return production.closeMonitor();
  if (id === "cinemaPlay") return startObjectPreview();
  if (id === "cinemaPause") return production.pause();
  if (id === "cinemaComplete") {
    await production.complete(), setEditing(!1);
    return;
  }
  if (id === "cinemaCurveEdit") return production.editCurve(selectedCurveId);
  if (id === "cinemaStraight" || id === "cinemaSmooth") return production.preview({ op: "curve", id: selectedCurveId, straight: id === "cinemaStraight", smooth: !0 });
  if (id === "cinemaBind") {
    if (selection.length !== 1 || !selectedCurveId) throw Error("Select an object and a saved curve first.");
    return production.preview({ op: "update", id: selection[0], values: { curveId: selectedCurveId } });
  }
  if (id === "cinemaRemove") {
    if (selection.length !== 1) throw Error("Select an object first.");
    return production.preview({ op: "remove", id: selection[0] });
  }
  let kind = { cinemaCamera: "camera", cinemaSpot: "spot", cinemaPoint: "point", cinemaBox: "box" }[id];
  if (kind) return production.create(kind);
}
function flowAction(id) {
  if (openSourceMode && id.startsWith("cinema")) return cinemaAction(id);
  if (openSourceMode && id.startsWith("suggestion:")) return chooseSuggestion(Number(id.slice(11)));
  if (!(openSourceMode && desktopUI?.navigate(id))) {
    if (id === "storyboard") {
      $2("storyboard-panel").hidden = !1, action(refreshStoryboard)(), $2("storyboard-panel").scrollIntoView({ block: "nearest" });
      return;
    }
    if (id === "doors") {
      $2("door-tools").hidden = !1, $2("door-tools").open = !0, $2("door-tools").scrollIntoView({ block: "nearest" });
      return;
    }
    if (id === "display" || id === "alignmentOptions") {
      $2("display-settings").hidden = !1, $2("display-settings").open = !0, $2("display-settings").scrollIntoView({ block: "nearest" });
      return;
    }
    if (id === "sceneTools") {
      $2("authoring-scene-tools").open = !0, $2("authoring-scene-tools").scrollIntoView({ block: "nearest" });
      return;
    }
    if (id === "actors") {
      $2("actor-tools").open = !0, $2("actor-tools").scrollIntoView({ block: "nearest" });
      return;
    }
    if (id === "library") {
      $2("reference-section").scrollIntoView({ block: "nearest" });
      return;
    }
    if (id === "more") {
      $2("more-options").hidden = !1, $2("more-options").open = !$2("more-options").open;
      return;
    }
    return flowActions[id]?.();
  }
}
function chooseEntry(index) {
  let entry = entryCandidates[index];
  if (entry) {
    chosenEntry = index, anchor.fromArray(entry.position), heading = entry.heading, $2("heading").value = String(Math.round(heading * 180 / Math.PI)), $2("heading-value").textContent = uiText(`${Math.round(heading * 180 / Math.PI)}\xB0`), placeMarker();
    for (let child of entryMarkers.children) child.material.color.set(child.userData.entryIndex === index ? UI_THEME.accent : UI_THEME.selected);
    for (let [i, b] of [...$2("entry-list").children].entries()) b.classList.toggle("active", i === index);
    setXRStatus(`Entry ${index + 1} selected \xB7 Select Enter world`);
  }
}
function renderEntries() {
  for (let mesh of [...entryMarkers.children])
    entryMarkers.remove(mesh), mesh.geometry.dispose(), mesh.material.dispose();
  $2("entry-list").replaceChildren(), entryCandidates.forEach((entry, i) => {
    let portal = new THREE28.Mesh(new THREE28.TorusGeometry(0.8, 0.09, 6, 32), new THREE28.MeshBasicMaterial({ toneMapped: !1, color: UI_THEME.selected, depthTest: !1 }));
    portal.position.fromArray(entry.position), portal.position.y += 0.08, portal.rotation.x = -Math.PI / 2, portal.renderOrder = 10, portal.userData.entryIndex = i, entryMarkers.add(portal);
    let button = document.createElement("button");
    button.textContent = uiText(`Entry ${i + 1}${i === 0 ? " \xB7 Recommended" : ""}`), button.onclick = () => chooseEntry(i), $2("entry-list").append(button);
  });
}
function prepareEntries() {
  entryCandidates = findEntryCandidates(state.scene), renderEntries(), setPhase("entry"), tool = "anchor", setEditing(!1), entryCandidates.length && chooseEntry(0), updateHint();
}
function rememberCreation() {
  phase === "explore" && mode === "inhabit" && (creationPose = captureCreationPose(world, rig, camera, alignedMode));
}
function invalidateCreation() {
  alignment = null, creationPose = null, pendingAlignment = null, spatialEpoch++;
}
function creationReady() {
  setPhase("explore"), virtualRecorder?.event("enterWorld", { revision: state?.revision }), tool = "object", setEditing(!1), state.scene.floods?.length && floodRuntime.start(), roomCeilingVisibility(), placeMarker(), renderer.xr.isPresenting && (xrViewer.valid && (hadXRFrame = !0), xrUI.hideKeyboard(), xrPanel.visible = !1), toast(openSourceMode ? "A Confirm \xB7 B Cancel / Back \xB7 X Voice \xB7 Y Menu \xB7 Left grip Play / Pause" : "Right stick: edit \xB7 A: cancel/back \xB7 Left grip: preview/pause \xB7 X: speak \xB7 B: record \xB7 Y: menu");
}
function resumeWorld() {
  if (roomMode && isRawScanScene(state.scene)) throw new Error("The scan is a reference. Build an editable blockout first.");
  if (requireSpatialIdle(), roomCamera?.stop(), selection = [], renderScene(state.scene), $2("more-options").open = !1, roomMode) {
    if (renderer.xr.isPresenting && !xrViewer.valid) throw new Error("Wait for headset tracking before continuing");
    if (creationPose) {
      restoreCreationPose(creationPose, world, rig, camera, { xr: renderer.xr.isPresenting }), alignedMode = creationPose.alignedMode, mode = "inhabit", controls.enabled = !1, renderer.xr.isPresenting || (desktopYaw = camera.rotation.y, desktopPitch = camera.rotation.x), spatialEpoch++, scene.background = renderer.xr.isPresenting && xrMode === "immersive-ar" ? null : new THREE28.Color(UI_THEME.background), creationReady();
      return;
    }
    if (renderer.xr.isPresenting && xrMode === "immersive-ar") {
      alignment ? enterAlignedRoom() : beginAlignmentCheck({ restore: !0 });
      return;
    }
    prepareEntries(), enterWorld({ allowEstimated: !0 });
    return;
  }
  overview(), prepareEntries();
}
function newWorld() {
  requireSpatialIdle(), rememberCreation(), studio.cancelVoice(), roomCamera?.stop(), selection = [], setEditing(!1), overview(), setPhase("reference"), placeXRPanel(), $2("more-options").open = !1;
}
function showOverview() {
  requireSpatialIdle(), rememberCreation(), setEditing(!1), overview(), roomMode ? (setPhase("overview"), placeXRPanel()) : prepareEntries();
}
async function finishCreation() {
  if (!finishing) {
    if (previewScene)
      throw placeXRPanel(), new Error("Apply or discard the preview before finishing");
    if (busy()) throw new Error("Finish the current action before saving and exiting");
    finishing = !0, syncFlow();
    try {
      let saved = await api("/api/save-scene", { revision: state.revision });
      acceptState(saved), rememberCreation(), pausePerformance(), roomCamera?.stop(), setEditing(!1), overview(), setPhase("welcome"), placeXRPanel(), toast("Scene saved. You can resume your work later.");
    } finally {
      finishing = !1, syncFlow();
    }
  }
}
function beginDemo() {
  if (busy()) throw new Error("Finish the current action first");
  entryCandidates = demoEntry.start({ scene: state?.scene, revision: state?.revision, reference: !!(referenceId || uploadedImage), now: performance.now() }), selection = [], overview(), setEditing(!1), renderEntries(), chooseEntry(0), demoSeconds = 3, demoTracking = !1, setPhase("entering"), placeXRPanel();
}
function cancelDemo(message = "Entry cancelled. You can start again.") {
  demoEntry.active && (demoEntry.cancel(), demoTracking = !1, setPhase("reference"), toast(message));
}
function updateDemo(now) {
  let next = demoEntry.tick({ now, revision: state?.revision, tracked: renderer.xr.isPresenting ? xrViewer.valid : !document.hidden });
  if (next.status !== "idle") {
    if (next.status === "changed") {
      demoTracking = !1, setPhase("reference"), toast("Scene updated. Select Build again.");
      return;
    }
    if (next.status === "ready") {
      demoTracking = !1, setPhase("entry"), enterWorld();
      return;
    }
    demoSeconds = next.seconds, demoTracking = next.status === "tracking", syncFlow();
  }
}
var geometry = objectGeometry;
function renderScene(definition) {
  roomMode && isRawScanScene(definition) && (definition = { ...definition, objects: [], actors: [] }), renderedDefinition = definition, definition.curves?.some((c) => c.id === selectedCurveId) || (selectedCurveId = definition.curves?.at(-1)?.id || null), curveLayer.sync(definition.curves, selectedCurveId), floodRuntime.sync(definition), floodLayer.sync(definition), director?.sync(definition), doorGrab.sync(definition, { reset: doorResetPending }), pathGuide.sync(definition.behaviors?.path);
  let nextPath = JSON.stringify(definition.behaviors?.path), nextBinding = JSON.stringify(definition.behaviors?.binding);
  (nextPath !== pathKey || nextBinding !== bindingKey || doorResetPending) && definition.behaviors?.path && director.freeze(definition.behaviors.path.actorIds), pathKey = nextPath, bindingKey = nextBinding, doorPlayer.sync(definition, { reset: doorResetPending }), doorPerformance.sync(definition, { reset: doorResetPending }), doorResetPending = !1, director?.sync(definition), world.updateMatrixWorld(!0), virtualRecorder?.syncDefinition(definition, world.matrixWorld);
  let ids = new Set(definition.objects.map((o) => o.id));
  for (let [id, mesh] of meshes2) ids.has(id) || (mesh.geometry.dispose(), mesh.material.dispose(), world.remove(mesh), meshes2.delete(id));
  for (let o of definition.objects) {
    let mesh = meshes2.get(o.id);
    mesh ? (mesh.userData.definition?.shape !== o.shape || mesh.userData.definition?.kind !== o.kind) && (mesh.geometry.dispose(), mesh.geometry = geometry(o)) : (mesh = new THREE28.Mesh(geometry(o), new THREE28.MeshStandardMaterial()), meshes2.set(o.id, mesh), world.add(mesh)), mesh.userData.definition = o, mesh.position.fromArray(o.position), mesh.scale.fromArray(o.size), o.quaternion ? mesh.quaternion.fromArray(o.quaternion) : mesh.rotation.set(0, o.rotation, 0), mesh.material.vertexColors !== (o.kind === "camera") && (mesh.material.vertexColors = o.kind === "camera", mesh.material.needsUpdate = !0), mesh.material.color.set(blockoutColor(o, definition)), mesh.material.roughness = o.roughness, mesh.material.metalness = o.metalness, mesh.material.emissive.set(o.id === "moon" || o.id.startsWith("star-") ? o.color : "#000000"), mesh.material.emissiveIntensity = 0.35, mesh.visible = !(roomMode && mode === "overview" && isCeiling(o));
  }
  if (updateRoomAppearance(), roomMode && definition.objects.some((o) => o.id === "ground")) {
    let dimensions = roomDimensions(definition);
    for (let key of ["width", "depth", "height"]) document.activeElement !== $2("room-" + key) && ($2("room-" + key).value = dimensions[key].toFixed(2));
  }
  selection = selection.filter((id) => ids.has(id) || definition.actors?.some((a) => a.id === id)), updateSelection(), $2("scene-title").textContent = uiText(definition.title), $2("object-count").textContent = uiText(`${definition.objects.length} OBJECTS`), $2("provenance").textContent = uiText(previewScene ? "Build preview \xB7 Not applied" : state?.source === "sample" ? "Procedural example \xB7 Not a photo reconstruction" : "Generated blockout \xB7 Includes inferred geometry"), setHover([]), placeMarker(), flowSignature = "", syncFlow();
}
function updateSelection() {
  for (let outline of outlines)
    world.remove(outline), outline.geometry.dispose(), outline.material.dispose();
  outlines = [], world.updateMatrixWorld(!0);
  for (let id of editing ? selection : []) {
    let mesh = meshes2.get(id);
    if (!mesh) continue;
    let outline = new THREE28.LineSegments(new THREE28.EdgesGeometry(mesh.geometry), new THREE28.LineBasicMaterial({ toneMapped: !1, color: UI_THEME.accent, depthTest: !1 }));
    outline.userData.id = id, outline.position.copy(mesh.position), outline.rotation.copy(mesh.rotation), outline.scale.copy(mesh.scale).multiplyScalar(1.01), outline.renderOrder = 9, world.add(outline), outlines.push(outline);
  }
  $2("selection-count").textContent = uiText(`${selection.length} selected`), $2("selection-label").textContent = uiText(selection.length ? selection.slice(0, 3).map((id) => uiName(allEntities(state.scene).find((o) => o.id === id)) || id).join(" / ") + (selection.length > 3 ? ` \u2026 ${selection.length} items total` : "") + (draftTool.active() ? " \xB7 Draft targets locked" : " \xB7 Hold trigger again to adjust") : "Enter edit mode, then point at an object to inspect and select it.");
}
function setHover(ids) {
  if (ids.join("|") !== hoverIds.join("|")) {
    hoverIds = [...ids];
    for (let outline of hoverOutlines)
      world.remove(outline), outline.geometry.dispose(), outline.material.dispose();
    hoverOutlines = [];
    for (let id of ids) {
      let mesh = meshes2.get(id);
      if (!mesh) continue;
      let outline = new THREE28.LineSegments(new THREE28.EdgesGeometry(mesh.geometry), new THREE28.LineBasicMaterial({ toneMapped: !1, color: UI_THEME.selected, depthTest: !1 }));
      outline.userData.id = id, outline.position.copy(mesh.position), outline.rotation.copy(mesh.rotation), outline.scale.copy(mesh.scale).multiplyScalar(1.018), outline.renderOrder = 11, world.add(outline), hoverOutlines.push(outline);
    }
    $2("selection-count").textContent = uiText(volume.isActive() ? `${ids.length} objects in selection box` : `${selection.length} selected`);
  }
}
function entityIds(hit = sceneHit(raycaster)) {
  if (hit?.kind === "actor") return [hit.id];
  let o = hit?.object?.userData.definition;
  return !o || o.id === "ground" && o.editable !== !0 ? [] : expandSelection(state.scene, tool === "group" ? state.scene.objects.filter((item2) => item2.group === o.group && (item2.id !== "ground" || item2.editable === !0)).map((item2) => item2.id) : [o.id]);
}
function confirmSelection(ids) {
  draftTool.active() || openSourceMode && (!editing || production?.busy()) || (objectInteraction.active() && closeObjectInteraction(), selection = expandSelection(state.scene, ids), syncingSelection = !0, director?.select(selection.find((id) => state.scene.actors?.some((a) => a.id === id)) || null), syncingSelection = !1, setHover([]), updateSelection(), ids.some((id) => meshes2.has(id)) ? action(() => studio.confirmedSelection())() : ids.length || toast("No objects selected"), syncFlow(), selection.length && (renderer.xr.isPresenting ? (openSourceMode && xrUI.openSelection(), placeXRPanel()) : openSourceMode && desktopUI?.openSelection()));
}
function beginControllerVolume(controller) {
  if (!volume.isActive()) {
    if (phase !== "explore") {
      toast("Enter the world before using box selection");
      return;
    }
    if (busy()) {
      toast("Finish voice input or the current request / preview first");
      return;
    }
    if (director?.snapshot().placing) {
      toast(openSourceMode ? "Point at ground \xB7 A Place \xB7 B Cancel" : "Place actor: right trigger to confirm \xB7 A to cancel");
      return;
    }
    if (!editing) {
      toast("Click the right stick to edit, then hold the right grip for box selection");
      return;
    }
    tool = "object", raycaster.setFromXRController(controller), volumeController = controller, volume.begin(raycaster), toast("Point at the opposite corner \xB7 Right stick adjusts depth \xB7 Release grip to confirm");
  }
}
function cancelVolume() {
  volume.isActive() && navigationGate.block(), volume.cancel(), volumeController = null, setHover([]), updateSelection(), controls.enabled = mode === "overview" && !renderer.xr.isPresenting;
}
function finishVolume() {
  let ids = volume.finish();
  volumeController = null, navigationGate.block(), controls.enabled = mode === "overview" && !renderer.xr.isPresenting, ids ? (tool = "object", document.querySelectorAll("[data-tool]").forEach((b) => b.classList.toggle("active", b.dataset.tool === tool)), confirmSelection(ids), updateHint()) : (setHover([]), updateSelection(), toast("Selection box too small. Previous selection kept."));
}
function setEditing(value) {
  if (openSourceMode && production) {
    if (value && (virtualRecorder?.snapshot().status === "recording" || production.state().monitor && production.busy())) {
      toast("Stop recording first.");
      return;
    }
    if (studio.getRecordingState() !== "idle" || draftTool.active() || director.snapshot().placing || volume.isActive() || currentJob || submitting) {
      toast("Finish or cancel the current voice, sketch or Agent operation.");
      return;
    }
    if (!production.setEditing(!!value && phase === "explore", phase === "explore" ? value ? "edit" : "explore" : "edit")) return;
    studio.cancelVoice(), selection = [], agentSuggestions = null;
  }
  value && floodRuntime.stop(), doorGrab.release(), draftTool.active() && closeObjectInteraction(), value || cancelTransform(), director?.cancelPlacement(), editing = !!value && phase === "explore", cancelVolume(), pointerFeedback.hide(), rayFeedback.forEach((f) => f.hide()), $2("edit-toggle").textContent = uiText(editing ? "Exit edit mode" : "Enter edit mode"), $2("edit-toggle").classList.toggle("active", editing), updateObjectLabel(), updateHint(), setXRStatus(editing ? "Edit: Right trigger Select \u2192 Transform \u2192 Stick / Grip controls \xB7 A Save \xB7 B Revert" : "Explore \xB7 Click the right stick to edit"), syncFlow();
}
function toggleEditing() {
  if (phase !== "explore") throw new Error("Enter the world first");
  if (director.snapshot().placing) throw new Error(openSourceMode ? "A Place actor or B Cancel first." : "Place the actor with the right trigger, or press A to cancel");
  if (!editing && busy()) throw new Error("Finish the current action first");
  tool === "anchor" && (tool = "object"), setEditing(!editing), toast(editing ? "Edit mode: select with right trigger \u2192 Transform / Interaction / Other" : "Explore mode: interactions enabled \xB7 X Voice to summon Camera Agent");
}
function placeMarker() {
  marker.position.copy(anchor), marker.position.y = anchor.y + 0.1, marker.rotation.y = heading, marker.visible = phase === "entry";
}
function setTool(next) {
  if (phase !== "explore" && next !== "anchor") {
    toast("Enter the world before editing");
    return;
  }
  tool = next, cancelVolume(), next !== "anchor" && setEditing(!0), document.querySelectorAll("[data-tool]").forEach((b) => b.classList.toggle("active", b.dataset.tool === tool)), updateHint(), placeMarker(), setXRStatus(next === "region" ? "Hold right grip to select a box \xB7 Release to confirm \xB7 Right stick adjusts depth" : next === "anchor" ? "Point at an open area and press the trigger to choose an entry point" : `Selection mode: ${next === "group" ? "Group" : "Object"}`);
}
function updateHint() {
  if (openSourceMode && phase === "explore") {
    $2("tool-hint").textContent = uiText(renderer.xr.isPresenting ? "Right trigger Select / Draw \xB7 A Confirm \xB7 B Cancel \xB7 X Voice \xB7 Y Menu" : "V Edit \xB7 X Voice \xB7 Y Tools \xB7 Enter Confirm \xB7 Esc Cancel");
    return;
  }
  if (draftTool.active()) {
    $2("tool-hint").textContent = uiText(renderer.xr.isPresenting ? "Draft \xB7 Right trigger: draw \xB7 Left stick click: undo \xB7 A: cancel \xB7 B: record \xB7 Y: menu" : "Draft \xB7 Drag with left mouse: draw \xB7 Ctrl / \u2318 Z: undo \xB7 Esc: cancel \xB7 R: record");
    return;
  }
  $2("tool-hint").textContent = uiText(phase === "reference" ? "Choose image \u2192 Build scene \u2192 Choose entry \u2192 Enter world" : phase === "entry" ? "Select an entry ring, or point at an open area" : editing && tool === "region" ? "Drag with the left mouse to box-select object centers" : mode === "overview" ? "Drag to orbit \xB7 Scroll to zoom" : "WASD: move \xB7 Q/E: vertical \xB7 Right mouse: look \xB7 V: edit"), demoMode && ["reference", "entering"].includes(phase) && ($2("tool-hint").textContent = uiText("Choose image \u2192 Build scene \u2192 Enter after 3 seconds")), roomMode && phase === "reference" && ($2("tool-hint").textContent = uiText("Aim with the headset \xB7 Right trigger: photo \xB7 Menu: undo photo \xB7 Y: menu")), roomMode && phase === "explore" && ($2("tool-hint").textContent = uiText(`${editing ? "Edit \xB7 Hold trigger: adjust \xB7 Stick: turn / raise \xB7 Left stick click: undo \xB7 Right grip: box-select" : "Explore mode"} \xB7 Right stick / V: toggle \xB7 ${alignedMode ? "Physical movement 1:1" : "WASD / stick to move"} \xB7 B: record`)), roomMode && phase === "welcome" && ($2("tool-hint").textContent = uiText("Resume your work or capture a new room")), roomMode && phase === "overview" && ($2("tool-hint").textContent = uiText("Overview \xB7 Position preserved \xB7 Y: hide / show")), phase === "calibrate" && ($2("tool-hint").textContent = uiText("Use the Quest scan, or mark three corners and ceiling height with the right trigger"));
}
function groundPoint() {
  world.updateMatrixWorld(!0);
  let localRay = raycaster.ray.clone().applyMatrix4(world.matrixWorld.clone().invert()), ground = referenceFloor(state.scene);
  return ground ? localRay.intersectPlane(new THREE28.Plane(new THREE28.Vector3(0, 1, 0), -(ground.position[1] + ground.size[1] / 2 + 0.01)), new THREE28.Vector3()) : null;
}
function entryClear(point2) {
  return entryIsClear(previewScene || state.scene, point2.toArray());
}
function selectFromRay() {
  if (!sceneMenuOpen() && !(phase === "explore" && !editing && !director?.snapshot().placing)) {
    if (busy()) {
      toast("Finish the current request or preview first");
      return;
    }
    if (!world.visible) {
      toast("Choose a reference and build first");
      return;
    }
    if (phase === "entry") {
      let portal = raycaster.intersectObjects(entryMarkers.children, !1)[0];
      if (portal) {
        chooseEntry(portal.object.userData.entryIndex);
        return;
      }
      let point2 = groundPoint();
      if (!point2 || !entryClear(point2)) {
        toast("Point at a clearer area of the floor");
        return;
      }
      entryCandidates = [{ position: point2.toArray(), heading }, ...entryCandidates.slice(0, 2)], renderEntries(), chooseEntry(0), flowSignature = "", syncFlow(), toast("Entry point set");
      return;
    }
    if (director?.snapshot().placing) {
      director.interceptRay(raycaster);
      return;
    }
    phase === "explore" && editing && confirmSelection(entityIds());
  }
}
function miniatureScale() {
  let definition = previewScene || state?.scene;
  if (isScanScene(definition)) return Math.min(0.28, 1.7 / scanPresentationBounds(definition).extent);
  let floor = definition?.objects.find((o) => o.id === "ground");
  return roomMode && floor ? Math.min(0.28, 1.7 / Math.max(floor.size[0], floor.size[2])) : 0.055;
}
function overview() {
  if (pausePerformance(), director?.cancelPlacement(), director?.clearTarget(), spatialEpoch++, mode = "overview", alignedMode = !1, cancelVolume(), rig.position.set(0, 0, 0), rig.rotation.set(0, 0, 0), world.scale.setScalar(miniatureScale()), roomCeilingVisibility(), labelSprite && (labelSprite.visible = !1), renderer.xr.isPresenting)
    scene.background = xrMode === "immersive-ar" ? null : new THREE28.Color(UI_THEME.background);
  else {
    world.rotation.set(0, miniatureYaw, 0);
    let center = new THREE28.Vector3(...scanPresentationBounds(previewScene || state?.scene).center);
    world.position.copy(center.multiply(world.scale).applyQuaternion(world.quaternion).negate()), camera.position.set(0, 1.65, 3.5), camera.rotation.set(0, 0, 0), controls.target.set(0, 0.24, 0), controls.enabled = !0, controls.update();
  }
  scene.fog = null, placeMarker(), $2("mode-badge").textContent = uiText("World overview"), updateHint(), placeXRPanel();
}
function enterWorld({ allowEstimated = !1 } = {}) {
  if (renderer.xr.isPresenting && !xrViewer.valid) {
    toast("Wait for headset tracking before entering");
    return;
  }
  if (busy()) {
    toast("Finish the current request or preview first");
    return;
  }
  if (roomMode && ["room-photos", "room-scan", "room-rebuilt"].includes(state?.source) && renderer.xr.isPresenting && !allowEstimated) {
    beginAlignmentCheck();
    return;
  }
  if (phase !== "entry" || !entryCandidates.length) {
    toast("Build a scene and choose an entry point first");
    return;
  }
  if (cancelVolume(), !entryClear(anchor)) {
    toast("Entry point is obstructed. Choose an open area.");
    return;
  }
  if (mode = "inhabit", alignedMode = !1, controls.enabled = !1, world.position.set(0, 0, 0), world.rotation.set(0, 0, 0), world.scale.setScalar(1), roomCeilingVisibility(), scene.background = roomMode && xrMode === "immersive-ar" ? null : new THREE28.Color(UI_THEME.background), scene.fog = roomMode ? null : new THREE28.Fog(UI_THEME.background, 35, 100), renderer.xr.isPresenting) {
    let view = currentView(), p = new THREE28.Vector3(), q2 = new THREE28.Quaternion();
    view.getWorldPosition(p), view.getWorldQuaternion(q2);
    let direction = new THREE28.Vector3(0, 0, -1).applyQuaternion(q2), currentYaw = Math.atan2(-direction.x, -direction.z), delta = heading - currentYaw, offset = p.clone().sub(rig.position).applyAxisAngle(new THREE28.Vector3(0, 1, 0), delta);
    rig.rotation.y += delta, rig.position.x = anchor.x - offset.x, rig.position.z = anchor.z - offset.z, rig.position.y = anchor.y;
  } else
    rig.position.set(0, 0, 0), rig.rotation.set(0, 0, 0), camera.position.set(anchor.x, anchor.y + 1.65, anchor.z), desktopYaw = heading, desktopPitch = 0, camera.rotation.set(0, desktopYaw, 0, "YXZ");
  setPhase("explore"), tool = "object", setEditing(!1), state.scene.floods?.length && floodRuntime.start(), document.querySelectorAll("[data-tool]").forEach((b) => b.classList.toggle("active", b.dataset.tool === tool)), placeMarker(), $2("mode-badge").textContent = uiText("Inside the world"), updateHint(), roomMode ? creationReady() : placeXRPanel(), toast("Explore mode \xB7 Right stick click: edit \xB7 Y: show / hide menu");
}
async function toggleVideo() {
  if (openSourceMode && virtualRecorder.snapshot().status !== "recording" && (editing || !state.scene.productionReady)) throw Error("Choose Finish setup in Edit mode before recording.");
  if (virtualRecorder.snapshot().canRetry && virtualRecorder.snapshot().status === "error") {
    await virtualRecorder.retry();
    return;
  }
  if (virtualRecorder.snapshot().status === "recording") {
    await virtualRecorder.stop();
    return;
  }
  if (busy() && !canRecordDraft()) throw new Error("Finish the current action before starting a recording");
  if (renderer.xr.isPresenting && !xrViewer.valid) throw new Error("Waiting for headset tracking");
  if (renderer.xr.isPresenting) {
    videoStartPending = { session: renderer.xr.getSession(), epoch: spatialEpoch }, syncFlow();
    return;
  }
  resetHands(), director.frame(0, 1, { showSelection: editing && !director.snapshot().placing }), await beginVirtualRecording(director.frames(), doorPlayer.frame(0), handSample);
}
async function beginVirtualRecording(actorFrames, objectTransforms, hands) {
  mrShowcase && (actorFrames = mrShowcase.frames()), world.updateMatrixWorld(!0), await virtualRecorder.start(state.scene, world.matrixWorld.clone(), production?.cameraView() || currentView(), actorFrames, objectTransforms, hands, handMetadata, { visible: mrShowcase ? world.visible : !["reference", "building", "welcome"].includes(phase), showcase: mrShowcase?.state() }), setHover([]), labelSprite && (labelSprite.visible = !1), syncFlow();
}
async function refreshVideos() {
  let videos = await api("/api/recordings");
  $2("video-list").replaceChildren();
  for (let video of videos.slice(0, 5)) {
    let a = document.createElement("a");
    if (a.href = video.url, a.download = `EmboDi-${video.id}.${video.mime === "video/mp4" ? "mp4" : "webm"}`, a.textContent = uiText(`Download reference video \xB7 ${Math.round(video.duration)} s`), a.className = "video-download", $2("video-list").append(a), video.timelineUrl) {
      let link = document.createElement("a");
      link.href = video.timelineUrl, link.download = `EmboDi-${video.id}.timeline.json`, link.textContent = uiText("Download camera and event data"), link.className = "video-download", $2("video-list").append(link);
    }
  }
}
async function startXR(preparedMode = null) {
  if (startupRequired && !startupAccess?.ready())
    return startupAccess?.show(), !1;
  if (cancelDemo("Select Build again in immersive mode"), !navigator.xr) {
    toast("WebXR is unavailable. Open this page in Quest Browser.");
    return;
  }
  enteringXR = !0;
  try {
    xrMode = preparedMode || (await navigator.xr.isSessionSupported("immersive-ar") ? "immersive-ar" : "immersive-vr");
    let preferUnbounded = roomMode && xrMode === "immersive-ar" && params.get("space") !== "local-floor", session = await navigator.xr.requestSession(xrMode, roomXRFeatures({ ar: xrMode === "immersive-ar", planeRequired: startupRequired, preferUnbounded })), chosen;
    try {
      chosen = await chooseRoomReferenceSpace(session, { preferUnbounded });
    } catch (error) {
      throw await session.end(), error;
    }
    if (xrReference = { requested: preferUnbounded ? "unbounded" : "local-floor", active: chosen.type, fallbackReason: chosen.fallbackReason, compensatedResets: 0 }, renderer.xr.setReferenceSpaceType(chosen.type), resetHands(), controls.enabled = !1, rig.position.set(0, 0, 0), rig.rotation.set(0, 0, 0), camera.position.set(0, 0, 0), camera.rotation.set(0, 0, 0), await renderer.xr.setSession(session), renderer.xr.setReferenceSpace(chosen.space), chosen.fallbackReason && toast("Unbounded unavailable \xB7 using local-floor"), hadXRFrame = !1, panelPlacement.reset(), xrViewer.reset(), roomTracking.reset(), invalidateCreation(), alignedMode = !1, clearCalibrationMarkers(), mode = "overview", world.scale.setScalar(miniatureScale()), renderScene(previewScene || state.scene), roomCeilingVisibility(), demoMode) setPhase("reference");
    else if (roomMode) {
      let next = roomSessionPhase({ phase, job: !!currentJob, ar: xrMode === "immersive-ar" });
      alignmentReturn = "overview", next === "entry" ? prepareEntries() : (setPhase(next), next === "align" && (restoreAlignmentOnReady = !0, alignmentStickReady = !1));
    } else ["explore", "calibrate"].includes(phase) && prepareEntries();
    scene.background = xrMode === "immersive-ar" ? null : new THREE28.Color(UI_THEME.background), scene.fog = null, xrPanel.visible = !1, presentationVisible = !1, document.body.classList.add("in-xr"), showcaseEntryPending = quietShowcase;
    let bindReferenceReset = (reference) => {
      let onReset = (event) => {
        if (xrReference.active === "unbounded" && alignedMode) {
          let replacement = compensatedReferenceSpace(event);
          if (replacement) {
            reference.removeEventListener("reset", onReset), renderer.xr.setReferenceSpace(replacement), bindReferenceReset(replacement), xrReference.compensatedResets++, resetHands(), xrViewer.reset(), roomTracking.reset(), lastTime = 0, virtualRecorder.event("reference-space-rebased", { type: "unbounded", transform: Array.from(event.transform.matrix) });
            return;
          }
        }
        production?.cancel(), production?.closeMonitor(), production?.pause(), resetHands(), cancelTransform("Tracking origin changed"), pausePerformance(), virtualRecorder.event("interruption", { reason: "XR-or-page-tracking" }), virtualRecorder.stop("interrupted").catch(() => {
        }), invalidateCreation(), roomTracking.reset(), clearCalibrationMarkers(), xrViewer.reset(), hadXRFrame = !1, panelPlacement.reset(), xrPanel.visible = !1;
        let next = roomMode ? roomSessionPhase({ phase, event: "reset", job: !!currentJob }) : null;
        overview(), roomMode ? setPhase(next) : prepareEntries(), showcaseEntryPending = quietShowcase, toast("Tracking origin changed. Confirm alignment before continuing.");
      };
      reference.addEventListener("reset", onReset);
    };
    return bindReferenceReset(renderer.xr.getReferenceSpace()), session.addEventListener("visibilitychange", () => {
      session.visibilityState === "hidden" && (production?.cancel(), production?.closeMonitor(), production?.pause(), studio.cancelVoice(), resetHands(), cancelTransform("Immersive session paused"), pausePerformance(), cancelDemo("Immersive session paused. Start entry again."), roomCamera?.stop("Immersive session paused. Camera closed; photos retained."), virtualRecorder.stop("interrupted").catch(() => {
      }));
    }), session.addEventListener("end", () => {
      xrReference.active = null, demonstration?.stop()?.catch(() => {
      }), production?.cancel(), production?.closeMonitor(), production?.pause(), resetHands(), cancelTransform("Immersive session ended"), pausePerformance(), cancelDemo(), virtualRecorder.stop("interrupted").catch(() => {
      }), roomCamera?.stop(), studio.cancelVoice(), cancelVolume(), clearCalibrationMarkers(), invalidateCreation(), roomTracking.reset(), xrUI.hideKeyboard(), xrPanel.visible = !1, document.body.classList.remove("in-xr"), xrMode = null, xrViewer.reset(), startupAccess?.reset();
      let next = roomMode ? roomSessionPhase({ phase, event: "end", job: !!currentJob }) : null;
      overview(), demoMode ? setPhase("reference") : roomMode ? setPhase(next) : ["explore", "calibrate"].includes(phase) && prepareEntries();
    }), !0;
  } catch (error) {
    return xrReference.active = null, toast(`Could not enter XR: ${error.message}`), !1;
  } finally {
    enteringXR = !1;
  }
}
async function changeColor(color) {
  if (busy()) throw new Error("Finish the current request or preview first");
  if (!selection.length) throw new Error("Select objects before changing their color");
  acceptState(await api("/api/color", { revision: state.revision, ids: selection, color })), toast("Color updated");
}
async function undo() {
  if (draftTool.active()) {
    draftTool.undo(), syncFlow();
    return;
  }
  if (transformTool.active()) {
    cancelTransform();
    return;
  }
  if (busy()) throw new Error("Finish the current request or preview first");
  acceptState(await api("/api/undo", { revision: state.revision })), virtualRecorder.event("undo", { revision: state.revision }), toast("Last change undone");
}
async function saveScene() {
  if (!saving) {
    if (previewScene) throw new Error("Apply or discard the preview before saving");
    if (busy()) throw new Error("Finish the current action before saving");
    saving = !0, syncFlow();
    try {
      let saved = await api("/api/save-scene", { revision: state.revision });
      acceptState(saved), virtualRecorder.event("sceneSaved", { revision: saved.revision }), toast(`Saved ${saved.scene.objects.length} objects. This world will reopen next time.`);
    } finally {
      saving = !1, syncFlow();
    }
  }
}
async function refreshStoryboard() {
  return null;
}
function chooseStoryAct(id) {
  return null;
}
function paintStoryControls(context) {
  return null;
}
async function saveStoryAct() {
  return null;
}
async function loadStoryAct() {
  return null;
}
async function doorCommand(type, ids = selection, context) {
  if (phase !== "explore") throw new Error("Enter creation mode first");
  if (draftTool.active() || currentJob || submitting || saving || finishing || transformTool.active() || transformPending || volume.isActive() || virtualRecorder.snapshot().status === "saving") throw new Error("Finish the current action first");
  if (context && (context.revision !== state.revision || context.spatialContext?.spatialKey !== spatialKey())) throw new Error("Scene or alignment changed. Select the door again.");
  let object3 = ids.length === 1 && state.scene.objects.find((o) => o.id === ids[0]);
  if (!isDoor(object3)) throw new Error("Select a blockout door first");
  saving = !0, syncFlow();
  try {
    let command = { objectId: object3.id, type }, next = await api("/api/doors", { revision: state.revision, command });
    doorPlayer.resume(), acceptState(next), virtualRecorder.event("door-command", { ...command, revision: next.revision });
    let reply = type === "open" ? `Opening ${object3.name}.` : type === "close" ? `Closing ${object3.name}.` : "Opening direction changed. Try the door again.";
    return toast(reply), reply;
  } finally {
    saving = !1, syncFlow();
  }
}
async function doorPerformanceCommand(type) {
  return null;
}
function updateDoorPerformance() {
  return null;
}
function acceptState(next) {
  if (state && next.revision !== state.revision && objectInteraction.active() && closeObjectInteraction("Scene changed. Draft closed."), state && next.revision === state.revision) {
    state = next, syncFlow();
    return;
  }
  transformTool.active() && cancelTransform("Scene version changed. Drag cancelled.");
  let previousFloor = referenceFloor(state?.scene), nextFloor = referenceFloor(next.scene), changedSpace = !!previousFloor && JSON.stringify([previousFloor.position, previousFloor.size, previousFloor.rotation]) !== JSON.stringify([nextFloor?.position, nextFloor?.size, nextFloor?.rotation]), needsRealign = changedSpace && alignedMode;
  changedSpace && invalidateCreation();
  let restored = !!state && next.storyRestore?.token !== state.storyRestore?.token;
  if (state = next, cancelVolume(), restored && (presetSequence?.reset(), director?.edit(), director?.select(null), director?.cancelPlacement(), selection = [], doorResetPending = !0), currentJob && !currentJob.applying && currentJob.revision !== state.revision && currentJob.kind !== "image") {
    let generated = currentJob.kind === "generate";
    currentJob.status === "running" && api("/api/cancel-job", { id: currentJob.id }).catch(() => {
    }), previewScene = null, currentJob = null, generated && setPhase("reference"), $2("job-panel").hidden = !0, toast("Scene version changed. Start a new request.");
  }
  renderScene(state.scene), needsRealign ? (pausePerformance(), overview(), setPhase("welcome"), placeXRPanel(), toast("Room structure changed. Confirm alignment before continuing.")) : phase === "entry" && !entryClear(anchor) && prepareEntries();
}
function jobControls(disabled) {
  for (let id of ["ask-codex", "generate", "generate-image"]) $2(id).disabled = disabled;
}
async function startJob(kind, preset, conversationId = studio.conversationId, capturedContext = null) {
  if (openSourceMode && kind === "chat" && (kind = "agent"), kind === "generate" && roomMode) {
    if (roomCamera.getPhotos().length < 4) throw new Error("Capture or upload at least four photos");
    if (await persistPhotos(), scriptedMode) return scriptedRebuild();
  }
  let scanRebuild = kind === "generate" && roomMode && isScanScene(state?.scene);
  if (busy()) throw new Error("Finish the current request or preview first");
  if (openSourceMode && phase === "explore" && !editing && ["chat", "edit", "actor", "agent"].includes(kind)) throw Error("Switch to Edit mode to make changes.");
  if (["chat", "edit", "actor", "agent"].includes(kind) && phase !== "explore") throw new Error("Enter the world before editing with the agent");
  let prompt = (preset ?? (kind === "generate" ? roomMode ? (scanRebuild ? SCAN_REBUILD_INTENT : ROOM_INTENT) + (openSourceMode ? `
User follow-up: ` + $2("blueprint-prompt").value : "") : $2("blueprint-prompt").value : $2("edit-prompt").value)).trim();
  if (!prompt) throw new Error("Enter a description first");
  if (kind === "generate" && !scanRebuild && (roomMode ? !roomCamera.getPhotos().length : !referenceId && !uploadedImage)) throw new Error(roomMode ? "Capture room photos first" : "Choose a reference image first");
  let references = scanRebuild ? { sceneKind: "scan-rebuild", photoIds: roomCamera.getPhotos().map((p) => p.reference.id) } : kind === "generate" ? roomMode ? { sceneKind: "room", photoIds: roomCamera.getPhotos().map((p) => p.reference.id), ...roomTracking.candidate() ? { roomMetrics: roomTracking.candidate().metrics } : {} } : uploadedImage ? { image: uploadedImage } : { referenceId } : {};
  kind === "generate" && (roomCamera?.stop("Camera closed. Building the room."), overview(), setEditing(!1), setPhase("building"));
  let context = capturedContext || dialogueContext();
  if (["chat", "edit", "actor", "agent"].includes(kind) && (context.revision !== state.revision || context.spatialContext?.spatialKey !== spatialKey())) throw new Error("Scene or alignment changed since you spoke. Submit again.");
  openSourceMode && (agentSuggestions = null, desktopUI?.collapse());
  let jobSelection = context.ids, revision = context.revision, startedAt = Date.now();
  submitting = !0, jobControls(!0), syncFlow();
  try {
    let result = await api("/api/jobs", { kind, prompt, conversationId, actorId: context.actorId, curveId: context.curveId, ids: jobSelection, targetIds: context.targetIds, spatialContext: context.spatialContext, anchor: context.anchor, revision, ...references });
    for (currentJob = { ...result, kind, revision, sceneKind: references.sceneKind }, submitting = !1, setHover([]), cancelVolume(), $2("job-panel").hidden = !1, $2("job-message").textContent = uiText(kind === "generate" ? scanRebuild ? "Building an editable blockout from the scan\u2026" : "Building a rough scene from references\u2026" : "The agent is processing your request. You can keep looking around."), $2("apply-job").hidden = !0, $2("discard-job").hidden = !0, setXRStatus("Processing your request\u2026"); currentJob?.id === result.id; ) {
      if (Date.now() - startedAt > 66e4 * Math.max(1, Math.ceil((references.photoIds?.length || 0) / 6))) throw new Error("Generation timed out. Your saved scene is unchanged; retry or return to it.");
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      let job = await api(`/api/jobs/${result.id}`);
      if (currentJob?.id !== result.id) break;
      if (job.status === "error") throw new Error(job.error);
      if (job.status === "cancelled") {
        currentJob = null, $2("job-panel").hidden = !0, kind === "generate" && setPhase("reference"), syncFlow(), toast("Request stopped");
        break;
      }
      if (job.status === "running") {
        currentJob = { ...currentJob, ...job }, syncFlow();
        let label = { flood: "Flood Agent \xB7 Reading regions and triggers", director: "Director Agent \xB7 Routing task", interaction: "Interaction Agent \xB7 Planning motion", motion: "Motion Agent \xB7 Generating motion", sketch: "Sketch Agent \xB7 Interpreting curve", recommendation: "Recommendation Agent \xB7 Preparing suggestions", "scene-construction": "Scene Agent \xB7 Preparing edits" }[job.stage] || (job.stage === "scan-reconstruction" ? "Building editable objects from scan contours" : job.stage === "scan-content" ? "Building from the scan with photo-based classification" : job.stage === "analysis" ? "Interpreting your request" : kind === "image" ? "Generating a reference image" : kind === "generate" ? "Building the blockout" : "Preparing changes"), progress = `${uiText(label)}${job.photoProgress ? " \xB7 Photo batch " + job.photoProgress.batch + "/" + job.photoProgress.batches + " \xB7 " + job.photoProgress.total + " photos" : ""} \xB7 ${Math.floor((Date.now() - startedAt) / 1e3)} s`;
        $2("job-message").textContent = uiText(progress), setXRStatus(progress);
        continue;
      }
      if (job.result?.conversation && (studio.renderConversation(job.result.conversation), studio.say(job.result.reply)), job.status === "complete") {
        openSourceMode && job.result?.options?.length && (agentSuggestions = { options: job.result.options, context: structuredClone(context), scope: suggestionScope(context) }), currentJob = null, $2("job-panel").hidden = !0, kind === "image" ? (await studio.refreshLibrary(), studio.chooseReference(job.result.image.id)) : toast("Agent replied"), syncFlow();
        break;
      }
      if (job.status === "ready") {
        if (job.revision !== state.revision) throw new Error("Scene changed. Submit again.");
        if (job.spatialKey && job.spatialKey !== spatialKey()) throw new Error("Room alignment changed. Submit again.");
        currentJob = job, kind === "generate" && setPhase("preview");
        let patch = ["chat", "agent"].includes(kind) ? job.result.patch : job.result;
        previewScene = kind === "agent" ? applyAgentResult(state.scene, job.result, job.ids) : kind === "actor" ? applyActorMotion(state.scene, job.result) : kind === "generate" ? job.result : job.result.transform ? applyTransform(state.scene, job.result.transform) : applyPatch(state.scene, patch, job.ids), renderScene(previewScene), kind === "generate" ? overview() : !openSourceMode && renderer.xr.isPresenting && !xrPanel.visible && (previewSummoned = !0, placeXRPanel()), (kind === "actor" || job.result.type === "motion") && director.previewGenerated(job.result.actorId), job.result.type === "flood" && previewFlood(), job.result.transform && virtualRecorder.event("transform-preview", { operation: job.result.transform, revision: job.revision }), $2("job-message").textContent = "Preview: " + (kind === "generate" ? job.result.description : job.result.reply || patch?.explanation || ""), $2("apply-job").hidden = !1, $2("discard-job").hidden = !1, toast("Preview ready \xB7 A Apply \xB7 B Discard");
        break;
      }
    }
  } catch (error) {
    let failed = currentJob;
    throw kind === "actor" && director.edit(), currentJob = null, failed?.status === "running" && api("/api/cancel-job", { id: failed.id }).catch(() => {
    }), previewScene = null, kind === "generate" && setPhase("reference"), renderScene(state.scene), $2("job-panel").hidden = !1, $2("job-message").textContent = uiText(error.message), $2("apply-job").hidden = !0, $2("discard-job").hidden = !1, toast(error.message), error;
  } finally {
    submitting = !1, jobControls(!1), syncFlow();
  }
}
async function applyJob() {
  if (!currentJob || currentJob.status !== "ready") throw new Error("No result is ready to apply");
  if (currentJob.applying) return;
  let motionActor = currentJob.kind === "actor" || currentJob.result?.type === "motion" ? currentJob.result.actorId : null, id = currentJob.id, generated = currentJob.kind === "generate", preserveSpace = ["scan-fill", "scan-rebuild"].includes(currentJob.sceneKind);
  currentJob.applying = !0, syncFlow();
  try {
    let next = await api("/api/apply-job", { id, spatialKey: spatialKey() });
    virtualRecorder.event("agent-apply", { id, revision: next.revision }), currentJob = null, previewScene = null, $2("job-panel").hidden = !0, acceptState(next), generated && (selection = [], preserveSpace || invalidateCreation(), overview(), roomMode ? resumeWorld() : prepareEntries()), renderScene(state.scene), motionActor && director.previewGenerated(motionActor), syncFlow(), previewSummoned && (xrPanel.visible = !1, previewSummoned = !1), toast(generated ? "Blockout applied. Continue creating." : "Changes applied");
  } catch (error) {
    throw currentJob && (currentJob.applying = !1), error;
  }
}
function discardJob() {
  if (currentJob?.status === "running" || submitting) {
    toast("Request is still running. Use Stop request.");
    return;
  }
  let actorPreview = currentJob?.kind === "actor" || currentJob?.result?.type === "motion", generated = currentJob?.kind === "generate";
  currentJob = null, previewScene = null, actorPreview && director.edit(), generated && setPhase("reference"), $2("job-panel").hidden = !0, state && renderScene(state.scene), syncFlow(), previewSummoned && (xrPanel.visible = !1, previewSummoned = !1);
}
async function cancelJob() {
  if (localPreparation) {
    localPreparation.abort();
    return;
  }
  if (demoEntry.active) {
    cancelDemo();
    return;
  }
  if (studio.cancelVoice(), submitting) throw new Error("Request is submitting. Wait before stopping.");
  currentJob?.status === "running" ? (await api("/api/cancel-job", { id: currentJob.id }), toast("Stopping request\u2026")) : previewScene ? discardJob() : toast("No request is running"), syncFlow();
}
var pointerStart = null, lastPointer = null;
function pointerRay(event) {
  pointerInside = !0;
  let rect = canvas.getBoundingClientRect();
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), raycaster.setFromCamera(pointer, camera);
}
canvas.addEventListener("wheel", (event) => {
  draftTool.active() && draftTool.summary().mode === "space3d" && (event.preventDefault(), draftTool.depth(Math.sign(event.deltaY) * 0.05), syncFlow());
}, { passive: !1 });
canvas.addEventListener("pointerdown", (event) => {
  if (pointerStart = { x: event.clientX, y: event.clientY, button: event.button }, lastPointer = { x: event.clientX, y: event.clientY }, sceneMenuOpen()) {
    pointerStart.handled = !0;
    return;
  }
  if (draftTool.active()) {
    pointerStart.handled = !0, event.button === 0 && (pointerRay(event), canvas.setPointerCapture(event.pointerId), action(() => draftTool.begin(raycaster, "mouse"))());
    return;
  }
  event.button === 0 && !director?.snapshot().placing && editing && tool === "region" && !busy() && !renderer.xr.isPresenting ? (controls.enabled = !1, pointerRay(event), volume.begin(raycaster), canvas.setPointerCapture(event.pointerId)) : event.button === 0 && !renderer.xr.isPresenting && (pointerRay(event), phase === "explore" && editing && !director.snapshot().placing && (pointerStart.handled = !0, canvas.setPointerCapture(event.pointerId), action(() => pressSelection("mouse"))()));
});
canvas.addEventListener("pointermove", (event) => {
  if (!renderer.xr.isPresenting) {
    if (pointerRay(event), sceneMenuOpen()) {
      lastPointer = { x: event.clientX, y: event.clientY };
      return;
    }
    if (draftTool.active()) {
      draftTool.update(raycaster, "mouse");
      return;
    }
    volume.isActive() ? (pointerRay(event), volume.update(raycaster)) : mode === "inhabit" && event.buttons === 2 && lastPointer && (desktopYaw -= (event.clientX - lastPointer.x) * 4e-3, desktopPitch = THREE28.MathUtils.clamp(desktopPitch - (event.clientY - lastPointer.y) * 4e-3, -1.4, 1.4), camera.rotation.set(desktopPitch, desktopYaw, 0, "YXZ")), lastPointer = { x: event.clientX, y: event.clientY };
  }
});
canvas.addEventListener("pointerup", (event) => {
  if (sceneMenuOpen()) {
    pointerStart = null;
    return;
  }
  if (draftTool.active()) {
    event.button === 0 && draftTool.release("mouse"), pointerStart = null, syncFlow();
    return;
  }
  if (transformOwner === "mouse") {
    action(finishTransform)(), pointerStart = null;
    return;
  }
  if (volume.isActive() && !volumeController) {
    finishVolume(), pointerStart = null;
    return;
  }
  !pointerStart || pointerStart.button !== 0 || (!pointerStart.handled && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) < 6 && (pointerRay(event), selectFromRay()), pointerStart = null);
});
canvas.addEventListener("pointercancel", () => {
  draftTool.suspend("Pointer interrupted. Unfinished stroke discarded."), pointerStart = null, pointerInside = !1, cancelVolume(), cancelTransform();
});
canvas.addEventListener("pointerleave", () => {
  draftTool.suspend("Pointer left the canvas. Unfinished stroke discarded."), pointerInside = !1, pointerFeedback.hide(), volume.isActive() || setHover([]);
});
canvas.addEventListener("pointerenter", (event) => {
  renderer.xr.isPresenting || pointerRay(event);
});
canvas.addEventListener("contextmenu", (event) => event.preventDefault());
addEventListener("keydown", (event) => {
  if (!$2("startup-access").open) {
    if (mrShowcase && event.code === "KeyX" && !["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) {
      event.preventDefault();
      return;
    }
    if (event.code === "KeyX" && demonstrationMode() && !["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName) && !$2("settings-dialog").open) {
      event.preventDefault(), event.repeat || action(toggleDemonstration)();
      return;
    }
    if ((scriptedMode || openSourceMode) && event.code === "KeyX" && !["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName) && !$2("settings-dialog").open) {
      event.preventDefault(), event.repeat || studio.startVoice();
      return;
    }
    if (!(["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName) || $2("settings-dialog").open)) {
      if (openSourceMode && !event.repeat) {
        if (studio.getVoiceDraft() && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
          event.preventDefault(), studio.pageVoice(["ArrowUp", "ArrowLeft"].includes(event.code) ? -1 : 1);
          return;
        }
        if (event.code === "KeyY") {
          event.preventDefault(), toggleMenu();
          return;
        }
        if (event.code === "Enter" && !["BUTTON", "A", "SUMMARY"].includes(event.target.tagName)) {
          event.preventDefault(), action(confirmAuthoring)();
          return;
        }
      }
      if (draftTool.active()) {
        if (event.repeat) return;
        event.code === "Escape" || event.code === "KeyP" ? (event.preventDefault(), closeObjectInteraction()) : (event.ctrlKey || event.metaKey) && event.code === "KeyZ" ? (event.preventDefault(), draftTool.undo(), syncFlow()) : event.code === "KeyR" && action(toggleVideo)();
        return;
      }
      if (keys2.add(event.code), (transformTool.active() || production?.manipulating()) && event.code.startsWith("Arrow") && event.preventDefault(), (event.ctrlKey || event.metaKey) && event.code === "KeyZ" && editing) {
        event.preventDefault(), event.repeat || action(undo)();
        return;
      }
      !event.repeat && event.code === "KeyR" && action(toggleVideo)(), !event.repeat && phase === "explore" && (event.code === "Space" && (event.preventDefault(), action(togglePreview)()), event.code === "KeyP" && action(toggleActorPlacement)(), event.code === "KeyV" && action(toggleEditing)()), event.code === "Escape" && !event.repeat && action(cancelCurrentOperation)();
    }
  }
});
document.addEventListener("visibilitychange", () => {
  document.hidden && (scriptedMode || openSourceMode) && studio.cancelVoice(), document.hidden && (production?.cancel(), production?.closeMonitor()), document.hidden && !renderer.xr.isPresenting && !enteringXR && !startupAccess?.snapshot().preparing && (cancelTransform("Page paused"), pausePerformance(), cancelDemo("Page paused. Start entry again."), roomCamera?.stop("Page paused. Camera closed; photos retained."), virtualRecorder?.stop("interrupted").catch(() => {
  }));
});
addEventListener("pagehide", () => {
  demonstration?.stop()?.catch(() => {
  }), studio?.cancelVoice(), roomCamera?.stop(), startupAccess?.dispose();
});
addEventListener("pageshow", (event) => {
  event.persisted && startupAccess?.reset();
});
addEventListener("keyup", (event) => {
  if (keys2.delete(event.code), mrShowcase && event.code === "KeyX") {
    action(() => showcaseCue())();
    return;
  }
  (scriptedMode || openSourceMode) && event.code === "KeyX" && !demonstrationMode() && studio.stopVoice();
});
addEventListener("blur", () => {
  (scriptedMode || openSourceMode) && studio.cancelVoice(), keys2.clear(), draftTool.suspend("Window lost focus. Unfinished stroke discarded."), renderer.xr.isPresenting || (cancelVolume(), cancelTransform("Window lost focus"));
});
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight, camera.updateProjectionMatrix(), renderer.setSize(innerWidth, innerHeight);
});
document.querySelectorAll("[data-tool]").forEach((button) => button.addEventListener("click", () => setTool(button.dataset.tool)));
document.querySelectorAll("[data-color]").forEach((button) => button.addEventListener("click", action(() => ($2("color").value = button.dataset.color, changeColor(button.dataset.color)))));
$2("anchor-tool").onclick = () => setTool("anchor");
$2("enter-world").onclick = enterWorld;
$2("overview").onclick = action(showOverview);
$2("enter-xr").onclick = () => startupRequired ? startupAccess?.show() : startXR();
$2("edit-toggle").onclick = action(toggleEditing);
$2("heading").oninput = () => {
  heading = Number($2("heading").value) * Math.PI / 180, $2("heading-value").textContent = uiText(`${$2("heading").value}\xB0`), placeMarker();
};
function setDepth(value) {
  let depth = volume.setDepth(value);
  $2("volume-depth").value = String(depth), $2("depth-value").textContent = uiText(depth.toFixed(1) + " m"), volume.isActive() && setXRStatus(`${hoverIds.length} items \xB7 Depth ${depth.toFixed(1)} m \xB7 Release grip to confirm`);
}
$2("volume-depth").oninput = () => setDepth(Number($2("volume-depth").value));
$2("apply-color").onclick = action(() => changeColor($2("color").value));
$2("undo").onclick = action(undo);
$2("generate").onclick = action(() => startJob("generate"));
$2("apply-job").onclick = action(applyJob);
$2("discard-job").onclick = discardJob;
$2("cancel-job").onclick = action(cancelJob);
async function restore(path) {
  requireSpatialIdle(), acceptState(await api(path, { revision: state.revision })), anchor.set(0, 0, 8), heading = 0, $2("heading").value = "0", $2("heading-value").textContent = uiText("0\xB0"), selection = [], updateSelection(), overview(), prepareEntries(), toast("Scene loaded. Undo can restore the previous scene.");
}
$2("resume-world").onclick = action(resumeWorld);
$2("new-world").onclick = action(newWorld);
$2("save-scene").onclick = action(saveScene);
$2("reset").onclick = action(() => restore("/api/reset"));
$2("restore-checkpoint").onclick = action(() => restore("/api/restore-checkpoint"));
$2("image-input").onchange = action(async () => {
  let file = $2("image-input").files[0];
  if (file) {
    if (file.size > 6 * 1024 * 1024) throw new Error("Choose an image smaller than 6 MB");
    uploadedImage = await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result), reader.onerror = reject, reader.readAsDataURL(file);
    }), referenceId = null, selectedReference = { title: file.name, url: uploadedImage }, xrUI.setReference(selectedReference), syncFlow(), document.querySelectorAll(".image-card").forEach((card) => card.classList.remove("selected")), $2("image-preview").src = uploadedImage, $2("image-preview").hidden = !1, $2("image-name").textContent = uiText(file.name), $2("blueprint-prompt").value || ($2("blueprint-prompt").value = "Create an inhabitable blockout from this image, preserving spatial relationships and colors.");
  }
});
function toggleActorPlacement() {
  if (phase !== "explore") throw new Error("Enter the room first");
  if (volume.isActive()) throw new Error("Release the right grip to finish box selection");
  if (busy() && !director.snapshot().placing) throw new Error("Finish the current action first");
  if (openSourceMode && !editing) throw Error("Click the right stick to enter Edit mode.");
  director.togglePlacement(), openSourceMode && director.snapshot().placing && (xrPanel.visible = !1, xrUI?.dismissDialogue(), desktopUI?.collapse(), updatePresentationVisibility()), setHover([]), syncFlow();
}
function handleQuestAction(name, controller) {
  if (openSourceMode && name === "productionGrab") {
    raycaster.setFromXRController(controller), production?.grab(controllerGrips[controllers.indexOf(controller)], raycaster);
    return;
  }
  if (openSourceMode && name === "productionRelease") {
    production?.release();
    return;
  }
  if (immersiveShowcase()) {
    if (name === "showcaseAdvance") {
      action(() => showcaseCue())();
      return;
    }
    if (!["record", "doorGrab", "doorRelease"].includes(name)) return;
  }
  if (mrShowcase && phase === "explore") {
    if (name === "voicePress") return;
    if (name === "voiceRelease") {
      action(() => showcaseCue())();
      return;
    }
    if (name === "transport") {
      toast(mrShowcase.transport());
      return;
    }
    if (name === "cancel" && !xrPanel.visible) {
      mrShowcase.pause(), doorPlayer.pause();
      return;
    }
  }
  if (name === "draftCancel") {
    closeObjectInteraction();
    return;
  }
  if (name === "draftUndo") {
    draftTool.undo(), syncFlow();
    return;
  }
  if (name === "draftBusy") {
    toast("Draft: right trigger to draw \xB7 Left stick click to undo \xB7 A to cancel");
    return;
  }
  action({
    confirm: () => confirmAuthoring(controller),
    menuConfirm: () => xrUI.confirmFocused(),
    draftConfirm: () => saveCurve(),
    cancel: cancelCurrentOperation,
    demonstrationToggle: toggleDemonstration,
    doorGrab: () => {
      let hand = handSample.hands.find((h) => h.side === "right" && h.tracked);
      phase === "explore" && !editing && !xrPanel.visible && !busy() && doorGrab.grab(hand?.pose.positionMeters);
    },
    doorRelease: () => doorGrab.release(),
    menu: toggleMenu,
    edit: toggleEditing,
    undo,
    voicePress: () => studio.startVoice(),
    voiceRelease: () => studio.stopVoice(),
    transport: togglePreview,
    record: toggleVideo,
    actorPlace: toggleActorPlacement,
    volumeBegin: () => {
      controller && beginControllerVolume(controller);
    },
    volumeEnd: () => {
      volumeController === controller && finishVolume();
    },
    editRequired: () => toast("Click the right stick to edit, then hold the right grip for box selection"),
    placementBusy: () => toast("Place actor: right trigger to confirm \xB7 A to cancel"),
    gestureBusy: () => toast("Release the trigger or grip to finish the adjustment or selection")
  }[name])();
}
function move(dt) {
  if (renderer.xr.isPresenting) {
    !hadXRFrame && panelPlacement.ready(currentView(), performance.now(), xrViewer.valid) && (hadXRFrame = !0, placeXRPanel(), placeMarker());
    let sources = [...renderer.xr.getSession().inputSources].filter((s) => s.gamepad);
    for (let source of sources) {
      let controller = controllers.find((c) => c.userData.inputSource === source || c.userData.inputSource?.handedness === source.handedness), menuStep = menuNavigation.sample(source, openSourceMode && (xrPanel.visible || !!studio.getVoiceDraft()));
      menuStep && (studio.getVoiceDraft() ? studio.pageVoice(menuStep) : xrUI.moveFocus(menuStep));
      for (let event of questButtons.sample(source)) {
        let name = questButtonAction(event, { showcase: immersiveShowcase(), authoring: openSourceMode, phase, editing, demonstrating: demonstrationMode(), voiceState: openSourceMode ? studio.getRecordingState() : "idle", blocked: shortcutBlocked(), scripted: scriptedMode, drafting: draftTool.active(), menuOpen: xrPanel.visible, confirmReady: openSourceMode && currentJob?.status === "ready" && !currentJob?.applying && studio.getRecordingState() === "idle", draftReady: openSourceMode && draftTool.active() && !draftTool.summary().drawing, grabbing: !!doorGrab.snapshot().grabbed, placing: director.snapshot().placing || !!production?.state().placing, selectingVolume: volume.isActive(), transforming: transformTool.active() || !!transformPending || !!production?.manipulating() });
        traceInput("xr-button-edge", { ...event, action: name }), name && handleQuestAction(name, controller);
      }
    }
    if (!xrViewer.valid) return;
    if (openSourceMode && studio.getRecordingState() !== "idle") {
      navigationGate.block();
      return;
    }
    if (phase === "align") {
      offsetAlignment(sources, dt);
      return;
    }
    if (openSourceMode && production?.manipulating()) {
      xrPanel.visible || production.input(sources, dt);
      return;
    }
    if (openSourceMode && xrPanel.visible) {
      navigationGate.block();
      return;
    }
    if (shortcutBlocked() || demonstrationMode() || director.snapshot().placing || production?.state().placing || draftTool.active()) return;
    if (transformTool.active()) {
      let pad = transformOwner?.userData?.inputSource?.gamepad;
      !transformOwner?.visible || !pad ? cancelTransform("Controller tracking interrupted") : (raycaster.setFromXRController(transformOwner), transformTool.update(raycaster, dt, pad.axes[2] ?? 0, pad.axes[3] ?? 0));
      return;
    }
    let mayNavigate = navigationGate.sample(sources.flatMap((s) => [s.gamepad.axes[2] ?? 0, s.gamepad.axes[3] ?? 0])), turn2 = 0;
    for (let source of sources) {
      let pad = source.gamepad, x = pad.axes[2] ?? 0, y = pad.axes[3] ?? 0, dead = (v2) => Math.abs(v2) > 0.17 ? v2 : 0;
      if (volume.isActive()) {
        source.handedness === "right" && dead(y) && setDepth(volume.getDepth() - dead(y) * dt * 7);
        continue;
      }
      if (!(transformPending || !mayNavigate || phase !== "explore" || mode !== "inhabit" || alignedMode))
        if (source.handedness === "left") {
          let q2 = new THREE28.Quaternion();
          currentView().getWorldQuaternion(q2);
          let forward = new THREE28.Vector3(0, 0, -1).applyQuaternion(q2);
          forward.y = 0, forward.normalize();
          let right = new THREE28.Vector3(-forward.z, 0, forward.x);
          rig.position.add(forward.multiplyScalar(-dead(y)).addScaledVector(right, dead(x)).multiplyScalar(dt * 3));
        } else source.handedness === "right" && (rig.position.y = THREE28.MathUtils.clamp(rig.position.y - dead(y) * dt * 2, -0.8, 35), turn2 = x);
    }
    if (volumeController && volume.isActive() && (raycaster.setFromXRController(volumeController), volume.update(raycaster)), transformPending || !mayNavigate || phase !== "explore" || mode !== "inhabit" || volume.isActive() || alignedMode) return;
    if (Math.abs(turn2) < 0.3 && (snapReady = !0), Math.abs(turn2) > 0.75 && snapReady) {
      let p = new THREE28.Vector3();
      currentView().getWorldPosition(p);
      let angle3 = -Math.sign(turn2) * Math.PI / 6;
      rig.position.sub(p).applyAxisAngle(new THREE28.Vector3(0, 1, 0), angle3).add(p), rig.rotation.y += angle3, snapReady = !1;
    }
    rig.position.x = THREE28.MathUtils.clamp(rig.position.x, -80, 80), rig.position.z = THREE28.MathUtils.clamp(rig.position.z, -80, 80);
  } else {
    if (openSourceMode && studio.getRecordingState() !== "idle" || openSourceMode && production?.state().placing) return;
    if (openSourceMode && production?.manipulating()) {
      production.input([{ handedness: "left", gamepad: { buttons: [{}, { pressed: keys2.has("ShiftLeft") || keys2.has("ShiftRight") }], axes: [0, 0, (keys2.has("KeyD") ? 1 : 0) - (keys2.has("KeyA") ? 1 : 0), (keys2.has("KeyS") ? 1 : 0) - (keys2.has("KeyW") ? 1 : 0)] } }, { handedness: "right", gamepad: { axes: [0, 0, (keys2.has("ArrowRight") ? 1 : 0) - (keys2.has("ArrowLeft") ? 1 : 0), (keys2.has("ArrowDown") ? 1 : 0) - (keys2.has("ArrowUp") ? 1 : 0)] } }], dt);
      return;
    }
    if (draftTool.active()) return;
    if (transformTool.active()) {
      raycaster.setFromCamera(pointer, camera), transformTool.update(raycaster, dt, (keys2.has("ArrowRight") ? 1 : 0) - (keys2.has("ArrowLeft") ? 1 : 0), (keys2.has("ArrowDown") ? 1 : 0) - (keys2.has("ArrowUp") ? 1 : 0));
      return;
    }
    let navigating = ["KeyW", "KeyA", "KeyS", "KeyD", "KeyQ", "KeyE", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].some((k) => keys2.has(k));
    if (transformPending || !navigationGate.sample([navigating ? 1 : 0])) return;
    if (mode === "inhabit" && !volume.isActive() && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName) && !$2("settings-dialog").open) {
      let forward = new THREE28.Vector3(-Math.sin(desktopYaw), 0, -Math.cos(desktopYaw)), right = new THREE28.Vector3(Math.cos(desktopYaw), 0, -Math.sin(desktopYaw)), speed = dt * (keys2.has("ShiftLeft") ? 7 : 3);
      camera.position.addScaledVector(forward, ((keys2.has("KeyW") ? 1 : 0) - (keys2.has("KeyS") ? 1 : 0)) * speed), camera.position.addScaledVector(right, ((keys2.has("KeyD") ? 1 : 0) - (keys2.has("KeyA") ? 1 : 0)) * speed), camera.position.y = THREE28.MathUtils.clamp(camera.position.y + ((keys2.has("KeyE") ? 1 : 0) - (keys2.has("KeyQ") ? 1 : 0)) * speed, 0.35, 40);
    }
  }
}
function updateInteractionFeedback() {
  if (immersiveShowcase()) {
    pointerFeedback.hide(), rayFeedback.forEach((f) => f.hide()), outlines.forEach((o) => o.visible = !1), actorArrows.forEach((o) => o.visible = !1), entryMarkers.visible = marker.visible = calibrationMarkers.visible = calibrationCursor.visible = !1, labelSprite && (labelSprite.visible = !1), xrUI.setHovered([]), setHover([]);
    return;
  }
  calibrationMarkers.visible = !0;
  let placing = director.snapshot().placing || !!production?.state().placing, decorations = phase === "explore" && editing && !placing && !draftTool.active();
  for (let outline of outlines) outline.visible = decorations;
  let canHover = decorations && !sceneMenuOpen() && !busy() && tool !== "anchor", canPoint = !sceneMenuOpen() && world.visible && !draftTool.active() && (phase === "explore" && (canHover || placing) || phase === "entry"), hovered = [], menuHover = [];
  scene.updateMatrixWorld(!0);
  let viewerPosition = currentView().getWorldPosition(new THREE28.Vector3());
  function feedback(view, ray, { right = !0, menuHit = null } = {}) {
    let hit = menuHit;
    menuHit && menuHover.push(menuHit.object), !hit && right && canPoint && (hit = sceneHit(ray)), !menuHit && canHover && right && (hovered = entityIds(hit));
    let selected = hit?.kind === "actor" ? director.snapshot().selected === hit.id : selection.includes(hit?.object?.userData.definition?.id);
    view.update(ray, { enabled: !!menuHit || renderer.xr.isPresenting && xrPanel.visible || right && (canPoint || phase === "calibrate" || volume.isActive() || transformTool.active()), hit: hit || null, color: menuHit || hit ? UI_THEME.accent : UI_THEME.selected, viewerPosition });
  }
  renderer.xr.isPresenting ? (pointerFeedback.hide(), controllers.forEach((controller, index) => {
    if (!xrViewer.valid || !controller.userData.inputSource || !controller.visible) {
      rayFeedback[index].hide();
      return;
    }
    raycaster.setFromXRController(controller), feedback(rayFeedback[index], raycaster, { right: controller.userData.inputSource.handedness === "right", menuHit: volume.isActive() ? null : xrUI.hit(raycaster) });
  })) : (rayFeedback.forEach((f) => f.hide()), pointerInside ? (raycaster.setFromCamera(pointer, camera), feedback(pointerFeedback, raycaster)) : pointerFeedback.hide()), xrUI.setHovered(menuHover), volume.isActive() || setHover(hovered);
}
function requireCapture() {
  if (phase !== "reference" || !roomMode) throw new Error("Return to room capture first");
  if (busy()) throw new Error("Finish the current action first");
}
async function toggleRoomCamera() {
  requireCapture(), ["active", "starting"].includes(roomCamera.snapshot().state) ? roomCamera.stop() : await roomCamera.start($2("room-camera-device").value);
}
async function takeRoomPhoto() {
  requireCapture();
  let photo = roomCamera.capture();
  await persistPhoto(photo), virtualRecorder.event("photoCaptured", { id: photo.id, capturedAt: photo.capturedAt, index: roomCamera.snapshot().count }), toast(`Photo ${roomCamera.snapshot().count} captured`);
}
function removeRoomPhoto() {
  requireCapture(), roomCamera.removeLast();
}
async function switchRoomCamera() {
  requireCapture();
  let capture = roomCamera.snapshot(), index = capture.devices.findIndex((d) => d.deviceId === capture.deviceId), next = capture.devices[(index + 1) % capture.devices.length];
  next ? ($2("room-camera-device").value = next.deviceId, await roomCamera.start(next.deviceId)) : await roomCamera.start();
}
function paintCapture(capture) {
  $2("room-video").hidden = capture.state !== "active", $2("camera-placeholder").hidden = capture.state === "active", $2("camera-message").textContent = uiText(capture.message), $2("capture-tip").textContent = uiText(capture.tip), $2("photo-count").textContent = uiText(`${capture.count} photos \xB7 Minimum 4`), $2("remove-room-photo").disabled = !capture.count || capture.reading || !!currentJob, $2("room-files").disabled = capture.reading || !!currentJob;
  let select = $2("room-camera-device"), key = JSON.stringify(capture.devices);
  if (select.dataset.devices !== key) {
    select.dataset.devices = key, select.replaceChildren();
    let automatic = document.createElement("option");
    automatic.value = "", automatic.textContent = uiText("Auto-select environment camera"), select.append(automatic);
    for (let device of capture.devices) {
      let option = document.createElement("option");
      option.value = device.deviceId, option.textContent = uiText(device.label), select.append(option);
    }
  }
  capture.deviceId && (select.value = capture.deviceId);
  let photos = roomCamera?.getPhotos() || [], signature = photos.map((p) => p.id + ":" + (p.reference?.id || "")).join("|");
  if (signature !== photoSignature) {
    photoSignature = signature, $2("room-photos").replaceChildren();
    for (let [index, photo] of photos.entries()) {
      let figure = document.createElement("figure"), image = document.createElement("img"), caption = document.createElement("figcaption");
      image.src = photo.image, image.alt = uiText(`Room reference photo ${index + 1}`), caption.textContent = uiText(`${index + 1} \xB7 ${photo.label}`);
      let remove = document.createElement("button");
      remove.textContent = uiText("Remove / retake"), remove.onclick = () => roomCamera.remove(photo.id), figure.append(image, caption, remove), $2("room-photos").append(figure);
    }
  }
  photoReview >= photos.length && (photoReview = photos.length - 1), xrUI?.setRoomCamera($2("room-video"), capture.state === "active" && photoReview < 0, photoReview >= 0 ? photos[photoReview] : photos.at(-1)), syncFlow();
}
$2("capture-stop").onclick = () => flowActions[scriptDemo?.snapshot().busy ? "scriptCancel" : "scriptStop"]();
$2("capture-rec").onclick = action(toggleVideo);
function reviewPhoto(index) {
  photoReview = index, paintCapture(roomCamera.snapshot());
}
var flowActions = { voiceConfirm: () => studio.confirmVoice(), voiceRetry: () => studio.startVoice({ auto: !0 }), voiceCancel: () => studio.cancelVoice(), voicePrevious: () => studio.pageVoice(-1), voiceNext: () => studio.pageVoice(1), motionReplay: () => {
  (currentJob?.kind === "actor" || currentJob?.result?.type === "motion") && currentJob.status === "ready" && director.previewGenerated(currentJob.result.actorId);
}, drawFloor: () => beginCurve("floor2d"), drawSpace: () => beginCurve("space3d"), brushNear: () => {
  draftTool.depth(-0.2), syncFlow();
}, brushFar: () => {
  draftTool.depth(0.2), syncFlow();
}, curveNext: nextCurve, curveRemove: removeCurve, actorPreview: () => openSourceMode ? startObjectPreview({ ids: [director.snapshot().selected] }) : director.start({ actorIds: [director.snapshot().selected] }), actorAgent: () => studio.getRecordingState() === "recording" ? studio.stopVoice() : studio.startVoice(), photoReview: () => reviewPhoto(0), photoPrevious: () => reviewPhoto(Math.max(0, photoReview - 1)), photoNext: () => reviewPhoto(Math.min(roomCamera.getPhotos().length - 1, photoReview + 1)), photoDelete: () => {
  let p = roomCamera.getPhotos()[photoReview];
  p && roomCamera.remove(p.id);
}, photoReviewClose: () => reviewPhoto(-1), descriptionSubmit: submitDescription, descriptionCancel: () => {
  describing = !1, syncFlow();
}, demonstrationApply: installDemonstratedDoor, demonstrationStart: startDemonstration, demonstrationStop: stopDemonstration, demonstrationRetry: retryDemonstration, interactionDemonstration: openDemonstration, interactionDescribe: describeInteraction, draftApply: () => openSourceMode ? saveCurve() : preparePath(dialogueContext(), () => {
}), draftClear: () => {
  draftTool.clear(), syncFlow();
}, pathReset: resetPath, bindDoor: () => prepareBinding(dialogueContext(), () => {
}), sourceImages: () => {
  newWorld(), $2("room-files").click();
}, sourcePhotos: async () => {
  newWorld(), await toggleRoomCamera();
}, scriptCancel: () => {
  localPreparation?.abort(), scriptDemo?.cancel(), presetSequence?.cancel(), pausePerformance(), syncFlow();
}, scriptStop: () => {
  scriptDemo?.cancel(), presetSequence?.pause(), pausePerformance(), syncFlow();
}, presetConfirm: confirmCurrentPreview, presetCancel: () => {
  presetSequence.cancel(), pausePerformance();
}, objectInteraction: openObjectInteraction, objectTransform: beginObjectTransform, interactionDraft: beginObjectDraft, interactionVoice: beginObjectVoice, interactionClose: closeObjectInteraction, draftCancel: closeObjectInteraction, draftUndo: () => {
  draftTool.undo(), syncFlow();
}, gripTiltDown: () => resizeHands(0, 0, !1, -10), gripTiltUp: () => resizeHands(0, 0, !1, 10), handSmaller: () => resizeHands(-0.05), handLarger: () => resizeHands(0.05), armShorter: () => resizeHands(0, -0.05), armLonger: () => resizeHands(0, 0.05), bodyReset: () => resizeHands(0, 0, !0), storySave: saveStoryAct, storyLoad: loadStoryAct, storyAct1: () => chooseStoryAct("act-1"), storyAct2: () => chooseStoryAct("act-2"), storyAct3: () => chooseStoryAct("act-3"), storyAct4: () => chooseStoryAct("act-4"), storyRefresh: refreshStoryboard, doorCastConfigure: () => doorPerformanceCommand("configure"), doorCastReset: () => doorPerformanceCommand("reset"), doorToggle: () => doorCommand(selectedDoorContext()?.effect?.open ? "close" : "open", [selectedDoorContext()?.id]), doorHinge: () => doorCommand("hinge", [selectedDoorContext()?.id]), doorDirection: () => doorCommand("direction", [selectedDoorContext()?.id]), overlayRoom: () => setRoomDisplay(0.5), solidRoom: () => setRoomDisplay(1), cuteStyle: () => director.setStyle("cute"), zombieStyle: () => director.setStyle("zombie"), actorRemove: () => director.command("Remove this actor", director.captureContext()), finish: finishCreation, confirmAlignment: () => applyRoomAlignment(pendingAlignment), cancelAlignment, refreshAlignment: beginAlignmentCheck, manualAlignment: beginCalibration, opacityDown: () => changeOpacity(-0.1), opacityUp: () => changeOpacity(0.1), actorDelayDown: () => changeActorDelay(-0.5), actorDelayUp: () => changeActorDelay(0.5), actorAssign: () => director.nextMotion(), actorClearMotion: () => director.assignMotion(null), actorPlace: toggleActorPlacement, actorTransport: togglePreview, actorStart: () => openSourceMode ? startObjectPreview() : director.start(), actorStop: () => director.stop(), actorEdit: () => director.edit(), camera: toggleRoomCamera, capture: takeRoomPhoto, removePhoto: removeRoomPhoto, switchCamera: switchRoomCamera, generate: () => startJob("generate"), demoBuild: beginDemo, enter: enterWorld, visit: () => enterWorld({ allowEstimated: !0 }), align: beginAlignmentCheck, useScan: () => previewAlignment(roomTracking.candidate()), applyCalibration: () => {
  previewAlignment(pendingAlignment), placeXRPanel();
}, restartCalibration: beginCalibration, cancelCalibration: beginAlignmentCheck, rotateRoom, roomScan: requestRoomScan, record: toggleVideo, nextEntry: () => chooseEntry((chosenEntry + 1) % entryCandidates.length), overview: showOverview, edit: toggleEditing, voice: () => studio.getRecordingState() === "recording" ? studio.stopVoice() : studio.startVoice(), send: () => openSourceMode ? studio.confirmVoice() : studio.sendText(), apply: applyJob, discard: discardJob, save: saveScene, undo, cancel: cancelJob, cancelOperation: cancelCurrentOperation, newWorld, resume: resumeWorld, end: () => renderer.xr.getSession()?.end() };
flowActions.videoFiles = () => toast("Recordings are saved locally. Download from Scene tools \u2192 Recording and export on desktop.");
flowActions.dismissSuggestions = () => {
  agentSuggestions = null, syncFlow();
};
flowActions.suggestion = chooseSuggestion;
for (let percent of [30, 50, 70]) flowActions["transparency" + percent] = () => setSceneTransparency(percent);
flowActions.regionDraft = beginRegionDraft;
flowActions.regionSurface = () => {
  draftTool.toggleSurface(), xrPanel.visible = !1, desktopUI?.collapse(), syncFlow();
};
flowActions.floodPreview = previewFlood;
flowActions.draftSmooth = () => {
  draftTool.cycleSmoothing(), syncFlow();
};
director = createDirector({ world, assets: actorAssets, authoring: openSourceMode, deferNewMotion: () => openSourceMode || storyboardState.enabled, getState: () => state, getPhase: () => phase, spatialKey, viewPosition: actorViewPosition, pickGround: actorGround, occlusionDistance: (r) => visibleGeometryHit(r)?.distance ?? 1 / 0, api, acceptState, notify: (message, meta) => {
  (!captureUI || !meta?.status) && toast(message);
}, canPlay: () => scriptPermit || presetPermit || !busy() && !demonstrationMode() && !presetSequence?.blocksPlayback(), canEdit: () => !production?.busy() && (scriptPermit || presetPermit || !scriptDemo?.snapshot().busy) && (presetPermit || !presetSequence?.busy()) && !demonstrationMode() && !localPreparation && !draftTool.active() && !transformTool.active() && !transformPending && !currentJob && !submitting && !saving && virtualRecorder?.snapshot().status !== "saving", onSelect: (id) => {
  !syncingSelection && !draftTool.active() && (selection = id ? [id] : [], setHover([]), updateSelection());
}, mapFrames: (frames, clock) => {
  let mapped = state?.scene.behaviors?.path ? pathFrames(state.scene.behaviors.path, frames, clock.time, actorAssets).map((f, i) => frames[i].motionPlan ? frames[i] : f) : frames;
  return production ? production.isolateActors(mapped) : mapped;
}, pathCompleted: (clock) => !state?.scene.actors?.some((a) => a.motionPlan) && state?.scene.behaviors?.path ? clock.time >= state.scene.behaviors.path.length / state.scene.behaviors.path.speed : null, recordEvent: (type, detail) => {
  traceInput(type), virtualRecorder?.event(type, detail);
  let alias = { "performance-start": "previewStarted", "performance-stop": "previewPaused", "performance-armed": "motionPrepared" }[type];
  alias && virtualRecorder?.event(alias, detail);
} });
studio = createStudio({ mediaDevices: sessionMedia?.mediaDevices || navigator.mediaDevices, scriptedMode, voiceOnly: openSourceMode, getScripted: () => scriptDemo, api, getContext: dialogueContext, handleText: directorText, canInterrupt: presetInterrupt, onVoiceCapture: (context) => {
  openSourceMode && (production?.release(), doorGrab.release(), keys2.clear(), navigationGate.block(), xrUI?.showDialogue(), agentSuggestions = null, desktopUI?.collapse(), xrPanel.visible = !1, setHover([])), storyboardState.enabled && !state.scene.actors?.length && context.actorTarget && director.lockPlacement(context.actorTarget);
}, onVoiceFinish: () => {
  presetSequence?.busy() || director.unlockPlacement();
}, requestJob: startJob, onReference: (item2) => {
  referenceId = item2.id, uploadedImage = null, selectedReference = item2, xrUI?.setReference(item2), $2("blueprint-prompt").value = "Create an inhabitable blockout from this reference. Preserve its layout and colors; infer unseen areas.", syncFlow();
}, onLibrary: (items) => xrUI?.setLibrary(items), onReadout: (update) => {
  update.dialogue ? captureDialogue = update.dialogue : update.message !== void 0 && (update.role === "user" ? captureDialogue = { userText: update.message, agentText: "" } : captureDialogue = { ...captureDialogue, agentText: update.message }), openSourceMode && update.recording === "recording" && xrPanel && (xrPanel.visible = !1), update.message !== void 0 && (latestReply = (update.role === "user" ? "You: " : "Agent: ") + update.message), xrUI?.readout(update), syncFlow();
}, notify: toast });
demonstration = createDemonstration({ onChange: () => syncFlow() });
openSourceMode && (desktopUI = createAuthoringDesktop({ run: (id) => action(() => flowAction(id))(), onToggle: toggleMenu }));
xrUI = createXRStudio({ getDraft: () => describing ? descriptionText : studio.getDraft(), setDraft: (value) => {
  describing ? (descriptionText = value, $2("capture-description").value = value, syncFlow()) : studio.setDraft(value);
}, actions: { cinema: (id) => action(() => cinemaAction(id))(), ...Object.fromEntries(Object.entries(flowActions).map(([id, fn]) => [id, action(fn)])), suggestion: (index) => action(() => chooseSuggestion(index))(), reference: (id) => studio.chooseReference(id) } });
xrPanel = xrUI.group;
scene.add(xrPanel);
xrViewer.view.add(xrUI.notice, xrUI.dialogue);
panelPlacement = createCreationLayout(xrPanel, world);
overview();
syncFlow();
openSourceMode && desktopUI.update(flowContext());
var uploadedVideos = /* @__PURE__ */ new WeakMap(), takeUpload = createTakeUpload({ onChange: () => {
  virtualRecorder && syncFlow();
} });
virtualRecorder = createVirtualRecorder({ sink: takeUpload, assets: actorAssets, includeActorPreviews: () => openSourceMode || showcaseMode || storyboardState.enabled, contentFactory: (w, v2) => mrShowcase ? createShowcaseContent(w, v2, mrShowcase.preset) : null, onChange: (status) => {
  syncFlow(), status.result && status.result.id !== videoSignature && (videoSignature = status.result.id, action(refreshVideos)(), toast("Reference video saved. Download it from the desktop page."));
}, upload: async (blob, metadata, timeline) => {
  let entry = uploadedVideos.get(blob);
  return entry || (entry = await api(`/api/recordings?${new URLSearchParams(metadata)}`, void 0, { method: "POST", headers: { "Content-Type": blob.type }, body: blob, timeoutMs: 9e4 }), uploadedVideos.set(blob, entry)), api(`/api/recordings/${entry.id}/timeline`, timeline);
} });
presetSequence = createPresetSequence({ delayMs: openSourceMode ? 0 : 2e3, getContext: () => presetContext(), onChange: (request) => {
  ["cancelled", "error"].includes(request?.status) && (pausePerformance(), latestReply = "Agent: " + request.message), flowSignature = "", syncFlow(), request?.status === "ready" && placeXRPanel();
} });
roomCamera = createRoomCamera({ mediaDevices: sessionMedia?.mediaDevices || navigator.mediaDevices, video: $2("room-video"), onChange: paintCapture });
paintCapture(roomCamera.snapshot());
startupRequired && (startupAccess = createStartupAccess({ dialog: $2("startup-access"), media: sessionMedia, camera: roomCamera, scriptedMode, onEnter: startXR }));
$2("capture-description").oninput = () => {
  descriptionText = $2("capture-description").value;
};
$2("category-legend").replaceChildren();
for (let item2 of Object.values(CATEGORIES)) {
  let span = document.createElement("span"), dot3 = document.createElement("i");
  dot3.style.background = item2.color, span.append(dot3, document.createTextNode(uiText(item2.label))), $2("category-legend").append(span);
}
$2("manual-alignment").onclick = action(beginCalibration);
$2("align-room").onclick = action(beginAlignmentCheck);
$2("rotate-room").onclick = action(rotateRoom);
$2("show-room-overview").onclick = action(showOverview);
$2("room-scan").onclick = action(requestRoomScan);
$2("apply-room-size").onclick = action(applyRoomSize);
$2("record-video").onclick = action(toggleVideo);
$2("hand-size-value").textContent = uiText(`Hands ${Math.round(handSize * 100)}% \xB7 Arms ${Math.round(armSize * 100)}% \xB7 Grip tilt ${gripTilt}\xB0`);
for (let id of ["handSmaller", "handLarger", "armShorter", "armLonger", "gripTiltDown", "gripTiltUp", "bodyReset"]) $2(id).onclick = action(flowActions[id]);
$2("room-opacity").onchange = () => setSceneTransparency(Number($2("room-opacity").value));
for (let button of document.querySelectorAll("[data-transparency]")) button.onclick = () => setSceneTransparency(Number(button.dataset.transparency));
$2("actor-place").onclick = action(toggleActorPlacement);
$2("actor-start").onclick = action(() => openSourceMode ? startObjectPreview() : director.start());
$2("actor-transport").onclick = action(togglePreview);
$2("actor-edit").onclick = () => director.edit();
$2("actor-focus").onclick = action(focusSelectedActor);
$2("actor-motion-save").onclick = action(() => director.assignMotion($2("actor-motion").value || null));
for (let style of ["cute", "zombie"]) $2("actor-style-" + style).onclick = action(() => director.setStyle(style));
$2("story-act").onchange = () => chooseStoryAct($2("story-act").value);
$2("story-close").onclick = () => {
  $2("storyboard-panel").hidden = !0;
};
for (let [id, command] of [["door-toggle", "doorToggle"], ["door-hinge", "doorHinge"], ["door-direction", "doorDirection"], ["door-cast-configure", "doorCastConfigure"], ["door-cast-reset", "doorCastReset"]]) $2(id).onclick = action(flowActions[command]);
$2("actor-select").onchange = () => {
  draftTool.active() || director.select($2("actor-select").value || null);
};
$2("actor-delay-save").onclick = action(async () => {
  await director.change({ delay: Number($2("actor-delay").value) }), toast("Entry timing saved for the next playback");
});
$2("actor-remove").onclick = action(() => director.command("Remove this actor", director.captureContext()));
$2("remove-room-photo").onclick = action(removeRoomPhoto);
$2("room-files").onchange = action(async () => {
  requireCapture();
  try {
    await roomCamera.addFiles([...$2("room-files").files]), await persistPhotos();
  } finally {
    $2("room-files").value = "";
  }
});
$2("room-camera-device").onchange = action(async () => {
  requireCapture(), await roomCamera.start($2("room-camera-device").value);
});
try {
  await virtualRecorder.recover();
} catch (error) {
  toast("Could not read local recording: " + error.message);
}
try {
  let loaded = await loadActorAssets();
  for (let [id, asset] of loaded) actorAssets.set(id, asset);
} catch (error) {
  toast(error.message);
}
scriptedMode && await initializeScript();
try {
  acceptState(await api("/api/state")), overview(), demoMode || roomMode && (params.get("capture") === "1" || state.source === "room-draft" || isRawScanScene(state.scene)) ? setPhase("reference") : roomMode ? setPhase(openSourceMode ? "overview" : "welcome") : prepareEntries(), await studio.initialize({ loadLibrary: !roomMode }), roomMode && (await refreshVideos(), await refreshStoryboard());
  let health = await api("/api/health");
  $2("connection").textContent = uiText(health.codexAvailable ? "Local server \xB7 Codex available" : "Local server \xB7 Codex unavailable"), $2("connection-dot").classList.add("ready");
} catch (error) {
  toast(error.message);
}
var showcaseSphere = new THREE28.Mesh(new THREE28.SphereGeometry(0.12, 24, 16), new THREE28.MeshBasicMaterial({ color: 16777215, toneMapped: !1 }));
showcaseSphere.visible = !1;
scene.add(showcaseSphere);
if (showcaseMode && state?.scene.showcase) {
  mrShowcase = createMRPerformance({ world, views: director.layer.views, assets: actorAssets, config: state.scene.showcase, applyActors: (frames) => director.layer.apply(frames, { opacity: 1 }), onEvent: (type, detail) => virtualRecorder.event(type, detail) });
  let panel = document.createElement("div");
  panel.id = "mr-showcase-controls", panel.hidden = !0, panel.style.cssText = "position:fixed;top:20px;right:20px;z-index:80;gap:12px";
  for (let [label, fn] of [["Next cue \xB7 X", () => showcaseCue()], ["Reset performance", () => resetShowcase()]]) {
    let b = document.createElement("button");
    b.textContent = label, b.onclick = action(fn), panel.append(b);
  }
  document.body.append(panel), renderer.xr.addEventListener("sessionstart", () => panel.hidden = !0), renderer.xr.addEventListener("sessionend", () => panel.hidden = !1), document.title = "EmboDi \xB7 Lab Showcase";
}
startupRequired && startupAccess.show();
var stream = new EventSource("/api/events");
stream.onmessage = (event) => acceptState(JSON.parse(event.data));
stream.onerror = () => {
  $2("connection").textContent = uiText("Connection lost. Reconnecting\u2026"), $2("connection-dot").classList.remove("ready");
};
stream.onopen = () => {
  $2("connection").textContent = uiText("Local server connected"), $2("connection-dot").classList.add("ready");
};
openSourceMode && (production = createProductionStudio({ world, scene, renderer, api, getState: () => state, getSelection: () => selection, getView: currentView, getSpatialKey: spatialKey, getMeshes: () => meshes2, pickGround: actorGround, canCreate: () => !busy() && !director.snapshot().placing, canMonitor: () => !currentJob && !submitting && !saving && !finishing && !director.snapshot().placing && !draftTool.active() && !transformTool.active() && !volume.isActive() && !doorGrab.snapshot().grabbed, assets: actorAssets, onState: acceptState, onSelect: (id) => confirmSelection([id]), onPlay: startObjectPreview, onPreview: (next) => {
  previewScene = next, renderScene(next || state.scene);
}, onChange: () => {
  flowSignature = "", syncFlow();
}, notice: toast, hideMenu: () => {
  xrPanel.visible = !1, xrUI?.dismissDialogue(), desktopUI?.collapse(), updatePresentationVisibility();
}, pauseScene: () => {
  pausePerformance(), director.edit();
}, transport: (action2, scope) => {
  if (action2 === "pause") {
    floodRuntime.pause(), director.snapshot().mode === "running" && director.stop();
    return;
  }
  if (action2 === "resume") {
    floodRuntime.resume();
    let cast = state.scene.doorPerformance;
    !(cast?.enabled && scope.ownerIds.includes(cast.doorId) && !doorPerformance.snapshot().triggered) && scope.actorIds.length && director.snapshot().mode === "paused" && presetOperation(() => director.resume());
    return;
  }
  director.edit(), floodRuntime.start(scope.floodIds), scope.actorIds.length && presetOperation(() => {
    let cast = state.scene.doorPerformance;
    cast?.enabled && scope.ownerIds.includes(cast.doorId) ? director.arm(scope.actorIds) : director.start({ actorIds: scope.actorIds });
  });
} }), await production.initialize());
renderer.setAnimationLoop((time, frame) => {
  if (renderer.xr.isPresenting) {
    xrViewer.update(frame, renderer.xr.getReferenceSpace());
    let floor = referenceFloor(state?.scene);
    roomTracking.update(frame, renderer.xr.getReferenceSpace(), time, floor ? floor.size[0] / floor.size[2] : 1), xrViewer.valid || (scriptDemo?.cancel("Waiting for headset tracking. Submit this line again."), hadXRFrame || panelPlacement.ready(currentView(), time, !1), cancelTransform("Waiting for headset tracking"), pausePerformance(), virtualRecorder.snapshot().status === "recording" && virtualRecorder.stop("interrupted").catch(() => {
    }));
  }
  let elapsed = lastTime ? Math.max(0, (time - lastTime) / 1e3) : 0;
  lastTime = time, move(Math.min(elapsed, 0.05)), showcaseEntryPending && mrShowcase && renderer.xr.isPresenting && xrViewer.valid && (showcaseEntryPending = !1, action(resumeWorld)()), updateAlignmentPreview(), quietShowcase && phase === "align" && pendingAlignment && xrViewer.valid && applyRoomAlignment(pendingAlignment), updateDemo(performance.now()), controls.enabled && controls.update(), updateActorTarget(), updateCalibrationCursor(), updateDraftDrawing(), presetSequence?.validate(), scriptDemo?.validate(), rig.updateWorldMatrix(!0, !0), world.updateWorldMatrix(!0, !1), currentView().updateWorldMatrix(!0, !1), handSample = handInput.sample({ frame, time, session: renderer.xr.getSession(), referenceSpace: renderer.xr.getReferenceSpace(), rigMatrix: rig.matrixWorld, worldMatrix: world.matrixWorld, headWorldMatrix: currentView().matrixWorld, enabled: renderer.xr.isPresenting && xrViewer.valid && phase === "explore" && mode === "inhabit" && world.visible }), handLayer.apply(handSample), pathGuide.show(!immersiveShowcase() && phase === "explore" && !draftTool.active() && (editing || director.snapshot().mode === "paused"));
  let rightHand = handSample.hands.find((h) => h.side === "right" && h.tracked), rightSource = Array.from(renderer.xr.getSession()?.inputSources || []).find((s) => s.handedness === "right"), gripHeld = !!rightSource?.gamepad?.buttons[1]?.pressed, grabFrames = doorGrab.frame(elapsed, rightHand?.pose.positionMeters, { held: gripHeld, active: phase === "explore" && !editing && !xrPanel.visible && !busy() && xrViewer.valid }), grabIds = new Set(grabFrames.map((d) => d.id)), objectTransforms = [...doorPlayer.frame(elapsed).filter((d) => !grabIds.has(d.id)), ...grabFrames, ...liveTransforms().filter((o) => "rotation" in o)];
  applyLiveTransforms(objectTransforms);
  let cueChanged = updateDoorPerformance(), actorFrames = director.frame(cueChanged ? 0 : elapsed, openSourceMode || roomMode && renderer.xr.isPresenting && xrMode === "immersive-ar" ? roomOpacity : 1, { showSelection: phase === "explore" && editing && !draftTool.active() && !director.snapshot().placing, selectedIds: [...selection, ...volume.isActive() ? hoverIds : []], overrides: [...liveTransforms().filter((o) => "yaw" in o), ...(production?.livePoses() || []).filter((p) => state.scene.actors?.some((a) => a.id === p.id))] });
  if (updateActorArrows(), mrShowcase) {
    let active = phase === "explore" && mode === "inhabit" && (!renderer.xr.isPresenting || xrViewer.valid && alignedMode);
    actorFrames = mrShowcase.evaluate(elapsed, active, 1);
    let opacity = mrShowcase.state().roomOpacity;
    roomOpacity !== opacity && (roomOpacity = opacity, updateRoomAppearance()), updatePresentationVisibility();
    let ending = active && mrShowcase.state().sphereVisible;
    if (ending && !showcaseSphere.visible) {
      let view = currentView();
      view.getWorldPosition(showcaseSphere.position), showcaseSphere.position.add(new THREE28.Vector3(0, -0.1, -1).applyQuaternion(view.getWorldQuaternion(new THREE28.Quaternion())));
    }
    showcaseSphere.visible = ending;
  }
  if (videoStartPending) {
    let pending = videoStartPending;
    videoStartPending = null, pending.session === renderer.xr.getSession() && pending.epoch === spatialEpoch && xrViewer.valid && beginVirtualRecording(actorFrames, objectTransforms, handSample).catch((error) => toast(error.message));
  }
  let flowPreviewReady = !!previewScene && currentJob?.status === "ready" && currentJob.result?.type === "flood", floodState = floodRuntime.tick({ now: time / 1e3, position: actorViewPosition().toArray(), active: phase === "explore" && (!editing || flowPreviewReady) && !draftTool.active() && !transformTool.active() && !volume.isActive() && !submitting && (!currentJob || currentJob.status === "ready") && !document.hidden, tracked: !renderer.xr.isPresenting || xrViewer.valid && renderer.xr.getSession()?.visibilityState === "visible" }), activeFlood = floodState.states.find((s) => s.inside && !s.fired) || floodState.states.find((s) => floodState.activeIds?.includes(s.id)), floodPlan = renderedDefinition?.floods?.find((f) => f.id === activeFlood?.id);
  floodStatus.hidden = renderer.xr.isPresenting || !floodState.armed || phase !== "explore" || !floodPlan, floodPlan && (floodStatus.textContent = uiText(activeFlood.fired ? "Triggered \xB7 Say \u201Creplay interaction\u201D to restart" : activeFlood.inside ? `Dwell: ${activeFlood.dwell.toFixed(1)} / ${floodPlan.trigger.seconds} s` : `Enter the floor region and dwell for more than ${floodPlan.trigger.seconds} s`)), updateInteractionFeedback(), updateObjectLabel(), xrUI.updateNotice(renderer.xr.isPresenting), renderer.xr.isPresenting && updateUIFoveation(xrPanel.visible || xrUI.dialogue.visible || xrUI.notice.visible);
  let cinemaFrames = production?.frame(elapsed, actorFrames, objectTransforms, floodState, { now: time / 1e3, position: actorViewPosition().toArray(), active: phase === "explore" && !editing && !document.hidden, tracked: !renderer.xr.isPresenting || xrViewer.valid && renderer.xr.getSession()?.visibilityState === "visible" }) || [];
  floodLayer.frame(floodState, { showRegions: phase === "explore" && !draftTool.active(), opacity: openSourceMode ? roomOpacity : 1 });
  for (let outline of [...outlines, ...hoverOutlines]) {
    let mesh = meshes2.get(outline.userData.id);
    mesh && (outline.position.copy(mesh.position), outline.quaternion.copy(mesh.quaternion));
  }
  if (openSourceMode) for (let light of scene.children.filter((o) => o.isLight))
    light.userData.baseIntensity ??= light.intensity, light.intensity = light.userData.baseIntensity * ((previewScene || state.scene).objects.some((o) => o.kind === "light") ? 0.18 : 1);
  let overlay = roomMode && renderer.xr.isPresenting && xrMode === "immersive-ar" && roomOpacity < 1 && world.visible;
  roomOcclusion.render(renderer, scene, camera, overlay ? [...meshes2.values(), ...[...director.layer.views.values()].map((v2) => v2.mesh), ...handLayer.meshes] : [], { enabled: overlay }), virtualRecorder.frame(time, production?.cameraView() || currentView(), actorFrames, [...new Map([...objectTransforms, ...cinemaFrames.filter((p) => state.scene.objects.find((o) => o.id === p.id)?.track)].map((p) => [p.id, p])).values()], handSample, { productionTime: production?.state().time || 0, ...production ? { previewObjectIds: production.state().previewObjectIds, triggerClocks: production.state().triggers.clocks } : {}, cameraId: production?.state().selectedCamera, floodState, matrix: world.matrixWorld, visible: mrShowcase ? world.visible : !["reference", "building", "welcome"].includes(phase), phase, showcase: mrShowcase?.state() }), frameCount++, syncFlow();
});
function showcaseCue() {
  return null;
}
async function resetShowcase() {
  return null;
}
