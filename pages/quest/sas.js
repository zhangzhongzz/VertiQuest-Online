const qnaire = [
  {
    "type": "MULTI",  //选择框
    "id":1,
    "question": "1.第一次发病至今的时间",
    "multiarray": [['0年', '1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年'], ['0月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], ['0天', '1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天', '9天', '10天', '11天', '12天', '13天', '14天', '15天', '16天', '17天', '18天', '19天', '20天', '21天', '22天', '23天', '24天', '25天', '26天', '27天', '28天', '29天', '30天']],
    "multiindex": [0, 0, 0]
  },
  {
    "type": "MULTI",
    "id": 2,
    "question": "2. 最后一次发病至今时间",
    "multiarray": [['0年', '1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年'], ['0月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], ['0天', '1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天', '9天', '10天', '11天', '12天', '13天', '14天', '15天', '16天', '17天', '18天', '19天', '20天', '21天', '22天', '23天', '24天', '25天', '26天', '27天', '28天', '29天', '30天']],
    "multiindex": [0, 0, 0]
  },
  {
    "type": "SCQT", //单选中有拖动条 SCQ为单选
    "id": 3,
    "question": "3. 发病的次数（连续数天或数周持续症状算为一次发病）",
    "option": [
        { "id": 1, "flag": "A", "name": "一次", "isSelected": false },
        { "id": 2, "flag": "B", "name": "二到十次(请点此选择具体次数)", "isSelected": false },
        { "id": 3, "flag": "C", "name": "十次以上", "isSelected": false }
     ],
    
    "multiarray": ['2次', '3次', '4次', '5次', '6次', '7次', '8次', '9次', '10次'],
    "multiindex": [0]
  },
  {
    "type": "MCQ",   //多选
    "id": 4,
    "question": "4. 以往发病反复发作频率",
    "option":
      [{ "id": 1, "flag": "A", "name": "每天多次发作", "isSelected": false },
      { "id": 2, "flag": "B", "name": "间隔数天", "isSelected": false },
      { "id": 3, "flag": "C", "name": "一月至数月发作一次", "isSelected": false },
      { "id": 4, "flag": "D", "name": "一年至数年发作一次", "isSelected": false }]
    ,
    "optnum": 4
  },
  {
    "type": "MCQ",
    "id": 5,
    "question": "5. 请描述以往发病时（非本次发病）的不适感",
    "option":
      [{ "id": 1, "flag": "A", "name": "外界物体旋转", "isSelected": false },
        { "id": 2, "flag": "B", "name": "自身旋转", "isSelected": false },
        { "id": 3, "flag": "C", "name": "头晕，无明显旋转感", "isSelected": false },
        { "id": 4, "flag": "D", "name": "直立时（坐位、站位或走路时）难以保持身体平衡", "isSelected": false },
        { "id": 5, "flag": "E", "name": "其他", "isSelected": false }]
    ,
    "optnum": 5
  },
  {
    "type": "MCQ",
    "id": 6,
    "question": "6. 以往发病时，头晕或眩晕在什么情况下出现",
    "option": 
      [{ "id": 1, "flag": "A", "name": "无明显诱因突然发生", "isSelected": false },
        { "id": 2, "flag": "B", "name": "头部转动后发生", "isSelected": false },
        { "id": 3, "flag": "C", "name": "从床上坐起或躺下时发生", "isSelected": false },
        { "id": 4, "flag": "D", "name": "睡觉翻身时发生", "isSelected": false },
        { "id": 5, "flag": "E", "name": "巨大声音诱发", "isSelected": false },
        { "id": 6, "flag": "F", "name": "看到复杂的视觉刺激时诱发", "isSelected": false },
        { "id": 7, "flag": "G", "name": "其他", "isSelected": false }]
    ,
    "optnum": 7
  },
  {
    "type": "MCQ",
    "id": 7,
    "question": "7. 以往发病眩晕的持续时间",
    "option":
      [{ "id": 1, "flag": "A", "name": "一秒至数秒", "isSelected": false },
      { "id": 2, "flag": "B", "name": "一分钟以内", "isSelected": false },
      { "id": 3, "flag": "C", "name": "数分钟", "isSelected": false },
      { "id": 4, "flag": "D", "name": "数十分至数小时", "isSelected": false },
      { "id": 5, "flag": "E", "name": "十余小时至1天", "isSelected": false },
      { "id": 6, "flag": "F", "name": "一至数天", "isSelected": false },
      { "id": 7, "flag": "G", "name": "数天至数月", "isSelected": false },
      { "id": 8, "flag": "H", "name": "一年以上", "isSelected": false }]
      ,
    "optnum": 8
  },
  {
    "type": "MCQ",
    "id": 8,
    "question": "8. 请描述本次发病的不适感",
    "option": 
      [{ "id": 1, "flag": "A", "name": "外界物体旋转", "isSelected": false },
      { "id": 2, "flag": "B", "name": "自身旋转", "isSelected": false },
      { "id": 3, "flag": "C", "name": "头晕，无明显旋转感", "isSelected": false },
      { "id": 4, "flag": "D", "name": "直立时（坐位、站位或走路时）难以保持身体平衡", "isSelected": false },
      { "id": 5, "flag": "E", "name": "其他", "isSelected": false }
     ],
    "optnum": 5
  },
  {
    "type": "MCQ",
    "id": 9,
    "question": "9. 本次发病头晕或眩晕在什么情况下出现",
    "option": 
      [{ "id": 1, "flag": "A", "name": "无明显诱因突然发生", "isSelected": false },
        { "id": 2, "flag": "B", "name": "头部转动后发生", "isSelected": false },
        { "id": 3, "flag": "C", "name": "从床上坐起或躺下时发生", "isSelected": false },
        { "id": 4, "flag": "D", "name": "睡觉翻身时发生", "isSelected": false },
        { "id": 5, "flag": "E", "name": "巨大声音诱发", "isSelected": false },
        { "id": 6, "flag": "F", "name": "看到复杂的视觉刺激时诱发", "isSelected": false },
        { "id": 7, "flag": "G", "name": "其他", "isSelected": false }],
    "optnum": 7
  },
  {
    "type": "MCQ",
    "id": 10,
    "question": "10. 本次发病眩晕的持续时间",
    "option":
      [{ "id": 1, "flag": "A", "name": "一秒至数秒", "isSelected": false },
      { "id": 2, "flag": "B", "name": "一分钟以内", "isSelected": false },
      { "id": 3, "flag": "C", "name": "数分钟", "isSelected": false },
      { "id": 4, "flag": "D", "name": "数十分至数小时", "isSelected": false },
      { "id": 5, "flag": "E", "name": "十余小时至1天", "isSelected": false },
      { "id": 6, "flag": "F", "name": "一至数天", "isSelected": false },
      { "id": 7, "flag": "G", "name": "数天至数月", "isSelected": false },
      { "id": 8, "flag": "H", "name": "一年以上", "isSelected": false }],
    "optnum": 8
  },
  {
    "type": "MCQ",
    "id": 11,
    "question": "11. 可以改善眩晕的方法：",
    "option":
      [{ "id": 1, "flag": "A", "name": "保持坐位", "isSelected": false },
      { "id": 2, "flag": "B", "name": "保持仰卧位", "isSelected": false },
      { "id": 3, "flag": "C", "name": "保持头正中位", "isSelected": false },
      { "id": 4, "flag": "D", "name": "一侧偏头", "isSelected": false },
      { "id": 5, "flag": "E", "name": "静止不动", "isSelected": false },
      { "id": 6, "flag": "F", "name": "无明显减轻因素", "isSelected": false },
      { "id": 7, "flag": "G", "name": "自行缓解", "isSelected": false },
      { "id": 8, "flag": "H", "name": "药物治疗", "isSelected": false },
      { "id": 9, "flag": "I", "name": "其他", "isSelected": false }]
    ,
    "optnum": 9
  },
  {
    "type": "MCQ",
    "id": 12,
    "question": "12. (伴随症状)眩晕发作时会对视力有影响么？",
    "option":
      [{ "id": 1, "flag": "A", "name": "视野变狭隘", "isSelected": false },
        { "id": 2, "flag": "B", "name": "看东西有重影（复视）", "isSelected": false },
        { "id": 3, "flag": "C", "name": "视物晃动", "isSelected": false },
        { "id": 4, "flag": "D", "name": "视物模糊", "isSelected": false },
        { "id": 5, "flag": "E", "name": "头晕发作前有闪光感等发光的幻觉、弯曲的光线、闪烁的黑点等视觉先兆表现", "isSelected": false },
        { "id": 6, "flag": "F", "name": "其他", "isSelected": false }]
    ,
    "optnum": 6
  },
  {
    "type": "MCQ",
    "id": 13,
    "question": "13. (伴随症状)在头晕发作前后，耳部有什么不适么？",
    "option": 
      [{ "id": 1, "flag": "A", "name": "单侧急性听力损失", "isSelected": false },
        { "id": 2, "flag": "B", "name": "双侧急性听力损失", "isSelected": false },
        { "id": 3, "flag": "C", "name": "耳痛", "isSelected": false },
        { "id": 4, "flag": "D", "name": "耳部流脓", "isSelected": false },
        { "id": 5, "flag": "E", "name": "耳廓发红", "isSelected": false },
        { "id": 6, "flag": "F", "name": "耳鸣", "isSelected": false },
        { "id": 7, "flag": "G", "name": "耳闷", "isSelected": false },
        { "id": 8, "flag": "H", "name": "耳部出血", "isSelected": false },
        { "id": 9, "flag": "I", "name": "尖锐声音不能耐受（听觉过敏)", "isSelected": false }]
    ,
    "optnum": 9
  },
  {
    "type": "MCQ",
    "id": 14,
    "question": "14. (伴随症状)有没有其他和眩晕有关的症状？",
    "option":
      [{ "id": 1, "flag": "A", "name": "心跳加速/心悸/胸部剧烈疼痛", "isSelected": false },
        { "id": 2, "flag": "B", "name": "吞咽或说话困难", "isSelected": false },
        { "id": 3, "flag": "C", "name": "面瘫", "isSelected": false },
        { "id": 4, "flag": "D", "name": "面部/肢体感觉异常", "isSelected": false },
        { "id": 5, "flag": "E", "name": "面部/肢体活动障碍", "isSelected": false },
        { "id": 6, "flag": "F", "name": "猝然倒下发作（突发晕倒但是意识清醒）", "isSelected": false },
        { "id": 7, "flag": "G", "name": "头痛", "isSelected": false },
        { "id": 8, "flag": "H", "name": "颈部疼痛", "isSelected": false },
        { "id": 10, "flag": "I", "name": "恶心、呕吐、出冷汗", "isSelected": false },
        { "id": 11, "flag": "J", "name": "因眩晕而卧床不起", "isSelected": false },
        { "id": 12, "flag": "K", "name": "呼吸困难", "isSelected": false },
        { "id": 13, "flag": "L", "name": "意识丧失", "isSelected": false },
        { "id": 14, "flag": "M", "name": "情绪紧张，躁动", "isSelected": false },
        { "id": 15, "flag": "N", "name": "其他", "isSelected": false }],
    "optnum": 14
  },
  {
    "type": "MCQ",
    "id": 15,
    "question": "15. (药物史)眩晕发生前1月内是否有增加服用如下药物？",
    "option":
      [{ "id": 1, "flag": "A", "name": "降压药或洋地黄类药物", "isSelected": false },
      { "id": 2, "flag": "B", "name": "糖尿病药物", "isSelected": false },
      { "id": 3, "flag": "C", "name": "抗生素（耳毒性）", "isSelected": false },
      { "id": 4, "flag": "D", "name": "抗焦虑/抑郁药等精神药物", "isSelected": false },
      { "id": 5, "flag": "E", "name": "抗癫痫药物", "isSelected": false },
      { "id": 6, "flag": "F", "name": "镇静剂", "isSelected": false },
      { "id": 7, "flag": "G", "name": "抗组胺药", "isSelected": false },
      { "id": 8, "flag": "H", "name": "非甾体类消炎药，如阿司匹林、对乙酰氨基酚、吲哚美辛、布洛芬等", "isSelected": false },
      { "id": 9, "flag": "I", "name": "化疗药等抗癌药物", "isSelected": false }]
    ,
    "optnum": 9
  },
  {
    "type": "MCQ",
    "id": 16,
    "question": "16. (既往史)是否有以下一种或多种情况？？",
    "option": 
      [{ "id": 1, "flag": "A", "name": "偏头痛", "isSelected": false },
        { "id": 2, "flag": "B", "name": "耳部疾病", "isSelected": false },
        { "id": 3, "flag": "C", "name": "近期耳部手术", "isSelected": false },
        { "id": 4, "flag": "D", "name": "近期头部手术", "isSelected": false },
        { "id": 5, "flag": "E", "name": "高血压", "isSelected": false },
        { "id": 6, "flag": "F", "name": "高血脂", "isSelected": false },
        { "id": 7, "flag": "G", "name": "甲状腺疾病", "isSelected": false },
        { "id": 8, "flag": "H", "name": "贫血", "isSelected": false },
        { "id": 9, "flag": "I", "name": "其他心脏或者循环系统疾病", "isSelected": false },
        { "id": 10, "flag": "J", "name": "糖尿病", "isSelected": false },
        { "id": 11, "flag": "K", "name": "近期头部外伤", "isSelected": false },
        { "id": 12, "flag": "L", "name": "高位脊髓或颈部不适病史", "isSelected": false },
        { "id": 13, "flag": "M", "name": "眼部相关疾病（新近更换眼镜，近期眼部手术病史）", "isSelected": false },
        { "id": 14, "flag": "N", "name": "心理疾病病史", "isSelected": false },
        { "id": 15, "flag": "O", "name": "其他", "isSelected": false }],
    
    "optnum": 15
  },
  {
    "type": "MCQ",
    "id": 17,
    "question": "17. (家族史)自身和/或有血缘关系的亲属（请列出关系）是否有以下疾病？",
    "option":
      [{ "id": 1, "flag": "A", "name": "偏头痛", "isSelected": false },
      { "id": 2, "flag": "B", "name": "耳石症", "isSelected": false },
      { "id": 3, "flag": "C", "name": "梅尼埃病", "isSelected": false },
      { "id": 4, "flag": "D", "name": "耳硬化症", "isSelected": false },
      { "id": 5, "flag": "E", "name": "家族性发作性共计失调", "isSelected": false },
      { "id": 6, "flag": "F", "name": "自身免疫病", "isSelected": false },
      { "id": 7, "flag": "G", "name": "神经退行性疾病", "isSelected": false },
      { "id": 8, "flag": "H", "name": "其他", "isSelected": false }]
    ,
    "optnum": 8
  }
]

module.exports = {
  qnaire: qnaire
}
