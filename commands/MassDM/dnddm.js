const whitelist = require("../../whitelist.json")

module.exports.execute = async (client, message) => {

  if(message.author.id !== whitelist.id && message.author.id !== whitelist.id2) return message.reply("มึงไม่ได้รับอนุญาตให้ใช้คำสั่งนี้เข้าใจ?!")

    let timedOut = false

    const { channel, author } = message

    const isFromAuthor = m => m.author.id == author.id

    const options = {
      max: 1,
      time: 60 * 1000
    }

    await channel.send('มึงต้องการส่งอะไร?')
    const firstColl = await channel.awaitMessages(isFromAuthor, options)

    if (firstColl.size > 0) {
      const title = firstColl.first().content

      message.guild.members.cache.forEach(member => {
        if (member.id !== client.user.id && member.presence.status === 'dnd' && !member.user.bot) member.send(title).catch(() => {});
      });

      } else timedOut = true

    if (timedOut)
    channel.send('ยกเลิกคำสั่งละไอ่สัสพิมพ์ช้าเกิน (หมดเวลา)')

}



module.exports.help = {
    name: "ddm",
    aliases: [],
    category: "MassDM",
    usage: "<message>",
    description: "ส่งข้อความหาคนที่เปิดโหมดห้ามรบกวน"
}
